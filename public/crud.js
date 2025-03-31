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

// Template of the Cardlist
const template = (data) => DOMPurify.sanitize(`
        <div class="tab">
            <h2>${data.BeansName}</h2>
            <h3>${data.GrinderName}</h3>
            <h3>${data.GrindSize.$numberDecimal}</h3>
            <h3>${data.BrewtimeSec}</h3>
            <h3>${data.YieldVolume.$numberDecimal}</h3>
            <h3>${data.Dose.$numberDecimal}</h3>
            <h3>${data.Taste}</h3>
            <h3>${data.RoastLevel}</h3>
            <h3>${data.Date}</h3>
            <h3>${data.Username}</h3>
        </div>
        <button class="delete detailclass baloo-da-2-bold" type="button">Delete</button>
        <br>
`);

// Render Card
const renderItem = (data) => {

        const div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('data-id', data._id);
        div.innerHTML = template(data);
        div.querySelector('.delete').onclick = () =>{
            deleteItem(data._id)
            gsap.to(div,{opacity:0, x:200, duration:0.5})
            setTimeout(() => {
                document.querySelector(`[data-id="${data._id}"]`).remove(); // Remove from DOM
            },500)
        };
        listContainer.prepend(div);
        div.onmouseover = () =>{
            gsap.to(div, {x:20})
        }
        div.onmouseout = () =>{
            gsap.to(div, {x:0})
        }

};



// Export functions for use in other modules
// export { getFormData, validateItem, saveItem, renderItem, deleteItem };
export {saveItem, deleteItem, renderItem };
