import { keyExists } from "./utils.js";

//Api key from ticketmaster
const apiKey = config.MY_API_TOKEN;
const baseURL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const currentDate = new Date();
const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
const formattedDate = currentDate.toISOString().substring(0, 19);
const formattedWeek = nextWeek.toISOString().substring(0, 19);
console.log(formattedDate);
console.log(formattedWeek);

async function temp() {
	try {
		const response = await fetch(
			`${baseURL}London,UK/${formattedDate}?ksey=${apiKey}&include=stats`,
		);
		if (!response.ok) {
			throw new Error("Network response was not OK");
		}
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

// temp();
