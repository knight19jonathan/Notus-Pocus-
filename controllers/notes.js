const notes = require('express').Router();
const fs = require('fs');
const app = require('.');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => {
        res.json(JSON.parse(data))
    })
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { isValid, title, text } = req.body;

    const payload = {
        title: title,
        text: text,
    }

    if (!isValid) {
        readAndAppend(payload, './db/notes.json');
        res.json('Note has been added!')
    } else {
        res.json({
            messsage: "The object is valid but not being added. Check the other files on the front end."
        })
    }
});



module.exports = notes;



// TRIED TO WRITE MY OWN GET AND POST METHODS BUT WERE NOT WORKING WENT BACK TO MINI PROJECT AND ADDED IN HELPER FILE
// console.info(`${req.method} request recieved for Notes`);
//     fs.readFile("./db/notes.json", "utf8", (err, data) => {
//         if (err) {
//             console.info(err);
//             throw err;
//         } else {
//             const notes = JSON.parse(data);
//             res.json(notes);
//         }
//     })

// notes.post('/', (req, res) => {
//     const { title, text } = req.body;

//     if (title && text) {
//         const newNote = {
//             title,
//             text,
//         }
//         fs.readFile('./db/notes/json', 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 const parsedNotes = JSON.parse(data);

//                 parsedNotes.push(newNote);

//                 fs.writeFile(
//                     './db/notes.json',
//                     JSON.stringify(parsedNotes, null, 2),
//                     (writeErr) =>
//                         writeErr
//                             ? console.error(writeErr)
//                             : console.info('Successfully updated notes!')
//                 );
//             }
//         });

//         const response = {
//             status: 'Success!',
//             body: newNote,
//         };
//         console.log(response);
//         res.json(response);
//     } else {
//         res.status(500).json('Error in posting note');
//     }
// });