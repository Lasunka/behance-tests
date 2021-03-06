console.log('Hello Sponge!');

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, devtools: false});
    const page = await browser.newPage();
    await page.goto('https://www.behance.net', {waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']});
    await openSearch(page, 'fluffy');

    await makeDesktopAndMobileScreenshot(page, 'main-page-1');

    await browser.close();
})();

async function makeDesktopAndMobileScreenshot(page, name) {
    await page.screenshot({path: `screenshots/${name}-desktop.png`});
    await page.setViewport({width: 375, height: 812, isMobile: true});
    await page.reload();
    await page.screenshot({path: `screenshots/${name}-mobile.png`});
}

async function openSearch(page, keyword) {
    await Promise.all([
        page.click('.rf-primary-nav__link--search'),
        page.waitForNavigation({waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']}),
    ]);
    await page.type('input[type="search"]', keyword);

    await Promise.all([
       page.keyboard.press('Enter'),
        page.waitForNavigation({waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']}),
    ]);
}