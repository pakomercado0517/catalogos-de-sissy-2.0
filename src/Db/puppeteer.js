import puppeteer from "puppeteer";
import fs from "fs/promises";

const URL = "https://www.priceshoes.com/catalogos";
async function webScraping() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const arr = [];

    await page.goto(URL);

    const lists = await page.$$(
      '[class="relative sm:bg-gray-100 flex items-center overflow-hidden"]'
    );

    for (const list of lists) {
      const enlace = await list.$("a");
      const href = await list.$eval("a[href]", (el) => el.href);
      if (enlace) {
        const imgSrc = await enlace.$eval("img", (item) => item.src);
        console.log({ href, imgSrc });
        arr.push({ href, imgSrc });
      }
    }

    await fs.writeFile("links.json", JSON.stringify(arr, null, 2));

    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

webScraping();
