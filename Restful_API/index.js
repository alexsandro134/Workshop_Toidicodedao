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
    var data = [];

    db.set('articles', data).write();

    data = await crawlData();

    db.get('articles').push(data).write();
    displayListArticles(data);
    // await browser.close();
}

async function crawlData() {
    var data;
    var browser = await puppeteer.launch();
    console.log('Open browser');

    var page = await browser.newPage();
    var voz_f33_url = 'https://forums.voz.vn/forumdisplay.php?f=33';

    await page.goto(voz_f33_url);
    console.log('Loading page.....');

    return data = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('#threadbits_forum_33 td.alt1[title]');
        titleLinks = [...titleLinks];

        let articles = titleLinks.map(link => ({
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

cron.schedule('* * * * *', function () {
    console.log('Running a task every 60 minutes!');
    main();
});