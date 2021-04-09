const express = require('express')
const mongoose = require('mongoose')
const Data = require('./noteSchema')
var app = express()

// Connection
mongoose.connect('mongodb://localhost/DB1', {useNewUrlParser: true})
// mongoose.connect('mongodb+srv://<user>:<passowrd>@<x.x.mongodb.net>/DB1', {useNewUrlParser: true})

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB!")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})

// http://192.168.1.73:8081/create
var server = app.listen(8081, "192.168.1.73", () => {
    console.log("Server is running!")
})

// Create a note
// POST request
app.post("/create", (req, res) => {
    var note = new Data({
        title: req.get("title"),
        note: req.get("note"),
        date: req.get("date")
    })

    note.save().then(() => {
        if (note.isNew == false) {
            console.log("Created!")
            res.send("Created!")
        } else {
            console.log("Failed to save data")
        }
    })
})

// Fetch a note
// GET request
app.get('/fetch', (req, res) => {
    Data.find({}).then((DBItems) => {
        res.json(DBItems)
    })
})

// Update a note
// POST request
app.post('/update', (req, res) => {
    Data.findOneAndUpdate({
        _id: req.get('id')
    }, {
        title: req.get('title'),
        note: req.get('note'),
        date: req.get('date')
    }, (err) => {
        console.log('Failed ' + err)
    })
    res.send('Updated!')
})

// Delete a note
// POST request
app.post('/delete', (req, res) => {
    Data.findOneAndRemove({
        _id: req.get('id')
    }, (err) => {
        console.log('Failed' + err)
    })
    res.send('Deleted!')
})
