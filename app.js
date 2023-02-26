const http = require('http');
const fs = require('fs');
const { text } = require('stream/consumers');
const server = http.createServer((req,res) =>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body>');
        res.write('</html>');
      return  res.end();        
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk) =>{
            body.push(chunk);
        });
        return req.on('end',() =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
       
    }
    res.setHeader('content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My Page</title></head>');
    res.write('<body><h1>Welcome to my Node Js project</h1></body>');
    res.write('</html>');
    res.end();
});
server.listen(4000);