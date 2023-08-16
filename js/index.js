//Api key from ticketmaster
const apiKey = config.MY_API_TOKEN;
const baseURL =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${pad(
	currentDate.getMonth(),
)}-${pad(currentDate.getDate())}`;
console.log(formattedDate);

// ${baseURL}London,UK/${formattedNow}?key=${apiKey}
async function temp() {
	const response = await fetch(
		`${baseURL}London,UK/${formattedDate}?key=${apiKey}&include=`,
	);

	const data = await response.json();
	console.log(data);
}

function pad(d) {
	return d.toString().padStart(2, "0");
}

// temp();

/* Make different request for different things cause you save queries by
   only requesting certain info, so u can have a scan that checks current
   on load or something and have and hourly checker and whatnot  */
