(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.WX = factory();
  }
}(this, function () {
  // methods

  /*====数据监测====*/
  var tgTracker;

  function statisticalMonitoring(shareContent, shareType) {
    var trackerUrl = shareContent.link.split('?')[0];
    var action = shareType ? "ShareSuccess" : "ShareFailed";
    tgTracker.pushExtend("desc", shareContent.desc);
    tgTracker.pushExtend("title", shareContent.title);
    tgTracker.pushExtend("link", shareContent.link);
    tgTracker.pushExtend("imgUrl", shareContent.imgUrl);
    tgTracker.trackEvent(trackerUrl, action);
    ga('send', {
      hitType: 'event',
      eventCategory: shareContent.title,
      eventAction: shareContent.link,
      eventLabel: shareContent.shareDesc
    });
  }

  function loadAnalyJs() {
    // 大数据监控
    loadjs('https://analy.vipabc.com/analysisCollect/data.min.js', function () {
      tgTracker = _tat.getTracker();
      tgTracker.trackPageView();
    });
    // ga监控
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-98503714-1', 'auto');
    ga('send', 'pageview');
  }
  /*============*/

  function ajax(opt) {
    opt = opt || {};
    opt.type = 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in opt.data) {
      params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    xmlHttp.open(opt.type, opt.url, opt.async);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var result = eval("(" + xmlHttp.responseText + ")");
        opt.success(result);
      }
    };
  }

  function loadjs(src, callback) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        callback();
      }
    }
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }

  function configWX(data, initFun) {
    if (data) {
      if ((typeof wx) != "undefined") {
        wx.config({
          debug: false,
          appId: data.AppID,
          timestamp: data.Timestamp,
          nonceStr: data.NonceStr,
          signature: data.Signature,
          jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'translateVoice',
					'startRecord',
					'stopRecord',
					'onRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard'
				]
        });
        wx.ready(function () {
          typeof WXReady != "undefined" && WXReady();
          typeof InitWXConfig != "undefined" && InitWXConfig();
          typeof initFun != "undefined" && initFun();
        });
      }
    }
  }

  function share(obj, sharesuccessfn, sharefailfn) {
    obj = obj || {};
    if ((typeof wx) != "undefined") {
      wx.onMenuShareAppMessage({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
          if (sharesuccessfn && typeof (sharesuccessfn) == "function") {
            sharesuccessfn(1);
          }
          statisticalMonitoring(obj, true);
        },
        cancel: function () {
          if (sharefailfn && typeof (sharefailfn) == "function") {
            sharefailfn(1);
          }
          statisticalMonitoring(obj, false);
        }
      });
      wx.onMenuShareTimeline({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
          if (sharesuccessfn && typeof (sharesuccessfn) == "function") {
            sharesuccessfn(2);
          }
          statisticalMonitoring(obj, true);
        },
        cancel: function () {
          if (sharefailfn && typeof (sharefailfn) == "function") {
            sharefailfn(2);
          }
          statisticalMonitoring(obj, false);
        }
      });
      wx.onMenuShareQQ({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
          if (sharesuccessfn && typeof (sharesuccessfn) == "function") {
            sharesuccessfn(3);
          }
          statisticalMonitoring(obj, true);
        },
        cancel: function () {
          if (sharefailfn && typeof (sharefailfn) == "function") {
            sharefailfn(3);
          }
          statisticalMonitoring(obj, false);
        }
      });
      wx.onMenuShareWeibo({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
          if (sharesuccessfn && typeof (sharesuccessfn) == "function") {
            sharesuccessfn(4);
          }
          statisticalMonitoring(obj, true);
        },
        cancel: function () {
          if (sharefailfn && typeof (sharefailfn) == "function") {
            sharefailfn(4);
          }
          statisticalMonitoring(obj, false);
        }
      });
    }
  }

  function pay(dsn, paytype, sharesuccessfn) {
    dsn = dsn || '';
    ajax({
      url: '//www.tutorabc.com.cn/aspx/MemberCenterLite/Ajax/Bypass',
      data: {
        Action: 'PAYMENT_CONFIRM',
        PostJsonData: '{ Dsn:' + dsn + ',PayType:' + paytype + '}'
      },
      success: function (data) {
        if (data.Success == true) {
          if ((typeof wx) != "undefined") {
            wx.chooseWXPay({
              timestamp: data.Result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.Result.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.Result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.Result.paySign, // 支付签名
              success: function (res) {
                if (sharesuccessfn && typeof (sharesuccessfn) == "function") {
                  sharesuccessfn(11);
                }
              }
            });
          }
        }
      }
    });

  }

  function init(initFun) {
    var ua_explorer = window.navigator.userAgent.toLowerCase();
    var isWX = (ua_explorer.match(/MicroMessenger/i) == "micromessenger");
    if (isWX) {
      loadjs("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function () {
        var data_url = encodeURIComponent(window.location.href.split('#')[0]);
        var postUrl = "//openapi.vipabc.com/Wechat/v2/Basic/json/reply/GetJSSDK";
        if (/(^(172|192\.168|dev|stage|sit).*$)/.test(window.location.hostname)) {
          postUrl = "//stageopenapi.vipabc.com/Wechat/v2/Basic/json/reply/GetJSSDK";
        }
        ajax({
          url: postUrl,
          data: {
            Url: data_url
          },
          success: function (msg) {
            configWX(msg.Data, initFun);
          }
        });
      });
      loadAnalyJs();
    }
  }

  // exposed public method
  return {
    init: init,
    share: share,
    pay: pay
  };
}));
