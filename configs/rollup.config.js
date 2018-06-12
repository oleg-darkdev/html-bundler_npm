import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const path = require('./path.json');

export default {
  input: path.src.js + path.src.startFileJs,
  output: {
    file: path.build.js + path.build.endFileJs,
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
