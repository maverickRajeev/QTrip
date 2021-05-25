
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
   let params = new URLSearchParams(search);
   return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try{
    let response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    let result = await response.json();
    return result;
   }
   catch(err){
     return null;
   }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  adventures.forEach((item) =>{
               let container1 = document.createElement('div');
               container1.className = "col-6 col-lg-3 mb-4" ;
               let innerHtml = `<a id=${item.id} href="detail/?adventure=${item.id}">
                                    <div class="category-banner">
                                       ${item.category}
                                    </div>
                                    <div class="activity-card">
                                    <img src="${item.image}">
                                     <div class = "d-flex justify-content-between p-3 flex-wrap" style = "width:100%;">
                                         <div style = "font-size:1.2rem;">${item.name}</div> <div>₹${item.costPerHead}</div>
                                     </div>
                                     <div class = "d-flex justify-content-between p-3 flex-wrap" style = "width:100%;">
                                        <div style = "font-size:1.2rem;">Duration</div> <div>${item.duration} Hours</div>
                                     </div>
                                    </div>
                                </a>`
               container1.innerHTML = innerHtml;
               document.getElementById('data').appendChild(container1);
  

  });
  
  document.getElementById("addnew").href = `${config.backendEndpoint}` + '/adventures/new' ;
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
    low = parseInt(low);
    high = parseInt(high);

   let filteredList = list.filter( (item) => {
        for(var i = low+1; i<=high;i++){
           if(item.duration === i)
              return true;
        }
   });
  
   return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  let filteredList = list.filter((item) => {
    return categoryList.includes(item.category);
   });

      return filteredList;
 }
// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
    
     let strDuration = filters.duration;
     let low,high;
     if(strDuration !== ""){
          let indexHyphen = strDuration.indexOf("-");
          low = strDuration.slice(0,indexHyphen);
          high = strDuration.slice(indexHyphen+1);
     }

      if(filters.duration === "" && filters.category.length > 0)
         return filterByCategory(list,filters.category);
      else if(filters.duration !== "" && filters.category.length === 0)
         {
           return filterByDuration(list,low,high);
         }
      else if(filters.duration !== "" && filters.category.length > 0)
         {   
             let filteredCategoryList = filterByCategory(list,filters.category);

             return filterByDuration(filteredCategoryList,low,high); 
         }
      else
         return list;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
     let strFilter = JSON.stringify(filters);
     window.localStorage.setItem('filters', strFilter);
     return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
    let getFilter = JSON.parse(window.localStorage.getItem('filters'));

    if(getFilter !== null)
        return getFilter;
    else
        return null;
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM


function generateFilterPillsAndUpdateDOM(filters){
  filters.category.forEach((item) => {
  let filterpills = document.createElement('div');
  filterpills.className = "category-filter";
  filterpills.id = `${item}`;
  filterpills.innerHTML = `${item}&nbsp;&nbsp`;
  document.getElementById('category-list').appendChild(filterpills);
  
  let closebtn = document.createElement('button');
  closebtn.id = `${item}`;
  closebtn.className = "close"; 
  closebtn.innerHTML = "&times;";
  document.getElementById(`${item}`).appendChild(closebtn);
  
});

}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
