const http = require('http');
const server = http.createServer((req,res) =>{
    console.log('thiru');
});
server.listen(4000);