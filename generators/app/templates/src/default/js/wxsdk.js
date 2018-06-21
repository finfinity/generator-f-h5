(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define([], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory();
    } else {
      root.wxsdk = factory();
    }
  }(this, function () {
  
    //格式化参数
    function formatParams(data) {
      var arr = [];
      for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
      }
      arr.push(("v=" + Math.random()).replace("."));
      return arr.join("&");
    }
  
    function ajax(options) {
      options = options || {};
      options.type = (options.type || "GET").toUpperCase();
      options.dataType = options.dataType || "json";
      var params = formatParams(options.data);
      var xhr;
  
      //创建 - 第一步
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveObject) {         //IE6及以下
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
  
      //连接 和 发送 - 第二步
      if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
      } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
      }
  
      //接收 - 第三步
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          var status = xhr.status;
          if (status >= 200 && status < 300 || status == 304) {
            options.success && options.success(JSON.parse(xhr.responseText));
          } else {
            options.error && options.error(status);
          }
        }
      }
    }
  
    function loadJS(src, callback) {
      var script = document.createElement('script');
      var head = document.getElementsByTagName('head')[0];
      var loaded;
      script.src = src;
      if (typeof callback === 'function') {
        script.onload = script.onreadystatechange = function () {
          if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
            script.onload = script.onreadystatechange = null;
            loaded = true;
            callback();
          }
        }
      }
      head.appendChild(script);
    }
  
    var wxsdk = {};
  
    wxsdk.share = function (content, callback) {
      if (typeof ('wx') != "undefined") {
        wx.checkJsApi({
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            wx.onMenuShareTimeline({
              title: content.title, // 分享标题
              link: content.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: content.imgUrl, // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
                callback();
              }
            })
            wx.onMenuShareAppMessage({
              title: content.title, // 分享标题
              desc: content.desc, // 分享描述
              link: content.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: content.imgUrl, // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
                callback();
              }
            })
          }
        });
      }
    }
  
    wxsdk.init = function (content, callback) {
      if (navigator.userAgent.toLowerCase().search(/micromessenger/i) != -1) {
        loadJS('https://res.wx.qq.com/open/js/jweixin-1.2.0.js', function () {
          if (typeof ('wx') != "undefined") {
            ajax({
              url: content.api,       //请求地址
              type: "POST",                            //请求方式
              data: {},    //请求参数
              dataType: "json",
              success: function (res) {
                // 此处放成功后执行的代码
                if (res.code == '000') {
                  wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名
                    jsApiList: [
                      'onMenuShareTimeline',
                      'onMenuShareAppMessage'
                    ] // 必填，需要使用的JS接口列表
                  });
                  wx.ready(function () {
                    wxsdk.share(content, callback);
                  });
                  wx.error(function (res) {
                  });
                }
              },
              error: function (status) {
                // 此处放失败后执行的代码
              }
            });
          }
  
        });
      }
    }
    return wxsdk;
  }));