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

// ${baseURL}London,UK/${formattedNow}?key=${apiKey}
async function temp() {
	const response = await fetch(
		`${baseURL}London,UK/${formattedDate}?key=${apiKey}&include=stats`,
	);

	const data = await response.json();
	console.log(data);
}

// temp();
