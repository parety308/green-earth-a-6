//load All  Tree
document.getElementById('price-container').style.display = 'none';
const spinner = document.getElementById('spinner');
const loadAllPlants = () => {
    spinner.classList.remove('hidden'); // show spinner
      spinner.classList.add('flex'); // show spinner
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(json => {
      displayTrees(json.plants);
      displayAddCart(json.plants);
    });
};

//Display All Trees 
const displayTrees = plants => {
  const plantContainer = document.getElementById('plant-trees');
  plantContainer.innerHTML = "";
  plants.forEach(plant => {
    const div = document.createElement('div');
    div.innerHTML += `
    <div class="border-gray-400 shadow-md bg-white p-3 rounded-lg h-[450px] flex flex-col">
          <img src="${plant.image}" alt="" class="h-45 w-full object-cover rounded-md">     
          <div class="flex flex-col flex-grow">
              <h1 class="font-bold">${plant.name}</h1>
              <p class="flex-grow">${plant.description}</p>
              <div class="flex justify-between items-center p-2">
                  <h1 class="text-[#15803D] bg-[#DCFCE7] rounded-xl p-2">${plant.category}</h1>
                  <h1 class="font-bold"><i class="fa-sharp fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</h1>
              </div>     
                <!-- Button at bottom -->
              <a id="add-${plant.id}" class="btn bg-[#15803D] text-white mt-auto rounded-3xl w-full">Add to Cart</a>
          </div>
    </div>
          `
    plantContainer.appendChild(div);
    spinner.classList.add('hidden');
    spinner.classList.remove('flex');

  });
};
loadAllPlants();
//load all categories
const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayAllCategories(json.categories));
};

//display all categories
const displayAllCategories = categories => {
  const categoryContainer = document.getElementById('all-categories');
  categoryContainer.innerHTML = "";
  categories.forEach(category => {
    const li = document.createElement('li');
    li.innerHTML += `
    <h3 id="${category.id}" class="text-xl mb-2 p-3 rounded-lg">${category.category_name}</h3>
    `
    categoryContainer.appendChild(li);
  });
  categoryContainer.addEventListener('click', e => {
    const allH3 = document.querySelectorAll('h3');
    allH3.forEach(h3 => {
      h3.classList.remove('bg-[#15803D]');
    });
    if (e.target.localName === 'h3') {
      e.target.classList.add('bg-[#15803D]');
      loadCategory(e.target.id);
    }
  });
};
loadAllCategories();
const loadCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(json => displayCategory(json.plants));
};
//display categories::
const displayCategory = (plants) => {
  const plantContainer = document.getElementById('plant-trees');
  plantContainer.innerHTML = "";
  plants.forEach(plant => {
    const div = document.createElement('div');
    div.innerHTML += `
 <div class="border-gray-400 shadow-md bg-white p-3 rounded-lg h-[450px] flex flex-col">
       <img src="${plant.image}" alt="" class="h-45 w-full object-cover rounded-md">     
       <div class="flex flex-col flex-grow">
           <h1 class="font-bold">${plant.name}</h1>
           <p class="flex-grow">${plant.description}</p>
           <div class="flex justify-between items-center p-2">
               <h1 class="text-[#15803D] bg-[#DCFCE7] rounded-xl p-2">${plant.category}</h1>
               <h1 class="font-bold"><i class="fa-sharp fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</h1>
           </div>     
             <!-- Button at bottom -->
           <a id="add-${plant.id}" class="btn bg-[#15803D] text-white mt-auto rounded-3xl w-full">Add to Cart</a>
       </div>
 </div>
       `

    plantContainer.appendChild(div);
  })
  displayAddCart(plants);
}

//Add cart functionality
const addCartContainer = document.getElementById('add-container');
const updatePrice = document.getElementById('update-price');
updatePrice.innerHTML = "";
addCartContainer.innerHTML = "";
let totalPrice = 0;

const displayAddCart = (plants) => {
  plants.forEach((plant) => {
    const id = `add-${plant.id}`;
    document.getElementById(id)
      .addEventListener('click', () => {
        let price = plant.price;
        totalPrice += price;
        updatePrice.innerHTML = `<h1 class="text-xl ">${totalPrice}</h1>`;
        document.getElementById('price-container').style.display = 'flex';

        let existingItem = document.getElementById(`cart-item-${plant.id}`);

        if (existingItem) {
          let qtyElement = existingItem.querySelector('.quantity');
          let qty = parseInt(qtyElement.innerText);
          qty++;
          qtyElement.innerText = qty;
          let lineTotalElement = existingItem.querySelector('.line-total');
          lineTotalElement.innerHTML = `৳${plant.price} x <span class="quantity">${qty}</span>`;
        } else {
          const div = document.createElement('div');
          div.id = `cart-item-${plant.id}`;
          div.classList.add("bg-[#DCFCE7]", "rounded-xl", "p-2", "mb-2", "flex", "justify-between");

          div.innerHTML = `
            <div>
              <h1 class="text-md font-semibold">${plant.name}</h1>
              <h1 class="line-total">৳${plant.price} x <span class="quantity">1</span></h1>
            </div>
            <div class="flex justify-center items-center">
              <i class="fa-solid fa-circle-xmark cursor-pointer text-red-500"></i>
            </div>
          `;
          addCartContainer.appendChild(div);

          const removePlant = div.querySelector('.fa-circle-xmark');
          removePlant.addEventListener('click', () => {
            let qty = parseInt(div.querySelector('.quantity').innerText);
            totalPrice -= plant.price * qty;
            div.remove();
            updatePrice.innerHTML = `<h1 class="text-xl ">${totalPrice}</h1>`;
            if (totalPrice <= 0) {
              document.getElementById('price-container').style.display = 'none';
            }
          });
        }
      });
  });
};
