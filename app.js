const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

// Read file C[R]UD
app.get('/', async (req, res) => {
  //json-server --watch db.json -p=3001
  const query = await axios.get('http://localhost:3001/results');
  res.render('index', { employees: query.data });
});

// Create employee [C]RUD
app.post('/', (req, res) => {
  // create new object to store POST data in
  let employee = {
    name: {
      first: req.body.fname,
      last: req.body.lname,
    },
    location: {
      city: req.body.city,
    },
    email: req.body.email,
    phone: req.body.phone,
    picture: {
      large: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 72 + 1
      )}.jpg`,
      medium: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 72 + 1
      )}.jpg`,
      thumbnail: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 90 + 1
      )}.jpg`,
    },
  };

  // Read the JSON database file
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) throw err;

    var arrayOfObjects = JSON.parse(data);
    // push new object to end of object array
    arrayOfObjects.results.push(employee);
    //console.log(arrayOfObjects);

    // write new JSON data to JSON file
    fs.writeFile(
      './db.json',
      JSON.stringify(arrayOfObjects),
      'utf-8',
      (err) => {
        if (err) throw err;
        console.log('Employee added!');
      }
    );
  });

  res.redirect('/');
});

// Update employee info CR[U]D

// Delete employee CRU[D]

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
