// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    catid: 0,
    id: 0,
    time:"",
    msgDetail: []
  },
  onLoad: function (options) {
    //获取传来的数据menulist 
    this.setData({
      id: options.id,
      catid: options.catid
    });

    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("village_session")//读取cookie
    };
    wx.request({
      url: app.globalData.baseURL + 'getinfo/',
      method: "POST",
      header: header,
      data: { sign: app.globalData.token, communityid: app.globalData.community_id, catid: that.data.catid,id:that.data.id },
      success: function (res) {
        that.setData({
          msgDetail: res.data.data,
          time: util.toDate(res.data.data[0].inputtime)
        });
        var article = that.data.msgDetail[0].content;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
    
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {

      title: '美丽乡村小程序',

      //desc: '自定义分享描述',

      //path: '/page/user?id=123'

      imageUrl: '/image/002.jpg',

      success() {
        wx.showToast({
          title: '转发成功！',
          mask:true
        })
      }
    }
  },

  shareTap:function(){
    console.log("share");
    wx.showShareMenu({
      success(){
        wx.showToast({
          title: 'success',
        })
      }
    })
  }


})
