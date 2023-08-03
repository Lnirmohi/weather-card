import React, { useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Test() {
  const [city, setCity] = React.useState('Bengaluru')
  const [temp, setTemp] = React.useState('')
  const [min, setMin] = React.useState('')
  const [max, setMax] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [color, setColor] = React.useState('green')
  const sendMessageToHtmlPage = () => {
    window.parent.postMessage({message:`city Changed to ${city}`}, '*');
  };
  useEffect(() => {
    const test = localStorage.getItem('color')
    window.addEventListener('storage', () => {
      const newValue = localStorage.getItem('color')
      const newCIty = localStorage.getItem('city')
      setCity(newCIty)
      setColor(newValue)
      sendMessageToHtmlPage()
    })
    console.log(test)
  },[])
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=ab195c619b782e8da6a7b54a5a4848f6&units=metric`)
      .then(res => {
        // setCity(res.data.name)
        setTemp(res.data.main.temp)
        setMin(res.data.main.temp_min)
        setMax(res.data.main.temp_max)
        setDescription(res.data.weather[0].description)
        sendMessageToHtmlPage()
      })
      .catch(err => console.log(err))
  }, [city])
  return (
    <div>
      <Card elevation={20} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography color={color} gutterBottom variant="h5" component="div">
              {city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Temperature : {temp}
              <br />
              Min: {min}
              <br />
              Max: {max}
              <br />
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* <Button onClick={sendMessageToHtmlPage}>Send Message to HTML</Button> */}
    </div>
  )
}
export default Test