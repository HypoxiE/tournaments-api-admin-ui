import { AddResultData, RemoveResultData } from "./format_data.js";


export async function drawTable(tournament) {
	try {

	const nameDiv = document.getElementById("tournament_name");
	nameDiv.innerHTML = `${tournament.name}`;

	const container = document.getElementById("leaderboard");
	container.innerHTML = "";

	tournament.results.forEach(result => {

		let comment_content = "", streams = "";

		result.metadata.forEach(data => {
		if (data.key == "comment") {
			comment_content = data.value
		} else if (data.key == "streams") {
			streams = data.value
		}
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
		username.classList.add("username");
		username.value = result.username;
		username.placeholder = result.username;
		username.addEventListener("change", () => {
			if (username.value != username.placeholder){
				AddResultData(result.result_id, "username", username.value);
			} else {
				RemoveResultData(result.result_id, "username")
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
		penalty.type = "text";
		penalty.value = result.penalty;
		penalty.placeholder = result.penalty;
		penalty.addEventListener("change", () => {
			if (penalty.value != penalty.placeholder){
				AddResultData(result.result_id, "penalty", penalty.value);
			} else {
				RemoveResultData(result.result_id, "penalty")
			}
		});
		penalty_container.appendChild(penalty);
		info.appendChild(penalty_container);

		const cost_container = document.createElement("span");
		cost_container.classList.add("cost");
		cost_container.innerHTML = "Стоимость: ";
		const cost = document.createElement("input");
		cost.type = "text";
		cost.value = result.cost;
		cost.placeholder = result.cost;
		cost.addEventListener("change", () => {
			if (cost.value != cost.placeholder){
				AddResultData(result.result_id, "cost", cost.value);
			} else {
				RemoveResultData(result.result_id, "cost")
			}
		});
		cost_container.appendChild(cost);
		info.appendChild(cost_container);

		const comment = document.createElement("textarea");
		comment.classList.add("result-comment-block");
		comment.innerHTML = comment_content;
		comment.placeholder = comment_content;

		comment.addEventListener("change", () => {
			
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