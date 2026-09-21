import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import GrowthSolutions from "../components/GrowthSolutions";
import WhyUs from "../components/WhyUs";
import StatsBelt from "../components/StatsBelt";
import FooterCTA from "../components/FooterCTA";
import Intro from "../components/Intro";

export default function Home() {
	return (
		<main>
			<Hero />
			<GrowthSolutions />
			{/* <Intro /> */}
			<ServicesGrid />
			<WhyUs />
			<StatsBelt />
			<FooterCTA />
		</main>
	);
}
