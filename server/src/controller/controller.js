const db = require('../database/connection');
const axios = require("axios");
const http = require('http');

exports.home = async (req, res) => {
    res.json({ 'Working': true });
};

exports.addReview = async (req, res) => {
    await db.collection(`${req.params.page}`).insertOne(req.body);
    res.json("done");
};

exports.getReview = async (req, res) => {
    const data = await db.collection(`${req.params.page}`).find({});
    data.toArray((err, reviews) => {
        res.json(reviews);
    });
};

exports.ipAddress = async (req, res) => {
    await axios.get("https://ipinfo.io/")
        .then(result => {
            res.json(result.data);
        });
};