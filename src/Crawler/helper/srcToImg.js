const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);  //  改写


module.exports = async(src, dir) => {
  if (/\.(jpg|png|gif)$/.test(src)) {
    await urlToImg(src, dir) ;
  } else {
    await base64ToImg(src, dir);
  }
};

//  url => image
const urlToImg = promisify((url, dir, callback) => {
  const mod = /^https:/.test(url) ? https : http //  判断url是http还是https
  const ext = path.extname(url)  //  拿到url对应image的后缀
  const file = path.join(dir, `${Date.now()}${ext}`)
  mod.get(url, response => {  //  GET到图片之后写文件,并同时监听finish事件
    response.pipe(fs.createWriteStream(file))
      .on('finish', () => {
        callback();
        console.log(file);
      })
  })
})

//  base64 => image
const base64ToImg = async (base64Str, dir) => {
  //  base64图片一般是这样的   data:image/jpeg;base64,/asdsda  ,想获取image/jpeg这部分
  const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);
  try {
    const ext = matches[1].split('/')[1]
      .replace('jpeg', 'jpg') //  当后缀是jpeg的时候希望换成jpg
    const file = path.join(dir, `${Date.now()}.${ext}`)
    await writeFile(file, matches[2], 'base64');
    console.log(file)
  } catch(ex) {
    console.log('非法base64字符串')
  }
}