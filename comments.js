// create a web server that can listen to requests for /comments and send back the JSON file comments.json
// create a web server that can listen to requests for /comments/new and can accept POST requests with JSON body
// create a web server that can listen to requests for /comments/1 for example, and serve a single comment with an ID of 1

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        } else {
            let comments = JSON.parse(data);
            res.status(200).send(comments);
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        } else {
            let comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Something went wrong');
                } else {
                    res.status(200).send('Comment added');
                }
            });
        }
    });
});

app.get('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        } else {
            let comments = JSON.parse(data);
            let comment = comments.find(c => c.id === parseInt(req.params.id));
            if (comment) {
                res.status(200).send(comment);
            } else {
                res.status(404).send('Comment not found');
            }
        }
    });
});

app.listen(3000);
