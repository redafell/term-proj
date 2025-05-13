const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const charactersPath = path.join(__dirname, 'characters.json');

const server = http.createServer((req, res) => {
    if (req.url === '/characters' && req.method === 'GET') {
        fs.readFile(charactersPath, 'utf-8', (error, data) => {
            if (error) {
                res.writeHead(500);
                res.end('Error reading file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data || '[]');
        });
    }

    else if (req.url === '/characters' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const newCharacter = JSON.parse(body);

            fs.readFile(charactersPath, 'utf-8', (error, data) => {
                let characters = [];
                if (!error && data) {
                    characters = JSON.parse(data);
                }

                characters.push(newCharacter);

                fs.writeFile(charactersPath, JSON.stringify(characters, null, 2), (error) => {
                    if (error) {
                        res.writeHead(500);
                        res.end('Error writing file');
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                });
            });
        });
    }

    else {
        // Serve HTML page
        const filepath = path.join(__dirname, 'cheat.html');
        fs.readFile(filepath, (error, data) => {
            if (error) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

server.listen(port, () => {
    console.log('Server is listening on port: ' + port);
});
