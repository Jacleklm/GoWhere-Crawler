const puppeteer = require('puppeteer');
const fs = require('fs');

const indexCrawler = async () => {
  //  打开浏览器并打开去哪儿网移动端城市选择页面
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://piao.qunar.com/touch/toNewCityList.htm');
  console.log('go to http://piao.qunar.com/touch/toNewCityList.htm');

  // //  为了让页面懒加载更多图片，加大了视图大小。height太大会触发反爬虫。
  // await page.setViewport({
  //   width: 1920,
  //   height: 8640
  // });
  // console.log('reset viewport');

  //  设置页面成移动端（这里是iphone X），方便click
  await page.setViewport({
    width: 750,
    height: 1624
  });
  console.log('reset viewport');

  //  切换到北京的页面
  await page.click('#city-domestic > ul.mp-list.mp-tr3 > li:nth-child(1) > a')
  page.on('load', async () => {
    //  收集swiperList的图片的src保存在swiperListSrc数组中
    const swiperListSrc = await page.$$eval('img.swipe-img', (images) => {
      return Array.prototype.map.call(images, img => img.src) //  querySelectorAll返回的并不是数组，我们要借用数据的map方法，所以用call实现
    })
    console.log(`get ${swiperListSrc.length} image, start download`)

    //  收集iconList的图片的src保存在iconListSrc数组中，其标题放在iconListTitle数组中
    const iconListSrc = await page.$$eval('div.mp-category-img-container img', (images) => {
      return Array.prototype.map.call(images, img => img.src)
    })
    const iconListTitle = await page.$$eval('div.mp-category-img-container img', (images) => {
      return Array.prototype.map.call(images, img => img.alt)
    })

    //  收集hotswiperList的图片的src保存在hotswiperListSrc数组中，其标题放在hotswiperListTitle数组中,其价格放在hotswiperListPri数组中
    const hotswiperListSrc = await page.$$eval('li.mp-hotsale-item a.mp-fulllink div.mp-hotsale-imgcon img', (images) => {
      return Array.prototype.map.call(images, img => img.src)
    })
    const hotswiperListTitle = await page.$$eval('li.mp-hotsale-item a.mp-fulllink div.mp-hotsale-imgcon img', (images) => {
      return Array.prototype.map.call(images, img => img.alt)
    })
    const hotswiperListPri = await page.$$eval('li.mp-hotsale-item a.mp-fulllink div.mp-hotsale-price em', (images) => {
      return Array.prototype.map.call(images, img => img.innerHTML)
    })

    //  收集前6个。收集recommendList的图片的src保存在recommendListSrc数组中，其标题放在recommendListTitle数组中,其价格放在recommendListPri数组中
    const recommendListSrc = await page.$$eval('li.mp-like-item a.mp-fulllink img.mp-like-img ', (images) => {
      const version1 = Array.prototype.map.call(images, img => img.src)
      const version2 = version1.slice(0, 6)
      return version2
    })
    const recommendListTitle = await page.$$eval('li.mp-like-item a.mp-fulllink img.mp-like-img', (images) => {
      const version1 = Array.prototype.map.call(images, img => img.alt)
      const version2 = version1.slice(0, 6)
      return version2
    })
    const recommendListPri = await page.$$eval('li.mp-like-item a.mp-fulllink em.mpg-price-num', (images) => {
      const version1 = Array.prototype.map.call(images, img => img.innerHTML)
      const version2 = version1.slice(0, 6)
      return version2
    })

    //  收集weekendList的图片的src保存在weekendListListSrc数组中，其标题放在weekendListListTitle数组中,其描述放在weekendListDesc数组中
    const weekendListSrc = await page.$$eval('div.mp-product-item div.product-imgcontainer img', (images) => {
      const version1 = Array.prototype.map.call(images, img => img.src)
      const version2 = version1.slice(0, 6)
      return version2
    })
    const weekendListListTitle = await page.$$eval('div.mp-product-item div.product-imgcontainer img', (images) => {
      const version1 = Array.prototype.map.call(images, img => img.alt)
      const version2 = version1.slice(0, 6)
      return version2
    })
    const weekendListDesc = await page.$$eval('div.mp-product-item div.mp-product-info p.product-desc', (images) => {
      const version1 = Array.prototype.map.call(images, img => img.innerHTML)
      const version2 = version1.slice(0, 6)
      return version2
    })
    console.log('finish collecting')
    await browser.close();

    //  生成index的json文件
    const js = {
      ret: true,
      data: {}
    }
    const preid = '000'
    const List = swiperListSrc.map((val, index) => {
      var rObj = {};
      rObj.id = preid.concat((index + 1).toString())
      rObj.imgUrl = val
      return rObj
    })

    const List2 = iconListSrc.map((val, index) => {
      var rObj = {};
      rObj.id = preid.concat((index + 1).toString())
      rObj.imgUrl = val
      return rObj
    })
    for (var i in List2) {
      List2[i].desc = iconListTitle[i]
    }
    const List3 = hotswiperListSrc.map((val, index) => {
      var rObj = {};
      rObj.id = preid.concat((index + 1).toString())
      rObj.imgUrl = val
      return rObj
    })
    for (var i in List3) {
      List3[i].title = hotswiperListTitle[i]
    }
    for (var i in List3) {
      List3[i].price = hotswiperListPri[i]
    }
    const List4 = recommendListSrc.map((val, index) => {
      var rObj = {};
      rObj.id = preid.concat((index + 1).toString())
      rObj.imgUrl = val
      return rObj
    })
    for (var i in List4) {
      List4[i].title = recommendListTitle[i]
    }
    for (var i in List4) {
      List4[i].price = recommendListPri[i]
    }
    const List5 = weekendListSrc.map((val, index) => {
      var rObj = {};
      rObj.id = preid.concat((index + 1).toString())
      rObj.imgUrl = val
      return rObj
    })
    for (var i in List5) {
      List5[i].title = weekendListListTitle[i]
    }
    for (var i in List5) {
      List5[i].desc = weekendListDesc[i]
    }
    js.data.swiperList = List
    js.data.iconList = List2
    js.data.hotswiperList = List3
    js.data.recommendList = List4
    js.data.weekendList = List5
    const json = JSON.stringify(js, null, 2)
    console.log('JSON file has benn gengrated')

    fs.writeFile('../../static/mock/index.json', json, {
      encoding: 'utf8'
    }, err => {
      if (err) throw err
      console.log('Done')
    })
  })



};

module.exports = indexCrawler
