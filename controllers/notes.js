const notes = require('express').Router();
const fs = require('fs');
const app = require('.');

notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for Notes`);
    fs.readFile("./db/notes.json", "utf8", (err, data) => {
        if (err) {
            console.info(err);
            throw err;
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        }
    fs.readFile('./db/notes/json', 'utf8', (err, data) => {
        if (err){
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);

            fs.writeFile(
                './db/notes.json',
                JSON.stringify(parsedNotes, null, 2),
                (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes!')
            );
            }
        });

    const response = {
        status: 'Success!',
        body: newNote,
    };
    console.log(response);
    res.json(response);
} else {
    res.status(500).json('Error in posting note');
}
});


module.exports = notes;