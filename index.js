//load All  Tree
const loadAllPlants = () => {
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
              <a id="${plant.id}" class="btn bg-[#15803D] text-white mt-auto rounded-3xl w-full">Add to Cart</a>
          </div>
    </div>
          `
    plantContainer.appendChild(div);

  });
};
loadAllPlants();
document.getElementById('all-plants')
  .addEventListener('click', (e) => {
    const allh3 = document.querySelectorAll('h3');
    allh3.forEach(h3 => {
      h3.classList.remove('bg-[#15803D]');
    });
    e.target.classList.add('bg-[#15803D]');
    loadAllPlants();
  });

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
    <h3 id="${category.id}" class="text-xl mb-2">${category.category_name}</h3>
    `
    categoryContainer.appendChild(li);
    // loadCategory(category.id);
    // console.log(category.category_name)
  });
  categoryContainer.addEventListener('click', e => {
    const allH3 = document.querySelectorAll('h3');
    allH3.forEach(h3 => {
      h3.classList.remove('bg-[#15803D]');
    });
    if (e.target.localName === 'h3') {
      //console.log(e.target.id);
      e.target.classList.add('bg-[#15803D]');
      loadCategory(e.target.id);
    }
  });
};
loadAllCategories(); const loadCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(json => displayCategory(json.plants));
};

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
           <a id="${plant.id}" class="btn bg-[#15803D] text-white mt-auto rounded-3xl w-full">Add to Cart</a>
       </div>
 </div>
       `
    plantContainer.appendChild(div);
  })
}

//Add cart functionality

const displayAddCart = (plants) => {
  const addCartContainer = document.getElementById('add-container');
  addCartContainer.innerHTML = "";
  let totalPrice = 0;
  plants.forEach((plant) => {
    const plantName = plant.name;
    const id = plant.id;
    let price = plant.price;

    document.getElementById(id)
      .addEventListener('click', (e) => {
        totalPrice = totalPrice + price;
        console.log(totalPrice);
        const div = document.createElement('div');
        div.innerHTML = `
      <div>
         <div class="bg-[#DCFCE7] rounded-xl p-2 mb-2">
           <h1 class="text-md font-semibold">${plantName}</h1>
           <h1>৳${plant.price} x 1</h1>
         </div>
         <div class="flex justify-between my-3">
           <h1 class="text-xl font-semibold">Total</h1>
           <h1 class="text-xl ">:${totalPrice}</h1>
         </div>
      </div>
            `
        // console.log(e.target);
        addCartContainer.appendChild(div);


      })
  })
};
