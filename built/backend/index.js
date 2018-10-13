(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["backend"] = factory();
	else
		root["backend"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "0ae3abb6dbf7b5b9a3a0"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/api";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/backend/index.js")(__webpack_require__.s = "./src/backend/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./environment.js":
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(\"path\");\nconst fs = __webpack_require__(\"fs\");\n\nconst {\n  NODE_ENV = 'production',\n\n  HTTP_PORT = '8080',\n  HTTPS_PORT = '8443',\n  PROXY_PORT = '3000',\n\n  CREDENTIALS_ENABLED = '0',\n  CREDENTIALS_PATH,\n  CREDENTIALS_CA,\n  CREDENTIALS_KEY,\n  CREDENTIALS_CERT,\n\n  MONGO_URI = 'mongodb://localhost/bit_pal',\n  JWT_SECRET = 'JWT_SECRET_KEY_GOES_HERE',\n\n  WEBHOOK_ENABLED = '0',\n  WEBHOOK_SECRET,\n} = process.env;\n\nconst isEnabled = v => v === '1';\n\nconst __PROD__ = NODE_ENV === 'production';\nconst __DEV__ = !__PROD__;\n\nconst httpPort = parseInt(HTTP_PORT);\nconst httpsPort = parseInt(HTTPS_PORT);\nconst proxyPort = parseInt(PROXY_PORT);\n\nconst read = (file) => fs.readFileSync(path.resolve(CREDENTIALS_PATH, file));\nconst credentials = isEnabled(CREDENTIALS_ENABLED) && {\n  ca: read(CREDENTIALS_CA),\n  key: read(CREDENTIALS_KEY),\n  cert: read(CREDENTIALS_CERT),\n};\n\nconst mongoUri = MONGO_URI;\nconst jwtSecret = JWT_SECRET;\n\nconst webhook = isEnabled(WEBHOOK_ENABLED) && {\n  secret: WEBHOOK_SECRET,\n};\n\nconst builtPath = path.resolve(__dirname, 'built');\nconst frontendBuiltPath = path.resolve(builtPath, 'frontend');\nconst backendBuiltPath = path.resolve(builtPath, 'backend');\nconst srcPath = path.resolve(__dirname, 'src');\nconst frontendSrcPath = path.resolve(srcPath, 'frontend');\nconst backendSrcPath = path.resolve(srcPath, 'backend');\nconst publicPath = path.resolve(__dirname, 'public');\n\nconst endpoint = '/api';\n\nmodule.exports = {\n  __PROD__,\n  __DEV__,\n  httpPort,\n  httpsPort,\n  proxyPort,\n  credentials,\n  mongoUri,\n  jwtSecret,\n  webhook,\n  builtPath,\n  frontendBuiltPath,\n  backendBuiltPath,\n  srcPath,\n  frontendSrcPath,\n  backendSrcPath,\n  publicPath,\n  endpoint,\n};\n\n/* WEBPACK VAR INJECTION */}.call(exports, \"\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9lbnZpcm9ubWVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Vudmlyb25tZW50LmpzP2IzZmYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3Qge1xuICBOT0RFX0VOViA9ICdwcm9kdWN0aW9uJyxcblxuICBIVFRQX1BPUlQgPSAnODA4MCcsXG4gIEhUVFBTX1BPUlQgPSAnODQ0MycsXG4gIFBST1hZX1BPUlQgPSAnMzAwMCcsXG5cbiAgQ1JFREVOVElBTFNfRU5BQkxFRCA9ICcwJyxcbiAgQ1JFREVOVElBTFNfUEFUSCxcbiAgQ1JFREVOVElBTFNfQ0EsXG4gIENSRURFTlRJQUxTX0tFWSxcbiAgQ1JFREVOVElBTFNfQ0VSVCxcblxuICBNT05HT19VUkkgPSAnbW9uZ29kYjovL2xvY2FsaG9zdC9iaXRfcGFsJyxcbiAgSldUX1NFQ1JFVCA9ICdKV1RfU0VDUkVUX0tFWV9HT0VTX0hFUkUnLFxuXG4gIFdFQkhPT0tfRU5BQkxFRCA9ICcwJyxcbiAgV0VCSE9PS19TRUNSRVQsXG59ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IGlzRW5hYmxlZCA9IHYgPT4gdiA9PT0gJzEnO1xuXG5jb25zdCBfX1BST0RfXyA9IE5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5jb25zdCBfX0RFVl9fID0gIV9fUFJPRF9fO1xuXG5jb25zdCBodHRwUG9ydCA9IHBhcnNlSW50KEhUVFBfUE9SVCk7XG5jb25zdCBodHRwc1BvcnQgPSBwYXJzZUludChIVFRQU19QT1JUKTtcbmNvbnN0IHByb3h5UG9ydCA9IHBhcnNlSW50KFBST1hZX1BPUlQpO1xuXG5jb25zdCByZWFkID0gKGZpbGUpID0+IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoQ1JFREVOVElBTFNfUEFUSCwgZmlsZSkpO1xuY29uc3QgY3JlZGVudGlhbHMgPSBpc0VuYWJsZWQoQ1JFREVOVElBTFNfRU5BQkxFRCkgJiYge1xuICBjYTogcmVhZChDUkVERU5USUFMU19DQSksXG4gIGtleTogcmVhZChDUkVERU5USUFMU19LRVkpLFxuICBjZXJ0OiByZWFkKENSRURFTlRJQUxTX0NFUlQpLFxufTtcblxuY29uc3QgbW9uZ29VcmkgPSBNT05HT19VUkk7XG5jb25zdCBqd3RTZWNyZXQgPSBKV1RfU0VDUkVUO1xuXG5jb25zdCB3ZWJob29rID0gaXNFbmFibGVkKFdFQkhPT0tfRU5BQkxFRCkgJiYge1xuICBzZWNyZXQ6IFdFQkhPT0tfU0VDUkVULFxufTtcblxuY29uc3QgYnVpbHRQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2J1aWx0Jyk7XG5jb25zdCBmcm9udGVuZEJ1aWx0UGF0aCA9IHBhdGgucmVzb2x2ZShidWlsdFBhdGgsICdmcm9udGVuZCcpO1xuY29uc3QgYmFja2VuZEJ1aWx0UGF0aCA9IHBhdGgucmVzb2x2ZShidWlsdFBhdGgsICdiYWNrZW5kJyk7XG5jb25zdCBzcmNQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpO1xuY29uc3QgZnJvbnRlbmRTcmNQYXRoID0gcGF0aC5yZXNvbHZlKHNyY1BhdGgsICdmcm9udGVuZCcpO1xuY29uc3QgYmFja2VuZFNyY1BhdGggPSBwYXRoLnJlc29sdmUoc3JjUGF0aCwgJ2JhY2tlbmQnKTtcbmNvbnN0IHB1YmxpY1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJyk7XG5cbmNvbnN0IGVuZHBvaW50ID0gJy9hcGknO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgX19QUk9EX18sXG4gIF9fREVWX18sXG4gIGh0dHBQb3J0LFxuICBodHRwc1BvcnQsXG4gIHByb3h5UG9ydCxcbiAgY3JlZGVudGlhbHMsXG4gIG1vbmdvVXJpLFxuICBqd3RTZWNyZXQsXG4gIHdlYmhvb2ssXG4gIGJ1aWx0UGF0aCxcbiAgZnJvbnRlbmRCdWlsdFBhdGgsXG4gIGJhY2tlbmRCdWlsdFBhdGgsXG4gIHNyY1BhdGgsXG4gIGZyb250ZW5kU3JjUGF0aCxcbiAgYmFja2VuZFNyY1BhdGgsXG4gIHB1YmxpY1BhdGgsXG4gIGVuZHBvaW50LFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW52aXJvbm1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IC4vZW52aXJvbm1lbnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./environment.js\n");

/***/ }),

/***/ "./src/backend/common/config.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.imageUploadPaths = exports.thumbnailSizes = exports.jwtSignOptions = undefined;var _path = __webpack_require__(\"path\");var _path2 = _interopRequireDefault(_path);\nvar _environment = __webpack_require__(\"./environment.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar jwtSignOptions = {\n  expiresIn: '30d' };\n\n\nvar thumbnailSizes = [256, 512, 1024];\n\nvar imageUploadPaths = {\n  original: _path2.default.resolve(_environment.publicPath, 'image', 'original'),\n  thumbnail: _path2.default.resolve(_environment.publicPath, 'image', 'thumbnail') };exports.\n\n\n\njwtSignOptions = jwtSignOptions;exports.\nthumbnailSizes = thumbnailSizes;exports.\nimageUploadPaths = imageUploadPaths;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vY29uZmlnLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvY29tbW9uL2NvbmZpZy5qcz8zZTM4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7ZXhwb3J0cy5pbWFnZVVwbG9hZFBhdGhzID0gZXhwb3J0cy50aHVtYm5haWxTaXplcyA9IGV4cG9ydHMuand0U2lnbk9wdGlvbnMgPSB1bmRlZmluZWQ7dmFyIF9wYXRoID0gcmVxdWlyZSgncGF0aCcpO3ZhciBfcGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXRoKTtcbnZhciBfZW52aXJvbm1lbnQgPSByZXF1aXJlKCcvZW52aXJvbm1lbnQnKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31cblxudmFyIGp3dFNpZ25PcHRpb25zID0ge1xuICBleHBpcmVzSW46ICczMGQnIH07XG5cblxudmFyIHRodW1ibmFpbFNpemVzID0gWzI1NiwgNTEyLCAxMDI0XTtcblxudmFyIGltYWdlVXBsb2FkUGF0aHMgPSB7XG4gIG9yaWdpbmFsOiBfcGF0aDIuZGVmYXVsdC5yZXNvbHZlKF9lbnZpcm9ubWVudC5wdWJsaWNQYXRoLCAnaW1hZ2UnLCAnb3JpZ2luYWwnKSxcbiAgdGh1bWJuYWlsOiBfcGF0aDIuZGVmYXVsdC5yZXNvbHZlKF9lbnZpcm9ubWVudC5wdWJsaWNQYXRoLCAnaW1hZ2UnLCAndGh1bWJuYWlsJykgfTtleHBvcnRzLlxuXG5cblxuand0U2lnbk9wdGlvbnMgPSBqd3RTaWduT3B0aW9ucztleHBvcnRzLlxudGh1bWJuYWlsU2l6ZXMgPSB0aHVtYm5haWxTaXplcztleHBvcnRzLlxuaW1hZ2VVcGxvYWRQYXRocyA9IGltYWdlVXBsb2FkUGF0aHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9jb21tb24vY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbW1vbi9jb25maWcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/common/config.js\n");

/***/ }),

/***/ "./src/backend/common/db.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _environment = __webpack_require__(\"./environment.js\");\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n_mongoose2.default.Promise = global.Promise;\n_mongoose2.default.plugin(_plugins.bidPalPlugin);\nvar db = _mongoose2.default.createConnection(_environment.mongoUri);exports.default =\n\ndb;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vZGIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9jb21tb24vZGIuanM/ZTU2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9lbnZpcm9ubWVudCA9IHJlcXVpcmUoJy9lbnZpcm9ubWVudCcpO1xudmFyIF9wbHVnaW5zID0gcmVxdWlyZSgnL21vZGVscy9wbHVnaW5zJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cbl9tb25nb29zZTIuZGVmYXVsdC5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5fbW9uZ29vc2UyLmRlZmF1bHQucGx1Z2luKF9wbHVnaW5zLmJpZFBhbFBsdWdpbik7XG52YXIgZGIgPSBfbW9uZ29vc2UyLmRlZmF1bHQuY3JlYXRlQ29ubmVjdGlvbihfZW52aXJvbm1lbnQubW9uZ29VcmkpO2V4cG9ydHMuZGVmYXVsdCA9XG5cbmRiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvY29tbW9uL2RiLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbW1vbi9kYi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/common/db.js\n");

/***/ }),

/***/ "./src/backend/common/error.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");}return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== \"function\" && superClass !== null) {throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _extendableBuiltin(cls) {function ExtendableBuiltin() {var instance = Reflect.construct(cls, Array.from(arguments));Object.setPrototypeOf(instance, Object.getPrototypeOf(this));return instance;}ExtendableBuiltin.prototype = Object.create(cls.prototype, { constructor: { value: cls, enumerable: false, writable: true, configurable: true } });if (Object.setPrototypeOf) {Object.setPrototypeOf(ExtendableBuiltin, cls);} else {ExtendableBuiltin.__proto__ = cls;}return ExtendableBuiltin;}var BidPalError = function (_extendableBuiltin2) {_inherits(BidPalError, _extendableBuiltin2);function BidPalError() {_classCallCheck(this, BidPalError);return _possibleConstructorReturn(this, (BidPalError.__proto__ || Object.getPrototypeOf(BidPalError)).apply(this, arguments));}return BidPalError;}(_extendableBuiltin(Error));var\n\n\nNotFoundError = function (_BidPalError) {_inherits(NotFoundError, _BidPalError);function NotFoundError() {_classCallCheck(this, NotFoundError);return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).apply(this, arguments));}return NotFoundError;}(BidPalError);var\n\n\nPermissionError = function (_BidPalError2) {_inherits(PermissionError, _BidPalError2);function PermissionError() {_classCallCheck(this, PermissionError);return _possibleConstructorReturn(this, (PermissionError.__proto__ || Object.getPrototypeOf(PermissionError)).apply(this, arguments));}return PermissionError;}(BidPalError);var\n\n\nAuthorizationError = function (_BidPalError3) {_inherits(AuthorizationError, _BidPalError3);function AuthorizationError() {_classCallCheck(this, AuthorizationError);return _possibleConstructorReturn(this, (AuthorizationError.__proto__ || Object.getPrototypeOf(AuthorizationError)).apply(this, arguments));}return AuthorizationError;}(BidPalError);exports.\n\n\n\nBidPalError = BidPalError;exports.\nNotFoundError = NotFoundError;exports.\nPermissionError = PermissionError;exports.\nAuthorizationError = AuthorizationError;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vZXJyb3IuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9jb21tb24vZXJyb3IuanM/OGRkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge2lmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTt9fWZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtpZiAoIXNlbGYpIHt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7fXJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO31mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7fXN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7aWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO31mdW5jdGlvbiBfZXh0ZW5kYWJsZUJ1aWx0aW4oY2xzKSB7ZnVuY3Rpb24gRXh0ZW5kYWJsZUJ1aWx0aW4oKSB7dmFyIGluc3RhbmNlID0gUmVmbGVjdC5jb25zdHJ1Y3QoY2xzLCBBcnJheS5mcm9tKGFyZ3VtZW50cykpO09iamVjdC5zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpKTtyZXR1cm4gaW5zdGFuY2U7fUV4dGVuZGFibGVCdWlsdGluLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoY2xzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogY2xzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pO2lmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtPYmplY3Quc2V0UHJvdG90eXBlT2YoRXh0ZW5kYWJsZUJ1aWx0aW4sIGNscyk7fSBlbHNlIHtFeHRlbmRhYmxlQnVpbHRpbi5fX3Byb3RvX18gPSBjbHM7fXJldHVybiBFeHRlbmRhYmxlQnVpbHRpbjt9dmFyIEJpZFBhbEVycm9yID0gZnVuY3Rpb24gKF9leHRlbmRhYmxlQnVpbHRpbjIpIHtfaW5oZXJpdHMoQmlkUGFsRXJyb3IsIF9leHRlbmRhYmxlQnVpbHRpbjIpO2Z1bmN0aW9uIEJpZFBhbEVycm9yKCkge19jbGFzc0NhbGxDaGVjayh0aGlzLCBCaWRQYWxFcnJvcik7cmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChCaWRQYWxFcnJvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJpZFBhbEVycm9yKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7fXJldHVybiBCaWRQYWxFcnJvcjt9KF9leHRlbmRhYmxlQnVpbHRpbihFcnJvcikpO3ZhclxuXG5cbk5vdEZvdW5kRXJyb3IgPSBmdW5jdGlvbiAoX0JpZFBhbEVycm9yKSB7X2luaGVyaXRzKE5vdEZvdW5kRXJyb3IsIF9CaWRQYWxFcnJvcik7ZnVuY3Rpb24gTm90Rm91bmRFcnJvcigpIHtfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm90Rm91bmRFcnJvcik7cmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChOb3RGb3VuZEVycm9yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTm90Rm91bmRFcnJvcikpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO31yZXR1cm4gTm90Rm91bmRFcnJvcjt9KEJpZFBhbEVycm9yKTt2YXJcblxuXG5QZXJtaXNzaW9uRXJyb3IgPSBmdW5jdGlvbiAoX0JpZFBhbEVycm9yMikge19pbmhlcml0cyhQZXJtaXNzaW9uRXJyb3IsIF9CaWRQYWxFcnJvcjIpO2Z1bmN0aW9uIFBlcm1pc3Npb25FcnJvcigpIHtfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGVybWlzc2lvbkVycm9yKTtyZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFBlcm1pc3Npb25FcnJvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFBlcm1pc3Npb25FcnJvcikpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO31yZXR1cm4gUGVybWlzc2lvbkVycm9yO30oQmlkUGFsRXJyb3IpO3ZhclxuXG5cbkF1dGhvcml6YXRpb25FcnJvciA9IGZ1bmN0aW9uIChfQmlkUGFsRXJyb3IzKSB7X2luaGVyaXRzKEF1dGhvcml6YXRpb25FcnJvciwgX0JpZFBhbEVycm9yMyk7ZnVuY3Rpb24gQXV0aG9yaXphdGlvbkVycm9yKCkge19jbGFzc0NhbGxDaGVjayh0aGlzLCBBdXRob3JpemF0aW9uRXJyb3IpO3JldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXV0aG9yaXphdGlvbkVycm9yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXV0aG9yaXphdGlvbkVycm9yKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7fXJldHVybiBBdXRob3JpemF0aW9uRXJyb3I7fShCaWRQYWxFcnJvcik7ZXhwb3J0cy5cblxuXG5cbkJpZFBhbEVycm9yID0gQmlkUGFsRXJyb3I7ZXhwb3J0cy5cbk5vdEZvdW5kRXJyb3IgPSBOb3RGb3VuZEVycm9yO2V4cG9ydHMuXG5QZXJtaXNzaW9uRXJyb3IgPSBQZXJtaXNzaW9uRXJyb3I7ZXhwb3J0cy5cbkF1dGhvcml6YXRpb25FcnJvciA9IEF1dGhvcml6YXRpb25FcnJvcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbW1vbi9lcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9jb21tb24vZXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/common/error.js\n");

