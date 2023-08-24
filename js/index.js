import { tryToCatch } from "./utils.js";
import { createHourlyHtml, createWeeklyHtml } from "./html-generators.js";

//Api key from Visualcrossing
const API_KEY = config.MY_API_TOKEN;
const API_BASE_URL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

//Used with currentDate to check currentday

const currentDate = new Date();
const dateIn4Days = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000);
const formattedCurrentDate = currentDate.toISOString().substring(0, 19);
const formattedDateIn4Days = dateIn4Days.toISOString().substring(0, 19);
const hourlyHtml = [];
const weeklyHtml = [];
let weeklyForecastSelected = true;

//Gets data from API and sets data to weatherData
async function getWeatherData() {
	// if (weatherData) {
	// 	return weatherData;
	// }
	const [error, response] = await tryToCatch(
		fetch,
		`${API_BASE_URL}Haugesund,Norway/${formattedCurrentDate}/${formattedDateIn4Days}?key=${API_KEY}&timezone=Z&maxStations=6&unitGroup=metric&elements=temp,humidity,windspeed,conditions,icon,datetime`,
	);
	if (error) {
		console.log(error);
		return error;
	}
	if (!response.ok) {
		throw new Error("Network response was not OK");
	}
	const data = await response.json();
	createWeeklyHtml(data);
	createHourlyHtml(data);
	console.log(hourlyHtml);
	return;
}

/* Use timezone query to set timezone so it doesnt fuck with format */
/* Use elements to retrieve only the info i need for the application */

/* Use current for weekly tab and hourly for daily one */

async function renderHtml() {
	if (hourlyHtml && weeklyHtml) {
		if (weeklyForecastSelected) {
			document.querySelector(".forecast-container").innerHTML =
				weeklyHtml.join(" ");
		} else {
			document.querySelector(".forecast-container").innerHTML =
				hourlyHtml.join(" ");
		}
		return;
	}
	await getWeatherData();
	if (weeklyForecastSelected) {
		document.querySelector(".forecast-container").innerHTML =
			weeklyHtml.join(" ");
	} else {
		document.querySelector(".forecast-container").innerHTML =
			hourlyHtml.join(" ");
	}
}
