const container = document.querySelector(".container"),
inputCity = container.querySelector(".input-city"),
infoText = inputCity.querySelector(".info-text"),
inputSpace = inputCity.querySelector("input");
locationBtn = inputCity.querySelector("button");
arrowBack = container.querySelector("header i");


let api;

inputSpace.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputSpace.value != ""){
        requestApi(inputSpace.value);
    }
});

locationBtn.addEventListener("click",()=>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onWarning);
    }else{
        alert("Your browser does not support geolocation api");
    }
})

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"aa1f77927e1be0b3038344c46c4952a6"}&units=imperial`;

   fetchInfo();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${"aa1f77927e1be0b3038344c46c4952a6"}&units=imperial`;

    fetchInfo();
}
 
function onWarning(warning){
    infoText.innerText = warning.message;
    infoText.classList.add("warning");
}

// function requestApi(city){
//      api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"aa1f77927e1be0b3038344c46c4952a6"}&units=imperial`;

//     fetchInfo();
// }

function fetchInfo(){
    infoText.innerText = "Retrieving Weather Information...";
    infoText.classList.add("pending");
    fetch(api).then(response =>response.json()).then(result => weatherInfo(result)) .catch(() =>{
        infoText.innerText = "Something went wrong";
        infoText.classList.replace("pending", "warning");
    });
}


function weatherInfo(info){
    
    if(info.cod == "404"){
     infoText.classList.replace("pending", "warning");
     infoText.innerText = `${inputSpace.value} isn't a valid city name` ; 
     
    }else{

        const city = info.name;
        const country =info.sys.country;
        const{description,id}=info.weather[0];
        const{feels_like,humidity,pressure,temp}= info.main;
        // const {sunrise,sunset}=info.sys;
        const sunset = info.sys.sunset;
        const sunrise = info.sys.sunrise;
        // const timezone = info.timezone;
        const wind = info.wind.speed;
        const{lat,lon} = info.coord;
        const timezone1 = Intl.DateTimeFormat().resolvedOptions().timeZone;
    

       container.querySelector(".temperature .numb9").innerText = Math.round(temp);
       container.querySelector(".weather").innerText = description;
       container.querySelector(".location span").innerText = `${city},${country}`;
       container.querySelector(".feels .numb").innerText = Math.round(feels_like);
       container.querySelector(".humidity .numb").innerText = humidity;
       container.querySelector(".pressure .numb").innerText = pressure;
       container.querySelector(".time-zone span").innerText = timezone1;
       container.querySelector(".wind-speed .numb").innerText = Math.round(wind);
       container.querySelector(".sunrise .numb").innerText =  moment.unix(sunrise).calendar();
       container.querySelector(".sunset .numb").innerText = moment.unix(sunset).calendar();
       container.querySelector(".cords .numb").innerText = `${lat},${lon}`;
       container.querySelector(".country span").innerText = country;
       
       setInterval(() =>{
           
        container.querySelector(".date .date").innerText = new Date();
       },1000);

       infoText.classList.remove("pending", "warning");
       infoText.innerText = "";
       inputSpace.value = "";
       container.classList.add("active")
       
       
        
    }
    
}

arrowBack.addEventListener("click", ()=>{
    // wrapper.classList.remove("active");
    container.classList.remove("active");
});



