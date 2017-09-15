import '../css/style.scss';
var WX = require('./wx-config.js');

WX.init(function () {
  WX.share({
    title: "",
    desc: "",
    link: window.location.href,
    imgUrl: "https://source.vipabc.com/ext/images/tutorabc-app/tutorabc_220X220.png"
  });
});
WX.share({
  title: "",
  desc: "",
  link: window.location.href,
  imgUrl: "https://source.vipabc.com/ext/images/tutorabc-app/tutorabc_220X220.png"
});
WX.pay('','1');

