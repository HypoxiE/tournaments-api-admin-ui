export async function Init() {
	sessionStorage.setItem("toSendData", JSON.stringify({result: [], metric: [], metadata: []}));
}

export async function AddResultData(result_id, key, value) {
	const savedData = JSON.parse(sessionStorage.getItem("toSendData"));

	let found = false;
	savedData.result.forEach(result => {
		if (result.result_id == result_id) {
			result[key] = value;
			found = true;
		}
	});
	if (!found) {
		savedData.result.push({"result_id": result_id, [key]: value});
	}

	sessionStorage.setItem("toSendData", JSON.stringify(savedData));
}

export async function RemoveResultData(result_id, key) {
	const savedData = JSON.parse(sessionStorage.getItem("toSendData"));

	savedData.result.forEach((result, index) => {
		if (result.result_id == result_id) {
			delete result[key];
			if (Object.keys(result).length === 1) {
				savedData.result.splice(index, 1);
			}
		}
	});

	sessionStorage.setItem("toSendData", JSON.stringify(savedData));
}