// create web server that can listen to requests
// and respond with a JSON object
// that looks like this:
// {
//     "comments": [
//         {
//             "name": "Bob",
//             "comment": "Hello!"
//         },
//         {
//             "name": "Jane",
//             "comment": "Hi!"
//         }
//     ]
// }
// and returns it to the user
// make sure the server is listening on port 8080
// and returns the correct content-type

import { createServer } from 'http';

var server = createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        comments: [
            {
                name: 'Bob',
                comment: 'Hello!'
            },
            {
                name: 'Jane',
                comment: 'Hi!'
            }
        ]
    }));
});

server.listen(8080);
