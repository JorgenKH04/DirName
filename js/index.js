import { tryToCatch } from "./utils.js";
import { createHourlyHtml, createWeeklyHtml } from "./html-generators.js";

//Api key from Visualcrossing
const API_KEY = config.MY_API_TOKEN;
const API_BASE_URL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const $ = document.querySelector.bind(document);
const currentDate = new Date();
const dateIn4Days = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000);
const formattedCurrentDate = currentDate.toISOString().substring(0, 19);
const formattedDateIn4Days = dateIn4Days.toISOString().substring(0, 19);
const hourlyHtml = [];
const weeklyHtml = [];
let weeklyForecastSelected = true;

document.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.closest("#refresh-button")) {
		hourlyHtml.length = 0;
		weeklyHtml.length = 0;
		renderHtml();
	}
});

//Gets data from API and sets data to weatherData
async function getWeatherData() {
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
	return;
}

//renders the html
async function renderHtml() {
	if (hourlyHtml.length && weeklyHtml.length) {
		if (weeklyForecastSelected) {
			$(".forecast-container").innerHTML = weeklyHtml.join(" ");
		} else {
			$(".forecast-container").innerHTML = hourlyHtml.join(" ");
		}
		return;
	}
	await getWeatherData();
	if (weeklyForecastSelected) {
		$(".forecast-container").innerHTML = weeklyHtml.join(" ");
	} else {
		$(".forecast-container").innerHTML = hourlyHtml.join(" ");
	}
}

renderHtml();

/* Give credit for icons
   maybe add a small text saying it's Haugesund only for now
   Add hover effects
   Add popupwindow on dropdown
   Maybe add some way to indicate refresh button has been clicked unsure what */

export { weeklyHtml, hourlyHtml, currentDate };
