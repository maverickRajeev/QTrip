import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  let params = new URLSearchParams(search);
  return (params.get('adventure'));
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try{
  let response = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
  let adventureDetails = await response.json();
  
  return adventureDetails;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  document.getElementById('adventure-name').innerHTML = `${adventure.name}`;
  document.getElementById('adventure-subtitle').innerHTML = `${adventure.subtitle}`;
  
  adventure.images.forEach(element => {
    let container = document.createElement('div');
    container.innerHTML = `<img src = "${element}" class = "activity-card-image">`;
    document.getElementById('photo-gallery').appendChild(container);
  });

  document.getElementById('adventure-content').innerHTML = `${adventure.content}`;
    
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  document.getElementById('photo-gallery').innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
  
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
  </a>
</div>`;

  images.forEach(element => {
    let container = document.createElement('div');
    container.className = "carousel-item";
    container.innerHTML = `<img src = "${element}" class = "activity-card-image">`;
    document.querySelector(".carousel-inner").appendChild(container);
  });

  document.querySelector(".carousel-inner").firstElementChild.className += " active";
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
     if(adventure.available === true)
     {
        document.getElementById("reservation-panel-sold-out").style.display = "none";
        document.getElementById("reservation-panel-available").style.display = "block";
        document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
     }
     else{
      document.getElementById("reservation-panel-available").style.display = "none";
      document.getElementById("reservation-panel-sold-out").style.display = "block";
     }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {

    document.getElementById('reservation-cost').innerHTML = persons * adventure.costPerHead;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  $("#myForm").on("submit", function (event) {
    //prevent Default functionality
    event.preventDefault();
    var data = $(this).serialize() + "&adventure=" + adventure.id;
    let url = config.backendEndpoint + "/reservations/new";
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function () {
        alert("Success!");
        window.location.reload();
      },
      error: function () {
        alert("Failed!");
      },
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure){
  if(adventure.reserved === true)
  {
     document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
