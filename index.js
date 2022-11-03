/*
*   Author — @0K00
*   Date — 3 November 2022
*   Description — Server api
*/

/* Packages */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
/***/

/* Port */
const port = 3000;
/***/

/* Middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
/***/

require('./api/route')(app);

/* Serve index page */
app.get('', (req, res) => {
    res.sendFile("./public/index.html");
});
/***/

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});