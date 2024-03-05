import { Fact } from "@/pages";

type TodayFactProps = {
	getTodayFact: () => void;
	todayfact: Fact[];
};

const TodayFact: React.FC<TodayFactProps> = ({ getTodayFact, todayfact }) => {
	return (
		<>
			<button onClick={getTodayFact} className="fact-button">
				Get Fact of the Day
			</button>

			{todayfact.length > 0 && (
				<div>
					<h1>Fact of the Day</h1>
					<ul>
						{todayfact.length > 0 ? (
							todayfact.map((fact) => <li key={fact.id}>{fact.text}</li>)
						) : (
							<li>No Fact of the Day</li>
						)}
					</ul>
				</div>
			)}
		</>
	);
};

export default TodayFact;
