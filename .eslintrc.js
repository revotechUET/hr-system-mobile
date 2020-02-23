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
    "SharedArrayBuffer": "readonly",
    "require": "readonly",
    "module": "readonly",
    "process": "readonly",
    "GLOBAL": "readonly",
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
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
    "no-empty": "off",
    "react-hooks/rules-of-hooks": "error",
  },
};
