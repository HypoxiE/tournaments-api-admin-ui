import { AddData, RemoveData } from "./format_data.js";


export async function drawTable(tournament) {
	try {

	const nameDiv = document.getElementById("tournament_name");
	nameDiv.innerHTML = `${tournament.name}`;

	const container = document.getElementById("leaderboard");
	container.innerHTML = "";

	tournament.results.forEach(result => {

		let metadata = {};
		result.metadata.forEach(data => {
			metadata[data.key] = {
				"value": data.value,
				"metadata_id": data.metadata_id
			};
		});

		const block = document.createElement("div");
		block.className = "result-block";

		const avatar = document.createElement("img");
		avatar.className = "avatar";
		avatar.src = result.avatar_url;
		avatar.onerror = function() {
			this.src = 'https://i.imgur.com/9iT2ogu.png';
			this.onerror = null;
		};

		const info = document.createElement("div");
		info.className = "result-info-block";
		const date = new Date(result.timestamp * 1000);
		//date.toLocaleString()
		// Генерация содержимого блока
		const username = document.createElement("input");
		username.type = "text";
		username.spellcheck = false;
		username.classList.add("username");
		username.value = result.username;
		username.placeholder = result.username;
		username.addEventListener("change", () => {
			if (username.value != username.placeholder){
				AddData("result", result.result_id, username.value, "username");
			} else {
				RemoveData("result", result.result_id, "username");
			}
		});
		info.appendChild(username);

		const score = document.createElement("span");
		score.classList.add("score");
		score.innerHTML = `Очки: ${result.score}`;
		info.appendChild(score)


		const penalty_container = document.createElement("span");
		penalty_container.classList.add("penalty");
		penalty_container.innerHTML = "Штраф: ";
		const penalty = document.createElement("input");
		penalty.classList.add("penalty");
		penalty.type = "number";
		penalty.value = result.penalty;
		penalty.placeholder = result.penalty;
		penalty.addEventListener("change", () => {
			if (penalty.value != penalty.placeholder){
				AddData("result", result.result_id, parseInt(penalty.value, 10), "penalty");
			} else {
				RemoveData("result", result.result_id, "penalty");
			}
		});
		penalty_container.appendChild(penalty);
		info.appendChild(penalty_container);

		const cost_container = document.createElement("span");
		cost_container.classList.add("cost");
		cost_container.innerHTML = "Стоимость: ";
		const cost = document.createElement("input");
		cost.classList.add("cost");
		cost.type = "number";
		cost.value = result.cost;
		cost.placeholder = result.cost;
		cost.addEventListener("change", () => {
			if (cost.value != cost.placeholder){
				AddData("result", result.result_id, parseInt(cost.value, 10), "cost");
			} else {
				RemoveData("result", result.result_id, "cost");
			}
		});
		cost_container.appendChild(cost);
		info.appendChild(cost_container);

		const comment = document.createElement("textarea");
		comment.classList.add("result-comment-block");
		comment.spellcheck = false;
		comment.innerHTML = metadata.comment.value;
		comment.placeholder = metadata.comment.value;

		comment.addEventListener("change", () => {
			if (comment.value != cost.placeholder){
				AddData("metadata", metadata.comment.metadata_id, comment.value);
			} else {
				RemoveData("metadata", metadata.comment.metadata_id);
			}
		});

		block.appendChild(avatar);
		block.appendChild(info);
		block.appendChild(comment);
		container.appendChild(block);
	});

	} catch (err) {
	console.error("Ошибка:", err);
	}
}

export async function cutResults(tournament) {
	let results = [];
	let used_names = [];

	tournament.results.forEach(result => {
	if (!used_names.includes(result.username)) {
		results.push(result);
		used_names.push(result.username)
	}
	});

	tournament.results = results

	return tournament;
}