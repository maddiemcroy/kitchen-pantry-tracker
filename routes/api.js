const express = require ('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/items', (req, res, next) => {
    Item.find({})
        .then(data => res.json(data))
        .catch(next)
});

router.post('/items', (req, res, next) => {
    Item.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/items/:id', (req, res, next) => {
    Item.findByIdAndUpdate({'_id': req.params.id}, req.body)
        .then(data => res.json(data))
        .catch(next)
})

router.delete('/items/:id', (req, res, next) => {
    Item.findOneAndDelete({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
})

module.exports = router;