/***/ }),

/***/ "./src/backend/common/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.deleteFile = exports.isImageFile = exports.now = exports.isMongooseObject = exports.replaceMe = undefined;var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i[\"return\"]) _i[\"return\"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");}};}();var _fs = __webpack_require__(\"fs\");var _fs2 = _interopRequireDefault(_fs);\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar replaceMe = function replaceMe(req, res, next) {\n  if (req.params.object_id === 'me') {var\n    author = req.author;\n    if (!author.isUser()) return next(new _error.AuthorizationError());\n    req.params.object_id = author._id;\n  }\n  next();\n};\n\nvar isMongooseObject = function isMongooseObject(object) {return object && object.constructor.name === 'model';};\n\nvar now = function now() {\n  return new Date();\n};\n\nvar isImageFile = function isImageFile(value) {var _value$split =\n  value.split('/'),_value$split2 = _slicedToArray(_value$split, 2),type = _value$split2[0],subtype = _value$split2[1];\n  return type === 'image' && ['gif', 'jpeg', 'png', 'svg+xml'].includes(subtype);\n};\n\nvar deleteFile = function deleteFile(path) {\n  return new Promise(function (resolve, reject) {\n    _fs2.default.access(path, function (err) {\n      if (err) return reject(err);\n      _fs2.default.unlink(path, function (err) {\n        if (err) return reject(err);\n        resolve();\n      });\n    });\n  });\n};exports.\n\n\nreplaceMe = replaceMe;exports.\nisMongooseObject = isMongooseObject;exports.\nnow = now;exports.\nisImageFile = isImageFile;exports.\ndeleteFile = deleteFile;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vdXRpbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2NvbW1vbi91dGlsLmpzPzY5YTMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtleHBvcnRzLmRlbGV0ZUZpbGUgPSBleHBvcnRzLmlzSW1hZ2VGaWxlID0gZXhwb3J0cy5ub3cgPSBleHBvcnRzLmlzTW9uZ29vc2VPYmplY3QgPSBleHBvcnRzLnJlcGxhY2VNZSA9IHVuZGVmaW5lZDt2YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7ZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHt2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9lID0gdW5kZWZpbmVkO3RyeSB7Zm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge19hcnIucHVzaChfcy52YWx1ZSk7aWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO319IGNhdGNoIChlcnIpIHtfZCA9IHRydWU7X2UgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7fSBmaW5hbGx5IHtpZiAoX2QpIHRocm93IF9lO319cmV0dXJuIF9hcnI7fXJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7aWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge3JldHVybiBhcnI7fSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtyZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO30gZWxzZSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7fX07fSgpO3ZhciBfZnMgPSByZXF1aXJlKCdmcycpO3ZhciBfZnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnMpO1xudmFyIF9lcnJvciA9IHJlcXVpcmUoJy4vZXJyb3InKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31cblxudmFyIHJlcGxhY2VNZSA9IGZ1bmN0aW9uIHJlcGxhY2VNZShyZXEsIHJlcywgbmV4dCkge1xuICBpZiAocmVxLnBhcmFtcy5vYmplY3RfaWQgPT09ICdtZScpIHt2YXJcbiAgICBhdXRob3IgPSByZXEuYXV0aG9yO1xuICAgIGlmICghYXV0aG9yLmlzVXNlcigpKSByZXR1cm4gbmV4dChuZXcgX2Vycm9yLkF1dGhvcml6YXRpb25FcnJvcigpKTtcbiAgICByZXEucGFyYW1zLm9iamVjdF9pZCA9IGF1dGhvci5faWQ7XG4gIH1cbiAgbmV4dCgpO1xufTtcblxudmFyIGlzTW9uZ29vc2VPYmplY3QgPSBmdW5jdGlvbiBpc01vbmdvb3NlT2JqZWN0KG9iamVjdCkge3JldHVybiBvYmplY3QgJiYgb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdtb2RlbCc7fTtcblxudmFyIG5vdyA9IGZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCk7XG59O1xuXG52YXIgaXNJbWFnZUZpbGUgPSBmdW5jdGlvbiBpc0ltYWdlRmlsZSh2YWx1ZSkge3ZhciBfdmFsdWUkc3BsaXQgPVxuICB2YWx1ZS5zcGxpdCgnLycpLF92YWx1ZSRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfdmFsdWUkc3BsaXQsIDIpLHR5cGUgPSBfdmFsdWUkc3BsaXQyWzBdLHN1YnR5cGUgPSBfdmFsdWUkc3BsaXQyWzFdO1xuICByZXR1cm4gdHlwZSA9PT0gJ2ltYWdlJyAmJiBbJ2dpZicsICdqcGVnJywgJ3BuZycsICdzdmcreG1sJ10uaW5jbHVkZXMoc3VidHlwZSk7XG59O1xuXG52YXIgZGVsZXRlRmlsZSA9IGZ1bmN0aW9uIGRlbGV0ZUZpbGUocGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIF9mczIuZGVmYXVsdC5hY2Nlc3MocGF0aCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgX2ZzMi5kZWZhdWx0LnVubGluayhwYXRoLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtleHBvcnRzLlxuXG5cbnJlcGxhY2VNZSA9IHJlcGxhY2VNZTtleHBvcnRzLlxuaXNNb25nb29zZU9iamVjdCA9IGlzTW9uZ29vc2VPYmplY3Q7ZXhwb3J0cy5cbm5vdyA9IG5vdztleHBvcnRzLlxuaXNJbWFnZUZpbGUgPSBpc0ltYWdlRmlsZTtleHBvcnRzLlxuZGVsZXRlRmlsZSA9IGRlbGV0ZUZpbGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9jb21tb24vdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9jb21tb24vdXRpbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/common/util.js\n");

/***/ }),

/***/ "./src/backend/controllers/BidPalRouter.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}\n\nvar create = function create(Model, singular, plural) {var paramReplacer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (req, res, next) {return next();};\n  var router = _express2.default.Router();\n\n  var allObjects = function allObjects(req, res, next) {var _req$options =\n    req.options,where = _req$options.where,sort = _req$options.sort,skip = _req$options.skip,limit = _req$options.limit,populate = _req$options.populate;\n    Model.find(where(Model)).sort(sort).skip(skip).limit(limit).populate(populate).\n    then(function (objects) {return res.return(_defineProperty({}, plural, objects));}).\n    catch(next);\n  };\n\n  var getObject = function getObject(req, res, next) {var\n    object_id = req.params.object_id;\n    Model.findById(object_id).populate(req.options.populate).\n    then(function (object) {\n      if (!object) throw new _error.NotFoundError();\n      return res.return(_defineProperty({}, singular, object));\n    }).\n    catch(next);\n  };\n\n  var addObject = function addObject(req, res, next) {var\n    body = req.body;\n    Model.create(body).\n    then(function (object) {return object.setAuthor(req.author).save();}).\n    then(function (object) {return res.return(_defineProperty({}, singular, object));}).\n    catch(next);\n  };\n\n  var updateObject = function updateObject(req, res, next) {var\n    object_id = req.params.object_id;var\n    body = req.body;\n    Model.get(object_id).\n    then(function (object) {return object.setAuthor(req.author).set(body).save();}).\n    then(function (object) {return res.return(_defineProperty({}, singular, object));}).\n    catch(next);\n  };\n\n  var deleteObject = function deleteObject(req, res, next) {var\n    object_id = req.params.object_id;\n    Model.get(object_id).\n    then(function (object) {return object.setAuthor(req.author).remove();}).\n    then(function (object) {return res.return(_defineProperty({}, singular, object));}).\n    catch(next);\n  };\n\n  router.route('/').\n  get(allObjects).\n  post(addObject);\n\n  router.route('/:object_id').\n  all(paramReplacer).\n  get(getObject).\n  put(updateObject).\n  delete(deleteObject);\n\n  return router;\n};exports.default =\n\ncreate;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9CaWRQYWxSb3V0ZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9CaWRQYWxSb3V0ZXIuanM/YzE0MiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTt2YXIgX2V4cHJlc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhwcmVzcyk7XG52YXIgX2Vycm9yID0gcmVxdWlyZSgnL2NvbW1vbi9lcnJvcicpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtpZiAoa2V5IGluIG9iaikge09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7fSBlbHNlIHtvYmpba2V5XSA9IHZhbHVlO31yZXR1cm4gb2JqO31cblxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShNb2RlbCwgc2luZ3VsYXIsIHBsdXJhbCkge3ZhciBwYXJhbVJlcGxhY2VyID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtyZXR1cm4gbmV4dCgpO307XG4gIHZhciByb3V0ZXIgPSBfZXhwcmVzczIuZGVmYXVsdC5Sb3V0ZXIoKTtcblxuICB2YXIgYWxsT2JqZWN0cyA9IGZ1bmN0aW9uIGFsbE9iamVjdHMocmVxLCByZXMsIG5leHQpIHt2YXIgX3JlcSRvcHRpb25zID1cbiAgICByZXEub3B0aW9ucyx3aGVyZSA9IF9yZXEkb3B0aW9ucy53aGVyZSxzb3J0ID0gX3JlcSRvcHRpb25zLnNvcnQsc2tpcCA9IF9yZXEkb3B0aW9ucy5za2lwLGxpbWl0ID0gX3JlcSRvcHRpb25zLmxpbWl0LHBvcHVsYXRlID0gX3JlcSRvcHRpb25zLnBvcHVsYXRlO1xuICAgIE1vZGVsLmZpbmQod2hlcmUoTW9kZWwpKS5zb3J0KHNvcnQpLnNraXAoc2tpcCkubGltaXQobGltaXQpLnBvcHVsYXRlKHBvcHVsYXRlKS5cbiAgICB0aGVuKGZ1bmN0aW9uIChvYmplY3RzKSB7cmV0dXJuIHJlcy5yZXR1cm4oX2RlZmluZVByb3BlcnR5KHt9LCBwbHVyYWwsIG9iamVjdHMpKTt9KS5cbiAgICBjYXRjaChuZXh0KTtcbiAgfTtcblxuICB2YXIgZ2V0T2JqZWN0ID0gZnVuY3Rpb24gZ2V0T2JqZWN0KHJlcSwgcmVzLCBuZXh0KSB7dmFyXG4gICAgb2JqZWN0X2lkID0gcmVxLnBhcmFtcy5vYmplY3RfaWQ7XG4gICAgTW9kZWwuZmluZEJ5SWQob2JqZWN0X2lkKS5wb3B1bGF0ZShyZXEub3B0aW9ucy5wb3B1bGF0ZSkuXG4gICAgdGhlbihmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBpZiAoIW9iamVjdCkgdGhyb3cgbmV3IF9lcnJvci5Ob3RGb3VuZEVycm9yKCk7XG4gICAgICByZXR1cm4gcmVzLnJldHVybihfZGVmaW5lUHJvcGVydHkoe30sIHNpbmd1bGFyLCBvYmplY3QpKTtcbiAgICB9KS5cbiAgICBjYXRjaChuZXh0KTtcbiAgfTtcblxuICB2YXIgYWRkT2JqZWN0ID0gZnVuY3Rpb24gYWRkT2JqZWN0KHJlcSwgcmVzLCBuZXh0KSB7dmFyXG4gICAgYm9keSA9IHJlcS5ib2R5O1xuICAgIE1vZGVsLmNyZWF0ZShib2R5KS5cbiAgICB0aGVuKGZ1bmN0aW9uIChvYmplY3QpIHtyZXR1cm4gb2JqZWN0LnNldEF1dGhvcihyZXEuYXV0aG9yKS5zYXZlKCk7fSkuXG4gICAgdGhlbihmdW5jdGlvbiAob2JqZWN0KSB7cmV0dXJuIHJlcy5yZXR1cm4oX2RlZmluZVByb3BlcnR5KHt9LCBzaW5ndWxhciwgb2JqZWN0KSk7fSkuXG4gICAgY2F0Y2gobmV4dCk7XG4gIH07XG5cbiAgdmFyIHVwZGF0ZU9iamVjdCA9IGZ1bmN0aW9uIHVwZGF0ZU9iamVjdChyZXEsIHJlcywgbmV4dCkge3ZhclxuICAgIG9iamVjdF9pZCA9IHJlcS5wYXJhbXMub2JqZWN0X2lkO3ZhclxuICAgIGJvZHkgPSByZXEuYm9keTtcbiAgICBNb2RlbC5nZXQob2JqZWN0X2lkKS5cbiAgICB0aGVuKGZ1bmN0aW9uIChvYmplY3QpIHtyZXR1cm4gb2JqZWN0LnNldEF1dGhvcihyZXEuYXV0aG9yKS5zZXQoYm9keSkuc2F2ZSgpO30pLlxuICAgIHRoZW4oZnVuY3Rpb24gKG9iamVjdCkge3JldHVybiByZXMucmV0dXJuKF9kZWZpbmVQcm9wZXJ0eSh7fSwgc2luZ3VsYXIsIG9iamVjdCkpO30pLlxuICAgIGNhdGNoKG5leHQpO1xuICB9O1xuXG4gIHZhciBkZWxldGVPYmplY3QgPSBmdW5jdGlvbiBkZWxldGVPYmplY3QocmVxLCByZXMsIG5leHQpIHt2YXJcbiAgICBvYmplY3RfaWQgPSByZXEucGFyYW1zLm9iamVjdF9pZDtcbiAgICBNb2RlbC5nZXQob2JqZWN0X2lkKS5cbiAgICB0aGVuKGZ1bmN0aW9uIChvYmplY3QpIHtyZXR1cm4gb2JqZWN0LnNldEF1dGhvcihyZXEuYXV0aG9yKS5yZW1vdmUoKTt9KS5cbiAgICB0aGVuKGZ1bmN0aW9uIChvYmplY3QpIHtyZXR1cm4gcmVzLnJldHVybihfZGVmaW5lUHJvcGVydHkoe30sIHNpbmd1bGFyLCBvYmplY3QpKTt9KS5cbiAgICBjYXRjaChuZXh0KTtcbiAgfTtcblxuICByb3V0ZXIucm91dGUoJy8nKS5cbiAgZ2V0KGFsbE9iamVjdHMpLlxuICBwb3N0KGFkZE9iamVjdCk7XG5cbiAgcm91dGVyLnJvdXRlKCcvOm9iamVjdF9pZCcpLlxuICBhbGwocGFyYW1SZXBsYWNlcikuXG4gIGdldChnZXRPYmplY3QpLlxuICBwdXQodXBkYXRlT2JqZWN0KS5cbiAgZGVsZXRlKGRlbGV0ZU9iamVjdCk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn07ZXhwb3J0cy5kZWZhdWx0ID1cblxuY3JlYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvQmlkUGFsUm91dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL0JpZFBhbFJvdXRlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/controllers/BidPalRouter.js\n");

/***/ }),

/***/ "./src/backend/controllers/auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _faker = __webpack_require__(\"faker\");var _faker2 = _interopRequireDefault(_faker);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar router = _express2.default.Router();\n\nvar createAuth = function createAuth(req, res, next) {\n  var username = _faker2.default.internet.userName();\n  var avatar = _faker2.default.internet.avatar();\n  var name = _faker2.default.name.findName();\n  new _models.User({\n    username: username,\n    avatar: avatar,\n    name: name }).\n  save().\n  then(_models.Auth.sign).\n  then(function (auth) {return auth.save();}).\n  then(function (auth) {\n    res.cookie('token', auth.token);\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nvar destroyAuth = function destroyAuth(req, res, next) {var\n  token = req.cookies.token;\n  _models.Auth.findOne({ token: token }).\n  then(function (auth) {\n    if (!auth) return auth;\n    return auth.remove();\n  }).\n  then(function (auth) {\n    res.cookie('token', '');\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nrouter.route('/').\npost(createAuth).\ndelete(destroyAuth);exports.default =\n\nrouter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9hdXRoLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvYXV0aC5qcz8yYWU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9leHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO3ZhciBfZXhwcmVzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHByZXNzKTtcbnZhciBfZmFrZXIgPSByZXF1aXJlKCdmYWtlcicpO3ZhciBfZmFrZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFrZXIpO1xudmFyIF9tb2RlbHMgPSByZXF1aXJlKCcvbW9kZWxzJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cbnZhciByb3V0ZXIgPSBfZXhwcmVzczIuZGVmYXVsdC5Sb3V0ZXIoKTtcblxudmFyIGNyZWF0ZUF1dGggPSBmdW5jdGlvbiBjcmVhdGVBdXRoKHJlcSwgcmVzLCBuZXh0KSB7XG4gIHZhciB1c2VybmFtZSA9IF9mYWtlcjIuZGVmYXVsdC5pbnRlcm5ldC51c2VyTmFtZSgpO1xuICB2YXIgYXZhdGFyID0gX2Zha2VyMi5kZWZhdWx0LmludGVybmV0LmF2YXRhcigpO1xuICB2YXIgbmFtZSA9IF9mYWtlcjIuZGVmYXVsdC5uYW1lLmZpbmROYW1lKCk7XG4gIG5ldyBfbW9kZWxzLlVzZXIoe1xuICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICBhdmF0YXI6IGF2YXRhcixcbiAgICBuYW1lOiBuYW1lIH0pLlxuICBzYXZlKCkuXG4gIHRoZW4oX21vZGVscy5BdXRoLnNpZ24pLlxuICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7cmV0dXJuIGF1dGguc2F2ZSgpO30pLlxuICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7XG4gICAgcmVzLmNvb2tpZSgndG9rZW4nLCBhdXRoLnRva2VuKTtcbiAgICByZXMucmV0dXJuKHsgYXV0aDogYXV0aCB9KTtcbiAgfSkuXG4gIGNhdGNoKG5leHQpO1xufTtcblxudmFyIGRlc3Ryb3lBdXRoID0gZnVuY3Rpb24gZGVzdHJveUF1dGgocmVxLCByZXMsIG5leHQpIHt2YXJcbiAgdG9rZW4gPSByZXEuY29va2llcy50b2tlbjtcbiAgX21vZGVscy5BdXRoLmZpbmRPbmUoeyB0b2tlbjogdG9rZW4gfSkuXG4gIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICBpZiAoIWF1dGgpIHJldHVybiBhdXRoO1xuICAgIHJldHVybiBhdXRoLnJlbW92ZSgpO1xuICB9KS5cbiAgdGhlbihmdW5jdGlvbiAoYXV0aCkge1xuICAgIHJlcy5jb29raWUoJ3Rva2VuJywgJycpO1xuICAgIHJlcy5yZXR1cm4oeyBhdXRoOiBhdXRoIH0pO1xuICB9KS5cbiAgY2F0Y2gobmV4dCk7XG59O1xuXG5yb3V0ZXIucm91dGUoJy8nKS5cbnBvc3QoY3JlYXRlQXV0aCkuXG5kZWxldGUoZGVzdHJveUF1dGgpO2V4cG9ydHMuZGVmYXVsdCA9XG5cbnJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2F1dGguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvYXV0aC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/controllers/auth.js\n");

