const Restroom = require('../models/restroom')
// not in restrooms.js becuse that is pulling from the server this is pulling from my db from the API
module.exports = {
// GET api/restrooms <-- every restroom in my db 
    restrooms: async (req, res) => {
        try{
            const restrooms = await Restroom
            // $ne = not empty same as !== do not give me locations with out lat and lng please
            .find({ lat: { $ne: null }, lng:{ $ne: null }})
            // send only the keys/fields listed ->> the _id is always sent
            .select('name address lat lng')
            res.json(restrooms)
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ error: 'Could not load restrooms'})
        }
    },

}