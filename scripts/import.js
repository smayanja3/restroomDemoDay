/* this is how i am adding seed data into my mongodb so I do not need to keep  fetching from the API */

//load .env because thats only attached to my server and this is its own file
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/database')
const Restroom = require('../models/restroom')

//where I am searching and how many to bring in
const LAT = 42.3601
const LNG = -71.0589
const HOW_MANY = 100
const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat=${LAT}&lng=${LNG}&per_page=${HOW_MANY}`

async function importRestrooms() {
    await connectDB()

    // ask the API for the restrooms please
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`API answered with status ${response.status}`)
    }
    const data = await response.json()
    console.log(`API sent ${data.length} restrooms`)  //<-- read the body

    // save each restroom in my DB, with my schema structure 
    // waits until every save has finished, whether it succeeded or failed. = PromiseallSettled
    const results = await Promise.allSettled(
        data.map(r => Restroom.findOneAndUpdate(
            { externalId: r.id },
            {
                externalId: r.id,
                name: r.name,
                address: `${r.street}, ${r.city}, ${r.state}`,
                lat: r.latitude,
                lng: r.longitude,
                babyChanging: r.changing_table,
            },
            { upsert: true, runValidators: true }
        ))
    )
    //console.log(results[0]) //<-- worked well all set

    // count what worked, and what didnt (what didnt make the CUTTT)
    const saved = results.filter(result => result.status === 'fulfilled').length
    results.forEach((result, i) => {
        if (result.status === 'rejected') {
            console.log(`Skipped "${data[i].name}": ${result.reason.message}`)
        }
    })

    console.log(`Saved ${saved} restrooms`)
    await mongoose.disconnect()
}

importRestrooms().catch(err => {
    console.log(`Import failed, ${err.message}`)
    process.exit(1) // <--- something went wrong
})
