//Save Item
const saveItem = async (data) => {
    console.log(data)
    //If data has id access to the existing data if not add new
    const endpoint = data._id ? `/api/item/${data._id}` : '/api/item/';
    const options = {
        method: data._id ? "PUT" : "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }; 
    try {
        const response = await fetch(endpoint, options);
        const updatedItem = await response.json();
        // renderItem(updatedItem);
    } catch (error) {
        console.log(error);
    }
};

// Delete item.
const deleteItem = async (id) => {
    const endpoint = `/api/item/${id}`;
    const options = {method: "DELETE"}; 
    try {
        const response = await fetch(endpoint, options);
        const result = await response.json();
    } catch (error) {
        console.log(error);
    }
};


// Render Card
const renderItem = (data) => {

    // Format date
    const brewDate = new Date(data.Date);
    const formattedDate = brewDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    // Calculate ratio
    const ratio = (data.YieldVolume.$numberDecimal / data.Dose.$numberDecimal).toFixed(1);

    // Generate stars HTML
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= data.Taste) {
            starsHTML += '<span class="star">★</span>';
        } else {
            starsHTML += '<span class="star empty-star">★</span>';
        }
    }

    // Template of the Cardlist
const template = (data) => DOMPurify.sanitize(`
    <div class="card-header">
        <h2 class="card-title">${data.BeansName}</h2>
        <p class="card-subtitle">${data.RoastLevel} Roast</p>
        <div class="card-date">${formattedDate}</div>
    </div>
    <div class="card-body">
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Grinder</div>
                <div class="info-value">${data.GrinderName}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Grind Size</div>
                <div class="info-value">${data.GrindSize.$numberDecimal}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Dose</div>
                <div class="info-value">${data.Dose.$numberDecimal}g</div>
            </div>
            <div class="info-item">
                <div class="info-label">Yield</div>
                <div class="info-value">${data.YieldVolume.$numberDecimal}ml</div>
            </div>
            <div class="info-item">
                <div class="info-label">Brew Time</div>
                <div class="info-value">${data.BrewtimeSec}s</div>
            </div>
            <div class="info-item">
                <div class="info-label">Ratio</div>
                <div class="info-value">1:${ratio}</div>
            </div>
            <div class="info-item taste-rating">
                <div class="info-label">Taste Rating</div>
                <div class="stars">
                    ${starsHTML}
                </div>
                <button class="delete-btn" data-id="${data.id}">
                    <svg class="delete-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    </div>
`);


        const div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('data-id', data._id);
        div.innerHTML = template(data);
        div.querySelector('.delete-btn').onclick = () =>{
            deleteItem(data._id)
            gsap.to(div,{opacity:0, x:200, duration:0.5})
            setTimeout(() => {
                document.querySelector(`[data-id="${data._id}"]`).remove(); // Remove from DOM
            },500)
        };
        listContainer.prepend(div);
};



// Export functions for use in other modules
// export { getFormData, validateItem, saveItem, renderItem, deleteItem };
export {saveItem, deleteItem, renderItem };
