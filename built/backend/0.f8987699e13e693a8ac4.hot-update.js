exports.id = 0;
exports.modules = {

/***/ "./src/backend/socket/Player.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Emitter2 = __webpack_require__(\"./src/backend/socket/Emitter.js\");var _Emitter3 = _interopRequireDefault(_Emitter2);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");}return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== \"function\" && superClass !== null) {throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var\n\nPlayer = function (_Emitter) {_inherits(Player, _Emitter);\n  function Player(io, game, author) {_classCallCheck(this, Player);var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this,\n    io, game.room));\n    _this.game = game;\n    _this.connected = 1;\n\n    _this.user = author;\n    _this.submitted_at = null;\n    _this.typing = false;\n    _this.bid = null;return _this;\n  }_createClass(Player, [{ key: 'connect', value: function connect()\n\n    {\n      this.connected++;\n      this.game.update();\n    } }, { key: 'disconnect', value: function disconnect()\n\n    {\n      if (--this.connected < 1) {\n        if (!this.game.started_at) {\n          this.game.removePlayer(this);\n        } else if (this.game.isPlaying()) {\n          this.giveUp();\n        }\n      }\n    } }, { key: 'startTyping', value: function startTyping()\n\n    {\n      this.typing = true;\n      this.update();\n    } }, { key: 'stopTyping', value: function stopTyping()\n\n    {\n      this.typing = false;\n      this.update();\n    } }, { key: 'submit', value: function submit(\n\n    amount) {var _this2 = this;\n      this.submitted_at = new Date();\n      new _models.Bid({\n        auction: this.game.auction,\n        amount: amount,\n        author: this.user }).\n      force().save().\n      then(function (bid) {\n        _this2.bid = bid.toJSON({ req: {} });\n        if (_this2.game.isEveryoneDone()) return _this2.game.finish();\n        _this2.update();\n      }).\n      catch(console.error);\n    } }, { key: 'update', value: function update()\n\n    {\n      this.updated_at = new Date();\n      this.emit('PLAYER_UPDATED', this);\n    } }, { key: 'toJSON', value: function toJSON()\n\n    {var\n\n      user =\n\n\n\n\n\n\n      this.user,submitted_at = this.submitted_at,given_up_at = this.given_up_at,typing = this.typing,bid = this.bid,ratings = this.ratings,average_stars = this.average_stars;\n      return {\n        user: user,\n        submitted_at: submitted_at,\n        given_up_at: given_up_at,\n        typing: typing,\n        bid: bid,\n        ratings: ratings,\n        average_stars: average_stars };\n\n    } }]);return Player;}(_Emitter3.default);exports.default =\n\n\nPlayer;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9zb2NrZXQvUGxheWVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvc29ja2V0L1BsYXllci5qcz9jZGM0Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7dmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO2lmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO319cmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO2lmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcjt9O30oKTt2YXIgX0VtaXR0ZXIyID0gcmVxdWlyZSgnLi9FbWl0dGVyJyk7dmFyIF9FbWl0dGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VtaXR0ZXIyKTtcbnZhciBfbW9kZWxzID0gcmVxdWlyZSgnL21vZGVscycpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fWZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge3Rocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7fX1mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7aWYgKCFzZWxmKSB7dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO31yZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjt9ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7aWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge3Rocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO31zdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pO2lmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczt9dmFyXG5cblBsYXllciA9IGZ1bmN0aW9uIChfRW1pdHRlcikge19pbmhlcml0cyhQbGF5ZXIsIF9FbWl0dGVyKTtcbiAgZnVuY3Rpb24gUGxheWVyKGlvLCBnYW1lLCBhdXRob3IpIHtfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGxheWVyKTt2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUGxheWVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGxheWVyKSkuY2FsbCh0aGlzLFxuICAgIGlvLCBnYW1lLnJvb20pKTtcbiAgICBfdGhpcy5nYW1lID0gZ2FtZTtcbiAgICBfdGhpcy5jb25uZWN0ZWQgPSAxO1xuXG4gICAgX3RoaXMudXNlciA9IGF1dGhvcjtcbiAgICBfdGhpcy5zdWJtaXR0ZWRfYXQgPSBudWxsO1xuICAgIF90aGlzLnR5cGluZyA9IGZhbHNlO1xuICAgIF90aGlzLmJpZCA9IG51bGw7cmV0dXJuIF90aGlzO1xuICB9X2NyZWF0ZUNsYXNzKFBsYXllciwgW3sga2V5OiAnY29ubmVjdCcsIHZhbHVlOiBmdW5jdGlvbiBjb25uZWN0KClcblxuICAgIHtcbiAgICAgIHRoaXMuY29ubmVjdGVkKys7XG4gICAgICB0aGlzLmdhbWUudXBkYXRlKCk7XG4gICAgfSB9LCB7IGtleTogJ2Rpc2Nvbm5lY3QnLCB2YWx1ZTogZnVuY3Rpb24gZGlzY29ubmVjdCgpXG5cbiAgICB7XG4gICAgICBpZiAoLS10aGlzLmNvbm5lY3RlZCA8IDEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUuc3RhcnRlZF9hdCkge1xuICAgICAgICAgIHRoaXMuZ2FtZS5yZW1vdmVQbGF5ZXIodGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5nYW1lLmlzUGxheWluZygpKSB7XG4gICAgICAgICAgdGhpcy5naXZlVXAoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gfSwgeyBrZXk6ICdzdGFydFR5cGluZycsIHZhbHVlOiBmdW5jdGlvbiBzdGFydFR5cGluZygpXG5cbiAgICB7XG4gICAgICB0aGlzLnR5cGluZyA9IHRydWU7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0gfSwgeyBrZXk6ICdzdG9wVHlwaW5nJywgdmFsdWU6IGZ1bmN0aW9uIHN0b3BUeXBpbmcoKVxuXG4gICAge1xuICAgICAgdGhpcy50eXBpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSB9LCB7IGtleTogJ3N1Ym1pdCcsIHZhbHVlOiBmdW5jdGlvbiBzdWJtaXQoXG5cbiAgICBhbW91bnQpIHt2YXIgX3RoaXMyID0gdGhpcztcbiAgICAgIHRoaXMuc3VibWl0dGVkX2F0ID0gbmV3IERhdGUoKTtcbiAgICAgIG5ldyBfbW9kZWxzLkJpZCh7XG4gICAgICAgIGF1Y3Rpb246IHRoaXMuZ2FtZS5hdWN0aW9uLFxuICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgYXV0aG9yOiB0aGlzLnVzZXIgfSkuXG4gICAgICBmb3JjZSgpLnNhdmUoKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24gKGJpZCkge1xuICAgICAgICBfdGhpczIuYmlkID0gYmlkLnRvSlNPTih7IHJlcToge30gfSk7XG4gICAgICAgIGlmIChfdGhpczIuZ2FtZS5pc0V2ZXJ5b25lRG9uZSgpKSByZXR1cm4gX3RoaXMyLmdhbWUuZmluaXNoKCk7XG4gICAgICAgIF90aGlzMi51cGRhdGUoKTtcbiAgICAgIH0pLlxuICAgICAgY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfSB9LCB7IGtleTogJ3VwZGF0ZScsIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKVxuXG4gICAge1xuICAgICAgdGhpcy51cGRhdGVkX2F0ID0gbmV3IERhdGUoKTtcbiAgICAgIHRoaXMuZW1pdCgnUExBWUVSX1VQREFURUQnLCB0aGlzKTtcbiAgICB9IH0sIHsga2V5OiAndG9KU09OJywgdmFsdWU6IGZ1bmN0aW9uIHRvSlNPTigpXG5cbiAgICB7dmFyXG5cbiAgICAgIHVzZXIgPVxuXG5cblxuXG5cblxuICAgICAgdGhpcy51c2VyLHN1Ym1pdHRlZF9hdCA9IHRoaXMuc3VibWl0dGVkX2F0LGdpdmVuX3VwX2F0ID0gdGhpcy5naXZlbl91cF9hdCx0eXBpbmcgPSB0aGlzLnR5cGluZyxiaWQgPSB0aGlzLmJpZCxyYXRpbmdzID0gdGhpcy5yYXRpbmdzLGF2ZXJhZ2Vfc3RhcnMgPSB0aGlzLmF2ZXJhZ2Vfc3RhcnM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1c2VyOiB1c2VyLFxuICAgICAgICBzdWJtaXR0ZWRfYXQ6IHN1Ym1pdHRlZF9hdCxcbiAgICAgICAgZ2l2ZW5fdXBfYXQ6IGdpdmVuX3VwX2F0LFxuICAgICAgICB0eXBpbmc6IHR5cGluZyxcbiAgICAgICAgYmlkOiBiaWQsXG4gICAgICAgIHJhdGluZ3M6IHJhdGluZ3MsXG4gICAgICAgIGF2ZXJhZ2Vfc3RhcnM6IGF2ZXJhZ2Vfc3RhcnMgfTtcblxuICAgIH0gfV0pO3JldHVybiBQbGF5ZXI7fShfRW1pdHRlcjMuZGVmYXVsdCk7ZXhwb3J0cy5kZWZhdWx0ID1cblxuXG5QbGF5ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9zb2NrZXQvUGxheWVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL3NvY2tldC9QbGF5ZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/socket/Player.js\n");

