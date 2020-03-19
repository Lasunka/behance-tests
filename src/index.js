console.log('Hello Sponge!');

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.behance.net', { waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'] });
    await page.screenshot({path: 'screenshots/example-desktop.png'});
    await page.setViewport({width: 375, height: 812, isMobile: true});
    await page.reload();
    await page.screenshot({path: 'screenshots/example-mobile.png'});

    await browser.close();
})();