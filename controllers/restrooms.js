const Restroom = require('../models/restroom')

module.exports = {
    index: (req, res) => {
        Restroom.find()
            .then(restrooms => res.render('restrooms', { restrooms }))
            .catch(err => {
                console.log(err.message)
                res.status(500).send('Something went wrong')
            })
    },

    newForm: (req, res) => {
        res.render('new')
    },

    editForm: (req, res) => {
        Restroom.findById(req.params.id)
            .then(restroom => {
                if (!restroom) {
                    return res.redirect('/restrooms/new')
                }
                res.render('edit', { restroom })
            })
            .catch(err => {
                console.log(err.message)
                res.redirect('/restrooms/new')
            })
    },

    show: (req, res) => {
        Restroom.findById(req.params.id)
            .then(restroom => {
                if (!restroom) {
                    return res.redirect('/restrooms/new')
                }
                res.render('showOne', { restroom })
            })
            .catch(err => {
                console.log(err.message)
                res.redirect('/restrooms/new')
            })
    },

    create:  (req, res) => {
        console.log(req.body)
        Restroom.create(req.body)
        .then(restroom => {
            res.redirect(`/restrooms/${restroom._id}`)
        })
        .catch(err => {
            console.log(err.message)
            res.redirect('/restrooms/new')
        })
    },

    update: (req, res) => {
        console.log('Put to body:', req.body)
        Restroom.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    
            .then(() => {
                res.json({ message: 'Updated' })
            })
            .catch(err => {
                console.log(err.message)
                res.status(400).json({ error: err.message })
            })
    },
// delete is a reversed word in js so we use destroy instead
    destroy: (req, res) => {
        console.log('Deleted Restroom:', req.params.id)
        Restroom.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({ message: 'Deleted' })
            })
            .catch(err => {
                res.status(400).json({ error: err.message })
            })
    }
}