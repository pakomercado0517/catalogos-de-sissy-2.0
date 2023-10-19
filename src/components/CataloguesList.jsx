import { useState, useEffect } from "react";
import { priceShoes } from "../Db/vendors";
import puppeteer from "puppeteer";

export default function CataloguesList() {
  const vendor = priceShoes;
  const [catalogData, setCatalogData] = useState({});

  useEffect(() => {
    const getElements = async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const arr = [];

      console.log("vendor", vendor);

      await page.goto(vendor.url);

      const quotes = await page.$$(`${vendor.quotes}`);

      for (const list of quotes) {
        const enlace = await list.$("a");
        const href = await list.$eval("a[href]", (el) => el.href);
        if (enlace) {
          const imgSrc = await enlace.$eval("img", (item) => item.src);
          console.log({ href, imgSrc });
          arr.push({ href, imgSrc });
        }
      }

      // await fs.writeFile('links.json', JSON.stringify(arr, null, 2))

      await browser.close();

      setCatalogData(arr);
    };

    getElements();
  }, [vendor]);

  console.log("catalogData", catalogData);

  return <div>CataloguesList</div>;
}
