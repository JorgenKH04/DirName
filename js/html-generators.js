const DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

function createWeeklyHtml(data) {
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
}

function createHourlyHtml(data) {
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
}

export { createHourlyHtml, createWeeklyHtml };
