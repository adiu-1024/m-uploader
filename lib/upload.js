"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Uploader = /*#__PURE__*/function () {
  function Uploader(config) {
    (0, _classCallCheck2["default"])(this, Uploader);
    var args = Array.from(arguments);

    if (typeof config === 'string') {
      config = args[1] || {};
      config.url = args[0];
    } else {
      config = config || {};
    }

    config.pickId = config.pickId.startsWith('#') ? config.pickId : "#".concat(config.pickId);
    this.events = {};
    this.$options = Object.assign({}, Uploader.DEFAULTS, config);
    this.init();
  }

  (0, _createClass2["default"])(Uploader, [{
    key: "init",
    value: function init() {
      var el = document.querySelector(this.$options.pickId);
      el.addEventListener('change', this.handleChange.bind(this));
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var fileList = (0, _toConsumableArray2["default"])(e.target.files);
      var formData = new FormData();

      var _iterator = _createForOfIteratorHelper(fileList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;
          formData.append('file', file);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      e.target.value = '';
      this.handleUpload(formData);
    }
  }, {
    key: "handleUpload",
    value: function handleUpload(formData) {
      var _this = this;

      this.$emit('loading', true);
      var _this$$options = this.$options,
          url = _this$$options.url,
          timeout = _this$$options.timeout,
          _this$$options$tokenN = _this$$options.tokenName,
          tokenName = _this$$options$tokenN === void 0 ? 'TOKEN' : _this$$options$tokenN,
          _this$$options$getPro = _this$$options.getProgress,
          getProgress = _this$$options$getPro === void 0 ? null : _this$$options$getPro;
      var xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', localStorage.getItem(tokenName));
      xhr.send(formData);
      xhr.onload = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var status, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                status = xhr.status, response = xhr.response;

                if (status == 200) {
                  _this.$emit('success', JSON.parse(response));

                  _this.$emit('loading', false);
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      xhr.onerror = function () {
        _this.$emit('error', xhr.statusText);

        _this.$emit('loading', false);
      };

      if (typeof getProgress === 'function') {
        xhr.upload.onprogress = function () {
          if (event.lengthComputable) {
            getProgress(Number((event.loaded / event.total * 100).toFixed(2)));
          }
        };
      }
    }
  }, {
    key: "$on",
    value: function $on(key, fn) {
      this.events[key] = fn;
    }
  }, {
    key: "$emit",
    value: function $emit(key, args) {
      this.events[key](args);
    }
  }]);
  return Uploader;
}();

(0, _defineProperty2["default"])(Uploader, "DEFAULTS", {
  timeout: 0
});
var _default = Uploader;
exports["default"] = _default;