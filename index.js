document.getElementById('all-tree')
  .addEventListener('click', () => {
    fetch("https://openapi.programming-hero.com/api/plants")
      .then(res => res.json())
      .then(json => {
        const plants = json.plants;
       const plantContainer=document.getElementById('plant-trees');
        plants.forEach(plant => {
          const div =document.createElement('div');
          div.innerHTML=`
<div class="border-gray-400 shadow-md bg-white p-2 rounded-lg h-[400px] flex flex-col">
  <img src="${plant.image}" alt="" class="h-45 w-full object-cover rounded-md">
  <div class="">
  <h1 class="font-bold">${plant.name}</h1>
  <p class="flex-grow">${plant.description}</p>
  <div class="flex justify-between items-center p-2">
    <h1 class="text-[#15803D] bg-[#DCFCE7] rounded-xl p-2">${plant.category}</h1>
    <h1 class="font-bold">
      <i class="fa-sharp fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
    </h1>
  </div>
  <a class="btn bg-[#15803D] text-white mt-2 rounded-3xl w-full">Add to Cart</a>
  </div>
</div>

          `
          plantContainer.appendChild(div);
        })
      })
  })