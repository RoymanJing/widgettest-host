'use strict';require('babel-polyfill');
var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _controller = require('./controller.js');var _controller2 = _interopRequireDefault(_controller);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}
//var express = require('express')
var app = (0, _express2.default)();
var router = _express2.default.Router();
var path = __dirname + "/views/";

app.use(_express2.default.static('public'));
app.use("/", router);

router.get("/", function () {var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {var controller, content;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            //res.sendFile(path + "index.html");
            controller = new _controller2.default();_context.next = 3;return (
              controller.render());case 3:content = _context.sent;
            res.send(content);case 5:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


router.get("/product", function (req, res) {
  res.sendFile(path + "product.html");});

router.get("/about", function (req, res) {
  res.sendFile(path + "about.html");
});

app.use("*", function (req, res) {
  res.send("Error 404: Not Found!");
});

app.listen(3000, function () {
  console.log("Server running at Port 3000");
});