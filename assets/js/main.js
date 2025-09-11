import { getResults, sendData } from './api.js'
import { drawTable, cutResults } from './render.js';
import { newError } from './funcs.js';
import { Init } from './format_data.js';

Init()

async function main() {
	let tournament;
	try {
		tournament = await getResults();
	} catch (err) {
		if (err.message == "Failed to fetch") {
			newError("Не удалось связаться с сервером. Попробуйте позже.");
		} else {
			newError(err.message);
		}
		return
	}

	console.log(tournament)

	if (tournament.results.length == 0) {
		newError("Пока результатов нет.");
		return
	}

	let readyTournamentData = tournament;
	await drawTable(readyTournamentData);

	const save_button = document.getElementById("save-button");
	save_button.addEventListener("click",async () => {
		try {
			await sendData();
			setTimeout(async () => {
				await main();
			}, 500);
		} catch (err) {
			console.error("Ошибка:", err);
		}
	});
}

main()