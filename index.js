// Hide price initially
document.getElementById('price-container').style.display = 'none';

const spinner = document.getElementById('spinner');


// ==============================
// Load All Plants
// ==============================
const loadAllPlants = () => {

  spinner.classList.remove('hidden');
  spinner.classList.add('flex');

  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {

      displayTrees(data.plants);

    });

};



// ==============================
// Display Plants
// ==============================
const displayTrees = plants => {

  const plantContainer = document.getElementById('plant-trees');

  plantContainer.innerHTML = "";

  plants.forEach(plant => {

    const shortDescription =
      plant.description.length > 100
        ? plant.description.slice(0, 100) + "..."
        : plant.description;

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="border-gray-400 shadow-md bg-white p-3 rounded-lg h-[400px] flex flex-col">

        <img src="${plant.image}" class="h-[180px] w-full object-cover rounded-md">

        <div class="flex flex-col flex-grow">

           <h1 class="plant-name font-bold cursor-pointer text-green-700 hover:underline">
                ${plant.name}
            </h1>

            <p class="flex-grow text-sm text-gray-600">
                ${shortDescription}
            </p>

            <div class="flex justify-between items-center p-2">

                <h1 class="text-[#15803D] bg-[#DCFCE7] rounded-xl p-2">
                    ${plant.category}
                </h1>

                <h1 class="font-bold">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                    ${plant.price}
                </h1>

            </div>

            <button id="add-${plant.id}" 
            class="btn bg-[#15803D] text-white mt-auto rounded-3xl w-full">
                Add to Cart
            </button>

        </div>

    </div>
    `;

    plantContainer.appendChild(div);


    // Modal click
    div.querySelector('.plant-name')
      .addEventListener('click', () => {
        console.log(plant.id);
        loadPlantDetails(plant.id);

      });


    // Cart click
    div.querySelector(`#add-${plant.id}`)
      .addEventListener('click', () => {

        addToCart(plant);

      });

  });

  spinner.classList.add('hidden');
  spinner.classList.remove('flex');

};



// ==============================
// Load Plant Details
// ==============================
const loadPlantDetails = async (id) => {

  try {

    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);

    const data = await res.json();
    console.log(data);
    if (!data.plants) return;

    displayPlantDetails(data.plants);

  }

  catch (error) {

    console.error("Modal error:", error);

  }

};



// ==============================
// Display Modal
// ==============================
const displayPlantDetails = plant => {

  console.log(plant);
  const container = document.getElementById("details-container");

  container.innerHTML = `
  
    <img src="${plant.image}" class="w-full h-2/3 rounded-lg">

    <h2 class="text-2xl font-bold mt-3">${plant.name}</h2>

    <p class="mt-2">${plant.description}</p>

    <p class="font-semibold text-green-700 mt-2">
      Category: ${plant.category}
    </p>
    <p class="font-bold">
      Price: ৳ ${plant.price}
    </p>

  `;
   console.log(plant);

  document.getElementById("word_modal").showModal();

};



// ==============================
// Load Categories
// ==============================
const loadAllCategories = () => {

  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => displayAllCategories(data.categories));

};



// ==============================
// Display Categories
// ==============================
const displayAllCategories = categories => {

  const container = document.getElementById('all-categories');

  container.innerHTML = "";

  categories.forEach(category => {

    const li = document.createElement('li');

    li.innerHTML = `
      <h3 id="${category.id}" class="text-xl mb-2 p-3 rounded-lg cursor-pointer hover:bg-green-100">
        ${category.category_name}
      </h3>
    `;

    container.appendChild(li);

  });


  container.addEventListener('click', e => {

    const all = document.querySelectorAll('#all-categories h3');

    all.forEach(el => el.classList.remove('bg-[#15803D]', 'text-white'));

    if (e.target.tagName === "H3") {

      e.target.classList.add('bg-[#15803D]', 'text-white');

      loadCategory(e.target.id);

    }

  });

};



// ==============================
// Load Category Plants
// ==============================
const loadCategory = id => {

  spinner.classList.remove('hidden');
  spinner.classList.add('flex');

  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {

      displayTrees(data.plants);

    });

};



// ==============================
// Cart Logic
// ==============================
const addCartContainer = document.getElementById('add-container');
const updatePrice = document.getElementById('update-price');

let totalPrice = 0;


const addToCart = plant => {

  totalPrice += plant.price;

  updatePrice.innerText = totalPrice;

  document.getElementById('price-container').style.display = 'flex';


  let existingItem = document.getElementById(`cart-item-${plant.id}`);


  if (existingItem) {

    const qtyElement = existingItem.querySelector('.quantity');

    let qty = parseInt(qtyElement.innerText);

    qty++;

    qtyElement.innerText = qty;

    return;

  }


  const div = document.createElement('div');

  div.id = `cart-item-${plant.id}`;

  div.className =
    "bg-[#DCFCE7] rounded-xl p-2 mb-2 flex justify-between items-center";


  div.innerHTML = `
    <div>
      <h1 class="font-semibold">${plant.name}</h1>
      <p>৳${plant.price} x <span class="quantity">1</span></p>
    </div>

    <i class="fa-solid fa-circle-xmark text-red-500 cursor-pointer"></i>
  `;


  addCartContainer.appendChild(div);


  div.querySelector('.fa-circle-xmark')
    .addEventListener('click', () => {

      const qty = parseInt(div.querySelector('.quantity').innerText);

      totalPrice -= plant.price * qty;

      updatePrice.innerText = totalPrice;

      div.remove();

      if (totalPrice <= 0) {

        document.getElementById('price-container').style.display = 'none';

      }

    });

};



// ==============================
// Initial Load
// ==============================
loadAllPlants();
loadAllCategories();