/***/ }),

/***/ "./src/backend/controllers/image.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _multer = __webpack_require__(\"multer\");var _multer2 = _interopRequireDefault(_multer);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");\nvar _config = __webpack_require__(\"./src/backend/common/config.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar router = _express2.default.Router();\n\nvar upload = (0, _multer2.default)({ dest: _config.imageUploadPaths.original }).single('image');\n\nvar addImage = function addImage(req, res, next) {var\n  file = req.file;\n  _models.Image.upload(file).\n  then(function (image) {return image.setAuthor(req.author).save();}).\n  then(function (image) {return res.return({ image: image });}).\n  catch(function (err) {\n    _models.Image.unlinkFiles(file.filename).catch(console.error);\n    next(err);\n  });\n};\n\nvar deleteImage = function deleteImage(req, res, next) {var\n  image_id = req.params.image_id;\n  _models.Image.get(image_id).\n  then(function (image) {return image.setAuthor(req.author).remove();}).\n  then(function (image) {return res.return({ image: image });}).\n  catch(next);\n};\n\nvar viewOriginalImage = function viewOriginalImage(req, res, next) {var\n  image_id = req.params.image_id;\n  _models.Image.get(image_id).\n  then(function (image) {\n    res.set('Content-type', image.mimeType);\n    return image.read(null);\n  }).\n  then(function (content) {return res.end(content);}).\n  catch(next);\n};\n\nvar viewThumbnailImage = function viewThumbnailImage(req, res, next) {var _req$params =\n  req.params,image_id = _req$params.image_id,image_size = _req$params.image_size;\n  _models.Image.get(image_id).\n  then(function (image) {\n    res.set('Content-type', image.mimeType);\n    return image.read(image_size);\n  }).\n  then(function (content) {return res.end(content);}).\n  catch(next);\n};\n\nrouter.route('/').\npost(upload, addImage);\n\nrouter.route('/:image_id').\ndelete(deleteImage);\n\nrouter.route('/:image_id/original').\nget(viewOriginalImage);\n\nrouter.route('/:image_id/thumbnail/:image_size').\nget(viewThumbnailImage);exports.default =\n\nrouter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9pbWFnZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2ltYWdlLmpzP2RhYTciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX2V4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7dmFyIF9leHByZXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4cHJlc3MpO1xudmFyIF9tdWx0ZXIgPSByZXF1aXJlKCdtdWx0ZXInKTt2YXIgX211bHRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tdWx0ZXIpO1xudmFyIF9tb2RlbHMgPSByZXF1aXJlKCcvbW9kZWxzJyk7XG52YXIgX2NvbmZpZyA9IHJlcXVpcmUoJy9jb21tb24vY29uZmlnJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cbnZhciByb3V0ZXIgPSBfZXhwcmVzczIuZGVmYXVsdC5Sb3V0ZXIoKTtcblxudmFyIHVwbG9hZCA9ICgwLCBfbXVsdGVyMi5kZWZhdWx0KSh7IGRlc3Q6IF9jb25maWcuaW1hZ2VVcGxvYWRQYXRocy5vcmlnaW5hbCB9KS5zaW5nbGUoJ2ltYWdlJyk7XG5cbnZhciBhZGRJbWFnZSA9IGZ1bmN0aW9uIGFkZEltYWdlKHJlcSwgcmVzLCBuZXh0KSB7dmFyXG4gIGZpbGUgPSByZXEuZmlsZTtcbiAgX21vZGVscy5JbWFnZS51cGxvYWQoZmlsZSkuXG4gIHRoZW4oZnVuY3Rpb24gKGltYWdlKSB7cmV0dXJuIGltYWdlLnNldEF1dGhvcihyZXEuYXV0aG9yKS5zYXZlKCk7fSkuXG4gIHRoZW4oZnVuY3Rpb24gKGltYWdlKSB7cmV0dXJuIHJlcy5yZXR1cm4oeyBpbWFnZTogaW1hZ2UgfSk7fSkuXG4gIGNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBfbW9kZWxzLkltYWdlLnVubGlua0ZpbGVzKGZpbGUuZmlsZW5hbWUpLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgIG5leHQoZXJyKTtcbiAgfSk7XG59O1xuXG52YXIgZGVsZXRlSW1hZ2UgPSBmdW5jdGlvbiBkZWxldGVJbWFnZShyZXEsIHJlcywgbmV4dCkge3ZhclxuICBpbWFnZV9pZCA9IHJlcS5wYXJhbXMuaW1hZ2VfaWQ7XG4gIF9tb2RlbHMuSW1hZ2UuZ2V0KGltYWdlX2lkKS5cbiAgdGhlbihmdW5jdGlvbiAoaW1hZ2UpIHtyZXR1cm4gaW1hZ2Uuc2V0QXV0aG9yKHJlcS5hdXRob3IpLnJlbW92ZSgpO30pLlxuICB0aGVuKGZ1bmN0aW9uIChpbWFnZSkge3JldHVybiByZXMucmV0dXJuKHsgaW1hZ2U6IGltYWdlIH0pO30pLlxuICBjYXRjaChuZXh0KTtcbn07XG5cbnZhciB2aWV3T3JpZ2luYWxJbWFnZSA9IGZ1bmN0aW9uIHZpZXdPcmlnaW5hbEltYWdlKHJlcSwgcmVzLCBuZXh0KSB7dmFyXG4gIGltYWdlX2lkID0gcmVxLnBhcmFtcy5pbWFnZV9pZDtcbiAgX21vZGVscy5JbWFnZS5nZXQoaW1hZ2VfaWQpLlxuICB0aGVuKGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHJlcy5zZXQoJ0NvbnRlbnQtdHlwZScsIGltYWdlLm1pbWVUeXBlKTtcbiAgICByZXR1cm4gaW1hZ2UucmVhZChudWxsKTtcbiAgfSkuXG4gIHRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtyZXR1cm4gcmVzLmVuZChjb250ZW50KTt9KS5cbiAgY2F0Y2gobmV4dCk7XG59O1xuXG52YXIgdmlld1RodW1ibmFpbEltYWdlID0gZnVuY3Rpb24gdmlld1RodW1ibmFpbEltYWdlKHJlcSwgcmVzLCBuZXh0KSB7dmFyIF9yZXEkcGFyYW1zID1cbiAgcmVxLnBhcmFtcyxpbWFnZV9pZCA9IF9yZXEkcGFyYW1zLmltYWdlX2lkLGltYWdlX3NpemUgPSBfcmVxJHBhcmFtcy5pbWFnZV9zaXplO1xuICBfbW9kZWxzLkltYWdlLmdldChpbWFnZV9pZCkuXG4gIHRoZW4oZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgcmVzLnNldCgnQ29udGVudC10eXBlJywgaW1hZ2UubWltZVR5cGUpO1xuICAgIHJldHVybiBpbWFnZS5yZWFkKGltYWdlX3NpemUpO1xuICB9KS5cbiAgdGhlbihmdW5jdGlvbiAoY29udGVudCkge3JldHVybiByZXMuZW5kKGNvbnRlbnQpO30pLlxuICBjYXRjaChuZXh0KTtcbn07XG5cbnJvdXRlci5yb3V0ZSgnLycpLlxucG9zdCh1cGxvYWQsIGFkZEltYWdlKTtcblxucm91dGVyLnJvdXRlKCcvOmltYWdlX2lkJykuXG5kZWxldGUoZGVsZXRlSW1hZ2UpO1xuXG5yb3V0ZXIucm91dGUoJy86aW1hZ2VfaWQvb3JpZ2luYWwnKS5cbmdldCh2aWV3T3JpZ2luYWxJbWFnZSk7XG5cbnJvdXRlci5yb3V0ZSgnLzppbWFnZV9pZC90aHVtYm5haWwvOmltYWdlX3NpemUnKS5cbmdldCh2aWV3VGh1bWJuYWlsSW1hZ2UpO2V4cG9ydHMuZGVmYXVsdCA9XG5cbnJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2ltYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2ltYWdlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/controllers/image.js\n");

/***/ }),

/***/ "./src/backend/controllers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i[\"return\"]) _i[\"return\"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");}};}();var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");\nvar _util = __webpack_require__(\"./src/backend/common/util.js\");\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");\nvar _BidPalRouter = __webpack_require__(\"./src/backend/controllers/BidPalRouter.js\");var _BidPalRouter2 = _interopRequireDefault(_BidPalRouter);\nvar _auth = __webpack_require__(\"./src/backend/controllers/auth.js\");var _auth2 = _interopRequireDefault(_auth);\nvar _image = __webpack_require__(\"./src/backend/controllers/image.js\");var _image2 = _interopRequireDefault(_image);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}\n\nvar router = new _express2.default.Router();\n\nvar processWhere = function processWhere(Model, where) {\n  var definition = Model.schema.obj;\n  var query = {};\n  var keys = Object.keys(where);var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {\n    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var key = _step.value;\n      if (!definition[key]) continue;\n      var property = definition[key];\n      var value = where[key];\n      switch (property.type) {\n        case String:\n          if (property.enum) {\n            query[key] = value;\n          } else {\n            query[key] = new RegExp(value, 'i');\n          }\n          break;\n        default:\n          query[key] = value;}\n\n    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}\n  return query;\n};\n\nvar processPopulate = function processPopulate(populate) {\n  var fields = populate ? populate.split(',') : [];\n  return fields.map(function (field) {\n    var query = {};\n    var cursor = query;\n    var tokens = field.split('.');var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {\n      for (var _iterator2 = tokens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var token = _step2.value;\n        cursor = cursor.populate = { path: token };\n      }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}\n    return query.populate;\n  });\n};\n\nvar getRequestOptions = function getRequestOptions(req) {var _req$query =\n\n\n\n\n\n\n  req.query,_req$query$sort = _req$query.sort,sort = _req$query$sort === undefined ? null : _req$query$sort,_req$query$skip = _req$query.skip,skip = _req$query$skip === undefined ? null : _req$query$skip,_req$query$limit = _req$query.limit,limit = _req$query$limit === undefined ? null : _req$query$limit,_req$query$populate = _req$query.populate,populate = _req$query$populate === undefined ? null : _req$query$populate,_where = _objectWithoutProperties(_req$query, ['sort', 'skip', 'limit', 'populate']);\n  return {\n    sort: sort,\n    skip: skip,\n    limit: limit,\n    populate: processPopulate(populate),\n    where: function where(Object) {return processWhere(Object, _where);} };\n\n};\n\nrouter.use(function (req, res, next) {\n  req.options = getRequestOptions(req);\n\n  res.return = function (obj) {\n    var flat = {};\n    var keys = Object.keys(obj);var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {\n      for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var key = _step3.value;\n        var value = obj[key];\n        if ((0, _util.isMongooseObject)(value)) {\n          flat[key] = value.toJSON({ req: req });\n        } else if (Array.isArray(value) && (0, _util.isMongooseObject)(value[0])) {\n          flat[key] = value.map(function (elem) {return elem.toJSON({ req: req });});\n        } else {\n          flat[key] = value;\n        }\n      }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}\n    res.json(flat);\n  };var\n\n  token = req.cookies.token;\n  if (token) {\n    _models.Auth.verify(token).\n    catch(function () {\n      res.cookie('token', '');\n      throw new _error.AuthorizationError();\n    }).\n    then(function (auth) {return _models.Auth.populate(auth, 'user');}).\n    then(function (auth) {return auth.refresh();}).\n    then(function (auth) {\n      req.author = auth.user;\n      next();\n    }).\n    catch(next);\n  } else {\n    req.author = new _models.User();\n    next();\n  }\n});\nrouter.use('/auth', _auth2.default);\nrouter.use('/image', _image2.default);\nrouter.use('/bid', (0, _BidPalRouter2.default)(_models.Bid, 'bid', 'bids'));\nrouter.use('/auction', (0, _BidPalRouter2.default)(_models.Auction, 'auction', 'auctions'));\nrouter.use('/user', (0, _BidPalRouter2.default)(_models.User, 'user', 'users', _util.replaceMe));\nrouter.use(function (req, res, next) {return next(new _error.NotFoundError());});\nrouter.use(function (err, req, res, next) {\n  var statusMap = [\n  [_error.AuthorizationError, 401],\n  [_error.PermissionError, 403],\n  [_error.NotFoundError, 404],\n  [Error, 500]];var _statusMap$find =\n\n  statusMap.find(function (_ref) {var _ref2 = _slicedToArray(_ref, 1),Error = _ref2[0];return err instanceof Error;}),_statusMap$find2 = _slicedToArray(_statusMap$find, 2),status = _statusMap$find2[1];\n  res.status(status);\n  res.json({\n    status: status,\n    err: err });\n\n  console.error(err);\n});exports.default =\n\nrouter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2luZGV4LmpzPzVmYTciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7ZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHt2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9lID0gdW5kZWZpbmVkO3RyeSB7Zm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge19hcnIucHVzaChfcy52YWx1ZSk7aWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO319IGNhdGNoIChlcnIpIHtfZCA9IHRydWU7X2UgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7fSBmaW5hbGx5IHtpZiAoX2QpIHRocm93IF9lO319cmV0dXJuIF9hcnI7fXJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7aWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge3JldHVybiBhcnI7fSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtyZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO30gZWxzZSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7fX07fSgpO3ZhciBfZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTt2YXIgX2V4cHJlc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhwcmVzcyk7XG52YXIgX21vZGVscyA9IHJlcXVpcmUoJy9tb2RlbHMnKTtcbnZhciBfdXRpbCA9IHJlcXVpcmUoJy9jb21tb24vdXRpbCcpO1xudmFyIF9lcnJvciA9IHJlcXVpcmUoJy9jb21tb24vZXJyb3InKTtcbnZhciBfQmlkUGFsUm91dGVyID0gcmVxdWlyZSgnLi9CaWRQYWxSb3V0ZXInKTt2YXIgX0JpZFBhbFJvdXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CaWRQYWxSb3V0ZXIpO1xudmFyIF9hdXRoID0gcmVxdWlyZSgnLi9hdXRoJyk7dmFyIF9hdXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2F1dGgpO1xudmFyIF9pbWFnZSA9IHJlcXVpcmUoJy4vaW1hZ2UnKTt2YXIgX2ltYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ltYWdlKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7dmFyIHRhcmdldCA9IHt9O2ZvciAodmFyIGkgaW4gb2JqKSB7aWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTt0YXJnZXRbaV0gPSBvYmpbaV07fXJldHVybiB0YXJnZXQ7fVxuXG52YXIgcm91dGVyID0gbmV3IF9leHByZXNzMi5kZWZhdWx0LlJvdXRlcigpO1xuXG52YXIgcHJvY2Vzc1doZXJlID0gZnVuY3Rpb24gcHJvY2Vzc1doZXJlKE1vZGVsLCB3aGVyZSkge1xuICB2YXIgZGVmaW5pdGlvbiA9IE1vZGVsLnNjaGVtYS5vYmo7XG4gIHZhciBxdWVyeSA9IHt9O1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHdoZXJlKTt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO3RyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0ga2V5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHt2YXIga2V5ID0gX3N0ZXAudmFsdWU7XG4gICAgICBpZiAoIWRlZmluaXRpb25ba2V5XSkgY29udGludWU7XG4gICAgICB2YXIgcHJvcGVydHkgPSBkZWZpbml0aW9uW2tleV07XG4gICAgICB2YXIgdmFsdWUgPSB3aGVyZVtrZXldO1xuICAgICAgc3dpdGNoIChwcm9wZXJ0eS50eXBlKSB7XG4gICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgIGlmIChwcm9wZXJ0eS5lbnVtKSB7XG4gICAgICAgICAgICBxdWVyeVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSBuZXcgUmVnRXhwKHZhbHVlLCAnaScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBxdWVyeVtrZXldID0gdmFsdWU7fVxuXG4gICAgfX0gY2F0Y2ggKGVycikge19kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtfaXRlcmF0b3JFcnJvciA9IGVycjt9IGZpbmFsbHkge3RyeSB7aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtfaXRlcmF0b3IucmV0dXJuKCk7fX0gZmluYWxseSB7aWYgKF9kaWRJdGVyYXRvckVycm9yKSB7dGhyb3cgX2l0ZXJhdG9yRXJyb3I7fX19XG4gIHJldHVybiBxdWVyeTtcbn07XG5cbnZhciBwcm9jZXNzUG9wdWxhdGUgPSBmdW5jdGlvbiBwcm9jZXNzUG9wdWxhdGUocG9wdWxhdGUpIHtcbiAgdmFyIGZpZWxkcyA9IHBvcHVsYXRlID8gcG9wdWxhdGUuc3BsaXQoJywnKSA6IFtdO1xuICByZXR1cm4gZmllbGRzLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICB2YXIgcXVlcnkgPSB7fTtcbiAgICB2YXIgY3Vyc29yID0gcXVlcnk7XG4gICAgdmFyIHRva2VucyA9IGZpZWxkLnNwbGl0KCcuJyk7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDt0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRva2Vuc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge3ZhciB0b2tlbiA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgY3Vyc29yID0gY3Vyc29yLnBvcHVsYXRlID0geyBwYXRoOiB0b2tlbiB9O1xuICAgICAgfX0gY2F0Y2ggKGVycikge19kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7X2l0ZXJhdG9yRXJyb3IyID0gZXJyO30gZmluYWxseSB7dHJ5IHtpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7X2l0ZXJhdG9yMi5yZXR1cm4oKTt9fSBmaW5hbGx5IHtpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7dGhyb3cgX2l0ZXJhdG9yRXJyb3IyO319fVxuICAgIHJldHVybiBxdWVyeS5wb3B1bGF0ZTtcbiAgfSk7XG59O1xuXG52YXIgZ2V0UmVxdWVzdE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRSZXF1ZXN0T3B0aW9ucyhyZXEpIHt2YXIgX3JlcSRxdWVyeSA9XG5cblxuXG5cblxuXG4gIHJlcS5xdWVyeSxfcmVxJHF1ZXJ5JHNvcnQgPSBfcmVxJHF1ZXJ5LnNvcnQsc29ydCA9IF9yZXEkcXVlcnkkc29ydCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZXEkcXVlcnkkc29ydCxfcmVxJHF1ZXJ5JHNraXAgPSBfcmVxJHF1ZXJ5LnNraXAsc2tpcCA9IF9yZXEkcXVlcnkkc2tpcCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZXEkcXVlcnkkc2tpcCxfcmVxJHF1ZXJ5JGxpbWl0ID0gX3JlcSRxdWVyeS5saW1pdCxsaW1pdCA9IF9yZXEkcXVlcnkkbGltaXQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBfcmVxJHF1ZXJ5JGxpbWl0LF9yZXEkcXVlcnkkcG9wdWxhdGUgPSBfcmVxJHF1ZXJ5LnBvcHVsYXRlLHBvcHVsYXRlID0gX3JlcSRxdWVyeSRwb3B1bGF0ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZXEkcXVlcnkkcG9wdWxhdGUsX3doZXJlID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZXEkcXVlcnksIFsnc29ydCcsICdza2lwJywgJ2xpbWl0JywgJ3BvcHVsYXRlJ10pO1xuICByZXR1cm4ge1xuICAgIHNvcnQ6IHNvcnQsXG4gICAgc2tpcDogc2tpcCxcbiAgICBsaW1pdDogbGltaXQsXG4gICAgcG9wdWxhdGU6IHByb2Nlc3NQb3B1bGF0ZShwb3B1bGF0ZSksXG4gICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKE9iamVjdCkge3JldHVybiBwcm9jZXNzV2hlcmUoT2JqZWN0LCBfd2hlcmUpO30gfTtcblxufTtcblxucm91dGVyLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgcmVxLm9wdGlvbnMgPSBnZXRSZXF1ZXN0T3B0aW9ucyhyZXEpO1xuXG4gIHJlcy5yZXR1cm4gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGZsYXQgPSB7fTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDt0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IGtleXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHt2YXIga2V5ID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgaWYgKCgwLCBfdXRpbC5pc01vbmdvb3NlT2JqZWN0KSh2YWx1ZSkpIHtcbiAgICAgICAgICBmbGF0W2tleV0gPSB2YWx1ZS50b0pTT04oeyByZXE6IHJlcSB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiAoMCwgX3V0aWwuaXNNb25nb29zZU9iamVjdCkodmFsdWVbMF0pKSB7XG4gICAgICAgICAgZmxhdFtrZXldID0gdmFsdWUubWFwKGZ1bmN0aW9uIChlbGVtKSB7cmV0dXJuIGVsZW0udG9KU09OKHsgcmVxOiByZXEgfSk7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmxhdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH19IGNhdGNoIChlcnIpIHtfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO19pdGVyYXRvckVycm9yMyA9IGVycjt9IGZpbmFsbHkge3RyeSB7aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge19pdGVyYXRvcjMucmV0dXJuKCk7fX0gZmluYWxseSB7aWYgKF9kaWRJdGVyYXRvckVycm9yMykge3Rocm93IF9pdGVyYXRvckVycm9yMzt9fX1cbiAgICByZXMuanNvbihmbGF0KTtcbiAgfTt2YXJcblxuICB0b2tlbiA9IHJlcS5jb29raWVzLnRva2VuO1xuICBpZiAodG9rZW4pIHtcbiAgICBfbW9kZWxzLkF1dGgudmVyaWZ5KHRva2VuKS5cbiAgICBjYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICByZXMuY29va2llKCd0b2tlbicsICcnKTtcbiAgICAgIHRocm93IG5ldyBfZXJyb3IuQXV0aG9yaXphdGlvbkVycm9yKCk7XG4gICAgfSkuXG4gICAgdGhlbihmdW5jdGlvbiAoYXV0aCkge3JldHVybiBfbW9kZWxzLkF1dGgucG9wdWxhdGUoYXV0aCwgJ3VzZXInKTt9KS5cbiAgICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7cmV0dXJuIGF1dGgucmVmcmVzaCgpO30pLlxuICAgIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICAgIHJlcS5hdXRob3IgPSBhdXRoLnVzZXI7XG4gICAgICBuZXh0KCk7XG4gICAgfSkuXG4gICAgY2F0Y2gobmV4dCk7XG4gIH0gZWxzZSB7XG4gICAgcmVxLmF1dGhvciA9IG5ldyBfbW9kZWxzLlVzZXIoKTtcbiAgICBuZXh0KCk7XG4gIH1cbn0pO1xucm91dGVyLnVzZSgnL2F1dGgnLCBfYXV0aDIuZGVmYXVsdCk7XG5yb3V0ZXIudXNlKCcvaW1hZ2UnLCBfaW1hZ2UyLmRlZmF1bHQpO1xucm91dGVyLnVzZSgnL2JpZCcsICgwLCBfQmlkUGFsUm91dGVyMi5kZWZhdWx0KShfbW9kZWxzLkJpZCwgJ2JpZCcsICdiaWRzJykpO1xucm91dGVyLnVzZSgnL2F1Y3Rpb24nLCAoMCwgX0JpZFBhbFJvdXRlcjIuZGVmYXVsdCkoX21vZGVscy5BdWN0aW9uLCAnYXVjdGlvbicsICdhdWN0aW9ucycpKTtcbnJvdXRlci51c2UoJy91c2VyJywgKDAsIF9CaWRQYWxSb3V0ZXIyLmRlZmF1bHQpKF9tb2RlbHMuVXNlciwgJ3VzZXInLCAndXNlcnMnLCBfdXRpbC5yZXBsYWNlTWUpKTtcbnJvdXRlci51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7cmV0dXJuIG5leHQobmV3IF9lcnJvci5Ob3RGb3VuZEVycm9yKCkpO30pO1xucm91dGVyLnVzZShmdW5jdGlvbiAoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICB2YXIgc3RhdHVzTWFwID0gW1xuICBbX2Vycm9yLkF1dGhvcml6YXRpb25FcnJvciwgNDAxXSxcbiAgW19lcnJvci5QZXJtaXNzaW9uRXJyb3IsIDQwM10sXG4gIFtfZXJyb3IuTm90Rm91bmRFcnJvciwgNDA0XSxcbiAgW0Vycm9yLCA1MDBdXTt2YXIgX3N0YXR1c01hcCRmaW5kID1cblxuICBzdGF0dXNNYXAuZmluZChmdW5jdGlvbiAoX3JlZikge3ZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDEpLEVycm9yID0gX3JlZjJbMF07cmV0dXJuIGVyciBpbnN0YW5jZW9mIEVycm9yO30pLF9zdGF0dXNNYXAkZmluZDIgPSBfc2xpY2VkVG9BcnJheShfc3RhdHVzTWFwJGZpbmQsIDIpLHN0YXR1cyA9IF9zdGF0dXNNYXAkZmluZDJbMV07XG4gIHJlcy5zdGF0dXMoc3RhdHVzKTtcbiAgcmVzLmpzb24oe1xuICAgIHN0YXR1czogc3RhdHVzLFxuICAgIGVycjogZXJyIH0pO1xuXG4gIGNvbnNvbGUuZXJyb3IoZXJyKTtcbn0pO2V4cG9ydHMuZGVmYXVsdCA9XG5cbnJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/controllers/index.js\n");

