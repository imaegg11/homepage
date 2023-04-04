import './App.css'

import { useEffect, useState } from 'react'

function Desktop() {

  //WEATHER I WANT TO DIE

  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")

  let weatherIcons = { 1000: ['moon.svg', 'sun.svg'], 1003: 'cloud-sun.svg', 1006: 'cloud.svg', 1009: 'cloud.svg', 1030: 'cloud-fog.svg', 1135: 'cloud-fog.svg', 1147: 'cloud-fog.svg', 1063: 'cloud-drizzle.svg', 1150: 'cloud-drizzle.svg', 1153: 'cloud-drizzle.svg', 1168: 'cloud-drizzle.svg', 1198: 'cloud-drizzle.svg', 1240: 'cloud-drizzle.svg', 1249: 'cloud-snow.svg', 1066: 'cloud-snow.svg', 1114: 'cloud-snow.svg', 1117: 'cloud-snow.svg', 1207: 'cloud-snow.svg', 1210: 'cloud-snow.svg', 1213: 'cloud-snow.svg', 1216: 'cloud-snow.svg', 1219: 'cloud-snow.svg', 1222: 'cloud-snow.svg', 1252: 'cloud-snow.svg', 1255: 'cloud-snow.svg', 1258: 'cloud-snow.svg', 1072: 'cloud-hail.svg', 1069: 'cloud-hail.svg', 1171: 'cloud-hail.svg', 1201: 'cloud-hail.svg', 1204: 'cloud-hail.svg', 1237: 'cloud-hail.svg', 1261: 'cloud-hail.svg', 1264: 'cloud-hail.svg', 1087: 'cloud-lightning.svg', 1273: 'cloud-lightning.svg', 1276: 'cloud-lightning.svg', 1279: 'cloud-lightning.svg', 1282: 'cloud-lightning.svg', 1180: 'cloud-rain.svg', 1183: 'cloud-rain.svg', 1186: 'cloud-rain.svg', 1189: 'cloud-rain.svg', 1243: 'cloud-rain.svg', 1192: 'cloud-rain-wind.svg', 1195: 'cloud-rain-wind.svg', 1246: 'cloud-rain-wind.svg' }

  const [data, setData] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const res = await fetch('https://api.weatherapi.com/v1/current.json?key=2251d57253504ce190315553231801&q=M2J3J8&aqi=no')
      let resJson = await res.json()
      setData(resJson)
    }
    getWeather()
  }, []);

  //WEATHER I WANT TO DIE

  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let trail = ' AM'
  if (String(minute).length == 1) {
    minute = '0' + String(minute)
  }
  if (hour > 12) {
    hour = hour % 12
    trail = ' PM'
  }
  const currentTime = hour + ':' + minute + trail

  const [time, setTime] = useState(currentTime)
  let day = 'DAY ' + (date.getDate() % 2 == 0 ? 2 : 1)
  let weekday = date.getDay()
  let month = monthArr[date.getMonth()]
  const dateNum = date.getDate()


  let temperature = data != null ? Math.round(data['current']['feelslike_c']) + '°C' : '°C'
  let weatherImg = data != null ? data['current']['condition']['code'] == 1000 ? weatherIcons[data['current']['condition']['code']][data['current']['is_day']] : weatherIcons[data['current']['condition']['code']] : 'cloud-off.svg'
  let weatherForcast = data != null ? data['current']['condition']['text'] : 'Fetching Data'

  useEffect(() => {

    setInterval(() => {

      setTime(timer())

    }, 1000)

  }, [])

  return (
    <div id='div'>
      <div id='left'>
        <p id='time'>{time}</p>
        <p id='day'>{weekday == 0 || weekday == 6 ? 'No School' : day}</p>
        <div id='search'>
          <input onKeyDown={(e) => search(e)} id='searchBar' type='text' placeholder='Search'></input>
        </div>
        <div id='buttons--row1'>
          {button('https://mail.google.com/mail/u/0/#inbox', 'mail.svg')}
          {button('https://docs.google.com/document/u/0/', 'file.svg')}
          {button('https://www.notion.so/', 'list-checks.svg')}
        </div>
        <div id='buttons--row2'>
          {button('https://classroom.google.com/u/0/h', 'contact.svg')}
          {button('https://tdsb.elearningontario.ca/d2l/login?sessionExpired=0&target=%2fd2l%2fhome', 'backpack.svg')}
          {button('https://ide.geeksforgeeks.org/1a8a5f6c-8f39-4e6a-aa57-db41fde311ec', 'code-2.svg')}

        </div>
      </div>
      <hr></hr>
      <div id='right'>
        <p id='dateText'>{month} {dateNum}</p>
        <div id='weather'>
          <div id='weather-imgTemp'>
            <img id='weatherImg' src={weatherImg}></img>
            <p id={data != null ? 'weatherTemp' : 'weatherTempNull'}>{temperature}</p>
          </div>
          <p id='weatherForcast'>{weatherForcast}</p>
        </div>
        <div id='moreLinks'>
          <img src='coffee.svg'></img><br></br>
          <div id='idkNameAnymore'>
            <p id='moreLinks--link'><a href='https://discord.com/app'>Discord</a></p>
            <p id='moreLinks--link'><a href='https://chess.com'>Chess.com</a></p>
            <p id='moreLinks--link'><a href='https://mcpt.ca'>MCPT</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

function search(event) {
  console.log(event.key)
  if (event.key == "Enter") {
    console.log(4)
    let searchTerm = document.getElementById('searchBar').value
    window.location.href = 'https://duckduckgo.com/' + searchTerm
  }
}

function timer() {
  const dateObject = new Date()
  let hour = dateObject.getHours()
  let minute = dateObject.getMinutes()
  let trail = ' AM'
  if (String(minute).length == 1) {
    minute = '0' + String(minute)
  }
  if (hour > 12) {
    hour = hour % 12
    trail = ' PM'
  }
  const currentTime = hour + ':' + minute + trail
  return currentTime
}

function button(link, image) {
  return <a href={link}><button id='button'><img src={image}></img></button></a>
}

function buttonM(link, image) {
  return <a href={link}><button id='buttonM'><img src={image} id='imgM'></img></button></a>
}

function Mobile() {

  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let trail = ' AM'
  if (String(minute).length == 1) {
    minute = '0' + String(minute)
  }
  if (hour > 12) {
    hour = hour % 12
    trail = ' PM'
  }
  const currentTime = hour + ':' + minute + trail

  const [time, setTime] = useState(currentTime)
  let day = 'DAY ' + (date.getDate() % 2 == 0 ? 2 : 1)
  let weekday = date.getDay()

  useEffect(() => {

    setInterval(() => {

      setTime(timer())

    }, 1000)

  }, [])

  return (
    <div id='divM'>
      <p id='timeM'>{time}</p>
      <p id='dayM'>{weekday == 0 || weekday == 6 ? 'No School' : day}</p>
      <div id='search'>
        <input onKeyDown={(e) => search(e)} id='searchBarM' type='text' placeholder='Search'></input>
      </div>
      <div id='buttons--row1M'>
        {buttonM('https://mail.google.com/mail/u/0/#inbox', 'mail.svg')}
        {buttonM('https://docs.google.com/document/u/0/', 'file.svg')}
        {buttonM('https://www.notion.so/', 'list-checks.svg')}
      </div>
      <div id='buttons--row2M'>
        {buttonM('https://classroom.google.com/u/0/h', 'contact.svg')}
        {buttonM('https://tdsb.elearningontario.ca/d2l/login?sessionExpired=0&target=%2fd2l%2fhome', 'backpack.svg')}
        {buttonM('https://ide.geeksforgeeks.org/1a8a5f6c-8f39-4e6a-aa57-db41fde311ec', 'code-2.svg')}

      </div>
    </div>
  )
}

function checkMobile() {
  let check = false;
  (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

export default function App() {
  let homepage = <Desktop />
  if (checkMobile() == true) {
    homepage = <Mobile />
  }
  return (
    <>
      {homepage}
    </>
  )
}



