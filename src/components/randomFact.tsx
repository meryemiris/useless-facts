import { Fact } from "@/pages";

type RandomFactProps = {
	randomfact: Fact[];
	getRandomFact: () => void;
};

const RandomFact: React.FC<RandomFactProps> = ({
	randomfact,
	getRandomFact,
}) => {
	return (
		<>
			<button onClick={getRandomFact} className="fact-button">
				Get Random Fact
			</button>
			<div>
				<h1>Random Fact</h1>
				<ul>
					{randomfact.map((fact) => (
						<li key={fact.id}>{fact.text}</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default RandomFact;
