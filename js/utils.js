//Check if object has key
function objHasKey(obj, key) {
	if (obj[key]) {
		return true;
	} else {
		return false;
	}
}

//Try catch "middleman"
const tryToCatch = async (fn, arg) => {
	try {
		return [null, await fn(arg)];
	} catch (err) {
		return [err];
	}
};

export { tryToCatch };
