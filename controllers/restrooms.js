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

    newForm: (req, res) => {
        res.render('new')
    },

    editForm: async (req, res) => {
        try {
            const restroom = await Restroom.findById(req.params.id)
            if (!restroom) {
                return res.redirect('/restrooms/new')
            }
            res.render('edit', { restroom })
        } catch (err) {
            console.log(err.message)
            res.redirect('/restrooms/new')
        }
    },

    show: async (req, res) => {
        try {
            const restroom = await Restroom.findById(req.params.id)
            if (!restroom) {
                return res.redirect('/restrooms/new')
            }
            res.render('showOne', { restroom })
        } catch (err) {
            console.log(err.message)
            res.redirect('/restrooms/new')
        }
    },

    create: async (req, res) => {
        try {
            console.log(req.body)
            const restroom = await Restroom.create(req.body)
            res.redirect(`/restrooms/${restroom._id}`)
        }
        catch (err) {
            console.log(err.message)
            res.redirect('/restrooms/new')
        }
    },

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
    destroy: async (req, res) => {
        try {
            console.log('Deleted Restroom:', req.params.id)
            await Restroom.findByIdAndDelete(req.params.id)
            res.json({ message: 'Deleted' })
        } catch (err){
            res.status(400).json({ error: err.message })
        }
    },
}