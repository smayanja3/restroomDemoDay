const Restroom = require('../models/restroom')
const Review = require('../models/review')

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
        res.render('map', { apiKey: process.env.GOOGLE_MAPS_API_KEY })
    },
    //users location
    userLocation: (req, res) => {
        //sort restrooms by location
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
            const reviews = await Review.find({ restroom: req.params.id })
                .populate('author', 'username') // only pulls out username our of author = user._id
                .sort({ createdAt: "desc" }).lean()

            //gallery of all the images from users review
            const photos = reviews.filter(review => review.image)

            res.render('showOne', {
                restroom: restroom,
                photos: photos,
                reviews: reviews,
            });
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
            //destructuring - same as Promise.all (pulls out the alues i want)
            const { isFree, is24Hours, hours, babyChanging } = req.body

            await Restroom.findByIdAndUpdate(
                req.params.id,
                { isFree, is24Hours, hours, babyChanging },
                { runValidators: true }
            )

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