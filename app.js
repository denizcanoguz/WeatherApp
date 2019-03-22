    window.addEventListener('load', ()=>{
      let long;
      let lat;
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
          long = position.coords.longitude;
          lat = position.coords.latitude;
          const proxy = "https://cors-anywhere.herokuapp.com/";
          const api = `${proxy}https://api.darksky.net/forecast/45dde89459c9d81c59d7186105e3b9d9/${lat},${long}?lang=tr&units=si`;
          
          fetch(api)
          .then(response =>{
            return response.json();
          })
          .then(data =>{
            const currently = data.currently;
            const temperatureElement = document.getElementById("temperature");
            const timezoneElement = document.getElementById("timezone");
            const summaryElement = document.getElementById("summary");

            temperatureElement.textContent = currently.temperature;
            timezoneElement.textContent = data.timezone;
            summaryElement.textContent = currently.summary;

            setIcons(currently.icon, document.querySelector("#skyicon"))
          })
        }); 
      }

      function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();

        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
      }
    });