/***/ }),

/***/ "./src/backend/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _morgan = __webpack_require__(\"morgan\");var _morgan2 = _interopRequireDefault(_morgan);\nvar _http = __webpack_require__(\"http\");var _http2 = _interopRequireDefault(_http);\nvar _cookieParser = __webpack_require__(\"cookie-parser\");var _cookieParser2 = _interopRequireDefault(_cookieParser);\nvar _bodyParser = __webpack_require__(\"body-parser\");var _bodyParser2 = _interopRequireDefault(_bodyParser);\nvar _controllers = __webpack_require__(\"./src/backend/controllers/index.js\");var _controllers2 = _interopRequireDefault(_controllers);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _socket = __webpack_require__(\"./src/backend/socket/index.js\");var _socket2 = _interopRequireDefault(_socket);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar app = (0, _express2.default)();\nvar httpServer = _http2.default.Server(app);\n(0, _socket2.default)(httpServer);\n_db2.default.on('error', console.error);\n_db2.default.once('open', function () {\n  app.use((0, _morgan2.default)('tiny'));\n  app.use((0, _cookieParser2.default)());\n  app.use(_bodyParser2.default.json());\n  app.use(_bodyParser2.default.urlencoded({ extended: true }));\n  app.use(_controllers2.default);\n});exports.default =\n\nhttpServer;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2luZGV4LmpzP2VjMGUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX2V4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7dmFyIF9leHByZXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4cHJlc3MpO1xudmFyIF9tb3JnYW4gPSByZXF1aXJlKCdtb3JnYW4nKTt2YXIgX21vcmdhbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tb3JnYW4pO1xudmFyIF9odHRwID0gcmVxdWlyZSgnaHR0cCcpO3ZhciBfaHR0cDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9odHRwKTtcbnZhciBfY29va2llUGFyc2VyID0gcmVxdWlyZSgnY29va2llLXBhcnNlcicpO3ZhciBfY29va2llUGFyc2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Nvb2tpZVBhcnNlcik7XG52YXIgX2JvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO3ZhciBfYm9keVBhcnNlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ib2R5UGFyc2VyKTtcbnZhciBfY29udHJvbGxlcnMgPSByZXF1aXJlKCcvY29udHJvbGxlcnMnKTt2YXIgX2NvbnRyb2xsZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnRyb2xsZXJzKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX3NvY2tldCA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7dmFyIF9zb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc29ja2V0KTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31cblxudmFyIGFwcCA9ICgwLCBfZXhwcmVzczIuZGVmYXVsdCkoKTtcbnZhciBodHRwU2VydmVyID0gX2h0dHAyLmRlZmF1bHQuU2VydmVyKGFwcCk7XG4oMCwgX3NvY2tldDIuZGVmYXVsdCkoaHR0cFNlcnZlcik7XG5fZGIyLmRlZmF1bHQub24oJ2Vycm9yJywgY29uc29sZS5lcnJvcik7XG5fZGIyLmRlZmF1bHQub25jZSgnb3BlbicsIGZ1bmN0aW9uICgpIHtcbiAgYXBwLnVzZSgoMCwgX21vcmdhbjIuZGVmYXVsdCkoJ3RpbnknKSk7XG4gIGFwcC51c2UoKDAsIF9jb29raWVQYXJzZXIyLmRlZmF1bHQpKCkpO1xuICBhcHAudXNlKF9ib2R5UGFyc2VyMi5kZWZhdWx0Lmpzb24oKSk7XG4gIGFwcC51c2UoX2JvZHlQYXJzZXIyLmRlZmF1bHQudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbiAgYXBwLnVzZShfY29udHJvbGxlcnMyLmRlZmF1bHQpO1xufSk7ZXhwb3J0cy5kZWZhdWx0ID1cblxuaHR0cFNlcnZlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/index.js\n");

/***/ }),

/***/ "./src/backend/models/Auction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar modelName = 'Auction';\nvar auctionSchema = new Schema({\n  image: { type: ObjectId, ref: 'Image', required: true },\n  title: { type: String, required: true },\n  content: { type: String, required: true },\n  time: { type: Number, required: true, min: 1, validate: Number.isInteger },\n  starting_price: { type: Number, required: true },\n  top_bids: [{ type: ObjectId, ref: 'Bid', required: true }],\n  author: { type: ObjectId, ref: 'User' } });\n\n\nauctionSchema.plugin(_plugins.authorPlugin, {\n  authorField: true,\n  set: {\n    none: ['top_bids'] },\n\n  insert: {\n    user: true },\n\n  modify: {\n    owner: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    owner: true } });\n\n\n\nvar Auction = _db2.default.model(modelName, auctionSchema);exports.default =\nAuction;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvQXVjdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9BdWN0aW9uLmpzP2VkNjciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX21vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTt2YXIgX21vbmdvb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbmdvb3NlKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX3BsdWdpbnMgPSByZXF1aXJlKCcvbW9kZWxzL3BsdWdpbnMnKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O312YXJcblxuU2NoZW1hID0gX21vbmdvb3NlMi5kZWZhdWx0LlNjaGVtYTt2YXJcbk9iamVjdElkID0gU2NoZW1hLlR5cGVzLk9iamVjdElkO1xuXG52YXIgbW9kZWxOYW1lID0gJ0F1Y3Rpb24nO1xudmFyIGF1Y3Rpb25TY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgaW1hZ2U6IHsgdHlwZTogT2JqZWN0SWQsIHJlZjogJ0ltYWdlJywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdGl0bGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBjb250ZW50OiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdGltZTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDEsIHZhbGlkYXRlOiBOdW1iZXIuaXNJbnRlZ2VyIH0sXG4gIHN0YXJ0aW5nX3ByaWNlOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdG9wX2JpZHM6IFt7IHR5cGU6IE9iamVjdElkLCByZWY6ICdCaWQnLCByZXF1aXJlZDogdHJ1ZSB9XSxcbiAgYXV0aG9yOiB7IHR5cGU6IE9iamVjdElkLCByZWY6ICdVc2VyJyB9IH0pO1xuXG5cbmF1Y3Rpb25TY2hlbWEucGx1Z2luKF9wbHVnaW5zLmF1dGhvclBsdWdpbiwge1xuICBhdXRob3JGaWVsZDogdHJ1ZSxcbiAgc2V0OiB7XG4gICAgbm9uZTogWyd0b3BfYmlkcyddIH0sXG5cbiAgaW5zZXJ0OiB7XG4gICAgdXNlcjogdHJ1ZSB9LFxuXG4gIG1vZGlmeToge1xuICAgIG93bmVyOiB0cnVlIH0sXG5cbiAgZ2V0OiB7XG4gICAgZ3Vlc3Q6IHRydWUgfSxcblxuICByZW1vdmU6IHtcbiAgICBvd25lcjogdHJ1ZSB9IH0pO1xuXG5cblxudmFyIEF1Y3Rpb24gPSBfZGIyLmRlZmF1bHQubW9kZWwobW9kZWxOYW1lLCBhdWN0aW9uU2NoZW1hKTtleHBvcnRzLmRlZmF1bHQgPVxuQXVjdGlvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL21vZGVscy9BdWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL21vZGVscy9BdWN0aW9uLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/Auction.js\n");

/***/ }),

/***/ "./src/backend/models/Auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _jsonwebtoken = __webpack_require__(\"jsonwebtoken\");var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _environment = __webpack_require__(\"./environment.js\");\nvar _config = __webpack_require__(\"./src/backend/common/config.js\");\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");\nvar _util = __webpack_require__(\"./src/backend/common/util.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar authSchema = new Schema({\n  user: { type: ObjectId, ref: 'User', required: true },\n  token: { type: String, required: true },\n  expiresAt: { type: Date, required: true } });\n\n\nvar getExpiresAt = function getExpiresAt() {\n  var date = (0, _util.now)();\n  date.setDate(date.getDate() + 1);\n  return date;\n};\n\nauthSchema.statics.sign = function (user) {\n  return new Promise(function (resolve, reject) {\n    _jsonwebtoken2.default.sign({\n      user_id: user._id },\n    _environment.jwtSecret, _config.jwtSignOptions, function (err, token) {\n      if (err) return reject(err);\n      var expiresAt = getExpiresAt();\n      resolve(new Auth({\n        user: user._id,\n        token: token,\n        expiresAt: expiresAt }));\n\n    });\n  });\n};\n\nauthSchema.statics.verify = function (token) {\n  return Auth.findOne({ token: token }).\n  then(function (auth) {\n    if (!auth) throw new _error.AuthorizationError();\n    return auth.verify();\n  });\n};\n\nauthSchema.methods.verify = function () {\n  var auth = this;\n  return new Promise(function (resolve, reject) {\n    if (auth.expiresAt < (0, _util.now)()) return reject(true);\n    _jsonwebtoken2.default.verify(auth.token, _environment.jwtSecret, function (err, decoded) {\n      if (err) return reject(err);\n      if (!auth.user.equals(decoded.user_id)) return reject(true);\n      resolve(auth);\n    });\n  });\n};\n\nauthSchema.methods.refresh = function () {\n  this.expiresAt = getExpiresAt();\n  return this.save();\n};\n\nvar Auth = _db2.default.model('Auth', authSchema);exports.default =\nAuth;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvQXV0aC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9BdXRoLmpzPzM4MWEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX21vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTt2YXIgX21vbmdvb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbmdvb3NlKTtcbnZhciBfanNvbndlYnRva2VuID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7dmFyIF9qc29ud2VidG9rZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanNvbndlYnRva2VuKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX2Vudmlyb25tZW50ID0gcmVxdWlyZSgnL2Vudmlyb25tZW50Jyk7XG52YXIgX2NvbmZpZyA9IHJlcXVpcmUoJy9jb21tb24vY29uZmlnJyk7XG52YXIgX2Vycm9yID0gcmVxdWlyZSgnL2NvbW1vbi9lcnJvcicpO1xudmFyIF91dGlsID0gcmVxdWlyZSgnL2NvbW1vbi91dGlsJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9dmFyXG5cblNjaGVtYSA9IF9tb25nb29zZTIuZGVmYXVsdC5TY2hlbWE7dmFyXG5PYmplY3RJZCA9IFNjaGVtYS5UeXBlcy5PYmplY3RJZDtcblxudmFyIGF1dGhTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgdXNlcjogeyB0eXBlOiBPYmplY3RJZCwgcmVmOiAnVXNlcicsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHRva2VuOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgZXhwaXJlc0F0OiB7IHR5cGU6IERhdGUsIHJlcXVpcmVkOiB0cnVlIH0gfSk7XG5cblxudmFyIGdldEV4cGlyZXNBdCA9IGZ1bmN0aW9uIGdldEV4cGlyZXNBdCgpIHtcbiAgdmFyIGRhdGUgPSAoMCwgX3V0aWwubm93KSgpO1xuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgcmV0dXJuIGRhdGU7XG59O1xuXG5hdXRoU2NoZW1hLnN0YXRpY3Muc2lnbiA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgX2pzb253ZWJ0b2tlbjIuZGVmYXVsdC5zaWduKHtcbiAgICAgIHVzZXJfaWQ6IHVzZXIuX2lkIH0sXG4gICAgX2Vudmlyb25tZW50Lmp3dFNlY3JldCwgX2NvbmZpZy5qd3RTaWduT3B0aW9ucywgZnVuY3Rpb24gKGVyciwgdG9rZW4pIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIHZhciBleHBpcmVzQXQgPSBnZXRFeHBpcmVzQXQoKTtcbiAgICAgIHJlc29sdmUobmV3IEF1dGgoe1xuICAgICAgICB1c2VyOiB1c2VyLl9pZCxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBleHBpcmVzQXQ6IGV4cGlyZXNBdCB9KSk7XG5cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5hdXRoU2NoZW1hLnN0YXRpY3MudmVyaWZ5ID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiBBdXRoLmZpbmRPbmUoeyB0b2tlbjogdG9rZW4gfSkuXG4gIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICBpZiAoIWF1dGgpIHRocm93IG5ldyBfZXJyb3IuQXV0aG9yaXphdGlvbkVycm9yKCk7XG4gICAgcmV0dXJuIGF1dGgudmVyaWZ5KCk7XG4gIH0pO1xufTtcblxuYXV0aFNjaGVtYS5tZXRob2RzLnZlcmlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGF1dGggPSB0aGlzO1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmIChhdXRoLmV4cGlyZXNBdCA8ICgwLCBfdXRpbC5ub3cpKCkpIHJldHVybiByZWplY3QodHJ1ZSk7XG4gICAgX2pzb253ZWJ0b2tlbjIuZGVmYXVsdC52ZXJpZnkoYXV0aC50b2tlbiwgX2Vudmlyb25tZW50Lmp3dFNlY3JldCwgZnVuY3Rpb24gKGVyciwgZGVjb2RlZCkge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgaWYgKCFhdXRoLnVzZXIuZXF1YWxzKGRlY29kZWQudXNlcl9pZCkpIHJldHVybiByZWplY3QodHJ1ZSk7XG4gICAgICByZXNvbHZlKGF1dGgpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmF1dGhTY2hlbWEubWV0aG9kcy5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmV4cGlyZXNBdCA9IGdldEV4cGlyZXNBdCgpO1xuICByZXR1cm4gdGhpcy5zYXZlKCk7XG59O1xuXG52YXIgQXV0aCA9IF9kYjIuZGVmYXVsdC5tb2RlbCgnQXV0aCcsIGF1dGhTY2hlbWEpO2V4cG9ydHMuZGVmYXVsdCA9XG5BdXRoO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvbW9kZWxzL0F1dGguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL0F1dGguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/models/Auth.js\n");

