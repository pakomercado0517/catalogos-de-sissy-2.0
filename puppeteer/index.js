import puppeteer from "puppeteer";
import fs from "fs/promises";

const catalogs = [];
const fileURL = "../src/Db/catalogos.json";

async function priceShoesScraping() {
  const arr = [];
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.priceshoes.com/catalogos");

    const lists = await page.$$(
      '[class="relative sm:bg-gray-100 flex items-center overflow-hidden"]'
    );

    for (const list of lists) {
      const enlace = await list.$("a");
      const href = await list.$eval("a[href]", (el) => el.href);
      if (enlace) {
        const imgSrc = await enlace.$eval("img", (item) => item.src);
        // console.log({ href, imgSrc });
        arr.push({ href, imgSrc });
      }
    }

    const result = {
      priceShoes: arr,
    };
    catalogs.push(result);

    await fs.writeFile(fileURL, JSON.stringify(catalogs, null, 2));
    await browser.close();
  } catch (error) {
    console.log(error.message);
  }
}

async function andreaScraping() {
  const arr = [];
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-cache"],
    });

    const page = await browser.newPage();
    await page.goto("https://mx.andrea.com/catalogos");
    await page.click("#state-mx");
    await page.keyboard.press("KeyV");
    await page.keyboard.press("Enter");
    await page.waitForSelector("main");
    const main = await page.$("main");
    const wrapper = await main.$(".catalog-wrapper");
    const reCentral = await wrapper.$$(".re-central");
    const divRow = await reCentral[1].$(".row");
    const colMain = await divRow.$(".col-main.cols-main-catalogs");
    const todosCat = await colMain.$(".todoscat");
    const catalogosxCat = await todosCat.$(".catalogosxcat");
    const ulCat = await catalogosxCat.$("ul");
    await ulCat.waitForSelector("li");
    const lists = await ulCat.$$(".sub_cat");

    for (const list of lists) {
      const enlace = await list.$("a");
      const title = await list.$eval(".cattit", (t) => t.textContent);
      const href = await list.$eval("a[href]", (el) => el.href);
      if (enlace) {
        const imgSrc = await enlace.$eval("img", (item) => item.src);
        // console.log({ href, imgSrc });
        arr.push({ href, imgSrc, title });
      }
    }

    const result = {
      andrea: arr,
    };
    catalogs.push(result);

    await fs.writeFile(fileURL, JSON.stringify(catalogs, null, 2));

    await browser.close();
  } catch (error) {
    console.log(error.message);
  }
}

async function cklassScraping() {
  const arr = [];
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-cache"],
    });

    const page = await browser.newPage();
    await page.goto("https://cklass.com/pages/catalogos");
    const main = await page.$("main");
    const sectionTemplate = await main.$(
      "#shopify-section-template--19024347791652__d0e59c19-e68b-4d75-a5a1-83624c38baf5"
    );
    const gridContainer = await sectionTemplate.$(".catalogue-grid-container");
    const lists = await gridContainer.$$(".catalogue-grid-item");

    for (const list of lists) {
      const enlace = await list.$("a");
      const href = await list.$eval("a[href]", (el) => el.href);
      const title = await list.$eval(
        ".catalogue-grid-caption",
        (t) => t.textContent
      );
      if (enlace) {
        const imgSrc = await enlace.$eval("img", (item) => item.src);
        // console.log({ href, imgSrc });
        arr.push({ href, imgSrc, title });
      }
    }

    const result = {
      cklass: arr,
    };
    catalogs.push(result);

    await fs.writeFile(fileURL, JSON.stringify(catalogs, null, 2));

    await browser.close();
  } catch (error) {
    console.log(error.message);
  }
}

// Llamar a las funciones
priceShoesScraping();
andreaScraping();
cklassScraping();
