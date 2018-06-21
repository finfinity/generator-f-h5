import 'normalize.css';
import '../css/style.scss';
import wxsdk from "./wxsdk.js";

if (process.env.BUILD_ENV == "uat") {
  function loadJS(src, callback) {
    var script = document.createElement("script");
    var head = document.getElementsByTagName("head")[0];
    var loaded;
    script.src = src;
    if (typeof callback === "function") {
      script.onload = script.onreadystatechange = function () {
        if (
          !loaded &&
          (!script.readyState || /loaded|complete/.test(script.readyState))
        ) {
          script.onload = script.onreadystatechange = null;
          loaded = true;
          callback();
        }
      };
    }
    head.appendChild(script);
  }
  loadJS('https://finfinity.github.io/source/js/vconsole.min.js', function () {
    var vConsole = new VConsole();
  });
}

console.log("hello world");

wxsdk.init({
  api: '/',
  title: 'FLY',
  desc: 'FLY_HELLO',
  link: window.location.href,
  imgUrl: 'https://finfinity.github.io/source/img/logo.png'
});

