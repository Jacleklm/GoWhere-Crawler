# GoWhere-Crawler
一个基于Node.js和puppteer的爬虫小项目，用于给[GoWhere项目](https://github.com/Jacleklm/GoWhere)从[去哪儿网移动端页面](http://piao.qunar.com/touch/)爬取数据（图片、评论等） 
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

// 运行文件即可对百度图片上的图片进行爬取
node Crawler.js

```
## 存在的问题
可能是自己对node.js用的还不熟练，异步函数怎么使用不数量，组件封装后似乎总是运行bug。eg. cityCrawler曾想把它拆成几部分用更优雅的写法（helper/citiescollect和helper/codegenerate），发现自己能力有限。所以现在都是用最简单粗暴的代码，先拿到爬虫结果吧，以后再来思考怎么改善。