const { Datahelper } = require('./Datahelper')
const puppeteer = require('puppeteer');

const PageDataCollector = async (n) => {
  //  打开浏览器并打开去哪儿网移动端城市选择页面
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://piao.qunar.com/touch/toNewCityList.htm');
  console.log('go to http://piao.qunar.com/touch/toNewCityList.htm');

  //  设置页面成移动端（这里是iphone X），方便滚动页面
  await page.setViewport({
    width: 375,
    height: 812
  });
  
   //  切换到北京的首页页面
  await page.click('#city-domestic > ul.mp-list.mp-tr3 > li:nth-child(1) > a')
  await page.waitFor(1000);
  console.log('Go to Home page');

  //  打开‘猜你喜欢’的第n个,然后滚动页面触发图片的懒加载
  await page.click(`#mp-main > div:nth-child(5) > ul > li:nth-child(${n}) > a > div.mp-like-info > div.mp-like-title.mp-ellipsis`)
  await page.waitFor(500);
  
  await page.evaluate(function () {
    const element = document.querySelector('#list-container > div.mp-comment-container.mp-border-bottom > div > div:nth-child(1) > div.mp-comment-stardate')
    element.scrollIntoView()
  })
  await page.waitFor(1000);
  //  收集recommendList（去哪儿推荐），标题存在recommendListTitle数组中，价格存在recommendListPri数组中
  const recommendListTitle = await page.$$eval('div.mp-promote div.mp-ticket-item div.mp-ticket-main h6.mp-ticket-title', (data) => {
    return Array.prototype.map.call(data, da => da.innerHTML)
  })
  const recommendListPri = await page.$$eval('div.mp-promote div.mp-ticket-item div.mp-ticket-side strong.mp-ticket-sale em.mp-price-num', (data) => {
    return Array.prototype.map.call(data, da => da.innerHTML)
  })

  //  收集commentList（评论），游客名存在commentListName数组中，评论内容存在commentListCon数组中，评论图片在commentListImg数组中
  const commentListName1 = await page.$$eval('div.mp-comment-item div.mp-comment-stardate span.mp-comment-date', (data) => {
    return Array.prototype.map.call(data, da => da.innerHTML)
  })
  // 把游客名中的&nbsp;&nbsp;替换成两个空格
  commentListName = commentListName1.map(element => element.replace('&nbsp;&nbsp;', '  '));
  const commentListCon = await page.$$eval('div.mp-comment-item p.mp-comment-content', (data) => {
    return Array.prototype.map.call(data, da => da.innerHTML)
  })
  const commentListImg1 = await page.$$eval('#list-container > div.mp-comment-container.mp-border-bottom > div > div:nth-child(1) > div.mp-comment-imgs img.mp-comment-img', (data) => {
    const version1 = Array.prototype.map.call(data, da => da.src)
    const version2 = version1.slice(0, 6)
    return version2
  })
  const commentListImg2 = await page.$$eval('#list-container > div.mp-comment-container.mp-border-bottom > div > div:nth-child(2) > div.mp-comment-imgs img.mp-comment-img', (data) => {
    const version1 = Array.prototype.map.call(data, da => da.src)
    const version2 = version1.slice(0, 6)
    return version2
  })
  console.log(commentListImg1)
  console.log(commentListImg2)

  //  收集bannerList，景区名存在bannerListNamme数组中，图片存在bannerListImg数组中
  await page.evaluate(function () {
    window.scrollTo(0, 100)
  })
  await page.waitFor(500);
  const bannerListNamme = await page.$$eval('#main-page > div.mp-main > div.mp-headfigure > div.mp-headfeagure-info > div', (data) => {
    return Array.prototype.map.call(data, da => da.innerHTML)
  })
  const bannerListImg = await page.$$eval('#imgcontainer > img', (data) => {
    return Array.prototype.map.call(data, da => da.src)
  })

  //  收集gallaryImgs，存在gallaryImgsList数组中
  await page.click('#imgcontainer > img')
  await page.waitFor(2000);
  const gallaryImgsList = await page.$$eval('div.mp-images-list div.mp-images-con img', (data) => {
    return Array.prototype.map.call(data, da => da.src)
  })
  //  开始这个页面的数据整理
  const page1data = await Datahelper(bannerListNamme, bannerListImg, gallaryImgsList, recommendListTitle, recommendListPri, commentListName, commentListCon, commentListImg1, commentListImg2)
  return page1data
}

module.exports = {
  PageDataCollector: PageDataCollector
}
