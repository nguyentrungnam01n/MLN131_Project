import "./animations.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Overview from "./sections/Overview.jsx";
import Thoughts from "./sections/Thoughts.jsx";
import Analysis from "./sections/Analysis.jsx";
import Timeline from "./sections/Timeline.jsx";
import Footer from "./components/Footer.jsx";
import Chatbox from "@/components/Chatbox.jsx";

function App() {
  return (
    <div className="App min-h-screen bg-white vietnamese-text">
      <Header />
      <main>
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
