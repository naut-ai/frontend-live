import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home.jsx";
import Settings from "./pages/Settings.jsx";
import Video from "./pages/Video.jsx";

function App() {
  const [apiKeys, setApiKeys] = useState({
    heygenApiKey: "",
  });

  useEffect(() => {
    localStorage.setItem("apiKeys", JSON.stringify(apiKeys));
    console.log(apiKeys);
  }, [apiKeys]);

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/create" element={<Video apiKeys={apiKeys} />} />
            <Route
              path="/video/settings"
              element={<Settings apiKeys={apiKeys} setApiKeys={setApiKeys} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
