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

		const status_select = document.createElement("select");
		status_select.classList.add("status")
		const automatic_blocked_option = document.createElement("option");
		automatic_blocked_option.value = "-2";
		automatic_blocked_option.textContent = "Автоматическая блокировка";
		automatic_blocked_option.disabled = true;
		const not_confirmed_option = document.createElement("option");
		not_confirmed_option.value = "-1";
		not_confirmed_option.textContent = "Заблокировано";
		const default_option = document.createElement("option");
		default_option.value = "1";
		default_option.textContent = "Не проверено";
		const confirmed_option = document.createElement("option");
		confirmed_option.value = "2";
		confirmed_option.textContent = "Проверено";
		status_select.appendChild(confirmed_option)
		status_select.appendChild(default_option)
		status_select.appendChild(not_confirmed_option)
		status_select.appendChild(automatic_blocked_option)
		status_select.value = result.status
		status_select.placeholder = result.status
		status_select.addEventListener("change", () => {
			if (status_select.value != status_select.placeholder){
				AddData("result", result.result_id, parseInt(status_select.value, 10), "status");
			} else {
				RemoveData("result", result.result_id, "status");
			}
		});
		info.appendChild(status_select);

		const confident_info = document.createElement("details");
		const confident_lable = document.createElement("summary");
		confident_lable.classList.add("confident-info");
		confident_lable.innerHTML = "Конфиденциально";
		confident_info.appendChild(confident_lable);
		const confident_container = document.createElement("div");
		confident_container.classList.add("confident-content");

		const steamid_container = document.createElement("span");
		steamid_container.classList.add("steamid");
		steamid_container.innerHTML = "Steam ID: "
		const steamid = document.createElement("input");
		steamid.classList.add("steamid");
		steamid.type = "text";
		steamid.spellcheck = false;
		steamid.value = result.steam_id;
		steamid.placeholder = result.steam_id;
		steamid.addEventListener("change", () => {
			if (steamid.value != steamid.placeholder){
				AddData("result", result.result_id, steamid.value, "steam_id");
			} else {
				RemoveData("result", result.result_id, "steam_id");
			}
		});
		steamid_container.appendChild(steamid)
		confident_container.appendChild(steamid_container)

		confident_container.appendChild(document.createElement("br"));

		const mail_container = document.createElement("span");
		mail_container.classList.add("mail");
		mail_container.innerHTML = "Способы связи:<br>"
		const mail = document.createElement("textarea");
		mail.classList.add("mail");
		mail.spellcheck = false;
		mail.value = result.mail;
		mail.placeholder = result.mail;
		mail.addEventListener("change", () => {
			if (mail.value != mail.placeholder){
				AddData("result", result.result_id, mail.value, "mail");
			} else {
				RemoveData("result", result.result_id, "mail");
			}
		});
		mail_container.appendChild(mail)
		confident_container.appendChild(mail_container)

		confident_container.appendChild(document.createElement("br"));

		const ip_container = document.createElement("span");
		ip_container.classList.add("ip");
		ip_container.innerHTML = "IP: "
		const ip = document.createElement("input");
		ip.classList.add("ip");
		ip.type = "text";
		ip.spellcheck = false;
		ip.value = result.ip;
		ip.placeholder = result.ip;
		ip.addEventListener("change", () => {
			if (ip.value != ip.placeholder){
				AddData("result", result.result_id, ip.value, "ip");
			} else {
				RemoveData("result", result.result_id, "ip");
			}
		});
		ip_container.appendChild(ip)
		confident_container.appendChild(ip_container)
		confident_info.appendChild(confident_container)
		info.appendChild(confident_info)


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