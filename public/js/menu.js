let dishes = [];

// Fetch menu JSON
fetch('/data/menu.json')
    .then(response => response.json())
    .then(data => {
        dishes = data.dishes;
        renderGallery(); // render once data is loaded
    })
    .catch(error => console.error("Error loading menu:", error));

// Render gallery function
function renderGallery(dishList = dishes){
    const gallery = document.getElementById("product-gallery");
    gallery.innerHTML = ""; // refresh the gallery

    if(dishList.length === 0){
        const p = document.createElement("p");
        p.textContent = "No dishes to display.";
        gallery.appendChild(p);
        return;
    }

    dishList.forEach(dish => {
        const dishItem = document.createElement("div");
        dishItem.className = "dish-item";

        // Image
        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;
        dishItem.appendChild(img);

        // Name
        const h3 = document.createElement("h3");
        h3.textContent = dish.name;
        dishItem.appendChild(h3);

        // Price
        const price = document.createElement("p");
        price.textContent = dish.price;
        dishItem.appendChild(price);

        // Description
        const desc = document.createElement("p");
        desc.textContent = dish.desc;
        dishItem.appendChild(desc);

        gallery.appendChild(dishItem);
    });
}

// Search function
function searchDishes(){
    const search = document.getElementById("search").value.trim();
    const regex = new RegExp(search, "i"); // case-insensitive

    if(search === ""){
        renderGallery(); // show all dishes
        return;
    }

    const results = dishes.filter(dish => regex.test(dish.name));

    renderGallery(results);
}
