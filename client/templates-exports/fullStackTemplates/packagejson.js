const packageJSON = `{
  "name": "my-react-blue-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server/server.js",
    "build": "cross-env NODE_ENV=production webpack",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open"
  },
  "nodemonConfig": {
    "ignore": [
      "build"
    ]
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "react": "^16.10.2",
    "react-dom": "^16.10.2",
    "webpack": "^4.40.2"
  },
  "devDependencies": {
    "@babel/core": "^7.6.0",
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/preset-env": "^7.6.0",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "cross-env": "^5.2.0",
    "css-loader": "^3.2.0",
    "file-loader": "^3.0.1",
    "node-sass": "^4.12.0",
    "nodemon": "^1.19.2",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^8.0.0",
    "style-loader": "^1.0.0",
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.1"
  }
}`
export default packageJSON;
