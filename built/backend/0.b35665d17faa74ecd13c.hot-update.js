exports.id = 0;
exports.modules = {

/***/ "./src/backend/controllers/auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar router = _express2.default.Router();\n\nvar createAuth = function createAuth(req, res, next) {\n  var fb_user_id = faker.internet.userName();\n  var avatar = faker.image.avatar;\n  var name = faker.name.findName();\n  new _models.User({\n    fb_user_id: fb_user_id,\n    name: name,\n    first_name: first_name }).\n  save().\n  then(_models.Auth.sign).\n  then(function (auth) {return auth.save();}).\n  then(function (auth) {\n    res.cookie('token', auth.token);\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nvar destroyAuth = function destroyAuth(req, res, next) {var\n  token = req.cookies.token;\n  _models.Auth.findOne({ token: token }).\n  then(function (auth) {\n    if (!auth) return auth;\n    return auth.remove();\n  }).\n  then(function (auth) {\n    res.cookie('token', '');\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nrouter.route('/').\npost(createAuth).\ndelete(destroyAuth);exports.default =\n\nrouter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9hdXRoLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvYXV0aC5qcz8yYWU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9leHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO3ZhciBfZXhwcmVzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHByZXNzKTtcbnZhciBfbW9kZWxzID0gcmVxdWlyZSgnL21vZGVscycpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fVxuXG52YXIgcm91dGVyID0gX2V4cHJlc3MyLmRlZmF1bHQuUm91dGVyKCk7XG5cbnZhciBjcmVhdGVBdXRoID0gZnVuY3Rpb24gY3JlYXRlQXV0aChyZXEsIHJlcywgbmV4dCkge1xuICB2YXIgZmJfdXNlcl9pZCA9IGZha2VyLmludGVybmV0LnVzZXJOYW1lKCk7XG4gIHZhciBhdmF0YXIgPSBmYWtlci5pbWFnZS5hdmF0YXI7XG4gIHZhciBuYW1lID0gZmFrZXIubmFtZS5maW5kTmFtZSgpO1xuICBuZXcgX21vZGVscy5Vc2VyKHtcbiAgICBmYl91c2VyX2lkOiBmYl91c2VyX2lkLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgZmlyc3RfbmFtZTogZmlyc3RfbmFtZSB9KS5cbiAgc2F2ZSgpLlxuICB0aGVuKF9tb2RlbHMuQXV0aC5zaWduKS5cbiAgdGhlbihmdW5jdGlvbiAoYXV0aCkge3JldHVybiBhdXRoLnNhdmUoKTt9KS5cbiAgdGhlbihmdW5jdGlvbiAoYXV0aCkge1xuICAgIHJlcy5jb29raWUoJ3Rva2VuJywgYXV0aC50b2tlbik7XG4gICAgcmVzLnJldHVybih7IGF1dGg6IGF1dGggfSk7XG4gIH0pLlxuICBjYXRjaChuZXh0KTtcbn07XG5cbnZhciBkZXN0cm95QXV0aCA9IGZ1bmN0aW9uIGRlc3Ryb3lBdXRoKHJlcSwgcmVzLCBuZXh0KSB7dmFyXG4gIHRva2VuID0gcmVxLmNvb2tpZXMudG9rZW47XG4gIF9tb2RlbHMuQXV0aC5maW5kT25lKHsgdG9rZW46IHRva2VuIH0pLlxuICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7XG4gICAgaWYgKCFhdXRoKSByZXR1cm4gYXV0aDtcbiAgICByZXR1cm4gYXV0aC5yZW1vdmUoKTtcbiAgfSkuXG4gIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICByZXMuY29va2llKCd0b2tlbicsICcnKTtcbiAgICByZXMucmV0dXJuKHsgYXV0aDogYXV0aCB9KTtcbiAgfSkuXG4gIGNhdGNoKG5leHQpO1xufTtcblxucm91dGVyLnJvdXRlKCcvJykuXG5wb3N0KGNyZWF0ZUF1dGgpLlxuZGVsZXRlKGRlc3Ryb3lBdXRoKTtleHBvcnRzLmRlZmF1bHQgPVxuXG5yb3V0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9hdXRoLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2F1dGguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/controllers/auth.js\n");

/***/ })

};