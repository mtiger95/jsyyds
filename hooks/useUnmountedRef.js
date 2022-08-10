"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useUnmountedRef;

var _react = require("react");

function useUnmountedRef() {
  var unmountedRef = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    unmountedRef.current = false;
    return function () {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
}