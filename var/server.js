"use strict";
const http = require(`http`);
const fs = require(`fs`);
const url = require(`url`);
const path = process.cwd();
let nowPath = ``;
const type = {
    "html": "text/html",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "js": "text/javascript",
    "css": "text/css",
    "ico": "image/png"
};
const readFile = (url) => {
    return fs.readFileSync(url);
};
const sendFile = (res, url) => {
    let typeName = url.split(`.`)[1];
    if (typeName === undefined) {
        typeName = `html`;
        url = `/address${url}/index.html`;
    }
    const nowType = type[typeName];
    const filePath = typeName === `html` ? `${path}${url}` : `${path}${nowPath}${url}`;
    console.log(url);
    if (fs.existsSync(filePath)) {
        res.writeHead(200, { "Content-Type": nowType });
        res.end(readFile(filePath));
        if (typeName === `html`)
            nowPath = url.split(`/index.html`)[0];
    }
    else {
        console.log(filePath, `${path}${url}`);
    }
};
http.createServer((req, res) => {
    const url = req.url;
    if (url === `/`)
        sendFile(res, `/address/main/index.html`);
    else
        sendFile(res, url);
}).listen(3000);
