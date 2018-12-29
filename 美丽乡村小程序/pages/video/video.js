// pages/video/video.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catid: 0,
    id: 0,
    navbar: ['简介', '相关视频'],
    title:"",
    date:"",
    description:"",
    items: [],
    currentTab: 0,
    videolink:''
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取传来的数据expertList
    console.log(options.videolink);
    that.setData({
      videolink: options.videolink,
      id: options.id,
      catid: options.catid
    });

    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("village_session")//读取cookie
    };
    wx.request({
      url: app.globalData.baseURL + 'getinfo/',
      method: "POST",
      header: header,
      data: { sign: app.globalData.token, communityid: app.globalData.community_id, catid: that.data.catid, id: that.data.id },
      success: function (res) {
        console.log(res.data)
        that.setData({
          title: res.data.data[0].title,
          date: util.toDate(res.data.data[0].inputtime),
          description:res.data.data[0].description
        });
      }
    }),

    this.getlist(that.data.catid);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '快来围观属于你的美丽乡村小程序吧！',
      success() {
        wx.showToast({
          title: '转发成功！',
          mask: true
        })
      }
    }
  },

  videoErrorCallback:function(){
    wx.showToast({
      title: '视频源失效，请欣赏其他视频。',
      icon:'none',
      duration: 2000
    })
  },

  // 获取list数据方法
  getlist: function (catid) {
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("village_session")//读取cookie
    };
    wx.request({
      url: app.globalData.baseURL + 'getlists/',
      method: "POST",
      header: header,
      data: { sign: app.globalData.token, communityid: app.globalData.community_id, catid: catid, nStart: 0, nEnd: 20 },
      success: function (res) {
        that.setData({
          items: res.data.data
        });
      }
    })
  },

  // 跳转至内容页
  bindToContent: function (e) {
    var i = e.currentTarget.dataset.id;
    console.log("asdfdasfsd" + i)
    if (this.data.items[i].videolink == '' || this.data.items[i].videolink == null) {
      wx.navigateTo({
        url: '../article/article?id=' + this.data.items[i].id + '&catid=' + this.data.items[i].catid,
      })
    } else {
      wx.navigateTo({
        url: '../video/video?videolink=' + this.data.items[i].videolink + '&id=' + this.data.items[i].id + '&catid=' + this.data.items[i].catid,
      })
    }
  },
})