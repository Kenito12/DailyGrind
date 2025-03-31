// import helper functions for crud frontend user experience
import {saveItem, deleteItem, renderItem } from './crud.js';


let currentRecipe //for storing object value as JSON after parse
const listContainer = document.getElementById('listContainer');
const listHeader = document.getElementById('listHeader');

// function to fetch items and render them
const getItems = async () => {
    try { 
        const response = await fetch('/api/items');
        const items = await response.json();
        listContainer.innerHTML = ""; // Clear the list container before rendering new items
        items.forEach(renderItem);
        console.log(items);
        console.log("GetItems runs!")
    } catch (error) {
        console.log(error);
    }
  };


const finishButton = document.getElementById('finishButton');
    
finishButton.addEventListener('click', function() {

    // Prevent default form submission
    // event.preventDefault();
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

//HamburgerMenu
const HamburgerMenuIcon = document.getElementById('menuIcon');
const formMenu = document.getElementById('formMenu');
const DVMenu = document.getElementById('DVMenu');
const menuList = document.getElementById('menu');
const ListMenu = document.getElementById('ListMenu');

// ScreenList
const dashboard = document.getElementById('dashboard');
const formContainer = document.getElementById('formContainer');

gsap.from(HamburgerMenuIcon, {duration: 0.5, opacity: 0, x: 100});
HamburgerMenuIcon.onclick = () => {
    if (menuList.style.display === "block") {
        gsap.fromTo('.menuList', {duration: 0.5, opacity: 1, x: 0,stagger: 0.1},{duration: 0.5,opacity: 0, x: 100,stagger: 0.1,onComplete: () => {
            menuList.style.display = "none";
          }});
    } else {
        menuList.style.display = "block";
        gsap.fromTo('.menuList', {duration: 0.5, opacity: 0, x: 100,stagger: 0.1},{duration: 0.5,opacity: 1, x: 0,stagger: 0.1});
    }
}

HamburgerMenuIcon.onmouseover = () => {
    gsap.fromTo(HamburgerMenuIcon, {duration: 0.5, scale: 1},{duration: 0.5, scale: 0.8});
}
HamburgerMenuIcon.onmouseout = () => {
    gsap.fromTo(HamburgerMenuIcon, {duration: 0.5, scale: 0.8},{duration: 0.5, scale: 1});
}

formMenu.onclick = () => {
    console.log("Form Menu clicked")

    // Hide the dashboard and show the form
    gsap.fromTo(listContainer, {duration: 0.5, opacity: 1, y: 0},{duration: 0.5, opacity: 0, y: -100,
        onComplete: () => {
            listContainer.style.display = "none";
            listHeader.style.display = "none";
    }})
    gsap.fromTo(dashboard, {duration: 0.5, opacity: 1, y: 0},{duration: 0.5, opacity: 0, y: -100,
        onComplete: () => {
            dashboard.style.display = "none";
    }})
    gsap.fromTo(formContainer, {duration: 0.5, opacity: 0, y: 100},{duration: 0.5, opacity: 1, y: 0,
        onComplete: () => {
            if (menuList.style.display === "block") {
                gsap.fromTo('.menuList', {duration: 0.5, opacity: 1, x: 0,stagger: 0.1},{duration: 0.5,opacity: 0, x: 100,stagger: 0.1,onComplete: () => {
                    menuList.style.display = "none";
                  }});
            }
            formContainer.style.display = "block";
    }})
}
DVMenu.onclick = () => {
    console.log("DV Menu clicked")

        // Hide the form and show the dashboard
        gsap.fromTo(listContainer, {duration: 0.5, opacity: 1, y: 0},{duration: 0.5, opacity: 0, y: -100,
            onComplete: () => {
                listContainer.style.display = "none";
                listHeader.style.display = "none";
        }})
        gsap.fromTo(dashboard, {duration: 0.5, opacity: 0, y: -100},{duration: 0.5, opacity: 1, y: 0,
            onComplete: () => {
                if (menuList.style.display === "block") {
                    gsap.fromTo('.menuList', {duration: 0.5, opacity: 1, x: 0,stagger: 0.1},{duration: 0.5,opacity: 0, x: 100,stagger: 0.1,onComplete: () => {
                        menuList.style.display = "none";
                      }});
                }
                dashboard.style.display = "block";
        }})
        gsap.fromTo(formContainer, {duration: 0.5, opacity: 1, y: 0},{duration: 0.5, opacity: 0, y: -100,
            onComplete: () => {
                formContainer.style.display = "none";
        }})
}

ListMenu.onclick = () => {
    getItems(); // Call the function to fetch and render items on page load
    gsap.fromTo(dashboard, {duration: 0.5, opacity: 1, y: 0},{duration: 0.5, opacity: 0, y: -100,
        onComplete: () => {
            dashboard.style.display = "none";
    }})
    gsap.fromTo(listContainer, {duration: 0.5, opacity: 0, y: -100},{duration: 0.5, opacity: 1, y: 0,
        onComplete: () => {
            if (menuList.style.display === "block") {
                gsap.fromTo('.menuList', {duration: 0.5, opacity: 1, x: 0,stagger: 0.1},{duration: 0.5,opacity: 0, x: 100,stagger: 0.1,onComplete: () => {
                    menuList.style.display = "none";
                  }});
            }
            listHeader.style.display = "block";
            listContainer.style.display = "grid";
    }})
    gsap.fromTo(formContainer, {duration: 0.5, opacity: 1, y: 0},{duration: 0.5, opacity: 0, y: -100,
        onComplete: () => {
            formContainer.style.display = "none";
    }})
}

