### [Примеры](docs/examples/)
s
```js
const BundleSh = require('./build/bundle'); 
const newBundleConfig = [
     './data/',
      'bundle.sh', 
filesListOrder = [ 
    '1.sh',
     '2.sh', 
     '3.sh' ] 
];
const bundle = new BundleSh(newBundleConfig); 
bundle.genBundle();
```


**[⬆ к оглавлению](#Оглавление)**
