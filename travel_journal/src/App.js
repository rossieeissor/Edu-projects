import Navbar from "./components/Navbar";
import Travel from "./components/Travel";
import data from "./data";

export default function App() {
  const travels = data.map(travel => <Travel travel={travel} />);
  return (
    <div>
      <Navbar />
      <section className="travel--list">{travels}</section>
    </div>
  );
}
