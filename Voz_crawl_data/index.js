const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    console.log('Open browser');

    const page = await browser.newPage();
    const voz_f33_url = 'https://forums.voz.vn/forumdisplay.php?f=33';

    await page.goto(voz_f33_url);
    console.log('Loading page.....');

    const articles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('#threadbits_forum_33 td.alt1[title]');
        titleLinks = [...titleLinks];

        let articles = titleLinks.map(link => ({
            title: link.innerText,
            id: link.getAttribute('id')
        }));

        return articles;
    });

    function displayListArticles(array) {
        for (let index = 3; index < array.length; index++) {
            console.log('===============================')
            let value = array[index].title;
            let id = array[index].id;
            console.log(value.toString().substring(0, value.indexOf("(")));
            console.log(id);
        }
    }

    displayListArticles(articles);
    await browser.close();
})();