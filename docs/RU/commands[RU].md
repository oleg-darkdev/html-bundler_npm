<a name="вручную_комманды"></a>
### Как подключить вручную

Чтобы подключить `html-bundler` в ваш проект, воспользуйтесь командами.
```javascript
const Bundlehtml = require('./build/bundle');
```

Для передачи настроек для создания бандла используйте массив из 3-х элементов.Описание элементов массива описаны [тут](#публичное_api)
```javascript
const newBundleConfig = [
  './data/',
  'bundle.html',
  filesListOrder = [
    '1.html',
    '2.html',
    '3.html'
  ]
];
```

Передайте сборщику бандла вашу конфигурацию.
```javascript
const bundle = new Bundlehtml(newBundleConfig);
```

Вызовите метод `.genBundle()` для сборки бандла.
```javascript
bundle.genBundle();
```
