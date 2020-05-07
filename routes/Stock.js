const express = require('express')
const stocks = express.Router()
const cors = require('cors')
const ObjectId = require('mongoose').Types.ObjectId


process.env.SECRET_KEY = 'secret'

const Stock = require('../models/Stock')
stocks.use(cors())

stocks.get('/', (req, res) =>{
    Stock.find((err, data) => {
        if (!err) { res.send(data); } 
        else{
            console.log('Error getting stocks : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

stocks.post('/', (req, res) => {
    var stock = new Stock({
        name: req.body.name,
        distribution_law: req.body.distribution_law,
        start_price: req.body.start_price
    });
    stock.save((err, data) => {
        if (!err) { res.send(data); }
        else {
            console.log('Error saving stocks ' + JSON.stringify(err, undefined, 2));
        }
    });
});

stocks.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Stock.findById(req.params.id, (err, data) => {
        if (!err) { res.send(data); }
        else { console.log('Error in Retriving stocks :' + JSON.stringify(err, undefined, 2)); }
    });
});

stocks.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    }
    var stock = {
        name: req.body.name,
        distribution_law: req.body.distribution_law,
        start_price: req.body.start_price
    };
    Stock.findByIdAndUpdate(req.params.id, { $set: stock }, { new: true } , (err, data) => {
        if (!err) {res.send(data)}
        else {
            console.log('Error in updating stock :' + JSON.stringify(err, undefined, 2));
        }
    });
});

stocks.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    }
    Stock.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {res.send(data)}
        else {
            console.log('Error in removing stock :' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = stocks;