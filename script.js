'use strict';

const examplePlant = {
    name: 'Daisy',
    species: 'flower',
    waterSchedule: {
        times: 2,
        per: "day"
    },
 }// Example plant data may not be accurate.
let plants = [];//Array to hold plant entries
plants.push(examplePlant);
function displayPlants(){
    const plantList = document.getElementById('plant-list');
    plantList.innerHTML = "";
    plants.forEach((plant) => {
        const li = document.createElement('li');
        li.innerHTML = `<p>Name: ${plant.name}</p>
        <p>Species: ${plant.species}</p>
        <p id="waterSchedule">WaterSchedule: </p>
        <p id="times">Times: ${plant.waterSchedule.times}</p>
        <p id="per"> Per: ${plant.waterSchedule.per}</p>`;
        plantList.appendChild(li);  
    });
}
loadLocalStorage();
displayPlants();
function addPlant(name, species, waterScheduleTimes, waterSchedulePer){
    const waterSchedule = {
        times: waterScheduleTimes,
        per: waterSchedulePer,
    };
    console.log(name);
    let newPlant = {name, species, waterSchedule};

    plants.push(newPlant);
    let plantsToStore = JSON.stringify(plants);
    localStorage.setItem('plants', plantsToStore);
}
const form = document.getElementById('plant-form');
const form2 = document.getElementById('plant-removal-form');
function addPlantFromForm(e){
    e.preventDefault();
    console.log("added Plant");
    format();
    let nameValue = form.name.value;
    const name = nameValue.charAt(0).toUpperCase() + nameValue.slice(1).toLocaleLowerCase();
    let speciesValue = form.species.value;
    const species = speciesValue.charAt(0).toUpperCase() + speciesValue.slice(1).toLocaleLowerCase();
    const waterScheduleTimes = form.waterTimes.value;
    const waterSchedulePer = form.waterPer.value;
    
    addPlant(name, species, waterScheduleTimes, waterSchedulePer);
    displayPlants();
    form.reset();
}
function format(){
    for(let i = 0; i<plants.length; i++){
        plants[i].name[0].toLocaleUpperCase();
    }
}
function removePlantFromForm(e){
    e.preventDefault();
    let plantToRemove = form2.plantNameToRemove.value;
    for(let i = 0; i<plants.length; i++){
        if (plants[i].name.toLocaleLowerCase()===plantToRemove){
                plants.splice(i, 1);
                let plantsToStore = JSON.stringify(plants);
                localStorage.setItem('plants', plantsToStore);
        } 
    }
    displayPlants();
    form2.reset();
}
form2.addEventListener('submit', removePlantFromForm);
form.addEventListener('submit', addPlantFromForm);
function loadLocalStorage(){
    let plantData = JSON.parse(localStorage.getItem('plants'));
    if(plantData) {
        plants = plantData;
    }    
}