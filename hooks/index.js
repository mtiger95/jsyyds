"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
Object.defineProperty(exports, "useSafeState", {
  enumerable: true,
  get: function get() {
    return _useSafeState["default"];
  }
});
Object.defineProperty(exports, "useUnmountedRef", {
  enumerable: true,
  get: function get() {
    return _useUnmountedRef["default"];
  }
});

var _useSafeState = _interopRequireDefault(require("./useSafeState"));

var _useUnmountedRef = _interopRequireDefault(require("./useUnmountedRef"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  useSafeState: _useSafeState["default"],
  useUnmountedRef: _useUnmountedRef["default"]
};
exports["default"] = _default;