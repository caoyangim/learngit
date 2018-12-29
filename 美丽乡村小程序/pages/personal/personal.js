var app = getApp()

Page({
  data: {
    cardid:"",
    areaname: "",
    name: "",
    toastHidden: true,
    toastContent: '',
    userListInfo: [{
      leftItem: '个人信息',
      showArrow: true,
    }, {
      leftItem: '绑定其他卡',
      margin: '20rpx',
      showArrow: true,
    }, {
      leftItem: '当前版本',
      rightItem: 'V 1.0.0 (内测版)',
      margin: '20rpx',
      showArrow: false,
    }]
  },

  onLoad: function () {
    //调用应用实例的方法获取全局数据
    this.setData({
      cardid: app.globalData.cardid,
      areaname: app.globalData.areaname,
      name: app.globalData.name
    })
  },

  toastChange: function () {
    this.setData({
      toastHidden: true
    })
  },

  headTap(e) {
    //更新数据
    this.setData({
      toastHidden: false,
      toastContent: "点击头部"
    })
  },

  cellItemClick(e) {
    var index = e.currentTarget.dataset.index
    console.log("index = " + index)
    //更新数据
    this.setData({
      //toastHidden: false,
      toastContent: "点击" + index
    })
    if (index == 0) {
      wx.navigateTo({
        url: '/pages/myself/myinfo/myinfo',
      })
    } else if (index == 1) {
      wx.scanCode({
        success: (res) => {
          console.log("扫码结果"+res.result);
          console.log(res.result.length);
          if (!isNaN(res.result)&&res.result.length==16){
            // 扫码结构是否为数字
            app.globalData.cardid = res.result,
            wx.setStorageSync("cardid", res.result)
            wx.reLaunch({
              url: '/pages/start/start',
            })
          }else{
            // 不是数字，扫错了
            this.setData({
              toastHidden: false,
              toastContent: "扫描失败，请确认此卡为ic卡"
            })
          }
          
        },
        fail: (res) => {
          console.log(res);
          this.setData({
            toastHidden: false,
            toastContent: "请确认此卡为ic卡"
          })
        }
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '/pages/orders/seeorder/seeorders',
      })
    } else if (index == 3) {
      wx.navigateTo({
        url: '/pages/myself/feedback/feedback',
      })
    }
  },
})