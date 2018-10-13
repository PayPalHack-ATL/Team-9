exports.id = 0;
exports.modules = {

/***/ "./src/backend/common/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.now = exports.isMongooseObject = exports.replaceMe = undefined;var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i[\"return\"]) _i[\"return\"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");}};}();var _error = __webpack_require__(\"./src/backend/common/error.js\");\n\nvar replaceMe = function replaceMe(req, res, next) {\n  if (req.params.object_id === 'me') {var\n    author = req.author;\n    if (!author.isUser()) return next(new _error.AuthorizationError());\n    req.params.object_id = author._id;\n  }\n  next();\n};\n\nvar isMongooseObject = function isMongooseObject(object) {return object && object.constructor.name === 'model';};\n\nvar now = function now() {\n  return new Date();\n};\n\nvar isImageFile = function isImageFile(value) {var _value$split =\n  value.split('/'),_value$split2 = _slicedToArray(_value$split, 2),type = _value$split2[0],subtype = _value$split2[1];\n  return type === 'image' && ['gif', 'jpeg', 'png', 'svg+xml'].includes(subtype);\n};exports.\n\n\nreplaceMe = replaceMe;exports.\nisMongooseObject = isMongooseObject;exports.\nnow = now;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vdXRpbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2NvbW1vbi91dGlsLmpzPzY5YTMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtleHBvcnRzLm5vdyA9IGV4cG9ydHMuaXNNb25nb29zZU9iamVjdCA9IGV4cG9ydHMucmVwbGFjZU1lID0gdW5kZWZpbmVkO3ZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHtmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge3ZhciBfYXJyID0gW107dmFyIF9uID0gdHJ1ZTt2YXIgX2QgPSBmYWxzZTt2YXIgX2UgPSB1bmRlZmluZWQ7dHJ5IHtmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7X2Fyci5wdXNoKF9zLnZhbHVlKTtpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7fX0gY2F0Y2ggKGVycikge19kID0gdHJ1ZTtfZSA9IGVycjt9IGZpbmFsbHkge3RyeSB7aWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTt9IGZpbmFsbHkge2lmIChfZCkgdGhyb3cgX2U7fX1yZXR1cm4gX2Fycjt9cmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7cmV0dXJuIGFycjt9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge3JldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7fSBlbHNlIHt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTt9fTt9KCk7dmFyIF9lcnJvciA9IHJlcXVpcmUoJy4vZXJyb3InKTtcblxudmFyIHJlcGxhY2VNZSA9IGZ1bmN0aW9uIHJlcGxhY2VNZShyZXEsIHJlcywgbmV4dCkge1xuICBpZiAocmVxLnBhcmFtcy5vYmplY3RfaWQgPT09ICdtZScpIHt2YXJcbiAgICBhdXRob3IgPSByZXEuYXV0aG9yO1xuICAgIGlmICghYXV0aG9yLmlzVXNlcigpKSByZXR1cm4gbmV4dChuZXcgX2Vycm9yLkF1dGhvcml6YXRpb25FcnJvcigpKTtcbiAgICByZXEucGFyYW1zLm9iamVjdF9pZCA9IGF1dGhvci5faWQ7XG4gIH1cbiAgbmV4dCgpO1xufTtcblxudmFyIGlzTW9uZ29vc2VPYmplY3QgPSBmdW5jdGlvbiBpc01vbmdvb3NlT2JqZWN0KG9iamVjdCkge3JldHVybiBvYmplY3QgJiYgb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdtb2RlbCc7fTtcblxudmFyIG5vdyA9IGZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCk7XG59O1xuXG52YXIgaXNJbWFnZUZpbGUgPSBmdW5jdGlvbiBpc0ltYWdlRmlsZSh2YWx1ZSkge3ZhciBfdmFsdWUkc3BsaXQgPVxuICB2YWx1ZS5zcGxpdCgnLycpLF92YWx1ZSRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfdmFsdWUkc3BsaXQsIDIpLHR5cGUgPSBfdmFsdWUkc3BsaXQyWzBdLHN1YnR5cGUgPSBfdmFsdWUkc3BsaXQyWzFdO1xuICByZXR1cm4gdHlwZSA9PT0gJ2ltYWdlJyAmJiBbJ2dpZicsICdqcGVnJywgJ3BuZycsICdzdmcreG1sJ10uaW5jbHVkZXMoc3VidHlwZSk7XG59O2V4cG9ydHMuXG5cblxucmVwbGFjZU1lID0gcmVwbGFjZU1lO2V4cG9ydHMuXG5pc01vbmdvb3NlT2JqZWN0ID0gaXNNb25nb29zZU9iamVjdDtleHBvcnRzLlxubm93ID0gbm93O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvY29tbW9uL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvY29tbW9uL3V0aWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/common/util.js\n");

/***/ })

};