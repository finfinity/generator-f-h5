import 'normalize.css';
import '../css/style.scss';
import wxsdk from "./wxsdk.js";

wxsdk.init({
  api: '/',
  title: 'FLY',
  desc: 'FLY_HELLO',
  link: window.location.href,
  imgUrl: 'https://finfinity.github.io/source/img/logo.png'
});

