


   var todaysDate = null;
       date = null;

//The time clock function
   var time = function (){
        date = moment(new Date());
        todaysDate.text(date.format("MMMM Do YYYY, hh:mm:ss a"));
       
   }


$(document).ready(function () {
    //declaring ids and time slots 
    var ids =  ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4",  "#5"];
    var timeSlots = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
    // this variable will be to compare the middle times
    var timeSlotsPlus = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00","18:00"];
    var plansArray = [];
    
    // calling the time clock function and setting the seconds 
    todaysDate = $("#currentDay")
    time();
    setInterval(time,1000);

    //getting the saved data from local storage function 
    getSavedData();
    function getSavedData(){
        var storedData = JSON.parse(localStorage.getItem("plansArray"));
        if (storedData !== null){
            plansArray = storedData;
            
        }
        }

        
// a loop to do the condtion statments 
    for (var i = 0; i < ids.length; i++) {
        var planDesription = $(ids[i]);
        var currentTime = (moment().format("MMMM Do YYYY, HH:mm:ss"));
        var palnnerTime = (moment().format ("MMMM Do YYYY" + ", " + timeSlots[i]));
        var palnnerTimePlus = (moment().format ("MMMM Do YYYY") + ", " + timeSlotsPlus[i]);


        if (currentTime < palnnerTime) {
            planDesription.attr("class", "future");
            // assiging the id inputs and values to the array items
            plansArray.forEach(function(item) {
                if (ids[i] === ("#" + (item["inputId"]))) {
                    planDesription.val(item["inputValue"])
                
                }
                
            });
            
        } else if ((currentTime >= palnnerTime) && (currentTime  < palnnerTimePlus)){
            planDesription.attr("class", "present");
             // assiging the id inputs and values to the array items
            plansArray.forEach(function(item){
                if (ids[i] === ("#" + (item["inputId"]))) {
                    planDesription.val(item["inputValue"])
                }
            });
        } else if (currentTime > palnnerTime) {
            planDesription.attr("class", "past");
            $(".past").attr("disabled", "disabled");
            
        }
        
        
    }

  
   // when the save button clicked save the data to the array then the storage
    $("button").on("click", function () {
        event.preventDefault();

            plansArray = [];
        for (var i = 0; i < ids.length; i++) {
            var inputId = $(ids[i]).attr("id");
            var inputValue = $(ids[i]).val();
            // save the object to the plans array
            var plansObj = {
                "inputId": inputId,
                "inputValue": inputValue };

            if ($(this).attr("id") == inputId && inputValue!=="") {
            
                plansArray.push(plansObj);
              
              localStorage.setItem("plansArray", JSON.stringify(plansArray));  
            
        }  
             
        }
            
    });

  
 
});