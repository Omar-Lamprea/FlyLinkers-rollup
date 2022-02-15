// const fs = require('fs');

// const cert = fs.readFileSync('./cert.pem');
// const key = fs.readFileSync('./key.pem');

// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-postcss',
    // ['@snowpack/plugin-run-script', {
    //   cmd: 'eslint \'src/**/*.js\'',
    //   watch: 'watch "$1" src'
    // }],
    ['@snowpack/plugin-webpack', {}]
  ],
  devOptions: {
    // secure: {cert, key}
  },
  buildOptions: {
    baseUrl: './'
  },
  routes: [
    /* ... */
  ],
  alias: {
    '@': './src'
  },
}
