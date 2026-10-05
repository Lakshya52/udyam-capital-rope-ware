import Hero from "../components/Hero";
// import ServicesGrid from "../components/ServicesGrid";
import ServicesLong from "../components/ServicesLong";
import GrowthSolutions from "../components/GrowthSolutions";
// import WhyUs from "../components/WhyUs";
import WhyUsNew from "../components/WhyUsNew";
import StatsBelt from "../components/StatsBelt";
// import FooterCTA from "../components/FooterCTA";
import FooterCTAnew from "../components/FooterCTAnew";
import Intro from "../components/Intro";

export default function Home() {
	return (
		<main>
			<Hero />
			{/* <GrowthSolutions /> */}
			<Intro />
			{/* <ServicesGrid /> */}
			<ServicesLong />
			{/* <WhyUs /> */}
			<WhyUsNew />
			<StatsBelt />
			{/* <FooterCTA /> */}
			<FooterCTAnew />
		</main>
	);
}