/***/ }),

/***/ "./src/backend/models/Bid.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");\nvar _Auction = __webpack_require__(\"./src/backend/models/Auction.js\");var _Auction2 = _interopRequireDefault(_Auction);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar modelName = 'Bid';\nvar bidSchema = new Schema({\n  auction: { type: ObjectId, ref: 'Auction', required: true },\n  amount: { type: Number, required: true },\n  author: { type: ObjectId, ref: 'User' } });\n\n\nbidSchema.plugin(_plugins.authorPlugin, {\n  authorField: true,\n  insert: {\n    user: true },\n\n  modify: {\n    none: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    none: true } });\n\n\n\nvar Bid = _db2.default.model(modelName, bidSchema);exports.default =\nBid;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvQmlkLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvbW9kZWxzL0JpZC5qcz82ZGQ5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9tb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7dmFyIF9tb25nb29zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tb25nb29zZSk7XG52YXIgX2RiID0gcmVxdWlyZSgnL2NvbW1vbi9kYicpO3ZhciBfZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGIpO1xudmFyIF9wbHVnaW5zID0gcmVxdWlyZSgnL21vZGVscy9wbHVnaW5zJyk7XG52YXIgX0F1Y3Rpb24gPSByZXF1aXJlKCcuL0F1Y3Rpb24nKTt2YXIgX0F1Y3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQXVjdGlvbik7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9dmFyXG5cblNjaGVtYSA9IF9tb25nb29zZTIuZGVmYXVsdC5TY2hlbWE7dmFyXG5PYmplY3RJZCA9IFNjaGVtYS5UeXBlcy5PYmplY3RJZDtcblxudmFyIG1vZGVsTmFtZSA9ICdCaWQnO1xudmFyIGJpZFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICBhdWN0aW9uOiB7IHR5cGU6IE9iamVjdElkLCByZWY6ICdBdWN0aW9uJywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgYW1vdW50OiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgYXV0aG9yOiB7IHR5cGU6IE9iamVjdElkLCByZWY6ICdVc2VyJyB9IH0pO1xuXG5cbmJpZFNjaGVtYS5wbHVnaW4oX3BsdWdpbnMuYXV0aG9yUGx1Z2luLCB7XG4gIGF1dGhvckZpZWxkOiB0cnVlLFxuICBpbnNlcnQ6IHtcbiAgICB1c2VyOiB0cnVlIH0sXG5cbiAgbW9kaWZ5OiB7XG4gICAgbm9uZTogdHJ1ZSB9LFxuXG4gIGdldDoge1xuICAgIGd1ZXN0OiB0cnVlIH0sXG5cbiAgcmVtb3ZlOiB7XG4gICAgbm9uZTogdHJ1ZSB9IH0pO1xuXG5cblxudmFyIEJpZCA9IF9kYjIuZGVmYXVsdC5tb2RlbChtb2RlbE5hbWUsIGJpZFNjaGVtYSk7ZXhwb3J0cy5kZWZhdWx0ID1cbkJpZDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL21vZGVscy9CaWQuanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL0JpZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/models/Bid.js\n");

/***/ }),

/***/ "./src/backend/models/Image.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _sharp = __webpack_require__(\"sharp\");var _sharp2 = _interopRequireDefault(_sharp);\nvar _path = __webpack_require__(\"path\");var _path2 = _interopRequireDefault(_path);\nvar _fs = __webpack_require__(\"fs\");var _fs2 = _interopRequireDefault(_fs);\nvar _util = __webpack_require__(\"./src/backend/common/util.js\");\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");\nvar _config = __webpack_require__(\"./src/backend/common/config.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;\n\nvar imageSchema = new Schema({\n  originalName: { type: String, required: true },\n  mimeType: { type: String, required: true, validate: _util.isImageFile },\n  fileName: { type: String, required: true } });\n\n\nimageSchema.plugin(_plugins.authorPlugin, {\n  insert: {\n    user: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    user: true } });\n\n\n\nvar getOriginalPath = function getOriginalPath(fileName) {return _path2.default.resolve(_config.imageUploadPaths.original, fileName);};\nvar getThumbnailPath = function getThumbnailPath(fileName, thumbnailSize) {return _path2.default.resolve(_config.imageUploadPaths.thumbnail, thumbnailSize.toString(), fileName);};\n\nimageSchema.statics.upload = function (file) {var\n  originalName = file.originalname,mimeType = file.mimetype,fileName = file.filename;\n  var originalPath = getOriginalPath(fileName);\n  var sharp = (0, _sharp2.default)(originalPath);\n  var promises = _config.thumbnailSizes.map(function (thumbnailSize) {\n    return new Promise(function (resolve, reject) {\n      var thumbnailPath = getThumbnailPath(fileName, thumbnailSize);\n      resolve(sharp.resize(thumbnailSize, thumbnailSize).max().withoutEnlargement().toFile(thumbnailPath));\n    });\n  });\n  return Promise.all(promises).\n  then(function () {return new Image({\n      originalName: originalName,\n      mimeType: mimeType,\n      fileName: fileName });});\n\n};\n\nimageSchema.statics.unlinkFiles = function (fileName) {\n  var originalPath = getOriginalPath(fileName);\n  var promises = _config.thumbnailSizes.map(function (thumbnailSize) {\n    var thumbnailPath = getThumbnailPath(fileName, thumbnailSize);\n    return (0, _util.deleteFile)(thumbnailPath);\n  });\n  return Promise.all(promises).\n  then((0, _util.deleteFile)(originalPath));\n};\n\nimageSchema.methods.read = function (thumbnailSize) {\n  var image = this;\n  return new Promise(function (resolve, reject) {\n    var path = thumbnailSize === null ?\n    getOriginalPath(image.fileName) :\n    getThumbnailPath(image.fileName, thumbnailSize);\n    _fs2.default.readFile(path, function (err, content) {\n      if (err) return reject(err);\n      resolve(content);\n    });\n  });\n};\n\nimageSchema.methods.unlinkFiles = function () {\n  return Image.unlinkFiles(this.fileName);\n};\n\nimageSchema.pre('remove', function (next) {\n  this.unlinkFiles().\n  then(function () {return next();}).\n  catch(next);\n});\n\nvar Image = _db2.default.model('Image', imageSchema);exports.default =\n\nImage;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvSW1hZ2UuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvSW1hZ2UuanM/YWFmNCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9zaGFycCA9IHJlcXVpcmUoJ3NoYXJwJyk7dmFyIF9zaGFycDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaGFycCk7XG52YXIgX3BhdGggPSByZXF1aXJlKCdwYXRoJyk7dmFyIF9wYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhdGgpO1xudmFyIF9mcyA9IHJlcXVpcmUoJ2ZzJyk7dmFyIF9mczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcyk7XG52YXIgX3V0aWwgPSByZXF1aXJlKCcvY29tbW9uL3V0aWwnKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX3BsdWdpbnMgPSByZXF1aXJlKCcvbW9kZWxzL3BsdWdpbnMnKTtcbnZhciBfY29uZmlnID0gcmVxdWlyZSgnL2NvbW1vbi9jb25maWcnKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O312YXJcblxuU2NoZW1hID0gX21vbmdvb3NlMi5kZWZhdWx0LlNjaGVtYTtcblxudmFyIGltYWdlU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIG9yaWdpbmFsTmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIG1pbWVUeXBlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHZhbGlkYXRlOiBfdXRpbC5pc0ltYWdlRmlsZSB9LFxuICBmaWxlTmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0gfSk7XG5cblxuaW1hZ2VTY2hlbWEucGx1Z2luKF9wbHVnaW5zLmF1dGhvclBsdWdpbiwge1xuICBpbnNlcnQ6IHtcbiAgICB1c2VyOiB0cnVlIH0sXG5cbiAgZ2V0OiB7XG4gICAgZ3Vlc3Q6IHRydWUgfSxcblxuICByZW1vdmU6IHtcbiAgICB1c2VyOiB0cnVlIH0gfSk7XG5cblxuXG52YXIgZ2V0T3JpZ2luYWxQYXRoID0gZnVuY3Rpb24gZ2V0T3JpZ2luYWxQYXRoKGZpbGVOYW1lKSB7cmV0dXJuIF9wYXRoMi5kZWZhdWx0LnJlc29sdmUoX2NvbmZpZy5pbWFnZVVwbG9hZFBhdGhzLm9yaWdpbmFsLCBmaWxlTmFtZSk7fTtcbnZhciBnZXRUaHVtYm5haWxQYXRoID0gZnVuY3Rpb24gZ2V0VGh1bWJuYWlsUGF0aChmaWxlTmFtZSwgdGh1bWJuYWlsU2l6ZSkge3JldHVybiBfcGF0aDIuZGVmYXVsdC5yZXNvbHZlKF9jb25maWcuaW1hZ2VVcGxvYWRQYXRocy50aHVtYm5haWwsIHRodW1ibmFpbFNpemUudG9TdHJpbmcoKSwgZmlsZU5hbWUpO307XG5cbmltYWdlU2NoZW1hLnN0YXRpY3MudXBsb2FkID0gZnVuY3Rpb24gKGZpbGUpIHt2YXJcbiAgb3JpZ2luYWxOYW1lID0gZmlsZS5vcmlnaW5hbG5hbWUsbWltZVR5cGUgPSBmaWxlLm1pbWV0eXBlLGZpbGVOYW1lID0gZmlsZS5maWxlbmFtZTtcbiAgdmFyIG9yaWdpbmFsUGF0aCA9IGdldE9yaWdpbmFsUGF0aChmaWxlTmFtZSk7XG4gIHZhciBzaGFycCA9ICgwLCBfc2hhcnAyLmRlZmF1bHQpKG9yaWdpbmFsUGF0aCk7XG4gIHZhciBwcm9taXNlcyA9IF9jb25maWcudGh1bWJuYWlsU2l6ZXMubWFwKGZ1bmN0aW9uICh0aHVtYm5haWxTaXplKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciB0aHVtYm5haWxQYXRoID0gZ2V0VGh1bWJuYWlsUGF0aChmaWxlTmFtZSwgdGh1bWJuYWlsU2l6ZSk7XG4gICAgICByZXNvbHZlKHNoYXJwLnJlc2l6ZSh0aHVtYm5haWxTaXplLCB0aHVtYm5haWxTaXplKS5tYXgoKS53aXRob3V0RW5sYXJnZW1lbnQoKS50b0ZpbGUodGh1bWJuYWlsUGF0aCkpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS5cbiAgdGhlbihmdW5jdGlvbiAoKSB7cmV0dXJuIG5ldyBJbWFnZSh7XG4gICAgICBvcmlnaW5hbE5hbWU6IG9yaWdpbmFsTmFtZSxcbiAgICAgIG1pbWVUeXBlOiBtaW1lVHlwZSxcbiAgICAgIGZpbGVOYW1lOiBmaWxlTmFtZSB9KTt9KTtcblxufTtcblxuaW1hZ2VTY2hlbWEuc3RhdGljcy51bmxpbmtGaWxlcyA9IGZ1bmN0aW9uIChmaWxlTmFtZSkge1xuICB2YXIgb3JpZ2luYWxQYXRoID0gZ2V0T3JpZ2luYWxQYXRoKGZpbGVOYW1lKTtcbiAgdmFyIHByb21pc2VzID0gX2NvbmZpZy50aHVtYm5haWxTaXplcy5tYXAoZnVuY3Rpb24gKHRodW1ibmFpbFNpemUpIHtcbiAgICB2YXIgdGh1bWJuYWlsUGF0aCA9IGdldFRodW1ibmFpbFBhdGgoZmlsZU5hbWUsIHRodW1ibmFpbFNpemUpO1xuICAgIHJldHVybiAoMCwgX3V0aWwuZGVsZXRlRmlsZSkodGh1bWJuYWlsUGF0aCk7XG4gIH0pO1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLlxuICB0aGVuKCgwLCBfdXRpbC5kZWxldGVGaWxlKShvcmlnaW5hbFBhdGgpKTtcbn07XG5cbmltYWdlU2NoZW1hLm1ldGhvZHMucmVhZCA9IGZ1bmN0aW9uICh0aHVtYm5haWxTaXplKSB7XG4gIHZhciBpbWFnZSA9IHRoaXM7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHBhdGggPSB0aHVtYm5haWxTaXplID09PSBudWxsID9cbiAgICBnZXRPcmlnaW5hbFBhdGgoaW1hZ2UuZmlsZU5hbWUpIDpcbiAgICBnZXRUaHVtYm5haWxQYXRoKGltYWdlLmZpbGVOYW1lLCB0aHVtYm5haWxTaXplKTtcbiAgICBfZnMyLmRlZmF1bHQucmVhZEZpbGUocGF0aCwgZnVuY3Rpb24gKGVyciwgY29udGVudCkge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgcmVzb2x2ZShjb250ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5pbWFnZVNjaGVtYS5tZXRob2RzLnVubGlua0ZpbGVzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gSW1hZ2UudW5saW5rRmlsZXModGhpcy5maWxlTmFtZSk7XG59O1xuXG5pbWFnZVNjaGVtYS5wcmUoJ3JlbW92ZScsIGZ1bmN0aW9uIChuZXh0KSB7XG4gIHRoaXMudW5saW5rRmlsZXMoKS5cbiAgdGhlbihmdW5jdGlvbiAoKSB7cmV0dXJuIG5leHQoKTt9KS5cbiAgY2F0Y2gobmV4dCk7XG59KTtcblxudmFyIEltYWdlID0gX2RiMi5kZWZhdWx0Lm1vZGVsKCdJbWFnZScsIGltYWdlU2NoZW1hKTtleHBvcnRzLmRlZmF1bHQgPVxuXG5JbWFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL21vZGVscy9JbWFnZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9tb2RlbHMvSW1hZ2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/Image.js\n");

/***/ }),

/***/ "./src/backend/models/User.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;\n\nvar modelName = 'User';\nvar userSchema = new Schema({\n  username: { type: String, required: true, unique: true },\n  avatar: { type: String, required: true },\n  name: { type: String, required: true } });\n\n\nuserSchema.plugin(_plugins.authorPlugin, {\n  insert: {\n    guest: true },\n\n  modify: {\n    none: ['username'],\n    self: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    self: true } });\n\n\n\nuserSchema.methods.isUser = function () {\n  return !this.isNew;\n};\n\nuserSchema.methods.isOwner = function (doc) {\n  return this._id.equals(doc.author._id);\n};\n\nuserSchema.methods.isSelf = function (doc) {\n  return this._id.equals(doc._id);\n};\n\nvar User = _db2.default.model(modelName, userSchema);exports.default =\nUser;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvVXNlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9Vc2VyLmpzPzliM2MiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX21vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTt2YXIgX21vbmdvb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbmdvb3NlKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX3BsdWdpbnMgPSByZXF1aXJlKCcvbW9kZWxzL3BsdWdpbnMnKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O312YXJcblxuU2NoZW1hID0gX21vbmdvb3NlMi5kZWZhdWx0LlNjaGVtYTtcblxudmFyIG1vZGVsTmFtZSA9ICdVc2VyJztcbnZhciB1c2VyU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIHVzZXJuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxuICBhdmF0YXI6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSB9KTtcblxuXG51c2VyU2NoZW1hLnBsdWdpbihfcGx1Z2lucy5hdXRob3JQbHVnaW4sIHtcbiAgaW5zZXJ0OiB7XG4gICAgZ3Vlc3Q6IHRydWUgfSxcblxuICBtb2RpZnk6IHtcbiAgICBub25lOiBbJ3VzZXJuYW1lJ10sXG4gICAgc2VsZjogdHJ1ZSB9LFxuXG4gIGdldDoge1xuICAgIGd1ZXN0OiB0cnVlIH0sXG5cbiAgcmVtb3ZlOiB7XG4gICAgc2VsZjogdHJ1ZSB9IH0pO1xuXG5cblxudXNlclNjaGVtYS5tZXRob2RzLmlzVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICF0aGlzLmlzTmV3O1xufTtcblxudXNlclNjaGVtYS5tZXRob2RzLmlzT3duZXIgPSBmdW5jdGlvbiAoZG9jKSB7XG4gIHJldHVybiB0aGlzLl9pZC5lcXVhbHMoZG9jLmF1dGhvci5faWQpO1xufTtcblxudXNlclNjaGVtYS5tZXRob2RzLmlzU2VsZiA9IGZ1bmN0aW9uIChkb2MpIHtcbiAgcmV0dXJuIHRoaXMuX2lkLmVxdWFscyhkb2MuX2lkKTtcbn07XG5cbnZhciBVc2VyID0gX2RiMi5kZWZhdWx0Lm1vZGVsKG1vZGVsTmFtZSwgdXNlclNjaGVtYSk7ZXhwb3J0cy5kZWZhdWx0ID1cblVzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9tb2RlbHMvVXNlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9tb2RlbHMvVXNlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/User.js\n");

