const http = require('http');
const port = 3000;
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const { type } = require('os');
//think of it as importing laibrary

//getting a chracter
if(req.url == "chracters" && req.method == "GET") 
fs.readFile(chracters,'utf-8',(error,data)=>{
    if(error){
        res.writeHead("500")
        res.end("error")
        return
    }
    res.writeHead(200,{'content-type': 'application/json'})
    res.en(data || '[]')
})

else if(req.url == 'chrecters' && req.metho == "POST"){
    let body = ""
    req.on('data',chunks => {body += chunks} )
    req.on('end',() =>{
    const what_if = json.parse(body)
    fs.readFile(chracters, "utf-8" , (error , data)=>{
        let why = []
        if(!error && data){
            why = json.parse(data)
        }
        why.push(what_if)
        //writing all the ata back to cheracters
        fs.writeFile(chracters,json.strigify(why,null,2) , (error)=>{
            if(erorr){
                res.writeHead('500')
                res.end('error')
                return
            }
            res.writeHead('200',{'content-type':'aplication/json'})
            res.end(json.strigify({success: true}))
        } )
        
    })    
}
 )

}

else{
    const server = http.createServer((req, res) => { // this creats the server an have a call back function inside it that takes two parameters even though we never use req 
        const filepath = path.join(__dirname,'proj.html') // here we simply creat a filepath so we can take the files from irname is built in variable that have the current diractary we "if we har coe the diractary than it will not work on other operating systems " an the other is the file we eant 
        fs.readFile(filepath, (error, data) => { //we read the file we give it the path than we have a cbf if we couldn't read the content it sens an error if not the error object will be null and the respond will be the data we read from the file 
            if (error) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'}); // wehn we take the respon we give status code 200 means every thing is alright and tells the page to expect html file coming in 
                res.write(data);
                res.end();
            }
        });
    });
}
server.listen(port, (error) => {
    if (error) {
        console.log('There is an error:', error);
    } else {
        console.log('Server is listening on port: ' + port);
    }
});
console.log("test")