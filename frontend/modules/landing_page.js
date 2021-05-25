import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
   try{
    let response =  await fetch(config.backendEndpoint + '/cities');
    let result = await response.json();
    return result;
   }
   catch(err){
     return null;
   }  
 
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

    let container1 = document.createElement('div');
    container1.className = "col-6 col-lg-3 mb-4";
    let innerHTML1 = ` <a id = ${id} href = "pages/adventures/?city=${id}">
                        <div class = "tile">
                        <div class="tile-text mb-3">
                            <center>${city}</center> 
                            <center>${description}</center>
                        </div> 
                        <img src = "${image}">
                      </div>
                      </a>`;
    container1.innerHTML = innerHTML1;
    document.getElementById('data').appendChild(container1);
}

export { init, fetchCities, addCityToDOM };
