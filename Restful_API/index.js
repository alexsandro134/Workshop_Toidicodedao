var cron = require('node-cron');
var puppeteer = require('puppeteer');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json')

db = low(adapter);

db.defaults({
    articles: []
}).write();

async function main() {
    var vnexpress_sport_url = 'https://thethao.vnexpress.net/';
    var data = [];
    data = await crawlData(vnexpress_sport_url);
    db.get('articles').push(data).write();
    displayListArticles(data);
    // await browser.close();
}

async function crawlData(url) {
    var data;
    var browser = await puppeteer.launch();
    console.log('Open browser');

    var page = await browser.newPage();

    await page.goto(url);
    console.log('Loading ' + url + 'page.....');

    return data = await page.evaluate(() => {
        let sportLinks = getElementByXpath('//section[@id="news_home"]//h3/a[not(@class="icon_commend")]');
        sportLinks = [...sportLinks];

        let articles = sportLinks.map(link => ({
            title: link.innerText,
            id: link.getAttribute('id')
        }));

        return articles;
    })
};

function displayListArticles(array) {
    for (let index = 3; index < array.length; index++) {
        console.log('===============================')
        let value = array[index].title;
        let id = array[index].id;
        console.log(value.toString().substring(0, value.indexOf("(")));
        console.log(id);
    }
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

cron.schedule('* * * * *', function () {
    console.log('Running a task every minutes!');
    main();
});