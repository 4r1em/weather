const express = require("express");
const request = require("request");
const app = new express();


app.use(express.json())
app.post('/weather', async (req, res) => {
    const city = req.body.city;
    // const day = req.body.day;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8bdbd54d3dcf72500df09e38fc2ed127`

    await request({ url: url, json: true }, (err, { body }) => {
        res.send(`Today in the city ${city} weather ${body.weather[0].main.toLowerCase()} wind speed ${String(body.wind.speed)}km/h and temperature ${String(Math.floor(body.main.temp - 273))}℃`);
    });



})


app.listen(3020, () => {
    console.log("Server work");
})