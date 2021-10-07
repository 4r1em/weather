const express = require("express");
const request = require("request");
const app = new express();

app.use(express.json())
app.post('/weather', async (req, res) => {
    const coordinates = req.body.coordinates
    let latitude
    let longitude
    let arrEnd = [];
    for (item of coordinates) {
        latitude = item[0]
        longitude = item[1]
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180 || !latitude || !longitude) {
            return res.send("Enter latitude between -90 and 90 and longitude between -180 and 180")
        }
        else {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8bdbd54d3dcf72500df09e38fc2ed127`
            await request({ url: url, json: true }, (err, { body }) => {
                const weather = body.weather[0].main.toLowerCase()
                const city = body.name
                const wind = String(body.wind.speed)
                const temperature = String(Math.floor(body.main.temp - 273))

                if (body.name) {
                    arrEnd.push(`Today in the city ${city} weather ${weather}
                    wind speed ${wind}m/h and temperature ${temperature}℃`);
                } else {
                    arrEnd.push(`Today at the coordinates ${latitude}, ${longitude}
                    the weather ${weather} wind speed ${wind} m/h and temperature ${temperature} ℃`);
                }
                if (coordinates.length == arrEnd.length) return res.send(arrEnd.join("\n"))
            })
        }

    }
})
app.listen(3020, () => {
    console.log("Server work");
})