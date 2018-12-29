var app = getApp();
Page({
  data: {
    isShowMenu:false,
    menuList:[],
    catname:"",
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: []
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
  
  // 滚动切换标签样式
  switchTab: function (e) {
    var that = this;
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();

    //获取list数据
    this.getlist(that.data.menuList[that.data.currentTab].catid);

  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this;
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      //获取list数据
      this.getlist(that.data.menuList[that.data.currentTab].catid);
    }

  },

  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 5) {
      this.setData({
        scrollLeft: this.data.currentTab*100
      })
    } else if (this.data.currentTab <= 5 && this.data.currentTab >3) {
      this.setData({
        scrollLeft: 300
      })
    } else if (this.data.currentTab <= 3 && this.data.currentTab > 2) {
      this.setData({
        scrollLeft: 190
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function (option) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });

    //获取传来的数据menulist 
    that.setData({
      menuList: JSON.parse(option.menuList),
      catname: option.catname
    });

    if (option.menuList == "[]") {
      console.log(option.catid);
      this.getlist(option.catid);
    } else {
      that.setData({
        isShowMenu:true
      });
      this.getlist(that.data.menuList[that.data.currentTab].catid);
    }

  },
  footerTap: app.footerTap,

  // 跳转至内容页
  bindToContent:function(e){
    var i = e.currentTarget.dataset.id;
    if (this.data.expertList[i].videolink == '' || this.data.expertList[i].videolink == null){
      wx.navigateTo({
        url: '../article/article?id=' + this.data.expertList[i].id + '&catid=' + this.data.expertList[i].catid,
      })
    }else{
      wx.navigateTo({
        url: '../video/video?videolink=' + this.data.expertList[i].videolink +'&id=' + this.data.expertList[i].id + '&catid=' + this.data.expertList[i].catid,
      })
    }
  },

  // 获取list数据方法
  getlist:function(catid){
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
      data: { sign: app.globalData.token, communityid: app.globalData.community_id, catid: catid, nStart: 0, nEnd:20},
      success: function (res) {
        that.setData({
          expertList: res.data.data
        });
      }
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