/***/ }),

/***/ "./src/backend/models/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _Auction = __webpack_require__(\"./src/backend/models/Auction.js\");Object.defineProperty(exports, 'Auction', { enumerable: true, get: function get() {return _interopRequireDefault(_Auction).default;} });var _Auth = __webpack_require__(\"./src/backend/models/Auth.js\");Object.defineProperty(exports, 'Auth', { enumerable: true, get: function get() {return _interopRequireDefault(_Auth).\n    default;} });var _Image = __webpack_require__(\"./src/backend/models/Image.js\");Object.defineProperty(exports, 'Image', { enumerable: true, get: function get() {return _interopRequireDefault(_Image).\n    default;} });var _Bid = __webpack_require__(\"./src/backend/models/Bid.js\");Object.defineProperty(exports, 'Bid', { enumerable: true, get: function get() {return _interopRequireDefault(_Bid).\n    default;} });var _User = __webpack_require__(\"./src/backend/models/User.js\");Object.defineProperty(exports, 'User', { enumerable: true, get: function get() {return _interopRequireDefault(_User).\n    default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvaW5kZXguanM/ODcwMSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfQXVjdGlvbiA9IHJlcXVpcmUoJy4vQXVjdGlvbicpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQXVjdGlvbicsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7cmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0F1Y3Rpb24pLmRlZmF1bHQ7fSB9KTt2YXIgX0F1dGggPSByZXF1aXJlKCcuL0F1dGgnKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0F1dGgnLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BdXRoKS5cbiAgICBkZWZhdWx0O30gfSk7dmFyIF9JbWFnZSA9IHJlcXVpcmUoJy4vSW1hZ2UnKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0ltYWdlJywgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtyZXR1cm4gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSW1hZ2UpLlxuICAgIGRlZmF1bHQ7fSB9KTt2YXIgX0JpZCA9IHJlcXVpcmUoJy4vQmlkJyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdCaWQnLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CaWQpLlxuICAgIGRlZmF1bHQ7fSB9KTt2YXIgX1VzZXIgPSByZXF1aXJlKCcuL1VzZXInKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1VzZXInLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2VyKS5cbiAgICBkZWZhdWx0O30gfSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9tb2RlbHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/models/index.js\n");

/***/ }),

/***/ "./src/backend/models/plugins/authorPlugin.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i[\"return\"]) _i[\"return\"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");}};}();var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar merge = function merge() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}\n  var permissions = {};var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {\n    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var arg = _step.value;\n      var keys = Object.keys(arg || {});var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {\n        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var key = _step2.value;\n          if (permissions[key] === true) continue;\n          if (arg[key] === true) permissions[key] = true;else\n          {var _permissions$key;\n            if (!permissions[key]) permissions[key] = [];\n            (_permissions$key = permissions[key]).push.apply(_permissions$key, _toConsumableArray(arg[key]));\n          }\n        }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}\n    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}\n  return permissions;\n};\n\nvar getMatch = function getMatch() {var permissions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return [\n  [permissions.none, function (author) {return false;}],\n  [permissions.user, function (author) {return author.isUser();}],\n  [permissions.owner, function (author, doc) {return author.isOwner(doc);}],\n  [permissions.self, function (author, doc) {return author.isSelf(doc);}],\n  [permissions.guest, function (author) {return true;}]];\n\n};\n\nvar check = function check(match, author, doc, process) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {\n    for (var _iterator3 = match[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var _step3$value = _slicedToArray(_step3.value, 2),fields = _step3$value[0],func = _step3$value[1];\n      if (fields === undefined) continue;\n      var permitted = func(author, doc);\n      if (!permitted) {\n        if (fields === true) throw new _error.PermissionError();\n        if (process) {\n          fields.forEach(process);\n        }\n      }\n    }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}\n};\n\nvar processSet = function processSet(schema, options) {\n  var insertMatch = getMatch(merge(options.set, options.insert));\n  var modifyMatch = getMatch(merge(options.set, options.modify));\n  schema.pre('save', function (next) {\n    var doc = this;\n    if (doc._author === true) return next();\n    if (options.authorField) {\n      if (doc.isModified('author')) return next(new _error.PermissionError());\n      doc.author = doc._author;\n    }\n    try {\n      check(doc.isNew ? insertMatch : modifyMatch, doc._author, doc, function (field) {\n        if (doc.isModified(field)) throw new _error.PermissionError();\n      });\n      next();\n    } catch (err) {\n      next(err);\n    }\n  });\n};\n\nvar processGet = function processGet(schema, options) {\n  var match = getMatch(options.get);\n  var _toJSON = schema.options.toJSON;\n  schema.options.toJSON = {\n    transform: function transform(doc, ret, options) {\n      if (_toJSON && _toJSON.transform) {\n        ret = _toJSON.transform(doc, ret, options);\n      }\n      check(match, options.req.author, doc, function (field) {\n        delete ret[field];\n      });\n      return ret;\n    } };\n\n};\n\nvar processRemove = function processRemove(schema, options) {\n  var match = getMatch(options.remove);\n  schema.pre('remove', function (next) {\n    var doc = this;\n    if (doc._author === true) return next();\n    if (options.authorField) {\n      if (doc.isModified('author')) return next(new _error.PermissionError());\n      doc.author = doc._author;\n    }\n    try {\n      check(match, doc.author, doc);\n      next();\n    } catch (err) {\n      next(err);\n    }\n  });\n};\n\nvar authorPlugin = function authorPlugin(schema, options) {\n  options = _extends({\n    authorField: false,\n    set: {},\n    insert: {},\n    modify: {},\n    get: {},\n    remove: {} },\n  options);\n\n\n  schema.methods.setAuthor = function (author) {\n    this._author = author;\n    return this;\n  };\n\n  schema.methods.force = function () {\n    this._author = true;\n    return this;\n  };\n\n  processSet(schema, options);\n  processGet(schema, options);\n  processRemove(schema, options);\n};exports.default =\n\nauthorPlugin;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9hdXRob3JQbHVnaW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9hdXRob3JQbHVnaW4uanM/MjUzYSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge2ZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7dmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHt0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO319fXJldHVybiB0YXJnZXQ7fTt2YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7ZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHt2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9lID0gdW5kZWZpbmVkO3RyeSB7Zm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge19hcnIucHVzaChfcy52YWx1ZSk7aWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO319IGNhdGNoIChlcnIpIHtfZCA9IHRydWU7X2UgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7fSBmaW5hbGx5IHtpZiAoX2QpIHRocm93IF9lO319cmV0dXJuIF9hcnI7fXJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7aWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge3JldHVybiBhcnI7fSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtyZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO30gZWxzZSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7fX07fSgpO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9lcnJvciA9IHJlcXVpcmUoJy9jb21tb24vZXJyb3InKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7aWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge2ZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHthcnIyW2ldID0gYXJyW2ldO31yZXR1cm4gYXJyMjt9IGVsc2Uge3JldHVybiBBcnJheS5mcm9tKGFycik7fX12YXJcblxuU2NoZW1hID0gX21vbmdvb3NlMi5kZWZhdWx0LlNjaGVtYTt2YXJcbk9iamVjdElkID0gU2NoZW1hLlR5cGVzLk9iamVjdElkO1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSgpIHtmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge2FyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07fVxuICB2YXIgcGVybWlzc2lvbnMgPSB7fTt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO3RyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJnc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHt2YXIgYXJnID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFyZyB8fCB7fSk7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDt0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0ga2V5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge3ZhciBrZXkgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgaWYgKHBlcm1pc3Npb25zW2tleV0gPT09IHRydWUpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChhcmdba2V5XSA9PT0gdHJ1ZSkgcGVybWlzc2lvbnNba2V5XSA9IHRydWU7ZWxzZVxuICAgICAgICAgIHt2YXIgX3Blcm1pc3Npb25zJGtleTtcbiAgICAgICAgICAgIGlmICghcGVybWlzc2lvbnNba2V5XSkgcGVybWlzc2lvbnNba2V5XSA9IFtdO1xuICAgICAgICAgICAgKF9wZXJtaXNzaW9ucyRrZXkgPSBwZXJtaXNzaW9uc1trZXldKS5wdXNoLmFwcGx5KF9wZXJtaXNzaW9ucyRrZXksIF90b0NvbnN1bWFibGVBcnJheShhcmdba2V5XSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX0gY2F0Y2ggKGVycikge19kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7X2l0ZXJhdG9yRXJyb3IyID0gZXJyO30gZmluYWxseSB7dHJ5IHtpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7X2l0ZXJhdG9yMi5yZXR1cm4oKTt9fSBmaW5hbGx5IHtpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7dGhyb3cgX2l0ZXJhdG9yRXJyb3IyO319fVxuICAgIH19IGNhdGNoIChlcnIpIHtfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7X2l0ZXJhdG9yRXJyb3IgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7X2l0ZXJhdG9yLnJldHVybigpO319IGZpbmFsbHkge2lmIChfZGlkSXRlcmF0b3JFcnJvcikge3Rocm93IF9pdGVyYXRvckVycm9yO319fVxuICByZXR1cm4gcGVybWlzc2lvbnM7XG59O1xuXG52YXIgZ2V0TWF0Y2ggPSBmdW5jdGlvbiBnZXRNYXRjaCgpIHt2YXIgcGVybWlzc2lvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICByZXR1cm4gW1xuICBbcGVybWlzc2lvbnMubm9uZSwgZnVuY3Rpb24gKGF1dGhvcikge3JldHVybiBmYWxzZTt9XSxcbiAgW3Blcm1pc3Npb25zLnVzZXIsIGZ1bmN0aW9uIChhdXRob3IpIHtyZXR1cm4gYXV0aG9yLmlzVXNlcigpO31dLFxuICBbcGVybWlzc2lvbnMub3duZXIsIGZ1bmN0aW9uIChhdXRob3IsIGRvYykge3JldHVybiBhdXRob3IuaXNPd25lcihkb2MpO31dLFxuICBbcGVybWlzc2lvbnMuc2VsZiwgZnVuY3Rpb24gKGF1dGhvciwgZG9jKSB7cmV0dXJuIGF1dGhvci5pc1NlbGYoZG9jKTt9XSxcbiAgW3Blcm1pc3Npb25zLmd1ZXN0LCBmdW5jdGlvbiAoYXV0aG9yKSB7cmV0dXJuIHRydWU7fV1dO1xuXG59O1xuXG52YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjayhtYXRjaCwgYXV0aG9yLCBkb2MsIHByb2Nlc3MpIHt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO3RyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IG1hdGNoW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7dmFyIF9zdGVwMyR2YWx1ZSA9IF9zbGljZWRUb0FycmF5KF9zdGVwMy52YWx1ZSwgMiksZmllbGRzID0gX3N0ZXAzJHZhbHVlWzBdLGZ1bmMgPSBfc3RlcDMkdmFsdWVbMV07XG4gICAgICBpZiAoZmllbGRzID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgdmFyIHBlcm1pdHRlZCA9IGZ1bmMoYXV0aG9yLCBkb2MpO1xuICAgICAgaWYgKCFwZXJtaXR0ZWQpIHtcbiAgICAgICAgaWYgKGZpZWxkcyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IF9lcnJvci5QZXJtaXNzaW9uRXJyb3IoKTtcbiAgICAgICAgaWYgKHByb2Nlc3MpIHtcbiAgICAgICAgICBmaWVsZHMuZm9yRWFjaChwcm9jZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH19IGNhdGNoIChlcnIpIHtfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO19pdGVyYXRvckVycm9yMyA9IGVycjt9IGZpbmFsbHkge3RyeSB7aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge19pdGVyYXRvcjMucmV0dXJuKCk7fX0gZmluYWxseSB7aWYgKF9kaWRJdGVyYXRvckVycm9yMykge3Rocm93IF9pdGVyYXRvckVycm9yMzt9fX1cbn07XG5cbnZhciBwcm9jZXNzU2V0ID0gZnVuY3Rpb24gcHJvY2Vzc1NldChzY2hlbWEsIG9wdGlvbnMpIHtcbiAgdmFyIGluc2VydE1hdGNoID0gZ2V0TWF0Y2gobWVyZ2Uob3B0aW9ucy5zZXQsIG9wdGlvbnMuaW5zZXJ0KSk7XG4gIHZhciBtb2RpZnlNYXRjaCA9IGdldE1hdGNoKG1lcmdlKG9wdGlvbnMuc2V0LCBvcHRpb25zLm1vZGlmeSkpO1xuICBzY2hlbWEucHJlKCdzYXZlJywgZnVuY3Rpb24gKG5leHQpIHtcbiAgICB2YXIgZG9jID0gdGhpcztcbiAgICBpZiAoZG9jLl9hdXRob3IgPT09IHRydWUpIHJldHVybiBuZXh0KCk7XG4gICAgaWYgKG9wdGlvbnMuYXV0aG9yRmllbGQpIHtcbiAgICAgIGlmIChkb2MuaXNNb2RpZmllZCgnYXV0aG9yJykpIHJldHVybiBuZXh0KG5ldyBfZXJyb3IuUGVybWlzc2lvbkVycm9yKCkpO1xuICAgICAgZG9jLmF1dGhvciA9IGRvYy5fYXV0aG9yO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgY2hlY2soZG9jLmlzTmV3ID8gaW5zZXJ0TWF0Y2ggOiBtb2RpZnlNYXRjaCwgZG9jLl9hdXRob3IsIGRvYywgZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIGlmIChkb2MuaXNNb2RpZmllZChmaWVsZCkpIHRocm93IG5ldyBfZXJyb3IuUGVybWlzc2lvbkVycm9yKCk7XG4gICAgICB9KTtcbiAgICAgIG5leHQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcblxudmFyIHByb2Nlc3NHZXQgPSBmdW5jdGlvbiBwcm9jZXNzR2V0KHNjaGVtYSwgb3B0aW9ucykge1xuICB2YXIgbWF0Y2ggPSBnZXRNYXRjaChvcHRpb25zLmdldCk7XG4gIHZhciBfdG9KU09OID0gc2NoZW1hLm9wdGlvbnMudG9KU09OO1xuICBzY2hlbWEub3B0aW9ucy50b0pTT04gPSB7XG4gICAgdHJhbnNmb3JtOiBmdW5jdGlvbiB0cmFuc2Zvcm0oZG9jLCByZXQsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChfdG9KU09OICYmIF90b0pTT04udHJhbnNmb3JtKSB7XG4gICAgICAgIHJldCA9IF90b0pTT04udHJhbnNmb3JtKGRvYywgcmV0LCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrKG1hdGNoLCBvcHRpb25zLnJlcS5hdXRob3IsIGRvYywgZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIGRlbGV0ZSByZXRbZmllbGRdO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0gfTtcblxufTtcblxudmFyIHByb2Nlc3NSZW1vdmUgPSBmdW5jdGlvbiBwcm9jZXNzUmVtb3ZlKHNjaGVtYSwgb3B0aW9ucykge1xuICB2YXIgbWF0Y2ggPSBnZXRNYXRjaChvcHRpb25zLnJlbW92ZSk7XG4gIHNjaGVtYS5wcmUoJ3JlbW92ZScsIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgdmFyIGRvYyA9IHRoaXM7XG4gICAgaWYgKGRvYy5fYXV0aG9yID09PSB0cnVlKSByZXR1cm4gbmV4dCgpO1xuICAgIGlmIChvcHRpb25zLmF1dGhvckZpZWxkKSB7XG4gICAgICBpZiAoZG9jLmlzTW9kaWZpZWQoJ2F1dGhvcicpKSByZXR1cm4gbmV4dChuZXcgX2Vycm9yLlBlcm1pc3Npb25FcnJvcigpKTtcbiAgICAgIGRvYy5hdXRob3IgPSBkb2MuX2F1dGhvcjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNoZWNrKG1hdGNoLCBkb2MuYXV0aG9yLCBkb2MpO1xuICAgICAgbmV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgYXV0aG9yUGx1Z2luID0gZnVuY3Rpb24gYXV0aG9yUGx1Z2luKHNjaGVtYSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gX2V4dGVuZHMoe1xuICAgIGF1dGhvckZpZWxkOiBmYWxzZSxcbiAgICBzZXQ6IHt9LFxuICAgIGluc2VydDoge30sXG4gICAgbW9kaWZ5OiB7fSxcbiAgICBnZXQ6IHt9LFxuICAgIHJlbW92ZToge30gfSxcbiAgb3B0aW9ucyk7XG5cblxuICBzY2hlbWEubWV0aG9kcy5zZXRBdXRob3IgPSBmdW5jdGlvbiAoYXV0aG9yKSB7XG4gICAgdGhpcy5fYXV0aG9yID0gYXV0aG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHNjaGVtYS5tZXRob2RzLmZvcmNlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2F1dGhvciA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcHJvY2Vzc1NldChzY2hlbWEsIG9wdGlvbnMpO1xuICBwcm9jZXNzR2V0KHNjaGVtYSwgb3B0aW9ucyk7XG4gIHByb2Nlc3NSZW1vdmUoc2NoZW1hLCBvcHRpb25zKTtcbn07ZXhwb3J0cy5kZWZhdWx0ID1cblxuYXV0aG9yUGx1Z2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvbW9kZWxzL3BsdWdpbnMvYXV0aG9yUGx1Z2luLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2F1dGhvclBsdWdpbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/plugins/authorPlugin.js\n");

