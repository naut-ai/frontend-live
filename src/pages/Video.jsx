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
    content: "",
    metadata: "",
  });
  const [loading, setLoading] = useState({
    isLoading: false,
    loadingText: "",
    isLoaded: true,
  });
  const [prompt, setPrompt] = useState("");
  const [disabled, setDisabled] = useState(false);
  //TODO: add backend url
  function showVideo(id) {
    const talk_id = id;
    fetch("http://127.0.0.1:8000/get_video", {
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
          content: data.video_content,
          metadata: data.metadata,
        });
        console.log(video);
        setLoading({
          ...loading,
          isLoaded: true,
          isLoading: false,
          loadingText: "",
        });
        setDisabled(false);
      });
  }

  function askVideo(question) {
    setVideo({
      ...video,
      id: "",
      src: "",
      title: "",
      subtitle: "",
      content: "",
      metadata: "",
    });
    setDisabled(true);
    setLoading({
      ...loading,
      isLoaded: false,
      isLoading: true,
      loadingText: "Generating video...",
    });

    try {
      fetch("http://127.0.0.1:8000/ask_video", {
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
              content: "",
              metadata: "",
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
              loadingText: "Processing video...",
            });
            setTimeout(() => {
              showVideo(data.video_id);
            }, 20000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      toast.error("Backend Connection failed!");
    }
  }

  const handleData = () => {
    askVideo(prompt);
  };

  return (
    <>
      <Messagebox video={video} loading={loading} />
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
