import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  try{
  let response = await fetch(config.backendEndpoint + '/reservations/');
  response = await response.json();
  return response;
  }

  catch(err){
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
     reservations.forEach((reserve) => {
         let row = document.createElement('tr');

         let nDate = new Date(reserve.date); //reserve.date is in string format,so convert it to date format.
         let bookedDate = nDate.toLocaleDateString('en-IN');

         let nTime = new Date(reserve.time);
         let options = {day:'numeric',month:'long',year:'numeric'};
         let bookingTime =  nTime.toLocaleDateString('en-IN',options) + ', ' + nTime.toLocaleTimeString("en-IN");
         row.innerHTML = `<td>${reserve.id}</td>
         <td>${reserve.name}</td>
         <td>${reserve.adventureName}</td>
         <td>${reserve.person}</td>
         <td>${bookedDate}</td>
         <td>${reserve.price}</td>
         <td>${bookingTime}</td> 
         <td class = "reservation-visit-button" id = "${reserve.id}"><a href="../detail/?adventure=${reserve.adventure}">Visit Adventure</a></td>`;
         document.getElementById("reservation-table").appendChild(row);
     });
  //Conditionally render the no-reservation-banner and reservation-table-parent
    if(reservations.length === 0)
     {
         document.getElementById("no-reservation-banner").style.display = "block";
         document.getElementById("reservation-table-parent").style.display = "none";
    
     }
    else{
      document.getElementById("no-reservation-banner").style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";
    }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  */

}

export { fetchReservations, addReservationToTable };
