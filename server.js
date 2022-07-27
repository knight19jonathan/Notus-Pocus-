const express = require('express');
const path = require('path');
//const { clog } = require('./middleware/clog');
//const api = require('./controllers/index.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request recieved for Notes`);
  res.sendFile(path.join(__dirname, './db/db.json'))
});


app.get('/api/:note_id', (req, res) => {
  console.info(`${req.method} request recieved for Notes`);
  const noteId = req.params.note_id;
  res.sendFile(path.join(__dirname, './db/db.json'))
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved for Notes`);
    console.log(req.body)
    const { title, text } = req.body
    const newNote = {
      title: title,
      text: text,
      note_id: uuidv4(),
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const notes = JSON.parse(data);
        notes.push(newNote);
        console.log(notes);
        fs.writeFile('./db/db.json', JSON.stringify(notes),
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
  });



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


