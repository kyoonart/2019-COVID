// 爬取丁香园网站的疫情数据
// 在node端要有一个帮助我请求丁香园网站
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
    // superagent.get(url).then()
    // 1. 请求目标网站
const url = `https://ncov.dxy.cn/ncovh5/view/pneumonia`
superagent
    .get(url)
    .then(res => {
        // 浏览器可以解析html 但是node端不行
        // 2. 去解析html字符串从里面提取对应疫情数据
        const $ = cheerio.load(res.text) // 然后就可以通过jQuery的方法操作dom
            // 获取全国疫情信息数据
        var $getListByCountryTypeService1 = $('#getListByCountryTypeService1').html()
        var $getAreaStat = $('#getAreaStat').html()
        var $getStatisticsService = $('#getStatisticsService').html()
            // console.log($getListByCountryTypeService1)
            // 使用字符切割 正则匹配 eval函数
        var dataObj = {}
        eval($getListByCountryTypeService1.replace(/window/g, 'dataObj'))
        eval($getAreaStat.replace(/window/g, 'dataObj'))
        eval($getStatisticsService.replace(/window/g, 'dataObj'))
            // console.log(dataObj)
            // 3. fs写入数据到本地
        fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(dataObj), err => {
            if (err) throw err
            console.log('数据写入成功')
        })
    })
    .catch(err => {
        throw err
    })
