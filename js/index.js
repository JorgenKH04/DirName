import { tryToCatch } from "./utils.js";

//Api key from ticketmaster
const API_KEY = config.MY_API_TOKEN;
const API_BASE_URL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const DAYS = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday",
};

const currentDate = new Date();
const today = currentDate.getDay();
const dateIn7Days = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
const formattedCurrentDate = currentDate.toISOString().substring(0, 19);
const formattedDateIn7Days = dateIn7Days.toISOString().substring(0, 19);

console.log(today);

async function getWeatherData() {
	const [error, response] = await tryToCatch(
		fetch,
		`${API_BASE_URL}Haugesund,Norway/${formattedCurrentDate}/${formattedDateIn7Days}?key=${API_KEY}&elements=temp,humidity,windspeed,conditions,icon,datetime`,
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

// getWeatherData();
