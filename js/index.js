import { tryToCatch } from "./utils.js";

//Api key from Visualcrossing
const API_KEY = config.MY_API_TOKEN;
const API_BASE_URL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

//Used with currentDate to check currentday
const DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

//stringify date.getHours and check index of it in this
const HOURS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
];

const currentDate = new Date();
const dateIn4Days = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000);
const formattedCurrentDate = currentDate.toISOString().substring(0, 19);
const formattedDateIn4Days = dateIn4Days.toISOString().substring(0, 19);
const hourlyHtml = [];
const weeklyHtml = [];

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
	for (const day of data.days) {
		const selectedDay = new Date(`${day.datetime}`).getDay();
		weeklyHtml.push(`
			<div class="weatherCard">
			<h3>${day.conditions}</h3>
			<p>${DAYS[selectedDay]}</p>
			<div class="temperature-and-icon">
				<img src="./assets/icons/weather/${day.icon}.png" />
				<h2>${day.temp}°</h2>
			</div>
			<div class="aditional-stats">
				<div class="humidity">
				<p>Humidity</p>
				<h4>${day.humidity}</h4>
				</div>
				<div class="windspeed">
				<p>Windspeed</p>
				<h4>${day.windspeed} kph</h4>
				</div>
			</div>
			</div>`);
	}
	let currentHour = currentDate.getHours();
	for (const hour of data.days[0].hours) {
		if (!hour === currentHour) {
			console.log("hour not equal currentHour");
			continue;
		}
		if (hourlyHtml.length >= 4) {
			document.querySelector(".forecast-container").innerHTML =
				hourlyHtml.join(" ");
			return;
		}
		hourlyHtml.push(`
			<div class="weatherCard">
			<h3>${hour.conditions}</h3>
			<p>${currentHour}:00</p>
			<div class="temperature-and-icon">
				<img src="./assets/icons/weather/${hour.icon}.png" />
				<h2>${hour.temp}°</h2>
			</div>
			<div class="aditional-stats">
				<div class="humidity">
				<p>Humidity</p>
				<h4>${hour.humidity}</h4>
				</div>
				<div class="windspeed">
				<p>Windspeed</p>
				<h4>${hour.windspeed} kph</h4>
				</div>
			</div>
			</div>`);
		if (currentHour === 23) {
			currentHour = 0;
		} else {
			currentHour++;
		}
	}
	return;
}

getWeatherData();

/* Use timezone query to set timezone so it doesnt fuck with format */
/* Use elements to retrieve only the info i need for the application */

/* Use current for weekly tab and hourly for daily one */

async function temporary() {
	await getWeatherData();
	console.log("pls funk how i think");
}
