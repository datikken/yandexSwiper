/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.videoSlider = undefined;
	
	var _hasClass = __webpack_require__(2);
	
	var _classesHandler2 = __webpack_require__(3);
	
	/**
	 * hasClass util
	 * target, class
	 * @returns {boolean}
	 * _classesHandler
	 * el, class, action
	 */
	var videoSlider = function videoSlider() {
	  var wrap = document.querySelector(".wrap");
	  var videos = wrap.querySelectorAll(".video");
	  //controls
	  var back = wrap.querySelector(".wrap_controls-left");
	  var forward = wrap.querySelector(".wrap_controls-right");
	  //autoplay
	  var playBtn = wrap.querySelector(".topVideo-icon");
	  //all vids length from 0
	  var itemsLength = videos.length - 1;
	
	  function controller() {
	    (0, _classesHandler2._classesHandler)(back, 'block-btn', 'add');
	    recountStyles(videos);
	    setEventListeners(back, forward);
	  }
	
	  function recountStyles(items) {
	    var scaleStep = 1;
	    var leftStep = 0;
	    var zIndexStep = 0;
	
	    items.forEach(function (el) {
	      var id = parseInt(el.getAttribute('data-id'));
	      (0, _classesHandler2._classesHandler)(el, 'push-forward', 'remove');
	
	      var val = scaleStep - ("." + id);
	      var leftVal = leftStep + id * 75;
	      var zVal = zIndexStep - id;
	
	      if (id === 0) {
	        (0, _classesHandler2._classesHandler)(el, 'active_slide', 'add');
	      } else {
	        (0, _classesHandler2._classesHandler)(el, 'active_slide', 'remove');
	      }
	
	      if (id === 5) {
	        (0, _classesHandler2._classesHandler)(el, 'push-forward', 'add');
	      }
	
	      el.style.zIndex = zVal;
	
	      TweenLite.to(el, .2, { left: leftVal, transform: "scale(" + val + ")" });
	    });
	  }
	
	  function setEventListeners(back, forward) {
	    back.addEventListener("click", function () {
	      changeIndexes('back');
	      recountStyles(videos);
	    });
	
	    forward.addEventListener("click", function () {
	      (0, _classesHandler2._classesHandler)(back, 'block-btn', 'remove');
	
	      changeIndexes('forward');
	      recountStyles(videos);
	    });
	  }
	
	  function changeIndexes(type) {
	    var lastIndex = videos[videos.length - 1].getAttribute('data-id');
	
	    videos.forEach(function (el) {
	      var id = parseInt(el.getAttribute('data-id'));
	
	      if (type === 'back') {
	        el.setAttribute('data-id', id + 1);
	
	        if (id >= itemsLength) {
	          el.setAttribute('data-id', 0);
	        }
	      } else {
	        el.setAttribute('data-id', id - 1);
	        if (id <= 0) {
	          el.setAttribute('data-id', itemsLength);
	        }
	      }
	    });
	  }
	
	  controller();
	};
	
	$(document).ready(function () {
	  videoSlider();
	});
	
	exports.videoSlider = videoSlider;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function hasClass(target, className) {
	  return new RegExp("(\\s|^)" + className + "(\\s|$)").test(target.className);
	}
	
	exports.hasClass = hasClass;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function _classesHandler(el, elClass, type) {
	  if (type == "add") {
	    el.classList.add(elClass);
	  } else {
	    el.classList.remove(elClass);
	  }
	}
	
	exports._classesHandler = _classesHandler;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map