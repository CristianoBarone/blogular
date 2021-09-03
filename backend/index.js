const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
const mongo = require('mongoose');

let articles = new Map();

const uri = "";

let db = null;

let corsOptions = {
    origin: '*'
    ,optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const Article = require('./article');

app.get('/get/articles', cors(corsOptions), async function (req, res) {

    req.accepts('html');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");

    let length;
    await Article.count().then((count) => {length = count - 1})
    let answ = []
    for (temp = 0; temp <= length; temp++) {
        (async function (i) {
            if (articles.has(length-i)) {
                var response = {}
                response.title = articles.get(length-i).title
                response.abstract = articles.get(length-i).abstract
                response.id = length-i

                answ.push(response);
                return;
            } else {
                try {
                    Article.findOne({id: length-i}, (err, document) => {
                        articles.set(length-i, {title: document.title, abstract: document.abstract, content: document.content })

                        var response = {}
                        response.title = articles.get(length-i).title
                        response.abstract = articles.get(length-i).abstract
                        response.id = length-i

                        answ.push(response);
                        return;
                    })
                } catch (err) {
                    res.status(500).end();
                }
                
            } 
        })(temp);
    }

    res.json(answ).end();

})

app.param(['id'], function (req, res, next, value) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    next()
})

app.get('/get/article/*', cors(corsOptions), async function (req, res/*, next*/) {

    req.accepts('html');

    var path = req.path

    path = path.replace('/get/article/', '');

    if (path.includes('/')) {
        res.status(400).end();
        return;
    }

    if (articles.has(path)) {
        var response = {}
        response.title = articles.get(path).abstract
        response.abstract = articles.get(path).abstract
        response.content = articles.get(path).content

        res.json(response).end();
        return;
    } else {
        await Article.exists({id: path}, async function (err, doc) {
            if (err){
                console.log(err)
              }else{
                if (!doc) {
                   res.status(404).end();
                   return;
                } else {
                    Article.findOne({id: path}, (err, document) => {
                        articles.set(path, {title: document.title, abstract: document.abstract, content: document.content })

                        var response = {}
                        response.title = articles.get(path).title
                        response.abstract = articles.get(path).abstract
                        response.content = articles.get(path).content
                
                        res.json(response).end();
                        return;
                    })
                }
            }
        })
    }

});

mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    var server = app.listen(8081, async function () {
        var host = server.address().address
        var port = server.address().port
        db = mongo.connection;
        console.log("Backend started on http://%s:%s", host, port)
        await Article.count().then((count) => {length = count - 1})
        for (temp = 0; temp <= length; temp++) {
            (async function (i) {
                if (articles.has(length-i)) {
                    return;
                } else {
                    try {
                        Article.findOne({id: length-i}, (err, document) => {
                            articles.set(length-i, {title: document.title, abstract: document.abstract, content: document.content })
                            return;
                        })
                    } catch (err) {
                        
                    }
                    
                } 
            })(temp);
        }

    })
});