import Navbar from "./components/Navbar";
import RandomFact from "./components/RandomFact";
import TodayFact from "./components/TodayFact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <TodayFact />
      <RandomFact />
    </>
  );
}
