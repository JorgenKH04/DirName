import { pad } from "./utils.js";

//Api key from ticketmaster
const apiKey = config.MY_API_TOKEN;
const baseURL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const d = new Date();
const formattedDate = `${d.getFullYear()}-${pad(d.getMonth())}-${pad(
	d.getDate(),
)}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
console.log(formattedDate);

// ${baseURL}London,UK/${formattedNow}?key=${apiKey}
async function temp() {
	const response = await fetch(
		`${baseURL}London,UK/${formattedDate}?key=${apiKey}&include=stats`,
	);

	const data = await response.json();
	console.log(data);
}

// temp();
