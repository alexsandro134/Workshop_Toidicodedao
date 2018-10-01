var express = require('express');
var app = express();

var port = 4000;

app.set('views', './views') // specify the views directory
app.set('view engine', 'pug')

var articles = [
    {id: 1, title: 'Bai bao so 1'},
    {id: 2, title: 'Bai bao so 2'}
];

app.get('/', function (req, res) {
    res.render('index.pug');
});

app.get('/api', function (req, res) {
    res.render('api/index.pug', {
        dataList: articles
    });
});

app.get('/api/search', function (req, res) {
    var q = req.query.q;
    var matchedArticles = articles.filter(function (item) {
        return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('api/index.pug', {
        searchText: q,
        dataList: matchedArticles
    });
});

app.listen(port, function () {
    console.log('Server is running with port ' + port);
});