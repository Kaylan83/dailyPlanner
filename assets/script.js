


   var todaysDate = null;
       date = null;


   var time = function (){
        date = moment(new Date());
        todaysDate.text(date.format("MMMM Do YYYY, hh:mm:ss a"));
       
   }


$(document).ready(function () {
    var ids =  ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4",  "#5"];
    var timeSlots = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
    //var timeSlots = ["18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00",  "23:00:00",  "24:00:00",  "01:00:00",  "02:00:00"];
    var timeSlotsPlus = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00","18:00"];
    var plansArray = [];
    
    todaysDate = $("#currentDay")
    time();
    setInterval(time,1000);

    
    getSavedData();
    function getSavedData(){
        var storedData = JSON.parse(localStorage.getItem("plansArray"));
        if (storedData !== null){
            plansArray = storedData;
            
        }
        }

        

    for (var i = 0; i < ids.length; i++) {
        var planDesription = $(ids[i]);
        var currentTime = (moment().format("MMMM Do YYYY, HH:mm:ss"));
        var palnnerTime = (moment().format ("MMMM Do YYYY" + ", " + timeSlots[i]));
        var palnnerTimePlus = (moment().format ("MMMM Do YYYY") + ", " + timeSlotsPlus[i]);


        if (currentTime < palnnerTime) {
            planDesription.attr("class", "future");
            plansArray.forEach(function(item) {
                if (ids[i] === ("#" + (item["inputId"]))) {
                    planDesription.val(item["inputValue"])
                
                }
                
            });
            
        } else if ((currentTime >= palnnerTime) && (currentTime  < palnnerTimePlus)){
            planDesription.attr("class", "present");
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

    $("button").on("click", function () {
        event.preventDefault()
        for (var i = 0; i < ids.length; i++) {
            var inputId = $(ids[i]).attr("id");
            var inputValue = $(ids[i]).val();
           
    
               var plansObj = {
              "inputId": inputId,
              "inputValue": inputValue };
            
           
            if (plansObj["inputValue"] !== "") {
              plansArray.push(plansObj);
              
            }
            localStorage.setItem("plansArray", JSON.stringify(plansArray));   
        }
           
    });
 
});