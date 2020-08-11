const express = require ('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/items', (req, res, next) => {
    Item.find({})
        .then(data => res.json(data))
        .catch(next)
});

router.post('/items', (req, res, next) => {
    if(req.body.name){
        Item.create(req.body)
            .then(data => res.json(data))
            .catch(next)
    } else {
        res.json({
            error: "The input field is empty"
        })
    }
});

router.delete('/items/:id', (req, res, next) => {
    Item.findOneAndDelete({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)
})

module.exports = router;