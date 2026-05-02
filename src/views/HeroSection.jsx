import { FaLongArrowAltRight } from "react-icons/fa";
import "../styles/pages/Home.css";

export const HeroSection = () => {
  return (
    <main className="home-main">
    <div className="home-content">
      <h1>Explore the World,One Country at a Time</h1>
      <p>Discover the history,culture, and beauty of every nation sort searcha and filter through countries to find the details you need</p>
      <button className="home-btn">Start Exploring<FaLongArrowAltRight/></button>
    </div>
    <div className="home-image-wrap">
      <img className="home-image" src="/images/world.png" alt="World Beauty" />
    </div>
  </main>
  )
}
