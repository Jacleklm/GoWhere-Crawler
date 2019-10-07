# GoWhere-Crawler
一个基于Node.js和puppteer的爬虫小项目，用于给[GoWhere项目](https://github.com/Jacleklm/GoWhere)从[去哪儿网移动端页面](http://piao.qunar.com/touch/)爬取数据（图片、价格、评论等） 
## 使用
```javascript
//  复制到本地
git clone git@github.com:Jacleklm/Image-Crawler.git

//  定位到该文件夹
cd GoWhere-Crawler

//  安装依赖
npm install puppeteer --save

//  定位到该文件夹
cd src
cd Crawler

// 运行该文件即可对去哪儿网的数据进行爬取,生成的JSON文件放在 /static/mock 中
node Crawler.js

```
## 存在的问题
* 代码有些不优雅，先拿到爬虫结果吧，以后再来思考怎么改善；
* 在爬取详情页面的时候由于要挪动到图片的位置触发图片加载，用element.scrollIntoView(),但是由于各页面实际情况可能有点不同，有时候会出bug，暂时还无法解决。如果bug出现太频繁，建议先注释掉Crawler.js中的detailCrawler()，拿到index.json和city.json后再单独运行detailCrawler()拿到detail.json。