/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("const api_key = '6badb5bc9855c2296726ae1b1d9be1c0';\nconst form = document.querySelector('form');\nform.addEventListener('submit', function(e){\n    e.preventDefault();\n    const location = document.querySelector('input').value;\n    getData(location);\n});\n\nasync function getData(location) {\n    let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api_key}&units=metric`, {mode: 'cors'});\n    data = await response.json();\n    console.log(data);\n}\n\n//# sourceURL=webpack://weather-app/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;