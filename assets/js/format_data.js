export async function Init() {
	sessionStorage.setItem("toSendData", JSON.stringify({results: [], metrics: [], metadata: [], tournaments: []}));
}
const general_keys = {
	"results": "result_id",
	"metrics": "metric_id",
	"metadata": "metadata_id",
	"tournaments": "tournament_id"
}
export function AddData(type, obj_id, value, key = "value") {
	const savedData = JSON.parse(sessionStorage.getItem("toSendData"));

	let found = false;
	let id_key = general_keys[type];
	savedData[type].forEach(obj => {
		if (obj[id_key] == obj_id) {
			obj[key] = value;
			found = true;
		}
	});
	if (!found) {
		savedData[type].push({[id_key]: obj_id, [key]: value});
	}

	sessionStorage.setItem("toSendData", JSON.stringify(savedData));
}

export function RemoveData(type, obj_id, key = "value") {
	const savedData = JSON.parse(sessionStorage.getItem("toSendData"));

	let id_key = general_keys[type];
	savedData[type].forEach((obj, index) => {
		if (obj[id_key] == obj_id) {
			delete obj[key];
			if (Object.keys(obj).length === 1) {
				savedData[type].splice(index, 1);
			}
		}
	});

	sessionStorage.setItem("toSendData", JSON.stringify(savedData));
}