/***/ }),

/***/ "./src/backend/models/plugins/bidPalPlugin.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _error = __webpack_require__(\"./src/backend/common/error.js\");\n\nvar bidPalPlugin = function bidPalPlugin(schema, options) {\n  schema.statics.create = function (body) {\n    var Model = this;\n    return new Promise(function (resolve, reject) {return resolve(new Model(body));});\n  };\n\n  schema.statics.get = function (doc_id) {\n    var Model = this;\n    return Model.findById(doc_id).\n    then(function (doc) {\n      if (!doc) throw new _error.NotFoundError();\n      return doc;\n    });\n  };\n\n  var _toJSON = schema.options.toJSON;\n  schema.options.toJSON = {\n    transform: function transform(doc, ret, options) {\n      if (_toJSON && _toJSON.transform) {\n        ret = _toJSON.transform(doc, ret, options);\n      }\n      delete ret.__v;\n      return ret;\n    } };\n\n};exports.default =\n\nbidPalPlugin;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9iaWRQYWxQbHVnaW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9iaWRQYWxQbHVnaW4uanM/MmM0YyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfZXJyb3IgPSByZXF1aXJlKCcvY29tbW9uL2Vycm9yJyk7XG5cbnZhciBiaWRQYWxQbHVnaW4gPSBmdW5jdGlvbiBiaWRQYWxQbHVnaW4oc2NoZW1hLCBvcHRpb25zKSB7XG4gIHNjaGVtYS5zdGF0aWNzLmNyZWF0ZSA9IGZ1bmN0aW9uIChib2R5KSB7XG4gICAgdmFyIE1vZGVsID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge3JldHVybiByZXNvbHZlKG5ldyBNb2RlbChib2R5KSk7fSk7XG4gIH07XG5cbiAgc2NoZW1hLnN0YXRpY3MuZ2V0ID0gZnVuY3Rpb24gKGRvY19pZCkge1xuICAgIHZhciBNb2RlbCA9IHRoaXM7XG4gICAgcmV0dXJuIE1vZGVsLmZpbmRCeUlkKGRvY19pZCkuXG4gICAgdGhlbihmdW5jdGlvbiAoZG9jKSB7XG4gICAgICBpZiAoIWRvYykgdGhyb3cgbmV3IF9lcnJvci5Ob3RGb3VuZEVycm9yKCk7XG4gICAgICByZXR1cm4gZG9jO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBfdG9KU09OID0gc2NoZW1hLm9wdGlvbnMudG9KU09OO1xuICBzY2hlbWEub3B0aW9ucy50b0pTT04gPSB7XG4gICAgdHJhbnNmb3JtOiBmdW5jdGlvbiB0cmFuc2Zvcm0oZG9jLCByZXQsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChfdG9KU09OICYmIF90b0pTT04udHJhbnNmb3JtKSB7XG4gICAgICAgIHJldCA9IF90b0pTT04udHJhbnNmb3JtKGRvYywgcmV0LCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSByZXQuX192O1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IH07XG5cbn07ZXhwb3J0cy5kZWZhdWx0ID1cblxuYmlkUGFsUGx1Z2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvbW9kZWxzL3BsdWdpbnMvYmlkUGFsUGx1Z2luLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2JpZFBhbFBsdWdpbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/models/plugins/bidPalPlugin.js\n");

/***/ }),

/***/ "./src/backend/models/plugins/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _authorPlugin = __webpack_require__(\"./src/backend/models/plugins/authorPlugin.js\");Object.defineProperty(exports, 'authorPlugin', { enumerable: true, get: function get() {return _interopRequireDefault(_authorPlugin).default;} });var _bidPalPlugin = __webpack_require__(\"./src/backend/models/plugins/bidPalPlugin.js\");Object.defineProperty(exports, 'bidPalPlugin', { enumerable: true, get: function get() {return _interopRequireDefault(_bidPalPlugin).\n    default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2luZGV4LmpzP2NhNGEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX2F1dGhvclBsdWdpbiA9IHJlcXVpcmUoJy4vYXV0aG9yUGx1Z2luJyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdhdXRob3JQbHVnaW4nLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hdXRob3JQbHVnaW4pLmRlZmF1bHQ7fSB9KTt2YXIgX2JpZFBhbFBsdWdpbiA9IHJlcXVpcmUoJy4vYmlkUGFsUGx1Z2luJyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdiaWRQYWxQbHVnaW4nLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaWRQYWxQbHVnaW4pLlxuICAgIGRlZmF1bHQ7fSB9KTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/models/plugins/index.js\n");

/***/ }),

/***/ "./src/backend/socket/Emitter.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}var Emitter = function () {\n  function Emitter(io, room) {_classCallCheck(this, Emitter);\n    this.io = io;\n    this.room = room;\n  }_createClass(Emitter, [{ key: \"emit\", value: function emit()\n\n    {var _io$to;\n      (_io$to = this.io.to(this.room)).emit.apply(_io$to, arguments);\n    } }]);return Emitter;}();exports.default =\n\n\nEmitter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9zb2NrZXQvRW1pdHRlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL3NvY2tldC9FbWl0dGVyLmpzPzM4ZmMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge3ZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07ZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTt9fXJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7aWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7fTt9KCk7ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge2lmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTt9fXZhciBFbWl0dGVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFbWl0dGVyKGlvLCByb29tKSB7X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVtaXR0ZXIpO1xuICAgIHRoaXMuaW8gPSBpbztcbiAgICB0aGlzLnJvb20gPSByb29tO1xuICB9X2NyZWF0ZUNsYXNzKEVtaXR0ZXIsIFt7IGtleTogXCJlbWl0XCIsIHZhbHVlOiBmdW5jdGlvbiBlbWl0KClcblxuICAgIHt2YXIgX2lvJHRvO1xuICAgICAgKF9pbyR0byA9IHRoaXMuaW8udG8odGhpcy5yb29tKSkuZW1pdC5hcHBseShfaW8kdG8sIGFyZ3VtZW50cyk7XG4gICAgfSB9XSk7cmV0dXJuIEVtaXR0ZXI7fSgpO2V4cG9ydHMuZGVmYXVsdCA9XG5cblxuRW1pdHRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL3NvY2tldC9FbWl0dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL3NvY2tldC9FbWl0dGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/socket/Emitter.js\n");

/***/ }),

/***/ "./src/backend/socket/Game.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Emitter2 = __webpack_require__(\"./src/backend/socket/Emitter.js\");var _Emitter3 = _interopRequireDefault(_Emitter2);\nvar _randomstring = __webpack_require__(\"randomstring\");var _randomstring2 = _interopRequireDefault(_randomstring);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");}return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== \"function\" && superClass !== null) {throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}\n\nvar COUNTDOWN = 10;\nvar MIN_PLAYERS = 2;\nvar MAX_PLAYERS = 8;\nvar INTERVAL = 100;var\n\nGame = function (_Emitter) {_inherits(Game, _Emitter);\n  function Game(io, onRemove) {_classCallCheck(this, Game);var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this,\n    io, _randomstring2.default.generate()));\n\n    _this.countdown_at = null;\n    _this.started_at = null;\n    _this.updated_at = null;\n    _this.finished_at = null;\n    _this.players = [];\n    _this.auction = null;\n\n    var timer = setInterval(function () {\n      var now = new Date();\n      if (_this.auction) {\n        if (_this.started_at && now - _this.started_at >= _this.auction.time * 1000) {\n          _this.finish();\n        }\n        if (_this.finished_at && now - _this.finished_at >= _this.auction.time * _this.players.length * 1000) {\n          clearInterval(timer);\n          _this.remove();\n          onRemove();\n        }\n      } else {\n        if (_this.countdown_at && now - _this.countdown_at >= COUNTDOWN * 1000) {\n          _this.start();\n        }\n      }\n    }, INTERVAL);return _this;\n  }_createClass(Game, [{ key: 'findPlayer', value: function findPlayer(\n\n    author) {var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {return true;};\n      return this.players.find(function (player) {return author.username === player.user.username && filter(player);});\n    } }, { key: 'addPlayer', value: function addPlayer(\n\n    player) {\n      this.players.push(player);\n      this.updatePlayers();\n    } }, { key: 'removePlayer', value: function removePlayer(\n\n    player) {\n      var index = this.players.indexOf(player);\n      if (~index) {\n        this.players.splice(index, 1);\n        this.updatePlayers();\n      }\n    } }, { key: 'isEveryoneDone', value: function isEveryoneDone()\n\n    {\n      return this.players.every(function (player) {return player.isDone();});\n    } }, { key: 'isPlaying', value: function isPlaying()\n\n    {\n      return this.started_at && !this.finished_at;\n    } }, { key: 'updatePlayers', value: function updatePlayers()\n\n    {\n      if (this.players.length >= MAX_PLAYERS) return this.start();\n      this.countdown_at = this.players.length >= MIN_PLAYERS ? new Date() : null;\n      this.update();\n    } }, { key: 'start', value: function start()\n\n    {var _this2 = this;\n      if (!this.started_at) {\n        this.started_at = new Date();\n        _models.Auction.count().\n        then(function (count) {\n          var random = Math.floor(Math.random() * count);\n          return _models.Auction.findOne().skip(random);\n        }).\n        then(function (auction) {\n          _this2.auction = auction.toJSON({ req: {} });\n          _this2.update();\n        }).\n        catch(console.error);\n      }\n    } }, { key: 'update', value: function update()\n\n    {\n      this.updated_at = new Date();\n      this.emit('GAME_UPDATED', this);\n    } }, { key: 'finish', value: function finish()\n\n    {\n      if (this.isPlaying()) {\n        this.finished_at = new Date();\n        this.update();\n      }\n    } }, { key: 'remove', value: function remove()\n\n    {\n      this.emit('GAME_REMOVED');\n    } }, { key: 'toJSON', value: function toJSON()\n\n    {var\n\n      countdown_at =\n\n\n\n\n\n      this.countdown_at,started_at = this.started_at,updated_at = this.updated_at,finished_at = this.finished_at,players = this.players,auction = this.auction;\n      return {\n        countdown_at: countdown_at,\n        started_at: started_at,\n        updated_at: updated_at,\n        finished_at: finished_at,\n        players: players,\n        auction: auction };\n\n    } }]);return Game;}(_Emitter3.default);exports.default =\n\n\nGame;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9zb2NrZXQvR2FtZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL3NvY2tldC9HYW1lLmpzP2YxNGEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge2Z1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge2ZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHt2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7aWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7fX1yZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge2lmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7aWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7cmV0dXJuIENvbnN0cnVjdG9yO307fSgpO3ZhciBfRW1pdHRlcjIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTt2YXIgX0VtaXR0ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRW1pdHRlcjIpO1xudmFyIF9yYW5kb21zdHJpbmcgPSByZXF1aXJlKCdyYW5kb21zdHJpbmcnKTt2YXIgX3JhbmRvbXN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yYW5kb21zdHJpbmcpO1xudmFyIF9tb2RlbHMgPSByZXF1aXJlKCcvbW9kZWxzJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge2lmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTt9fWZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtpZiAoIXNlbGYpIHt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7fXJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO31mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7fXN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7aWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO31cblxudmFyIENPVU5URE9XTiA9IDEwO1xudmFyIE1JTl9QTEFZRVJTID0gMjtcbnZhciBNQVhfUExBWUVSUyA9IDg7XG52YXIgSU5URVJWQUwgPSAxMDA7dmFyXG5cbkdhbWUgPSBmdW5jdGlvbiAoX0VtaXR0ZXIpIHtfaW5oZXJpdHMoR2FtZSwgX0VtaXR0ZXIpO1xuICBmdW5jdGlvbiBHYW1lKGlvLCBvblJlbW92ZSkge19jbGFzc0NhbGxDaGVjayh0aGlzLCBHYW1lKTt2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoR2FtZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdhbWUpKS5jYWxsKHRoaXMsXG4gICAgaW8sIF9yYW5kb21zdHJpbmcyLmRlZmF1bHQuZ2VuZXJhdGUoKSkpO1xuXG4gICAgX3RoaXMuY291bnRkb3duX2F0ID0gbnVsbDtcbiAgICBfdGhpcy5zdGFydGVkX2F0ID0gbnVsbDtcbiAgICBfdGhpcy51cGRhdGVkX2F0ID0gbnVsbDtcbiAgICBfdGhpcy5maW5pc2hlZF9hdCA9IG51bGw7XG4gICAgX3RoaXMucGxheWVycyA9IFtdO1xuICAgIF90aGlzLmF1Y3Rpb24gPSBudWxsO1xuXG4gICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICBpZiAoX3RoaXMuYXVjdGlvbikge1xuICAgICAgICBpZiAoX3RoaXMuc3RhcnRlZF9hdCAmJiBub3cgLSBfdGhpcy5zdGFydGVkX2F0ID49IF90aGlzLmF1Y3Rpb24udGltZSAqIDEwMDApIHtcbiAgICAgICAgICBfdGhpcy5maW5pc2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX3RoaXMuZmluaXNoZWRfYXQgJiYgbm93IC0gX3RoaXMuZmluaXNoZWRfYXQgPj0gX3RoaXMuYXVjdGlvbi50aW1lICogX3RoaXMucGxheWVycy5sZW5ndGggKiAxMDAwKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgX3RoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgb25SZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKF90aGlzLmNvdW50ZG93bl9hdCAmJiBub3cgLSBfdGhpcy5jb3VudGRvd25fYXQgPj0gQ09VTlRET1dOICogMTAwMCkge1xuICAgICAgICAgIF90aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBJTlRFUlZBTCk7cmV0dXJuIF90aGlzO1xuICB9X2NyZWF0ZUNsYXNzKEdhbWUsIFt7IGtleTogJ2ZpbmRQbGF5ZXInLCB2YWx1ZTogZnVuY3Rpb24gZmluZFBsYXllcihcblxuICAgIGF1dGhvcikge3ZhciBmaWx0ZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdHJ1ZTt9O1xuICAgICAgcmV0dXJuIHRoaXMucGxheWVycy5maW5kKGZ1bmN0aW9uIChwbGF5ZXIpIHtyZXR1cm4gYXV0aG9yLnVzZXJuYW1lID09PSBwbGF5ZXIudXNlci51c2VybmFtZSAmJiBmaWx0ZXIocGxheWVyKTt9KTtcbiAgICB9IH0sIHsga2V5OiAnYWRkUGxheWVyJywgdmFsdWU6IGZ1bmN0aW9uIGFkZFBsYXllcihcblxuICAgIHBsYXllcikge1xuICAgICAgdGhpcy5wbGF5ZXJzLnB1c2gocGxheWVyKTtcbiAgICAgIHRoaXMudXBkYXRlUGxheWVycygpO1xuICAgIH0gfSwgeyBrZXk6ICdyZW1vdmVQbGF5ZXInLCB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlUGxheWVyKFxuXG4gICAgcGxheWVyKSB7XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLnBsYXllcnMuaW5kZXhPZihwbGF5ZXIpO1xuICAgICAgaWYgKH5pbmRleCkge1xuICAgICAgICB0aGlzLnBsYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJzKCk7XG4gICAgICB9XG4gICAgfSB9LCB7IGtleTogJ2lzRXZlcnlvbmVEb25lJywgdmFsdWU6IGZ1bmN0aW9uIGlzRXZlcnlvbmVEb25lKClcblxuICAgIHtcbiAgICAgIHJldHVybiB0aGlzLnBsYXllcnMuZXZlcnkoZnVuY3Rpb24gKHBsYXllcikge3JldHVybiBwbGF5ZXIuaXNEb25lKCk7fSk7XG4gICAgfSB9LCB7IGtleTogJ2lzUGxheWluZycsIHZhbHVlOiBmdW5jdGlvbiBpc1BsYXlpbmcoKVxuXG4gICAge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRlZF9hdCAmJiAhdGhpcy5maW5pc2hlZF9hdDtcbiAgICB9IH0sIHsga2V5OiAndXBkYXRlUGxheWVycycsIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVQbGF5ZXJzKClcblxuICAgIHtcbiAgICAgIGlmICh0aGlzLnBsYXllcnMubGVuZ3RoID49IE1BWF9QTEFZRVJTKSByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgICAgdGhpcy5jb3VudGRvd25fYXQgPSB0aGlzLnBsYXllcnMubGVuZ3RoID49IE1JTl9QTEFZRVJTID8gbmV3IERhdGUoKSA6IG51bGw7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0gfSwgeyBrZXk6ICdzdGFydCcsIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpXG5cbiAgICB7dmFyIF90aGlzMiA9IHRoaXM7XG4gICAgICBpZiAoIXRoaXMuc3RhcnRlZF9hdCkge1xuICAgICAgICB0aGlzLnN0YXJ0ZWRfYXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBfbW9kZWxzLkF1Y3Rpb24uY291bnQoKS5cbiAgICAgICAgdGhlbihmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY291bnQpO1xuICAgICAgICAgIHJldHVybiBfbW9kZWxzLkF1Y3Rpb24uZmluZE9uZSgpLnNraXAocmFuZG9tKTtcbiAgICAgICAgfSkuXG4gICAgICAgIHRoZW4oZnVuY3Rpb24gKGF1Y3Rpb24pIHtcbiAgICAgICAgICBfdGhpczIuYXVjdGlvbiA9IGF1Y3Rpb24udG9KU09OKHsgcmVxOiB7fSB9KTtcbiAgICAgICAgICBfdGhpczIudXBkYXRlKCk7XG4gICAgICAgIH0pLlxuICAgICAgICBjYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgIH1cbiAgICB9IH0sIHsga2V5OiAndXBkYXRlJywgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpXG5cbiAgICB7XG4gICAgICB0aGlzLnVwZGF0ZWRfYXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgdGhpcy5lbWl0KCdHQU1FX1VQREFURUQnLCB0aGlzKTtcbiAgICB9IH0sIHsga2V5OiAnZmluaXNoJywgdmFsdWU6IGZ1bmN0aW9uIGZpbmlzaCgpXG5cbiAgICB7XG4gICAgICBpZiAodGhpcy5pc1BsYXlpbmcoKSkge1xuICAgICAgICB0aGlzLmZpbmlzaGVkX2F0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9IH0sIHsga2V5OiAncmVtb3ZlJywgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZSgpXG5cbiAgICB7XG4gICAgICB0aGlzLmVtaXQoJ0dBTUVfUkVNT1ZFRCcpO1xuICAgIH0gfSwgeyBrZXk6ICd0b0pTT04nLCB2YWx1ZTogZnVuY3Rpb24gdG9KU09OKClcblxuICAgIHt2YXJcblxuICAgICAgY291bnRkb3duX2F0ID1cblxuXG5cblxuXG4gICAgICB0aGlzLmNvdW50ZG93bl9hdCxzdGFydGVkX2F0ID0gdGhpcy5zdGFydGVkX2F0LHVwZGF0ZWRfYXQgPSB0aGlzLnVwZGF0ZWRfYXQsZmluaXNoZWRfYXQgPSB0aGlzLmZpbmlzaGVkX2F0LHBsYXllcnMgPSB0aGlzLnBsYXllcnMsYXVjdGlvbiA9IHRoaXMuYXVjdGlvbjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvdW50ZG93bl9hdDogY291bnRkb3duX2F0LFxuICAgICAgICBzdGFydGVkX2F0OiBzdGFydGVkX2F0LFxuICAgICAgICB1cGRhdGVkX2F0OiB1cGRhdGVkX2F0LFxuICAgICAgICBmaW5pc2hlZF9hdDogZmluaXNoZWRfYXQsXG4gICAgICAgIHBsYXllcnM6IHBsYXllcnMsXG4gICAgICAgIGF1Y3Rpb246IGF1Y3Rpb24gfTtcblxuICAgIH0gfV0pO3JldHVybiBHYW1lO30oX0VtaXR0ZXIzLmRlZmF1bHQpO2V4cG9ydHMuZGVmYXVsdCA9XG5cblxuR2FtZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL3NvY2tldC9HYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL3NvY2tldC9HYW1lLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/socket/Game.js\n");

