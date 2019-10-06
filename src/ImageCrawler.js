const puppeteer = require('puppeteer');
const { ImageCrawler } = require('./config/default');
const srcToImg = require('./helper/srcToImg');

(async () => {
  const browser = await puppeteer.launch();  //  打开浏览器的意思，可以在里面写{headless: false}会真的打开浏览器，也可以用其他浏览器而不是chrome
  const page = await browser.newPage();  //  打开页面
  await page.goto('https://image.baidu.com/');
  console.log('go to https://image.baidu.com/');

  await page.setViewport({ //  为了让页面懒加载更多图片，加大了视图大小。height太大会触发反爬虫
    width: 1920,
    height: 1080
  });
  console.log('reset viewport');

  await page.focus('#kw'); //  kw是那个页面搜索框的id
  await page.keyboard.sendCharacter('柯基');
  await page.keyboard.press('Enter');  //  按下确定键
  console.log('go to search list');

  page.on('load', async () => { //  等待页面加载完就会触发load时间，就调用回调函数获取图片
    console.log('page loading done, start fetch...');

    // const srcs = await page.evaluate(() => {
    //   const images = document.querySelectorAll('img.main_img');  //  发现想爬的图片都有main_img这个类
    //   return Array.prototype.map.call(images, img => img.src) //  querySelectorAll返回的并不是数组，我们要借用数据的map方法，所以用call实现
    // })
    const srcs = await page.$$eval('img.main_img', (images) => {
      return Array.prototype.map.call(images, img => img.src)
    })
    console.log(`get ${srcs.length} image, start download`)

    srcs.forEach(async(src) => { // 遍历数组把src变成图片，这个操作的srcToImg函数存在另一个js文件中了
      //  一个反反爬虫的方法，在页面出现某种情况再爬取（eg. 等一段时间），用page.waitfor()
      await page.waitFor(200);
      await srcToImg(src, ImageCrawler)
    });
    await browser.close();
  })
})();