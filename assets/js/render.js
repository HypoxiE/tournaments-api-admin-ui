import { AddData, RemoveData } from "./format_data.js";

function TextboxListener(type, field, idenfify, key = "value") {
	if (field.value === field.placeholder){
		RemoveData(type, idenfify, key);
	} else if (field.value === "") {
		field.value = field.placeholder
		RemoveData(type, idenfify, key);
	} else {
		if (field.type == "number") {
			AddData(type, idenfify, parseInt(field.value, 10), key);
		} else {
			AddData(type, idenfify, field.value, key);
		}
	}
}

export async function drawTable(tournament) {
	try {

	const nameDiv = document.getElementById("tournament_name");
	nameDiv.innerHTML = `${tournament.name}`;

	const container = document.getElementById("leaderboard");
	container.innerHTML = "";

	tournament.results.forEach(result => {

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
			TextboxListener("results", username, result.result_id, "username");
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
			TextboxListener("results", penalty, result.result_id, "penalty");
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
			TextboxListener("results", cost, result.result_id, "cost");
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
				AddData("results", result.result_id, parseInt(status_select.value, 10), "status");
			} else {
				RemoveData("results", result.result_id, "status");
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
			TextboxListener("results", steamid, result.result_id, "steam_id");
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
			TextboxListener("results", mail, result.result_id, "mail");
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
			if (ip.value === ip.placeholder){
				RemoveData("results", result.result_id, "ip");
			} else if (ip.value === "") {
				ip.value = ip.placeholder
				RemoveData("results", data.result_id);
			} else {
				AddData("results", result.result_id, ip.value, "ip");
			}
		});
		ip_container.appendChild(ip)
		confident_container.appendChild(ip_container)
		confident_info.appendChild(confident_container)
		info.appendChild(confident_info)

		const metadata_container = document.createElement("div")
		const translation_meta = {"comment": "Комментарий", "streams": "Стримы"}
		result.metadata.forEach(data => {
			const metadata_lable = document.createElement("lable");
			metadata_lable.for = data.key + data.metadata_id;
			const lable = translation_meta[data.key] || data.key;
			metadata_lable.innerHTML = lable + ": <br>";
			metadata_container.appendChild(metadata_lable)

			const metadata = document.createElement("textarea");
			metadata.classList.add("result-metadata-block");
			metadata.id = data.key + data.metadata_id
			metadata.spellcheck = false;
			metadata.innerHTML = data.value;
			metadata.placeholder = data.value
			metadata.addEventListener("change", () => {
				TextboxListener("metadata", metadata, data.metadata_id);
			});
			metadata_container.appendChild(metadata)
			metadata_container.appendChild(document.createElement("br"))
		});

		const metric_container = document.createElement("div")
		const translation_metric = {
			"humans": "Людей", 
			"animals": "Животных",
			"mechanoids": "Маханоидов"
		}
		result.metrics.forEach(data => {
			const metric_lable = document.createElement("lable");
			metric_lable.for = data.key + data.metric_id;
			const lable = translation_metric[data.key] || data.key;
			metric_lable.innerHTML = lable + ": <br>";
			metric_container.appendChild(metric_lable)

			const metric = document.createElement("input");
			metric.type = "number";
			metric.classList.add("result-metric-block");
			metric.id = data.key + data.metric_id
			metric.spellcheck = false;
			metric.value = data.value;
			metric.placeholder = data.value;
			metric.addEventListener("change", () => {
				TextboxListener("metrics", metric, data.metric_id);
			});
			metric_container.appendChild(metric)
			metric_container.appendChild(document.createElement("br"))
		});

		block.appendChild(avatar);
		block.appendChild(info);
		block.appendChild(metadata_container);
		block.appendChild(metric_container);
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