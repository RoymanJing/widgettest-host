'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _fsExtraPromise = require('fs-extra-promise');var _fsExtraPromise2 = _interopRequireDefault(_fsExtraPromise);
var _javascriptWebClient = require('javascript-web-client');var _javascriptWebClient2 = _interopRequireDefault(_javascriptWebClient);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Controller = function () {
    function Controller() {_classCallCheck(this, Controller);
        this.context = { storeid: 1, storetype: 4 };
    }_createClass(Controller, [{ key: 'getTemplate', value: function () {var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(
            name) {var file;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

                                    _fsExtraPromise2.default.readFileAsync(process.cwd() + name));case 3:file = _context.sent;return _context.abrupt('return',
                                String(file));case 7:_context.prev = 7;_context.t0 = _context['catch'](0);

                                console.log('error: ', _context.t0);case 10:case 'end':return _context.stop();}}}, _callee, this, [[0, 7]]);}));function getTemplate(_x) {return _ref.apply(this, arguments);}return getTemplate;}() }, { key: 'parseTamplate', value: function parseTamplate(


        template) {
            var regex = /\[\[\[([\s\S]+?)\]\]\]/gi;
            var widgets = [];
            var m = void 0;
            while ((m = regex.exec(template)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                widgets.push({ key: m[0], value: m[1] });
            }
            return widgets;
        }
        // {
        //     "name":"header",
        //     "host":"http://localhost:3001",
        //     "path":"/webparts/header",
        //     "parameters":{"id":1,"storeid":"{storeid}"},
        // }
    }, { key: 'getWidget', value: function () {var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(widgetString) {var widget, client, response;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                                widget = JSON.parse(widgetString);
                                widget.path = this.initParameter(widget);
                                client = new _javascriptWebClient2.default(widget.host);_context2.next = 5;return (
                                    client.request(widget.path, {}));case 5:response = _context2.sent;return _context2.abrupt('return',
                                response.body);case 7:case 'end':return _context2.stop();}}}, _callee2, this);}));function getWidget(_x2) {return _ref2.apply(this, arguments);}return getWidget;}() }, { key: 'isArrayFn', value: function isArrayFn(


        value) {
            if (typeof Array.isArray === "function") {
                return Array.isArray(value);
            } else {
                return Object.prototype.toString.call(value) === "[object Array]";
            }
        } }, { key: 'initParameter', value: function initParameter(

        widget) {var _this = this;;
            var paras = widget.parameters;
            var keys = Object.keys(paras);
            var path = widget.path;
            keys.forEach(function (name, index) {
                var val = paras[name];
                if (_this.isArrayFn(val)) {
                    val = encodeURIComponent(val.join(","));
                } else
                if (!(typeof val == 'string' && val.constructor == String && val.indexOf("{") == 0 && val.indexOf("}") == val.length - 1)) {
                    val = encodeURIComponent(val);
                }

                path = path + (path.indexOf("?") < 0 ? "?" : "&") + (name + '=') + val;
            });

            keys = Object.keys(this.context);
            keys.forEach(function (name, index) {
                path = path.replace('{' + name + '}', _this.context[name]);
            });
            return path;
        } }, { key: 'render', value: function () {var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {var template, widgets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, widget, tempContent;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (


                                    this.getTemplate("/views/index.html"));case 2:template = _context3.sent;
                                widgets = this.parseTamplate(template);_iteratorNormalCompletion = true;_didIteratorError = false;_iteratorError = undefined;_context3.prev = 7;_iterator =
                                widgets[Symbol.iterator]();case 9:if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {_context3.next = 18;break;}widget = _step.value;_context3.next = 13;return (
                                    this.getWidget(widget.value));case 13:tempContent = _context3.sent;
                                template = template.replace(widget.key, tempContent);case 15:_iteratorNormalCompletion = true;_context3.next = 9;break;case 18:_context3.next = 24;break;case 20:_context3.prev = 20;_context3.t0 = _context3['catch'](7);_didIteratorError = true;_iteratorError = _context3.t0;case 24:_context3.prev = 24;_context3.prev = 25;if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}case 27:_context3.prev = 27;if (!_didIteratorError) {_context3.next = 30;break;}throw _iteratorError;case 30:return _context3.finish(27);case 31:return _context3.finish(24);case 32:return _context3.abrupt('return',


                                template);case 33:case 'end':return _context3.stop();}}}, _callee3, this, [[7, 20, 24, 32], [25,, 27, 31]]);}));function render() {return _ref3.apply(this, arguments);}return render;}() }]);return Controller;}();exports.default =



Controller;