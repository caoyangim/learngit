//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menus: [],
    pic: [
      { url: '/image/002.jpg' },
      { url: '/image/004.jpg' },
      { url: '/image/002.jpg' },
      { url: '/image/004.jpg' }
    ] ,
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //事件处理函数
  bindToList: function(e) {
    var id = e.currentTarget.dataset.id;
    var showtype = e.currentTarget.dataset.showtype;
    var catname = this.data.menus[id].catname;
    var catid = this.data.menus[id].catid;
    let menuList = JSON.stringify(this.data.menus[id].child);
    if (showtype == "list" || showtype == "piclist"){
      wx.navigateTo({
        url: '../list/list?menuList=' + menuList + "&catname=" + catname + "&catid=" + catid
      })
    } else if (showtype == "pic"){
      wx.navigateTo({
        url: '../list_video/list_video?menuList=' + menuList + "&catname=" + catname + "&catid=" + catid
      })
    }
    
  },
  // 跳转至个人中心
  bindToPerson: function () {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  
  onLoad: function () {
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("village_session")//读取cookie
    };
    console.log("token:" + app.globalData.token + "+communityid:" + app.globalData.community_id);
    wx.request({
      url: app.globalData.baseURL+'getcatetory/',
      method:'POST',
      header:header,
      data: { sign: app.globalData.token, communityid: app.globalData.community_id },
      success:function(res){
        console.log(res.data.data);
        that.setData({
          menus:res.data.data
        })
      }
    })
  },
  

  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
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
  
})
