exports.id = 0;
exports.modules = {

/***/ "./src/backend/controllers/auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar router = _express2.default.Router();\n\nvar createAuth = function createAuth(req, res, next) {\n  var fb_user_id = faker.internet.userName();\n  var avatar = faker.internet;\n  var name = faker.name.findName();\n  new _models.User({\n    fb_user_id: fb_user_id,\n    name: name,\n    first_name: first_name }).\n  save().\n  then(_models.Auth.sign).\n  then(function (auth) {return auth.save();}).\n  then(function (auth) {\n    res.cookie('token', auth.token);\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nvar destroyAuth = function destroyAuth(req, res, next) {var\n  token = req.cookies.token;\n  _models.Auth.findOne({ token: token }).\n  then(function (auth) {\n    if (!auth) return auth;\n    return auth.remove();\n  }).\n  then(function (auth) {\n    res.cookie('token', '');\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nrouter.route('/').\npost(createAuth).\ndelete(destroyAuth);exports.default =\n\nrouter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9hdXRoLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvYXV0aC5qcz8yYWU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9leHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO3ZhciBfZXhwcmVzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHByZXNzKTtcbnZhciBfbW9kZWxzID0gcmVxdWlyZSgnL21vZGVscycpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fVxuXG52YXIgcm91dGVyID0gX2V4cHJlc3MyLmRlZmF1bHQuUm91dGVyKCk7XG5cbnZhciBjcmVhdGVBdXRoID0gZnVuY3Rpb24gY3JlYXRlQXV0aChyZXEsIHJlcywgbmV4dCkge1xuICB2YXIgZmJfdXNlcl9pZCA9IGZha2VyLmludGVybmV0LnVzZXJOYW1lKCk7XG4gIHZhciBhdmF0YXIgPSBmYWtlci5pbnRlcm5ldDtcbiAgdmFyIG5hbWUgPSBmYWtlci5uYW1lLmZpbmROYW1lKCk7XG4gIG5ldyBfbW9kZWxzLlVzZXIoe1xuICAgIGZiX3VzZXJfaWQ6IGZiX3VzZXJfaWQsXG4gICAgbmFtZTogbmFtZSxcbiAgICBmaXJzdF9uYW1lOiBmaXJzdF9uYW1lIH0pLlxuICBzYXZlKCkuXG4gIHRoZW4oX21vZGVscy5BdXRoLnNpZ24pLlxuICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7cmV0dXJuIGF1dGguc2F2ZSgpO30pLlxuICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7XG4gICAgcmVzLmNvb2tpZSgndG9rZW4nLCBhdXRoLnRva2VuKTtcbiAgICByZXMucmV0dXJuKHsgYXV0aDogYXV0aCB9KTtcbiAgfSkuXG4gIGNhdGNoKG5leHQpO1xufTtcblxudmFyIGRlc3Ryb3lBdXRoID0gZnVuY3Rpb24gZGVzdHJveUF1dGgocmVxLCByZXMsIG5leHQpIHt2YXJcbiAgdG9rZW4gPSByZXEuY29va2llcy50b2tlbjtcbiAgX21vZGVscy5BdXRoLmZpbmRPbmUoeyB0b2tlbjogdG9rZW4gfSkuXG4gIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICBpZiAoIWF1dGgpIHJldHVybiBhdXRoO1xuICAgIHJldHVybiBhdXRoLnJlbW92ZSgpO1xuICB9KS5cbiAgdGhlbihmdW5jdGlvbiAoYXV0aCkge1xuICAgIHJlcy5jb29raWUoJ3Rva2VuJywgJycpO1xuICAgIHJlcy5yZXR1cm4oeyBhdXRoOiBhdXRoIH0pO1xuICB9KS5cbiAgY2F0Y2gobmV4dCk7XG59O1xuXG5yb3V0ZXIucm91dGUoJy8nKS5cbnBvc3QoY3JlYXRlQXV0aCkuXG5kZWxldGUoZGVzdHJveUF1dGgpO2V4cG9ydHMuZGVmYXVsdCA9XG5cbnJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2F1dGguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvYXV0aC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/controllers/auth.js\n");

/***/ })

};