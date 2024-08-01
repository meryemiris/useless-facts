import RandomFact from "../components/RandomFact";
import TodayFact from "../components/TodayFact";

export default async function HomePage() {
  return (
    <>
      <TodayFact />
      <RandomFact />
    </>
  );
}
