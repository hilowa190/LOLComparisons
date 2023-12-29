const express = require('express');  //import express
const app = express();   // create app
const port = 5000;

app.get('/api/getAllStuff', (req, res) => {
    res.json(require('./data.json'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
