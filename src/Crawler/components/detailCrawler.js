const puppeteer = require('puppeteer');
const fs = require('fs');
const { Datahelper } = require('../helper/Datahelper')
const { PageDataCollector } = require('../helper/PageDataCollector')

const detailCrawler = async () => {
  //  收集 首页-猜你喜欢 中6个详情页的数据
  const page1 = await PageDataCollector(1)
  const page2 = await PageDataCollector(2)
  const page3 = await PageDataCollector(3)
  const page4 = await PageDataCollector(4)
  const page5 = await PageDataCollector(5)
  const page6 = await PageDataCollector(6)
  var data1 = []
  data1.push(page1)
  data1.push(page2)
  data1.push(page3)
  data1.push(page4)
  data1.push(page5)
  data1.push(page6)

  //  生成detail.json文件
  var pageid = '000'
  const js = {
    ret: true,
    data: {}
  }
  js.data.detail = data1.map((item, index) => {
    item.id = pageid.concat((index + 1).toString())
    return item
  })
  const json = JSON.stringify(js, null, 2)
  console.log('JSON file has benn gengrated')
  fs.writeFile('../../static/mock/detail.json', json, {
    encoding: 'utf8'
  }, err => {
    if (err) throw err
    console.log('所有数据收集完毕！)
  })
};

module.exports = detailCrawler
