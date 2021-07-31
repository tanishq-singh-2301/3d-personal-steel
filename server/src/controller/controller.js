const db = require('../database/connection');

exports.home = async (req, res) => {
    res.send('Working');
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