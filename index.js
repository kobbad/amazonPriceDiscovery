const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


const url = 'https://www.amazon.com/hz/wishlist/genericItemsPage/1FAS51AUY59QB?ref_=wl_share';
var links = [];
const prefix = "https://www.amazon.com";
var products = [];

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function configureBrowser2(url2) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url2);
  return page;
}

async function checkPrice(page) {
    await page.reload();
    let html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    // console.log(html);

    // $('#priceblock_ourprice', html).each(function() {
    //     let dollarPrice = $(this).text();
    //     console.log(dollarPrice);

    // });

    $('.a-link-normal.wl-image-overlay').each( (index, value) => {
      var link = $(value).attr('href');
      links.push({"link": link});
      // console.log("worked");
   });
  // $('a').each(function() {
  //   var text = $(this).text();
  //   var link = $(this).attr('href');
  //   console.log(text + ' --> ' + link);
  // });
  // let fel = $('main').children().first();
  // console.log("test");
  // console.log(fel.get(0).tagName);
}

async function checkPrice2(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  // console.log(html);

  $('.a-size-large.product-title-word-break', html).each(function() {
    let dollarPrice = $(this).text();
    console.log(dollarPrice.trim());

});
  $('#priceblock_ourprice, #priceblock_dealprice', html).each(function() {
      let dollarPrice = $(this).text();
      console.log(dollarPrice);

  });
  $('.a-dynamic-image.a-stretch-vertical', html).each(function() {
    let dollarPrice = $(this).attr('src');
    console.log(dollarPrice);

});




}

async function parseItem(){
  var arrayLength = links.length;
  for (var i = 0; i<arrayLength;i++){
    // console.log(prefix.concat(links[i].link));
    var new_url = prefix.concat(links[i].link);
    let page = await configureBrowser2(new_url);
    await checkPrice2(page);

  }
}

async function monitor() {
  let page = await configureBrowser();
  await checkPrice(page);
  await parseItem();
  // console.log(links);

}

monitor();

