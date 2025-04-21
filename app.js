const http = require('http');
const port = 3000;
const fs = require('fs');
const path = require('path')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    const filepath = path.join(__dirname,'cheat.html')
    fs.readFile('cheat.html', (error, data) => {
        if (error) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(port, (error) => {
    if (error) {
        console.log('There is an error:', error);
    } else {
        console.log('Server is listening on port: ' + port);
    }
});
