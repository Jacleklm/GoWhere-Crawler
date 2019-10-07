const puppeteer = require('puppeteer');
const fs = require('fs');

const Datahelper = async (bannerListNamme, bannerListImg, gallaryImgsList, recommendListTitle, recommendListPri, commentListName, commentListCon, commentListImg1, commentListImg2) => {
  var page1data = {}
  page1data.bannerList = {}
  page1data.bannerList.sightName = bannerListNamme[0]
  page1data.bannerList.bannerImg = bannerListImg[0]
  page1data.gallaryImgs = gallaryImgsList
  const preid = '00'
  const List = recommendListTitle.map((val, index) => {
    var rObj = {};
    rObj.id = preid.concat((index + 1).toString())
    rObj.title = val
    return rObj
  })
  for (var i in List) {
    List[i].price = recommendListPri[i]
  }
  page1data.recommendList = List

  const List1 = commentListName.map((val, index) => {
    var rObj = {};
    rObj.id = preid.concat((index + 1).toString())
    rObj.name = val
    return rObj
  })
  for (var i in List1) {
    List1[i].comment = commentListCon[i]
  }
  List1[0].imgUrl = commentListImg1
  List1[1].imgUrl = commentListImg2
  page1data.commentList = List1
  console.log('finish page')
  return page1data
}

module.exports = {
  Datahelper: Datahelper
}