/***/ }),

/***/ "./src/backend/socket/Player.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Emitter2 = __webpack_require__(\"./src/backend/socket/Emitter.js\");var _Emitter3 = _interopRequireDefault(_Emitter2);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");}return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== \"function\" && superClass !== null) {throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var\n\nPlayer = function (_Emitter) {_inherits(Player, _Emitter);\n  function Player(io, game, author) {_classCallCheck(this, Player);var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this,\n    io, game.room));\n    _this.game = game;\n    _this.connected = 1;\n\n    _this.user = author;\n    _this.submitted_at = null;\n    _this.typing = false;\n    _this.bid = null;return _this;\n  }_createClass(Player, [{ key: 'connect', value: function connect()\n\n    {\n      this.connected++;\n      this.game.update();\n    } }, { key: 'disconnect', value: function disconnect()\n\n    {\n      if (--this.connected < 1) {\n        this.game.removePlayer(this);\n      }\n    } }, { key: 'startTyping', value: function startTyping()\n\n    {\n      this.typing = true;\n      this.update();\n    } }, { key: 'stopTyping', value: function stopTyping()\n\n    {\n      this.typing = false;\n      this.update();\n    } }, { key: 'submit', value: function submit(\n\n    amount) {var _this2 = this;\n      this.submitted_at = new Date();\n      new _models.Bid({\n        auction: this.game.auction,\n        amount: amount,\n        author: this.user }).\n      force().save().\n      then(function (bid) {\n        _this2.bid = bid.toJSON({ req: {} });\n        if (_this2.game.isEveryoneDone()) return _this2.game.finish();\n        _this2.update();\n      }).\n      catch(console.error);\n    } }, { key: 'update', value: function update()\n\n    {\n      this.updated_at = new Date();\n      this.emit('PLAYER_UPDATED', this);\n    } }, { key: 'toJSON', value: function toJSON()\n\n    {var\n\n      user =\n\n\n\n\n\n\n      this.user,submitted_at = this.submitted_at,given_up_at = this.given_up_at,typing = this.typing,bid = this.bid,ratings = this.ratings,average_stars = this.average_stars;\n      return {\n        user: user,\n        submitted_at: submitted_at,\n        given_up_at: given_up_at,\n        typing: typing,\n        bid: bid,\n        ratings: ratings,\n        average_stars: average_stars };\n\n    } }]);return Player;}(_Emitter3.default);exports.default =\n\n\nPlayer;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9zb2NrZXQvUGxheWVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvc29ja2V0L1BsYXllci5qcz9jZGM0Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7dmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO2lmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO319cmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO2lmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcjt9O30oKTt2YXIgX0VtaXR0ZXIyID0gcmVxdWlyZSgnLi9FbWl0dGVyJyk7dmFyIF9FbWl0dGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VtaXR0ZXIyKTtcbnZhciBfbW9kZWxzID0gcmVxdWlyZSgnL21vZGVscycpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fWZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge3Rocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7fX1mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7aWYgKCFzZWxmKSB7dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO31yZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjt9ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7aWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge3Rocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO31zdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pO2lmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczt9dmFyXG5cblBsYXllciA9IGZ1bmN0aW9uIChfRW1pdHRlcikge19pbmhlcml0cyhQbGF5ZXIsIF9FbWl0dGVyKTtcbiAgZnVuY3Rpb24gUGxheWVyKGlvLCBnYW1lLCBhdXRob3IpIHtfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGxheWVyKTt2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUGxheWVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGxheWVyKSkuY2FsbCh0aGlzLFxuICAgIGlvLCBnYW1lLnJvb20pKTtcbiAgICBfdGhpcy5nYW1lID0gZ2FtZTtcbiAgICBfdGhpcy5jb25uZWN0ZWQgPSAxO1xuXG4gICAgX3RoaXMudXNlciA9IGF1dGhvcjtcbiAgICBfdGhpcy5zdWJtaXR0ZWRfYXQgPSBudWxsO1xuICAgIF90aGlzLnR5cGluZyA9IGZhbHNlO1xuICAgIF90aGlzLmJpZCA9IG51bGw7cmV0dXJuIF90aGlzO1xuICB9X2NyZWF0ZUNsYXNzKFBsYXllciwgW3sga2V5OiAnY29ubmVjdCcsIHZhbHVlOiBmdW5jdGlvbiBjb25uZWN0KClcblxuICAgIHtcbiAgICAgIHRoaXMuY29ubmVjdGVkKys7XG4gICAgICB0aGlzLmdhbWUudXBkYXRlKCk7XG4gICAgfSB9LCB7IGtleTogJ2Rpc2Nvbm5lY3QnLCB2YWx1ZTogZnVuY3Rpb24gZGlzY29ubmVjdCgpXG5cbiAgICB7XG4gICAgICBpZiAoLS10aGlzLmNvbm5lY3RlZCA8IDEpIHtcbiAgICAgICAgdGhpcy5nYW1lLnJlbW92ZVBsYXllcih0aGlzKTtcbiAgICAgIH1cbiAgICB9IH0sIHsga2V5OiAnc3RhcnRUeXBpbmcnLCB2YWx1ZTogZnVuY3Rpb24gc3RhcnRUeXBpbmcoKVxuXG4gICAge1xuICAgICAgdGhpcy50eXBpbmcgPSB0cnVlO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9IH0sIHsga2V5OiAnc3RvcFR5cGluZycsIHZhbHVlOiBmdW5jdGlvbiBzdG9wVHlwaW5nKClcblxuICAgIHtcbiAgICAgIHRoaXMudHlwaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0gfSwgeyBrZXk6ICdzdWJtaXQnLCB2YWx1ZTogZnVuY3Rpb24gc3VibWl0KFxuXG4gICAgYW1vdW50KSB7dmFyIF90aGlzMiA9IHRoaXM7XG4gICAgICB0aGlzLnN1Ym1pdHRlZF9hdCA9IG5ldyBEYXRlKCk7XG4gICAgICBuZXcgX21vZGVscy5CaWQoe1xuICAgICAgICBhdWN0aW9uOiB0aGlzLmdhbWUuYXVjdGlvbixcbiAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgIGF1dGhvcjogdGhpcy51c2VyIH0pLlxuICAgICAgZm9yY2UoKS5zYXZlKCkuXG4gICAgICB0aGVuKGZ1bmN0aW9uIChiaWQpIHtcbiAgICAgICAgX3RoaXMyLmJpZCA9IGJpZC50b0pTT04oeyByZXE6IHt9IH0pO1xuICAgICAgICBpZiAoX3RoaXMyLmdhbWUuaXNFdmVyeW9uZURvbmUoKSkgcmV0dXJuIF90aGlzMi5nYW1lLmZpbmlzaCgpO1xuICAgICAgICBfdGhpczIudXBkYXRlKCk7XG4gICAgICB9KS5cbiAgICAgIGNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0gfSwgeyBrZXk6ICd1cGRhdGUnLCB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKClcblxuICAgIHtcbiAgICAgIHRoaXMudXBkYXRlZF9hdCA9IG5ldyBEYXRlKCk7XG4gICAgICB0aGlzLmVtaXQoJ1BMQVlFUl9VUERBVEVEJywgdGhpcyk7XG4gICAgfSB9LCB7IGtleTogJ3RvSlNPTicsIHZhbHVlOiBmdW5jdGlvbiB0b0pTT04oKVxuXG4gICAge3ZhclxuXG4gICAgICB1c2VyID1cblxuXG5cblxuXG5cbiAgICAgIHRoaXMudXNlcixzdWJtaXR0ZWRfYXQgPSB0aGlzLnN1Ym1pdHRlZF9hdCxnaXZlbl91cF9hdCA9IHRoaXMuZ2l2ZW5fdXBfYXQsdHlwaW5nID0gdGhpcy50eXBpbmcsYmlkID0gdGhpcy5iaWQscmF0aW5ncyA9IHRoaXMucmF0aW5ncyxhdmVyYWdlX3N0YXJzID0gdGhpcy5hdmVyYWdlX3N0YXJzO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXNlcjogdXNlcixcbiAgICAgICAgc3VibWl0dGVkX2F0OiBzdWJtaXR0ZWRfYXQsXG4gICAgICAgIGdpdmVuX3VwX2F0OiBnaXZlbl91cF9hdCxcbiAgICAgICAgdHlwaW5nOiB0eXBpbmcsXG4gICAgICAgIGJpZDogYmlkLFxuICAgICAgICByYXRpbmdzOiByYXRpbmdzLFxuICAgICAgICBhdmVyYWdlX3N0YXJzOiBhdmVyYWdlX3N0YXJzIH07XG5cbiAgICB9IH1dKTtyZXR1cm4gUGxheWVyO30oX0VtaXR0ZXIzLmRlZmF1bHQpO2V4cG9ydHMuZGVmYXVsdCA9XG5cblxuUGxheWVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvc29ja2V0L1BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9zb2NrZXQvUGxheWVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/socket/Player.js\n");

/***/ }),

/***/ "./src/backend/socket/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _socket = __webpack_require__(\"socket.io\");var _socket2 = _interopRequireDefault(_socket);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");\nvar _Game = __webpack_require__(\"./src/backend/socket/Game.js\");var _Game2 = _interopRequireDefault(_Game);\nvar _Player = __webpack_require__(\"./src/backend/socket/Player.js\");var _Player2 = _interopRequireDefault(_Player);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar connectSocket = function connectSocket(httpServer) {\n  var io = (0, _socket2.default)(httpServer, { path: '/socket' });\n  var games = [];\n  io.on('connection', function (socket) {\n    socket.on('AUTH', function (data) {var\n      token = data.token,auction_id = data.auction_id;\n      _models.Auth.verify(token).\n      then(function (auth) {return _models.Auth.populate(auth, 'user');}).\n      then(function (auth) {return auth.refresh();}).\n      then(function (auth) {\n        var author = auth.user.toJSON({ req: {} });\n        var game = games.find(function (game) {return !game.finished_at && game.findPlayer(author, function (player) {return !player.isDone();});});\n        if (!game) game = games.find(function (game) {return !game.started_at;});\n        if (!game) {\n          game = new _Game2.default(io, function () {\n            var index = games.indexOf(undefined);\n            if (~index) games.splice(index, 1);\n          });\n          games.push(game);\n        }\n        socket.join(game.room);\n\n        var player = game.findPlayer(author);\n        if (player) {\n          player.connect();\n        } else {\n          player = new _Player2.default(io, game, author);\n          game.addPlayer(player);\n        }\n\n        listenOnPlayer(player);\n      }).\n      catch(function (err) {\n        console.error(err);\n        socket.disconnect();\n      });\n    });\n\n    var listenOnPlayer = function listenOnPlayer(player) {\n      socket.on('disconnect', function () {\n        player.disconnect();\n      });\n      socket.on('START_TYPING', function () {\n        player.startTyping();\n      });\n      socket.on('STOP_TYPING', function () {\n        player.stopTyping();\n      });\n      socket.on('SUBMIT', function (code) {\n        player.submit(code);\n      });\n    };\n  });\n};exports.default =\n\nconnectSocket;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9zb2NrZXQvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9zb2NrZXQvaW5kZXguanM/NDc2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfc29ja2V0ID0gcmVxdWlyZSgnc29ja2V0LmlvJyk7dmFyIF9zb2NrZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc29ja2V0KTtcbnZhciBfbW9kZWxzID0gcmVxdWlyZSgnL21vZGVscycpO1xudmFyIF9HYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7dmFyIF9HYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dhbWUpO1xudmFyIF9QbGF5ZXIgPSByZXF1aXJlKCcuL1BsYXllcicpO3ZhciBfUGxheWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1BsYXllcik7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cbnZhciBjb25uZWN0U29ja2V0ID0gZnVuY3Rpb24gY29ubmVjdFNvY2tldChodHRwU2VydmVyKSB7XG4gIHZhciBpbyA9ICgwLCBfc29ja2V0Mi5kZWZhdWx0KShodHRwU2VydmVyLCB7IHBhdGg6ICcvc29ja2V0JyB9KTtcbiAgdmFyIGdhbWVzID0gW107XG4gIGlvLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24gKHNvY2tldCkge1xuICAgIHNvY2tldC5vbignQVVUSCcsIGZ1bmN0aW9uIChkYXRhKSB7dmFyXG4gICAgICB0b2tlbiA9IGRhdGEudG9rZW4sYXVjdGlvbl9pZCA9IGRhdGEuYXVjdGlvbl9pZDtcbiAgICAgIF9tb2RlbHMuQXV0aC52ZXJpZnkodG9rZW4pLlxuICAgICAgdGhlbihmdW5jdGlvbiAoYXV0aCkge3JldHVybiBfbW9kZWxzLkF1dGgucG9wdWxhdGUoYXV0aCwgJ3VzZXInKTt9KS5cbiAgICAgIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtyZXR1cm4gYXV0aC5yZWZyZXNoKCk7fSkuXG4gICAgICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7XG4gICAgICAgIHZhciBhdXRob3IgPSBhdXRoLnVzZXIudG9KU09OKHsgcmVxOiB7fSB9KTtcbiAgICAgICAgdmFyIGdhbWUgPSBnYW1lcy5maW5kKGZ1bmN0aW9uIChnYW1lKSB7cmV0dXJuICFnYW1lLmZpbmlzaGVkX2F0ICYmIGdhbWUuZmluZFBsYXllcihhdXRob3IsIGZ1bmN0aW9uIChwbGF5ZXIpIHtyZXR1cm4gIXBsYXllci5pc0RvbmUoKTt9KTt9KTtcbiAgICAgICAgaWYgKCFnYW1lKSBnYW1lID0gZ2FtZXMuZmluZChmdW5jdGlvbiAoZ2FtZSkge3JldHVybiAhZ2FtZS5zdGFydGVkX2F0O30pO1xuICAgICAgICBpZiAoIWdhbWUpIHtcbiAgICAgICAgICBnYW1lID0gbmV3IF9HYW1lMi5kZWZhdWx0KGlvLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lcy5pbmRleE9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBpZiAofmluZGV4KSBnYW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdhbWVzLnB1c2goZ2FtZSk7XG4gICAgICAgIH1cbiAgICAgICAgc29ja2V0LmpvaW4oZ2FtZS5yb29tKTtcblxuICAgICAgICB2YXIgcGxheWVyID0gZ2FtZS5maW5kUGxheWVyKGF1dGhvcik7XG4gICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICBwbGF5ZXIuY29ubmVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYXllciA9IG5ldyBfUGxheWVyMi5kZWZhdWx0KGlvLCBnYW1lLCBhdXRob3IpO1xuICAgICAgICAgIGdhbWUuYWRkUGxheWVyKHBsYXllcik7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0ZW5PblBsYXllcihwbGF5ZXIpO1xuICAgICAgfSkuXG4gICAgICBjYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdmFyIGxpc3Rlbk9uUGxheWVyID0gZnVuY3Rpb24gbGlzdGVuT25QbGF5ZXIocGxheWVyKSB7XG4gICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBsYXllci5kaXNjb25uZWN0KCk7XG4gICAgICB9KTtcbiAgICAgIHNvY2tldC5vbignU1RBUlRfVFlQSU5HJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwbGF5ZXIuc3RhcnRUeXBpbmcoKTtcbiAgICAgIH0pO1xuICAgICAgc29ja2V0Lm9uKCdTVE9QX1RZUElORycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGxheWVyLnN0b3BUeXBpbmcoKTtcbiAgICAgIH0pO1xuICAgICAgc29ja2V0Lm9uKCdTVUJNSVQnLCBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICBwbGF5ZXIuc3VibWl0KGNvZGUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG59O2V4cG9ydHMuZGVmYXVsdCA9XG5cbmNvbm5lY3RTb2NrZXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9zb2NrZXQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvc29ja2V0L2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/socket/index.js\n");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "faker":
/***/ (function(module, exports) {

module.exports = require("faker");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "multer":
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "randomstring":
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),

/***/ "sharp":
/***/ (function(module, exports) {

module.exports = require("sharp");

/***/ }),

/***/ "socket.io":
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
});