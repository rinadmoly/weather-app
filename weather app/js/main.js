const link = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q="
const coordLink = 'http://api.openweathermap.org/data/2.5/onecall?'
const dailyOptions = '&exclude=current,minutely,hourly&units=metric&lang=ru'
const key = '&appid=d231238d181a714f04ca0c17e7c53b17'

let cityName = document.getElementById('city')
let temp = document.getElementById('temp')
let img = document.getElementById('header-img')
let imgInfo = document.getElementById('img-info')
let weather = document.getElementById('weather')
let lat = ''
let lon = ''
document.getElementById('input').value = ''

window.onload = async()=>{
    let res = await fetch(link+'bishkek'+key)
    let data =await res.json()
    cityName.innerHTML = data.name
    temp.innerHTML = data.main.temp + '&#8451'
    weather.innerHTML = data.weather[0].description
    let icon = data.weather[0].icon
    document.getElementById('header-img').src = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
    lat = data.coord.lat
    lon = data.coord.lon
    daily(lat, lon)
}
    
search = async()=>{
    let input = document.getElementById('input').value
    let res = await fetch(link+input+key)
    let data = await res.json()
    let cel = data.main.temp
    temp.innerHTML = cel + '&#8451'
    cityName.innerHTML = data.name
    lat = data.coord.lat
    lon = data.coord.lon
    
    daily(lat, lon)
}

daily = async(lat, lon)=>{
    let coord = 'lat='+lat+'&'+'lon='+lon
    let resp = await fetch(coordLink+coord+dailyOptions+key)
    let data = await resp.json()
    console.log(data.daily)
    let arr = data.daily
    delete arr[0]
    console.log(arr)
    table.innerHTML = ''
    
    for(i=1; i< arr.length; i++){
        let table = document.getElementById('table')
        let tr = document.createElement('tr')
        for(j=0; j < 4; j++){
            let td = document.createElement('td')
            td.setAttribute('class', 'table'+[j])
            switch(j){
                case 0:
                    td.innerHTML=day(arr[i].dt)
                break; 
                case 1:
                    let image = document.createElement('img')
                    let icon = arr[i].weather[0].icon
                    image.setAttribute('src', 'http://openweathermap.org/img/wn/'+icon+'@2x.png')
                    td.appendChild(image)
                    tr.appendChild(td)
                break; 
                case 2:
                    td.innerHTML=arr[i].temp.day + '&#8451'
                    tr.appendChild(td)
                break; 
                case 3:
                    td.innerHTML=arr[i].temp.night + '&#8451'
                    tr.appendChild(td)
                break; 
            }
            tr.appendChild(td)
        }
        tr.setAttribute('id', [i])
        table.appendChild(tr) 
    }
}

day = (date)=>{
    let d = new Date(date*1000)
    let days = ["Воскресение", "Понеделник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",];
    let day = days[d.getDay()]
    return day
}