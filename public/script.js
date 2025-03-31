// import helper functions for crud frontend user experience
import {saveItem, deleteItem, renderItem } from './crud.js';


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
        
    // Log the collected data (you can modify this to save or send the data)
    console.log('Brewing Data:', brewingData);
        
    // Optional: Show confirmation to user
    alert('Form submitted successfully!');
});


// function to format the keyvalue from api
const formatData = (foodTitle, protein, cals) => {
    let jsonObject = `{
    "_id":"",
    "foodTitle":"${foodTitle}",
    "searchQuery":"${searchInput.value}",
    "protein":"${protein}",
    "calories":"${cals}",
    "username":"${userName}"
  }
    ` 
  
    currentIngr = JSON.parse(jsonObject)
    console.log(currentIngr)
  }