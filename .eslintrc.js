module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "settings": {
    "react": {
      "version": "detect",
    }
  },
  "rules": {
    "react/display-name": 0,
    "react/prop-types": 0,
    "no-unused-vars": 0,
  },
  "globals": {
    "require": false,
  }
};
