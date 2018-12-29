//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex: function() {
    wx.redirectTo({
      url: '../index/index',
    });
  },
  onLoad: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
  },
  onShow: function() {
    
  },
  onReady: function(options) {
    app.globalData.cardid = wx.getStorageSync('cardid');
    var that = this;
    wx.request({
      url: app.globalData.baseURL+'gettoken/YCFYD/1EAD1B5C',
      success:function(res_token){
        wx.setStorageSync("village_session", res_token.header["Set-Cookie"])
        var session = wx.getStorageSync("village_session");
        console.log(session);
        app.globalData.token = res_token.data;
        var header;
        header = {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync("village_session")//读取cookie
        };
        wx.request({
          url: app.globalData.baseURL+'getcommunityid/',
          method:"POST",
          header:header,
          data: { sign: app.globalData.token, cardid: app.globalData.cardid},
          success:function(res){
            console.log(res.data);
            app.globalData.community_id = res.data.data.id,
            app.globalData.areaname = res.data.data.areaname,
            app.globalData.name = res.data.data.name,
            console.log(app.globalData.community_id + app.globalData.areaname + app.globalData.name)
            that.setData({
              remind: ""
            });
          }
        })
      }
    })
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
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

});