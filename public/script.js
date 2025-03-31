// import helper functions for crud frontend user experience
import {saveItem, deleteItem, renderItem } from './crud.js';


let currentRecipe //for storing object value as JSON after parse

// function to fetch items and render them
const getItems = async () => {
    try { 
        const response = await fetch('/api/items');
        const items = await response.json(); 
        items.forEach(renderItem);
        console.log(items);
        console.log("GetItems runs!")
    } catch (error) {
        console.log(error);
    }
  };


const finishButton = document.getElementById('finishButton');
    
finishButton.addEventListener('click', function() {
    // Get all form inputs
    const beansName = document.getElementById('beansName').value.trim();
    const grinderName = document.getElementById('grinderName').value.trim();
    const grindSize = document.getElementById('grindSize').value.trim();
    const brewtimeSec = document.getElementById('brewtimeSec').value.trim();
    const yieldVolume = document.getElementById('yieldVolume').value.trim();
    const dose = document.getElementById('dose').value.trim();
        
    // Get selected taste rating
    const tasteRating = document.querySelector('input[name="taste"]:checked');
        
    // Get selected roast level
    const roastLevel = document.querySelector('input[name="roastLevel"]:checked');
        
    // Check if all inputs are filled
    if (!beansName || !grinderName || !grindSize || !brewtimeSec || 
        !yieldVolume || !dose || !tasteRating || !roastLevel) {
        alert('Please fill in all fields before submitting.');
        return;
        }
        
    // Collect all data into an object
    const brewingData = {
        beansName: beansName,
        grinderName: grinderName,
        grindSize: parseFloat(grindSize),
        brewtimeSec: parseFloat(brewtimeSec),
        yieldVolume: parseFloat(yieldVolume),
        dose: parseFloat(dose),
        taste: parseInt(tasteRating.value),
        roastLevel: roastLevel.value,
        timestamp: new Date().toISOString()
    };
        
    // Log the collected data 
    console.log('Brewing Data:', brewingData);
    // Format the data for saveing it to the API
    formatData(brewingData);
    // Optional: Show confirmation to user
    alert('Form submitted successfully!');

    // push the json object to the database
    saveItem(currentRecipe)
});


// function to format the keyvalue from api
const formatData = (data) => {
    let jsonObject = `{
    "_id":"",
    "BeansName":"${data.beansName}",
    "GrinderName":"${data.grinderName}",
    "GrindSize":"${data.grindSize}",
    "BrewtimeSec":"${data.brewtimeSec}",
    "YieldVolume":"${data.yieldVolume}",
    "Dose":"${data.dose}",
    "Taste":"${data.taste}",
    "RoastLevel":"${data.roastLevel}",
    "Date":"${data.timestamp}",
    "Username":"Ken"
    }
    ` 
    currentRecipe = JSON.parse(jsonObject)
    console.log(currentRecipe)
  }