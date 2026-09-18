import { useParams } from "react-router-dom";
import { services, getService } from "../data/services.js";

export default function Services() {
	const { id } = useParams();
	const service = (id ? getService(id) : undefined) ?? services[0];

	return (
		<main className="mx-auto flex min-h-[60dvh] h-[120dvh] w-full max-w-[1166px] items-center justify-center px-5">
			<h1 className="font-heading fs-heading">{service.title}</h1>
		</main>
	);
}
