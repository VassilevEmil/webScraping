import * as cheerio from "cheerio";
import url from "url";
import fetch from "node-fetch";

// scraping f1 drivers

async function getFormulaOneDrivers() {
  try {
    const response = await fetch("https://www.formula1.com/en/drivers.html");
    const body = await response.text();
    // console.log(body);
    const $ = cheerio.load(body);

    // const wrapper = $(".listing-items--wrapper");
    // console.log(wrapper.length);

    const items = [];
    $(".listing-items--wrapper > .row > .col-12").map((i, el) => {
      const rank = $(el).find(".rank").text();
      const points = $(el).find(".points > .f1-wide--s").text();
      const fName = $(el).find(".listing-item--name span:first").text();
      const lName = $(el).find(".listing-item--name span:last").text();
      const team = $(el).find(".listing-item--team").text();

      const photo = $(el).find(".listing-item--photo img").attr("data-src");

      items.push({
        fName,
        lName,
        team,
        rank,
        points,
        photo,
      });
    });

    console.log(items);
  } catch (error) {
    console.log(error);
  }
}

// Scraping blockchain news from Denmark

async function getNewsFromDenmark() {
  try {
    const response = await fetch("https://cointelegraph.com/tags/denmark");
    const body = await response.text();

    // console.log(body);

    const $ = cheerio.load(body);

    // const items = [];
    // $(".tag-page > .container ").map((i, el) => {
    //   const test = $(el).find(".posts-listing__list").text();
    //   const title = $(el).find(".posts-listing__list article:first").text();
    //   const text = $(el).find(".post-card-inline__header").text();

    //   console.log(text);
    //   items.push({
    //     title,
    //   });
    // });

    const headers = [];
    const baseUrl = "https://cointelegraph.com";

    $(".tag-page > .container ").each((i, el) => {
      $(el)
        .find(".posts-listing__list article")
        .each((j, article) => {
          const title = $(article)
            .find(".post-card-inline__header")
            .text()
            .trim();
          const text = $(el).find(".post-card-inline__text").text();
          const link = $(el).find("a").attr("href");
          const fullUrl = url.resolve(baseUrl, link);
          headers.push({
            title,
            text,
            fullUrl,
          });
        });

      console.log(headers);
    });

    // console.log(items);
  } catch (error) {
    console.log(error);
  }
}
// getFormulaOneDrivers();
getNewsFromDenmark();
