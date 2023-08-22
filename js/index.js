import { tryToCatch } from "./utils.js";

//Api key from ticketmaster
const API_KEY = config.MY_API_TOKEN;
const API_BASE_URL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const currentDate = new Date();
const dateIn7Days = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
const formattedCurrentDate = currentDate.toISOString().substring(0, 19);
const formattedDateIn7Days = dateIn7Days.toISOString().substring(0, 19);

console.log(formattedCurrentDate);
console.log(formattedDateIn7Days);

async function getWeeklyData() {
	const [error, response] = await tryToCatch(
		fetch,
		`${API_BASE_URL}Haugesund,Norway/${formattedCurrentDate}/${formattedDateIn7Days}?ksey=${API_KEY}`,
	);
	if (error) {
		console.log(error);
		return error;
	}
	if (!response.ok) {
		throw new Error("Network response was not OK");
	}
	const data = await response.json();
	console.log(data);
	return data;
}

getWeeklyData();
