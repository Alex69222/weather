    let city = document.querySelector('.city');
    const measureUnitsContainer = document.querySelector('.measure-units')
    const measureUnitsBtns = document.querySelectorAll('.units')
    const citiesSelect = document.querySelector('.cities-select')
    const citiesSelectForm = document.querySelector('.cities-select-form')
    const citySubmitBtn = document.querySelector('.city-submit')
    const changeCityBtn = document.querySelector('.changeCity')
    const currentCityBlock = document.querySelector('.current-city')
    const locationControlsContainer = document.querySelector('.location-controls')
    const temperature = document.querySelector('.temperature')
    const weatherDescription = document.querySelector('.weather-description')
    const pressure = document.querySelector('.pressure .info')
    const humidity = document.querySelector('.humidity .info')
    const wind = document.querySelector('.wind .info')
    const weatherImg = document.querySelector('.weather-img')
    let cities = ['Москва','Краснодар', 'Геленджик', 'Анапа', 'Петропавловск-Камчатский']
    let chosenCity 

    function getWeather(city, units = 'metric'){
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=${units}&appid=88e9c2ae024f7fae984487bd4172b0f0`)
            .then(
                function(response){
                    if(response.status !== 200){
                        console.log('Ошибка: ' + response.status)
                        return
                    }
                    response.json().then(function(data){
                        // console.log(data)
                        temperature.innerHTML = `${Math.round(data.main.temp)}&#176;`
                        weatherDescription.innerHTML = data.weather[0].description
                        pressure.innerHTML = `${data.main.pressure} мм рт. ст.`
                        humidity.innerHTML = `${data.main.humidity}%`

                        let windSpeedUnits = units === 'metric' ? 'м/с' : 'миль/ч'

                        let icon = data.weather[0].icon
                        weatherImg.src=`http://openweathermap.org/img/wn/${icon}@2x.png`

                        let windDegree = data.wind.deg
                        let windDirection
                        
                        switch (true) {
                            case (337.5 <= windDegree  || windDegree <= 22.5):
                                windDirection = 'северный'
                                break;
                            case (22.6 <= windDegree &&  windDegree <= 67.5):
                                windDirection = 'северо-восточный'
                                break;
                            case (67.6 <= windDegree &&  windDegree <=  112.5):
                                windDirection = 'восточный'
                                break;
                            case (112.6 <= windDegree &&  windDegree <=  157.5):
                                windDirection = 'юго-восточный'
                                break;
                            case (157.6 <= windDegree &&  windDegree <=  202.5):
                                windDirection = 'южный'
                                break;
                            case (202.6 <= windDegree &&  windDegree <=  247.5):
                                windDirection = 'юго-западный'
                                break;
                            case (247.6 <= windDegree &&  windDegree <=  292.5):
                                windDirection = 'западный'
                                break;
                            case (292.6 <= windDegree &&  windDegree <=  357.4):
                                windDirection = 'северо-западный'
                                break;
                        
                            default:
                                windDirection = 'непредсказуемый'
                                break;
                        }
                        wind.innerHTML = `${Math.round(data.wind.speed)} ${windSpeedUnits}, ${windDirection}`
                    })
                }
            )
            .catch(function(err){
                console.log('Fetch Error: ', err)
            })
    }


    window.addEventListener('DOMContentLoaded', ()=>{
        chosenCity = cities[0]
        city.innerText = cities[0]
        citiesSelect.innerHTML = cities.map(city => `<option value=${city}>${city}</option>`)
        getWeather(chosenCity)
    })

   measureUnitsBtns.forEach((btn)=>{
       btn.addEventListener('click', (e)=>{
           if(btn.classList.contains('active')){
               return
           }else{
               measureUnitsBtns.forEach( btn => btn.classList.toggle('active'))
               if(e.target.classList.contains('celsius')){
                getWeather(chosenCity,'metric')
               }
               if(e.target.classList.contains('fahrenheit')){
                getWeather(chosenCity,'imperial')
               }
           }
       })
   })


   changeCityBtn.addEventListener('click', ()=>{
    currentCityBlock.style.display='none'
    locationControlsContainer.style.display='none'
    citiesSelectForm.style.display='block'
    if(document.documentElement.clientWidth <= 768){
        measureUnitsContainer.style.display="none"
    }

   })

   citySubmitBtn.addEventListener('click', ()=>{
    citiesSelectForm.style.display='none'
    currentCityBlock.style.display='block'
    locationControlsContainer.style.display='block'
    let val = citiesSelect.value
    city.innerText = val.charAt(0).toUpperCase() + val.slice(1)
    if(measureUnitsContainer.style.display="none"){
        measureUnitsContainer.style.display="block"
    }
    chosenCity = citiesSelect.value
    getWeather(chosenCity)
   })

