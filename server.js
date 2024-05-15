const http = require("http") 
const fs = require("fs/promises")

const getFiles = async ()=>{
    const indexHtml = await fs.readFile("./index.html")
    const indexJs = await fs.readFile("./dist/r.bundle.js")
    return [indexHtml,indexJs]
}

let userData = []

http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles()
    if (url.includes('form')) {
        const decoded = decodeURI(url)
        const data = decoded.split('?')[1]
        const stringify = JSON.stringify(data)
        userData.push(stringify)
        const buffer = Buffer.from(userData)
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