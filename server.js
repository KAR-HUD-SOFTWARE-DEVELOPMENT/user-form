const http = require("http") 
const fs = require("fs/promises")

const getFiles = async ()=>{
    const indexHtml = await fs.readFile("./index.html")
    const indexJs = await fs.readFile("./dist/r.bundle.js")
    return [indexHtml,indexJs]
}

http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles()
    if (url.includes('form')) {
        const data = url.match(/[a-zA-Z]+|[0-9]{4}-[0-9]{2}-[0-9]{2}/g)
        data.shift()
        const stringify = JSON.stringify(data)
        const buffer = Buffer.from(stringify)
        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(buffer);
        res.end();      
        return 
    }
    switch(url) {
        case '/':
            res.writeHead(200, {"Content-Type": "text/html"})
            res.write(indexHtml)
            res.end()
            break
        case '/js':
            res.writeHead(200, {"Content-Type": "text/javascript"})
            res.write(indexJs);
            res.end();      
            break
        default:
            res.writeHead(404)
            res.write('Page not found');
            res.end();      
    }
}).listen(8008)