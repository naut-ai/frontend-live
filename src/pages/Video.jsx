import { useState } from "react";
import toast from "react-hot-toast";
import InputBox from "../components/Inputbox/InputBox";
import Messagebox from "../components/Messagebox/Messagebox";
export default function Video({ apiKeys }) {
  const [video, setVideo] = useState({
    id: "",
    title: "",
    src: "",
    subtitle: "",
  });
  const [loading, setLoading] = useState({
    isLoading: false,
    loadingText: "",
    isLoaded: true,
  });
  const [prompt, setPrompt] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState("s");
  const [timeTaken, setTimeTaken] = useState("");
  //TODO: add backend url
  function showVideo(id, timer) {
    const talk_id = id;
    fetch("https://nautai-backend.onrender.com/get_video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ talk_id, apiKeys }),
    })
      .then((res) => res.json())
      .then((data) => {
        setVideo({
          ...video,
          id: talk_id,
          src: data.video_url,
          title: data.video_title,
          subtitle: data.subtitle_url,
        });
        console.log(video);
        clearInterval(timer);
        setLoading({
          ...loading,
          isLoaded: true,
          isLoading: false,
          loadingText: "",
        });
        setDisabled(false);
      });
  }

  const timer = () => {
    if (timeTaken == "60s") {
      setTime(`m`);
      setCounter(0);
    } else if (timeTaken == "60m") {
      setTime(`hr`);
      setCounter(0);
    }
    setCounter((prev) => prev + 1);
    setTimeTaken(`${counter}${time}`);
    console.log(timeTaken);
  };

  function askVideo(question) {
    setVideo({
      ...video,
      id: "",
      src: "",
      title: "",
      subtitle: "",
    });
    setDisabled(true);
    setLoading({
      ...loading,
      isLoaded: false,
      isLoading: true,
      loadingText: "Generating video...",
    });

    let generationTimer = setInterval(timer, 1000);

    try {
      fetch("https://nautai-backend.onrender.com/ask_video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, apiKeys }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.error(data.message);
            setVideo({
              ...video,
              id: "",
              src: "",
              title: "",
              subtitle: "",
            });
            setLoading({
              isLoading: false,
              loadingText: "",
              isLoaded: true,
            });
            setDisabled(false);
          } else {
            setLoading({
              ...loading,
              isLoaded: false,
              isLoading: true,
              loadingText: "Rendering video...",
            });
            setTimeout(() => {
              showVideo(data.video_id, generationTimer);
            }, 20000);
          }
        })
        .catch((err) => {
          console.log(err);
          clearInterval(generationTimer);
        });
    } catch (err) {
      console.log(err);
      clearInterval(generationTimer);
      toast.error("Server Connection failed!");
    }
  }

  const handleData = () => {
    askVideo(prompt);
  };

  return (
    <>
      <Messagebox video={video} loading={loading} timeTaken={timeTaken} />
      <InputBox
        prompt={prompt}
        handleSubmit={handleData}
        setPrompt={setPrompt}
        loading={loading}
        disabled={disabled}
      />
    </>
  );
}
