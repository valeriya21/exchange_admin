const express = require('express')
const brokers = express.Router()
const cors = require('cors')
const ObjectId = require('mongoose').Types.ObjectId

process.env.SECRET_KEY = 'secret'

const Broker = require('../models/Broker')
brokers.use(cors())

brokers.get('/', (req, res) =>{
    Broker.find((err, data) => {
        if (!err) { res.send(data); }
        else{
            console.log('Error getting brokers : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

brokers.post('/', (req, res) => {
    var broker = new Broker({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        balance: req.body.balance
    });
    broker.save((err, data) => {
        if (!err) { res.send(data); }
        else {
            console.log('Error saving broker ' + JSON.stringify(err, undefined, 2));
        }
    });
});

brokers.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Broker.findById(req.params.id, (err, data) => {
        if (!err) { res.send(data); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

brokers.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    }
    var broker = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        balance: req.body.balance
    };
    Broker.findByIdAndUpdate(req.params.id, { $set: broker }, { new: true } , (err, data) => {
        if (!err) {res.send(data)}
        else {
            console.log('Error in updating broker :' + JSON.stringify(err, undefined, 2));
        }
    });
});

brokers.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    }
    Broker.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {res.send(data)}
        else {
            console.log('Error in removing broker :' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = brokers;
