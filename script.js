
// Write your JavaScript code here!
window.addEventListener("load", () => {

   //-------------------------------------------------------------------------------------------------------   

   let submitButton = document.getElementById("formSubmit");
   submitButton.addEventListener("click", (event) => {
   
      // The Variables -----------------------------------------------------------------     
      let pilotNameInput = document.querySelector("input[name=pilotName]").value;
      let copilotNameInput = document.querySelector("input[name=copilotName]").value;
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
      let cargoMassInput = document.querySelector("input[name=cargoMass]").value;
      let launchStatusCheckDiv = document.getElementById("launchStatusCheck");
      let launchStatus = document.getElementById("launchStatus");
      let faultyItems = document.getElementById("faultyItems");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let missionTarget = document.getElementById("missionTarget")

   // The Functions -------------------------------------------------------------------
      //This function resets the launchStatusCheck div.--------------------------------
      function retrieveDefault(){
         launchStatusCheckDiv.innerHTML = 
         `<h2 id="launchStatus">Awaiting Information Before Launch</h2>
         <div  id="faultyItems">
               <ol>
                  <li id="pilotStatus">Pilot Ready</li>
                  <li id="copilotStatus">Co-pilot Ready</li>
                  <li id="fuelStatus">Fuel level high enough for launch</li>
                  <li id="cargoStatus">Cargo mass low enough for launch</li>
               </ol>
         </div>`;
         launchStatusCheckDiv.setAttribute("style", "background-color:none;")
         faultyItems.setAttribute("style", "visibility: hidden;");
      }
      //This function returns an alert if not ALL the fields are filled out.---------
      function fieldsVerify(){
         alert("ALL fields are required");
         event.preventDefault();
      }
      
      /*This function checks all input and accordingly updates, everything within the 
         launchStatusCheck div-----------------------------------------------------*/
      function statusUpdate(){
         pilotStatus.innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotNameInput} is ready for launch`;
         if(fuelLevelInput > 10000 && cargoMassInput < 10000){
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.setAttribute("style", "color:green;");
            faultyItems.setAttribute("style", "visibility: hidden;");
         }
         else if(fuelLevelInput > 10000 && cargoMassInput > 10000){
            faultyItems.setAttribute("style", "visibility: visible;");
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "TOO MUCH mass for the shuttle to take off";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.setAttribute("style", "color:red;");
         }
         else if(fuelLevelInput < 10000 && cargoMassInput < 10000){
            faultyItems.setAttribute("style", "visibility: visible;");
            fuelStatus.innerHTML = "Not enough fuel to launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.setAttribute("style", "color:red;");
         }
         else{
            faultyItems.setAttribute("style", "visibility: visible;");
            fuelStatus.innerHTML = "Not enough fuel to launch";
            cargoStatus.innerHTML = "TOO MUCH mass for the shuttle to take off";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.setAttribute("style", "color:red;");
         }
      }

//-----------------------------------------------------------------------------------------------------------

   // PART (1) : ADDING VALIDATION -----------------------------------------------
      // 1.1 : Adding Alerts -----------------------------------------------------
      //This block verifies that the fields are filled out.
      if(pilotNameInput==="" || copilotNameInput==="" || fuelLevelInput===""
      || cargoMassInput===""){
            fieldsVerify();
            document.getElementById("form").reset()
            retrieveDefault()
         }
      /*This block verifies that the information is valid; sends an alert and resets 
      fields form otherwise.-------------------------------------------------------*/
      else if(!isNaN(Number(pilotNameInput)) 
                  || !isNaN(Number(copilotNameInput)) 
                  || isNaN(Number(fuelLevelInput))
                  || isNaN(Number(cargoMassInput))){
            document.getElementById("form").reset()
            retrieveDefault()
            alert("Make sure to enter valid information for each field")
            event.preventDefault()
         }
      // 1.2 : Updating Shuttle Status ----------------------------------------
      else{
         statusUpdate();
         //document.getElementById("form").reset()
         }
      
//-------------------------------------------------------------------------------------------------------------

   // PART (2) : Fetching Planetary Data---------------------------------------

      fetch("https://handlers.education.launchcode.org/static/planets.json").then((response) => {
         response.json().then((json) =>{
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
   // Bonus Mission ----------------------------------------------------------
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
            <img src="${json[index]["image"]}">`
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