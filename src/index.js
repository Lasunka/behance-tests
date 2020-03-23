console.log('Hello Sponge!');

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, devtools: true});
    const page = await browser.newPage();
    await page.goto('https://www.behance.net', { waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'] });
    await makeDesktopAndMobileScreenshot(page, 'main-page-1');

    await browser.close();
})();

async function makeDesktopAndMobileScreenshot(page, name) {
    await page.screenshot({path: `screenshots/${name}-desktop.png`});
    await page.setViewport({width: 375, height: 812, isMobile: true});
    await page.reload();
    await page.screenshot({path: `screenshots/${name}-mobile.png`});
}