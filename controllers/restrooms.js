const Restroom = require('../models/restroom')

module.exports = {
    index: async (req, res) => {
        try {
            const restrooms = await
                Restroom.find()
            res.render('restrooms', { restrooms })
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Something went wrong')
        }
    },

    // newForm: (req, res) => {
    //     res.render('new')
    // },
// no async because this map doesnt talk to the mongoDB the db same as newForm ^^^
// add boston as home location figure out in map.js or else where....
    map: (req, res) => {
         res.render('map', {apiKey: process.env.GOOGLE_MAPS_API_KEY})
    },

    editForm: async (req, res) => {
        try {
            const restroom = await Restroom.findById(req.params.id)
            if (!restroom) {
                return res.redirect('/restrooms')
            }
            res.render('edit', { restroom })
        } catch (err) {
            console.log(err.message)
            res.redirect('/restrooms')
        }
    },

    show: async (req, res) => {
        try {
            const restroom = await Restroom.findById(req.params.id)
            if (!restroom) {
                return res.redirect('/restrooms')
            }
            res.render('showOne', { restroom })
        } catch (err) {
            console.log(err.message)
            res.redirect('/restrooms')
        }
    },

    // create: async (req, res) => {
    //     try {
    //         console.log(req.body)
    //         const restroom = await Restroom.create(req.body)
    //         res.redirect(`/restrooms/${restroom._id}`)
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //         res.redirect('/restrooms')
    //     }
    // },

    update: async (req, res) => {
        try {
            console.log('Put to body:', req.body)
            await Restroom.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            res.json({ message: 'Updated' })
        } catch (err) {
            console.log(err.message)
            res.status(400).json({ error: err.message })
        }
    },
    // delete is a reversed word in js so we use destroy instead
    // destroy: async (req, res) => {
    //     try {
    //         console.log('Deleted Restroom:', req.params.id)
    //         await Restroom.findByIdAndDelete(req.params.id)
    //         res.json({ message: 'Deleted' })
    //     } catch (err){
    //         res.status(400).json({ error: err.message })
    //     }
    // },
}

// removed destroy -> create -> new because they are NA but will use later for comments so i didnt delte them for now