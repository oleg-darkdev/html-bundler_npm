Before running tests for cli add rights the performing file - ex: chmod 755 index.js.

В проекте стараются поддерживать стиль по написанию кода от [AirBnb](docs/airBnb/). На его и настроено линтерование кода.

Для написания коментариев для документации с помощью  вы можете воспользоваться информацией [отсюда](docs/jsDoc/guide/)

const BundleHtml = require('node-html-bundler');
const newBundleConfig = [
  './data/',
  'bundle.html',
  filesListOrder = [
    '1.html',
    '2.html',
    '3.html'
  ]
];
const bundle = new BundleHtml(newBundleConfig);
bundle.genBundle();