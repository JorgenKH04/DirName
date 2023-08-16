//pads date
function pad(d) {
	return d.toString().padStart(2, "0");
}

//Check if object has key
function keyExists(obj, k) {
	if (obj[k]) {
		return true;
	} else {
		return false;
	}
}

export { pad };
