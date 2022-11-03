/*
*   Author — @0K00
*   Date — 3 November 2022
*   Description — Api route logic
*/

const json = require('../database/articles');

module.exports = (app) => {

    /* Get all articles */
    app.get('/api/articles', (req, res) => {
        try {
            return res.status(200).send(json);
        } catch (err) {
            console.error(err);
            return res.status(500).send({message: "An error occured", status: 500});
        }
    });
    /***/

    /* Get one article */
    app.get('/api/articles/:id', (req, res) => {
        try {
            if (!json.articles[req.params.id]) throw "Article not found"; // Catch invalid id
            return res.status(200).send(json.articles[req.params.id]);
        } catch (err) {
            console.error(err);
            return res.status(404).send({message: err, status: 404});
        }
    });
    /***/

    /* Modify one article */
    app.put('/api/articles/:id', (req, res) => {
        try {
            let target = json.articles[req.params.id]
            if (target && req.body.title && req.body.content) {
                target = {
                    "title": req.body.title,
                    "content": req.body.content
                }
            } else throw "invalid user id"; // Handle invalid id
            res.status(200).send(target);
        } catch (err) {
            console.error(err);
            return res.status(500).send({message: err, status: 500});
        }
    });
    /***/

    /* Add one article */
    app.post('/api/articles/new', (req, res) => {
        try {
            let id = json.articles.length + 1;
            let ret = {
                '_id': id,
                'title': req.body.title,
                'content': req.body.content
            }
            res.status(200).send(ret);
        } catch (err) {
            console.error(err);
            return res.status(500).send({message: err, status: 500});
        }
    });
    /***/

    /* Delete one article */
    app.delete('/api/articles/:id', (req, res) => {
        try {
            if (!json.articles[req.params.id]) throw "Article not found"; // Catch invalid id
            return res.status(200).send(json.articles[req.params.id]);
        } catch (err) {
            console.error(err);
            return res.status(404).send({message: err, status: 404});
        }
    });
    /***/

};
