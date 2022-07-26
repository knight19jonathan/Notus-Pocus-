const notes = require('express').Router();
const fs = require('fs');

notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for Notes`);
    fs.readFile("./db.json", "utf8", (err, data) => {
        if (err) {
            console.info(err);
            throw err;
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

module.exports = notes;