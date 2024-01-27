"use strict";

const examplePlant = {
	name: "Daisy",
	species: "flower",
	waterSchedule: {
		times: 2,
		per: "day",
	},
}; // Example plant data may not be accurate.
let plants = []; //Array to hold plant entries

plants.push(examplePlant);

let n = 2; //Number to track clicks on name for sorting
let s = 2; //Number to track clicks on species for sorting

const form = document.getElementById("plant-form");
const form2 = document.getElementById("plant-removal-form");
const sortNameBtn = document.getElementById("sort-name");
const sortSpeciesBtn = document.getElementById("sort-species");
sortSpeciesBtn.onclick = sortBySpecies;
sortNameBtn.onclick = sortByName;
form2.onsubmit = removePlantFromForm;
form.onsubmit = addPlantFromForm;

loadLocalStorage();
displayPlants();
function sortBySpecies() {
	if (s % 2 === 0) {
		plants.sort((a, b) => {
			if (a.species < b.species) {
				return -1;
			}
			if (a.species > b.species) {
				return 1;
			}
			return 0;
		});
	} else {
		plants.sort((a, b) => {
			if (a.species > b.species) {
				return -1;
			}
			if (a.species < b.species) {
				return 1;
			}
			return 0;
		});
	}
	displayPlants();
	s++;
}
function sortByName() {
	if (n % 2 === 0) {
		plants.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});
	} else {
		plants.sort((a, b) => {
			if (a.name > b.name) {
				return -1;
			}
			if (a.name < b.name) {
				return 1;
			}
			return 0;
		});
	}
	displayPlants();
	n++;
}
function displayPlants() {
	let plantsToStore = JSON.stringify(plants);
	localStorage.setItem("plants", plantsToStore);
	const plantList = document.getElementById("plant-list");
	plantList.innerHTML = "";
	plants.forEach((plant) => {
		const li = document.createElement("li");
		let timer = "times";
		if (plant.waterSchedule.times === "1") {
			timer = "time";
		}

		li.innerHTML = `<p>Name: ${plant.name}</p>
        <p>Species: ${plant.species}</p>
        <p id="waterSchedule">WaterSchedule: </p>
        <p id="times"> ${plant.waterSchedule.times} ${timer}
        per ${plant.waterSchedule.per}</p>`;
		plantList.appendChild(li);
	});
}

function addPlant(name, species, waterScheduleTimes, waterSchedulePer) {
	const waterSchedule = {
		times: waterScheduleTimes,
		per: waterSchedulePer,
	};
	console.log(name);
	let newPlant = { name, species, waterSchedule };
	plants.push(newPlant);
}

function addPlantFromForm(e) {
	e.preventDefault();
	console.log("added Plant");
	let nameValue = form.name.value;
	const name =
		nameValue.charAt(0).toUpperCase() + nameValue.slice(1).toLocaleLowerCase();
	let speciesValue = form.species.value;
	const species =
		speciesValue.charAt(0).toUpperCase() +
		speciesValue.slice(1).toLocaleLowerCase();
	const waterScheduleTimes = form.waterTimes.value;
	const waterSchedulePer = form.waterPer.value;
	if (
		nameValue.trim() === "" ||
		waterScheduleTimes.trim() === "" ||
		species.trim() === ""
	) {
		window.alert("All fields must be filled");
	} else if (nameValue.length < 3) {
		window.alert("Name must be 3 or more.");
	} else if (speciesValue.length < 3) {
		window.alert("Species must be 3 or more.");
	} else if (waterScheduleTimes < 1 || waterScheduleTimes > 6) {
		window.alert("Number must be between 1 and 6.");
	} else {
		addPlant(name, species, waterScheduleTimes, waterSchedulePer);
		displayPlants();
		form.reset();
	}
}
function removePlantFromForm(e) {
	e.preventDefault();
	let plantToRemove = form2.plantNameToRemove.value.toLocaleLowerCase();
	for (let i = 0; i < plants.length; i++) {
		if (plants[i].name.toLocaleLowerCase() === plantToRemove) {
			plants.splice(i, 1);
			let plantsToStore = JSON.stringify(plants);
			localStorage.setItem("plants", plantsToStore);
		} else if (
			i === plants.length - 1 &&
			plants[i].name.toLocaleLowerCase() !== plantToRemove
		) {
			window.alert("Plant not listed");
		}
	}
	form2.reset();
	displayPlants();
}

function loadLocalStorage() {
	let plantData = JSON.parse(localStorage.getItem("plants"));
	if (plantData) {
		plants = plantData;
	}
}
