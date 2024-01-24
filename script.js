'use strict';
 const examplePlant = {
    name: 'Daisy',
    species: 'flower',
    waterSchedule: {
        times: 2,
        per: "day"
    },
 }// Example plant data may not be accurate.
 const plants = [];
plants.push(examplePlant);
function displayPlants(){
    const plantList = document.getElementById('plant-list');
    plantList.innerHTML = "";
    plants.forEach((plant) => {
        const li = document.createElement('li');
        li.innerHTML = `<p>Name: ${plant.name}</p>
        <p>Name: ${plant.species}</p>
        <p>WaterSchedule: Times: ${plant.waterSchedule.times} Per: ${plant.waterSchedule.per}</p>`;
        plantList.appendChild(li);  
    });
}
displayPlants();
function addPlant(name, species, waterScheduleTimes, waterSchedulePer){
    const waterSchedule = {
        times: waterScheduleTimes,
        per: waterSchedulePer,
    };
    const newPlant = {name, species, waterSchedule};
    plants.push(newPlant);
}
const form = document.getElementById('plant-form');
function addPlantFromForm(e){
    e.preventDefault();
    const name = form.name.value;
    const species = form.species.value;
    const waterScheduleTimes = form.waterTimes.value;
    const waterSchedulePer = form.waterPer.value;
    addPlant(name, species, waterScheduleTimes, waterSchedulePer);
    displayPlants();
    form.reset();
}
function removePlant(plantIndex){    
    plants.slice(plantIndex);
    displayPlants();
}
function removePlantFromForm(e){
    e.preventDefault();
    let numberToRemove = form2.numberToRemove.value;
    numberToRemove -= 1;
    if (numberToRemove<=plants.length){
        removePlant(numberToRemove);
        displayPlants();
    } else {
        window.alert("No plant at that number. Plant numbers start at 1. Please choose a number equal to the plant you want to remove.")
    }
    form2.reset();
}
const form2 = document.getElementById('plantRemoval');
form2.addEventListener('submit', removePlantFromForm);
form.addEventListener('submit', addPlantFromForm);