/***/ }),

/***/ "./src/backend/socket/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _socket = __webpack_require__(\"socket.io\");var _socket2 = _interopRequireDefault(_socket);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");\nvar _Game = __webpack_require__(\"./src/backend/socket/Game.js\");var _Game2 = _interopRequireDefault(_Game);\nvar _Player = __webpack_require__(\"./src/backend/socket/Player.js\");var _Player2 = _interopRequireDefault(_Player);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar connectSocket = function connectSocket(httpServer) {\n  var io = (0, _socket2.default)(httpServer, { path: '/socket' });\n  var games = [];\n  io.on('connection', function (socket) {\n    socket.on('AUTH', function (data) {var\n      token = data.token;\n      _models.Auth.verify(token).\n      then(function (auth) {return _models.Auth.populate(auth, 'user');}).\n      then(function (auth) {return auth.refresh();}).\n      then(function (auth) {\n        var author = auth.user.toJSON({ req: {} });\n        var game = games.find(function (game) {return !game.finished_at && game.findPlayer(author, function (player) {return !player.isDone();});});\n        if (!game) game = games.find(function (game) {return !game.started_at;});\n        if (!game) {\n          game = new _Game2.default(io, function () {\n            var index = games.indexOf(undefined);\n            if (~index) games.splice(index, 1);\n          });\n          games.push(game);\n        }\n        socket.join(game.room);\n\n        var player = game.findPlayer(author);\n        if (player) {\n          player.connect();\n        } else {\n          player = new _Player2.default(io, game, author);\n          game.addPlayer(player);\n        }\n\n        listenOnPlayer(player);\n      }).\n      catch(function (err) {\n        console.error(err);\n        socket.disconnect();\n      });\n    });\n\n    var listenOnPlayer = function listenOnPlayer(player) {\n      socket.on('disconnect', function () {\n        player.disconnect();\n      });\n      socket.on('START_TYPING', function () {\n        player.startTyping();\n      });\n      socket.on('STOP_TYPING', function () {\n        player.stopTyping();\n      });\n      socket.on('SUBMIT', function (code) {\n        player.submit(code);\n      });\n    };\n  });\n};exports.default =\n\nconnectSocket;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9zb2NrZXQvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9zb2NrZXQvaW5kZXguanM/NDc2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfc29ja2V0ID0gcmVxdWlyZSgnc29ja2V0LmlvJyk7dmFyIF9zb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc29ja2V0KTtcbnZhciBfbW9kZWxzID0gcmVxdWlyZSgnL21vZGVscycpO1xudmFyIF9HYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7dmFyIF9HYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dhbWUpO1xudmFyIF9QbGF5ZXIgPSByZXF1aXJlKCcuL1BsYXllcicpO3ZhciBfUGxheWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1BsYXllcik7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cbnZhciBjb25uZWN0U29ja2V0ID0gZnVuY3Rpb24gY29ubmVjdFNvY2tldChodHRwU2VydmVyKSB7XG4gIHZhciBpbyA9ICgwLCBfc29ja2V0Mi5kZWZhdWx0KShodHRwU2VydmVyLCB7IHBhdGg6ICcvc29ja2V0JyB9KTtcbiAgdmFyIGdhbWVzID0gW107XG4gIGlvLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24gKHNvY2tldCkge1xuICAgIHNvY2tldC5vbignQVVUSCcsIGZ1bmN0aW9uIChkYXRhKSB7dmFyXG4gICAgICB0b2tlbiA9IGRhdGEudG9rZW47XG4gICAgICBfbW9kZWxzLkF1dGgudmVyaWZ5KHRva2VuKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtyZXR1cm4gX21vZGVscy5BdXRoLnBvcHVsYXRlKGF1dGgsICd1c2VyJyk7fSkuXG4gICAgICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7cmV0dXJuIGF1dGgucmVmcmVzaCgpO30pLlxuICAgICAgdGhlbihmdW5jdGlvbiAoYXV0aCkge1xuICAgICAgICB2YXIgYXV0aG9yID0gYXV0aC51c2VyLnRvSlNPTih7IHJlcToge30gfSk7XG4gICAgICAgIHZhciBnYW1lID0gZ2FtZXMuZmluZChmdW5jdGlvbiAoZ2FtZSkge3JldHVybiAhZ2FtZS5maW5pc2hlZF9hdCAmJiBnYW1lLmZpbmRQbGF5ZXIoYXV0aG9yLCBmdW5jdGlvbiAocGxheWVyKSB7cmV0dXJuICFwbGF5ZXIuaXNEb25lKCk7fSk7fSk7XG4gICAgICAgIGlmICghZ2FtZSkgZ2FtZSA9IGdhbWVzLmZpbmQoZnVuY3Rpb24gKGdhbWUpIHtyZXR1cm4gIWdhbWUuc3RhcnRlZF9hdDt9KTtcbiAgICAgICAgaWYgKCFnYW1lKSB7XG4gICAgICAgICAgZ2FtZSA9IG5ldyBfR2FtZTIuZGVmYXVsdChpbywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2FtZXMuaW5kZXhPZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgaWYgKH5pbmRleCkgZ2FtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBnYW1lcy5wdXNoKGdhbWUpO1xuICAgICAgICB9XG4gICAgICAgIHNvY2tldC5qb2luKGdhbWUucm9vbSk7XG5cbiAgICAgICAgdmFyIHBsYXllciA9IGdhbWUuZmluZFBsYXllcihhdXRob3IpO1xuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgcGxheWVyLmNvbm5lY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwbGF5ZXIgPSBuZXcgX1BsYXllcjIuZGVmYXVsdChpbywgZ2FtZSwgYXV0aG9yKTtcbiAgICAgICAgICBnYW1lLmFkZFBsYXllcihwbGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdGVuT25QbGF5ZXIocGxheWVyKTtcbiAgICAgIH0pLlxuICAgICAgY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHZhciBsaXN0ZW5PblBsYXllciA9IGZ1bmN0aW9uIGxpc3Rlbk9uUGxheWVyKHBsYXllcikge1xuICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwbGF5ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfSk7XG4gICAgICBzb2NrZXQub24oJ1NUQVJUX1RZUElORycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGxheWVyLnN0YXJ0VHlwaW5nKCk7XG4gICAgICB9KTtcbiAgICAgIHNvY2tldC5vbignU1RPUF9UWVBJTkcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBsYXllci5zdG9wVHlwaW5nKCk7XG4gICAgICB9KTtcbiAgICAgIHNvY2tldC5vbignU1VCTUlUJywgZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgcGxheWVyLnN1Ym1pdChjb2RlKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xufTtleHBvcnRzLmRlZmF1bHQgPVxuXG5jb25uZWN0U29ja2V0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvc29ja2V0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL3NvY2tldC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/socket/index.js\n");

/***/ })

};