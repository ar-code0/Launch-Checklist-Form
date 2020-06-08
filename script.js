// Write your JavaScript code here!
window.addEventListener("load", () => {

   //-------------------------------------------------------------------------------------------------------   

   let submitButton = document.getElementById("formSubmit");
   submitButton.addEventListener("click", (event) => {
   
      // The Variables -----------------------------------------------------------------     
      let inputs = {
         pilotNameInput: document.querySelector("input[name=pilotName]").value,
         copilotNameInput: document.querySelector("input[name=copilotName]").value,
         fuelLevelInput: document.querySelector("input[name=fuelLevel]").value,
         cargoMassInput: document.querySelector("input[name=cargoMass]").value,
      }
      
      let htmlElements = {
         launchStatusCheckDiv: document.getElementById("launchStatusCheck"),
         launchStatus: document.getElementById("launchStatus"),
         faultyItems: document.getElementById("faultyItems"),
         pilotStatus: document.getElementById("pilotStatus"),
         copilotStatus: document.getElementById("copilotStatus"),
         fuelStatus: document.getElementById("fuelStatus"),
         cargoStatus: document.getElementById("cargoStatus"),
         missionTarget: document.getElementById("missionTarget")
      };

   // The Functions -------------------------------------------------------------------
      //This function resets the launchStatusCheck div.--------------------------------
      retrieveDefault = () => {
         htmlElements.launchStatusCheckDiv.innerHTML = 
         `<h2 id="launchStatus">Awaiting Information Before Launch</h2>
         <div  id="faultyItems">
               <ol>
                  <li id="pilotStatus">Pilot Ready</li>
                  <li id="copilotStatus">Co-pilot Ready</li>
                  <li id="fuelStatus">Fuel level high enough for launch</li>
                  <li id="cargoStatus">Cargo mass low enough for launch</li>
               </ol>
         </div>`;
         htmlElements.launchStatusCheckDiv.setAttribute("style", "background-color:none;");
         htmlElements.faultyItems.setAttribute("style", "visibility: hidden;");
      }
      //This function returns an alert if not ALL the fields are filled out.---------
      fieldsVerify = () => {
         alert("ALL fields are required");
         event.preventDefault();
      }
      
      /*This function checks all input and accordingly updates, everything within the 
         launchStatusCheck div-----------------------------------------------------*/
         statusReady = () => {
            if(inputs.fuelLevelInput > 10000 && inputs.cargoMassInput < 10000){
               htmlElements.launchStatus.innerHTML = "Shuttle is ready for launch";
               htmlElements.launchStatus.setAttribute("style", "color:green;");
               htmlElements.faultyItems.setAttribute("style", "visibility: hidden;");
            }   
         }
   
         muchMass = () => {
            if(inputs.cargoMassInput > 10000){
               htmlElements.faultyItems.setAttribute("style", "visibility: visible;");
               htmlElements.cargoStatus.innerHTML = "TOO MUCH mass for the shuttle to take off";
               htmlElements.launchStatus.innerHTML = "Shuttle not ready for launch";
               htmlElements.launchStatus.setAttribute("style", "color:red;");
            }
         }
   
         lowFuel = () => {
            if(inputs.fuelLevelInput < 10000){
               htmlElements.faultyItems.setAttribute("style", "visibility: visible;");
               htmlElements.fuelStatus.innerHTML = "Not enough fuel to launch";
               htmlElements.launchStatus.innerHTML = "Shuttle not ready for launch";
               htmlElements.launchStatus.setAttribute("style", "color:red;");
            }
         }
         
         statusUpdate = () => {
            htmlElements.fuelStatus.innerHTML = "Fuel level high enough for launch";
            htmlElements.cargoStatus.innerHTML = "Cargo mass low enough for launch";
            htmlElements.pilotStatus.innerHTML = `Pilot ${inputs.pilotNameInput} is ready for launch`;
            htmlElements.copilotStatus.innerHTML = `Co-pilot ${inputs.copilotNameInput} is ready for launch`;
            statusReady();
            lowFuel();
            muchMass();
         }

//-----------------------------------------------------------------------------------------------------------

   // PART (1) : ADDING VALIDATION -----------------------------------------------
      // 1.1 : Adding Alerts -----------------------------------------------------
      //This block verifies that the fields are filled out.
      if(inputs.pilotNameInput==="" || inputs.copilotNameInput==="" || inputs.fuelLevelInput===""
      || inputs.cargoMassInput===""){
            fieldsVerify();
            document.getElementById("form").reset();
            retrieveDefault();
         }
      /*This block verifies that the information is valid; sends an alert and resets 
      fields form otherwise.-------------------------------------------------------*/
      else if(!isNaN(Number(inputs.pilotNameInput)) 
                  || !isNaN(Number(inputs.copilotNameInput)) 
                  || isNaN(Number(inputs.fuelLevelInput))
                  || isNaN(Number(inputs.cargoMassInput))){
            document.getElementById("form").reset();
            retrieveDefault();
            alert("Make sure to enter valid information for each field");
            event.preventDefault();
         }
      // 1.2 : Updating Shuttle Status ---------------------------------------------
      else{
         statusUpdate();
         //document.getElementById("form").reset()
      }

//-------------------------------------------------------------------------------------------------------------

// PART (2) : Fetching Planetary Data----------------------------------------------

      fetch("https://handlers.education.launchcode.org/static/planets.json").then((response) => {
         response.json().then((json) => {
            /*missionTarget.innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[0]["name"]}</li>
               <li>Diameter: ${json[0]["diameter"]}</li>
               <li>Star: ${json[0]["star"]}</li>
               <li>Distance from Earth: ${json[0]["distance"]}</li>
               <li>Number of Moons: ${json[0]["moons"]}</li>
            </ol>
            <img src="${json[0]["image"]}">`*/

      // Bonus Mission -------------------------------------------------------------

         let index = Math.floor((json.length*Math.random()));
         missionTarget.innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index]["name"]}</li>
               <li>Diameter: ${json[index]["diameter"]}</li>
               <li>Star: ${json[index]["star"]}</li>
               <li>Distance from Earth: ${json[index]["distance"]}</li>
               <li>Number of Moons: ${json[index]["moons"]}</li>
            </ol>
            <img src="${json[index]["image"]}">`;
         })
      })

   })
})

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
