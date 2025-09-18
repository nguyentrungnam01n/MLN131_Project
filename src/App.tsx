import "./animations.css";
import { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Overview from "./sections/Overview.jsx";
import Thoughts from "./sections/Thoughts.jsx";
import Analysis from "./sections/Analysis.jsx";
import Timeline from "./sections/Timeline.jsx";
import Footer from "./components/Footer.jsx";
import Chatbox from "@/components/Chatbox.jsx";


function App() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  const handleEnableSound = () => {
    const audio = new Audio("/public/sound_background.mp3");
    audio.loop = true;
    audio.play();
    setIsSoundEnabled(true);
    document.getElementById("enable-sound-overlay").style.display = "none";
  };

  const handleMuteUnmute = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    setIsSoundEnabled(!isSoundEnabled);
  };
  return (
    <div className="App min-h-screen bg-white vietnamese-text">
      <Header />
      <main>
        {/* <div
          id="enable-sound-overlay"
          className="overlay"
          style={{ display: isSoundEnabled ? "none" : "block" }}
        >
          <div className="overlay-content">
            <h2>🔊 Bật âm thanh</h2>
            <p>Nhấn để cho phép phát âm thanh tự động</p>
            <button
              id="enable-sound"
              className="btn-primary"
              tabIndex={0}
              aria-label="Bật âm thanh"
              onClick={handleEnableSound}
            >
              Bật âm thanh
            </button>
          </div>
        </div> */}

        {/* <div className="fixed bottom-6 left-6 z-50">
          <button
            id="mute-unmute"
            className="mute-btn"
            tabIndex={0}
            aria-label="Tắt / Bật tiếng"
            title="Tắt / Bật tiếng (M)"
            onClick={handleMuteUnmute} 
          >
            <i
              className={`fas fa-volume-up unmute-icon ${isSoundEnabled ? "block" : "hidden"}`}
            ></i>
            <i
              className={`fas fa-volume-mute mute-icon ${isSoundEnabled ? "hidden" : "block"}`}
            ></i>
          </button>
        </div> */}
        <Hero />
        <Overview />
        <Thoughts />
        <Analysis />
        <Timeline />
        <Chatbox />
      </main>
      <Footer />
    </div>
  );
}

export default App;
