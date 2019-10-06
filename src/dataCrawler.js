const puppeteer = require('puppeteer');
const { ImageCrawler } = require('./config/default');
const srcToImg = require('./helper/srcToImg');

(async () => {
  //  打开浏览器并打开去哪儿网移动端页面
  const browser = await puppeteer.launch();  
  const page = await browser.newPage();
  await page.goto('http://piao.qunar.com/touch//');
  console.log('go to http://piao.qunar.com/touch/');

  //  为了让页面懒加载更多图片，加大了视图大小。height太大会触发反爬虫，是否有必要？我们只是要url和文本
  await page.setViewport({
    width: 1920,
    height: 8640
  });
  console.log('reset viewport');

  //  收集swiperList的图片的src保存在swiperList数组中
  const swiperList = await page.$$eval('img.swipe-img', (images) => {
    return Array.prototype.map.call(images, img => img.src) //  querySelectorAll返回的并不是数组，我们要借用数据的map方法，所以用call实现
  })
  console.log(`get ${swiperList.length} image, start download`)
  console.log(swiperList)

  //  收集iconList的图片的src保存在iconList数组中，其标题放在iconListTitle数组中
  const iconList = await page.$$eval('div.mp-category-img-container img', (images) => {
    return Array.prototype.map.call(images, img => img.src) 
  })
  const iconListTitle = await page.$$eval('div.mp-category-img-container img', (images) => {
    return Array.prototype.map.call(images, img => img.alt) 
  })
  console.log(iconList)
  console.log(iconListTitle)

  //  收集hotswiperList的图片的src保存在hotswiperList数组中，其标题放在hotswiperListTitle数组中,其价格放在hotswiperListPri数组中
  const hotswiperList = await page.$$eval('li.mp-hotsale-item a.mp-fulllink div.mp-hotsale-imgcon img', (images) => {
    return Array.prototype.map.call(images, img => img.src) 
  })
  const hotswiperListTitle = await page.$$eval('li.mp-hotsale-item a.mp-fulllink div.mp-hotsale-imgcon img', (images) => {
    return Array.prototype.map.call(images, img => img.alt) 
  })
  const hotswiperListPri = await page.$$eval('li.mp-hotsale-item a.mp-fulllink div.mp-hotsale-price em', (images) => {
    return Array.prototype.map.call(images, img => img.innerHTML) 
  })
  console.log(hotswiperList)
  console.log(hotswiperListTitle)
  console.log(hotswiperListPri)

  //  收集前6个。收集recommendList的图片的src保存在recommendList数组中，其标题放在recommendListTitle数组中,其价格放在recommendListPri数组中
  const recommendList = await page.$$eval('li.mp-like-item a.mp-fulllink img.mp-like-img ', (images) => {
    const version1 = Array.prototype.map.call(images, img => img.src)
    const version2 = version1.slice(0,6)
    return version2
  })
  const recommendListTitle = await page.$$eval('li.mp-like-item a.mp-fulllink img.mp-like-img', (images) => {
    const version1 = Array.prototype.map.call(images, img => img.alt)
    const version2 = version1.slice(0,6)
    return version2
  })
  const recommendListPri = await page.$$eval('li.mp-like-item a.mp-fulllink em.mpg-price-num', (images) => {
    const version1 = Array.prototype.map.call(images, img => img.innerHTML)
    const version2 = version1.slice(0,6)
    return version2
  })
  console.log(recommendList)
  console.log(recommendListTitle)
  console.log(recommendListPri)

  //  收集weekendList的图片的src保存在weekendListList数组中，其标题放在weekendListListTitle数组中,其描述放在weekendListDesc数组中
  const weekendList = await page.$$eval('div.mp-product-item div.product-imgcontainer img', (images) => {
    const version1 = Array.prototype.map.call(images, img => img.src)
    const version2 = version1.slice(0,6)
    return version2
  })
  const weekendListListTitle = await page.$$eval('div.mp-product-item div.product-imgcontainer img', (images) => {
    const version1 = Array.prototype.map.call(images, img => img.alt)
    const version2 = version1.slice(0,6)
    return version2
  })
  const weekendListDesc = await page.$$eval('div.mp-product-item div.mp-product-info p.product-desc', (images) => {
    const version1 = Array.prototype.map.call(images, img => img.innerHTML)
    const version2 = version1.slice(0,6)
    return version2
  })
  console.log(weekendList)
  console.log(weekendListListTitle)
  console.log(weekendListDesc)



  await browser.close();
  
})();