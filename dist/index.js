"use strict";

var _hr = _interopRequireDefault(require("./formats/hr"));

var _quill = _interopRequireDefault(require("quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_quill.default.register('formats/horizontal', _hr.default);

var MarkdownShortcuts =
/*#__PURE__*/
function () {
  function MarkdownShortcuts(quill, options) {
    var _this = this;

    _classCallCheck(this, MarkdownShortcuts);

    this.quill = quill;
    this.options = options;
    this.ignoreTags = ['PRE'];
    this.matches = [{
      name: 'header',
      pattern: /^(#){1,6}\s/g,
      action: function action(text, selection, pattern) {
        var match = pattern.exec(text);
        if (!match) return;
        var size = match[0].length; // Need to defer this action https://github.com/quilljs/quill/issues/1134

        setTimeout(function () {
          _this.quill.formatLine(selection.index, 0, 'header', size - 1);

          _this.quill.deleteText(selection.index - size, size);
        }, 0);
      }
    }, {
      name: 'blockquote',
      pattern: /^(>)\s/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'blockquote', true);

          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: 'code-block',
      pattern: /^`{3}(?:\s|\n)/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'code-block', true);

          _this.quill.deleteText(selection.index - 4, 4);
        }, 0);
      }
    }, {
      name: 'bolditalic',
      pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            bold: true,
            italic: true
          });

          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'bold',
      pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            bold: true
          });

          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'italic',
      pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            italic: true
          });

          _this.quill.format('italic', false);
        }, 0);
      }
    }, {
      name: 'strikethrough',
      pattern: /(?:~~)(.+?)(?:~~)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            strike: true
          });

          _this.quill.format('strike', false);
        }, 0);
      }
    }, {
      name: 'code',
      pattern: /(?:`)(.+?)(?:`)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            code: true
          });

          _this.quill.format('code', false);

          _this.quill.insertText(_this.quill.getSelection(), ' ');
        }, 0);
      }
    }, {
      name: 'hr',
      pattern: /^([-*]\s?){3}/g,
      action: function action(text, selection) {
        var startIndex = selection.index - text.length;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, text.length);

          _this.quill.insertEmbed(startIndex + 1, 'hr', true, _quill.default.sources.USER);

          _this.quill.insertText(startIndex + 2, '\n', _quill.default.sources.SILENT);

          _this.quill.setSelection(startIndex + 2, _quill.default.sources.SILENT);
        }, 0);
      }
    }, {
      name: 'asterisk-ul',
      pattern: /^(\*|\+)\s$/g,
      action: function action(text, selection, pattern) {
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'list', 'unordered');

          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: 'image',
      pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0]; // const hrefText = text.match(/(?:!\[(.*?)\])/g)[0]

        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;

        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);

            _this.quill.insertEmbed(start, 'image', hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }, {
      name: 'link',
      pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        var hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;

        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);

            _this.quill.insertText(start, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }]; // Handler that looks for insert deltas that match specific characters

    this.quill.on('text-change', function (delta, oldContents, source) {
      for (var i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty('insert')) {
          if (delta.ops[i].insert === ' ') {
            _this.onSpace();
          } else if (delta.ops[i].insert === '\n') {
            _this.onEnter();
          }
        }
      }
    });
  }

  _createClass(MarkdownShortcuts, [{
    key: "isValid",
    value: function isValid(text, tagName) {
      return typeof text !== 'undefined' && text && this.ignoreTags.indexOf(tagName) === -1;
    }
  }, {
    key: "onSpace",
    value: function onSpace() {
      var selection = this.quill.getSelection();
      if (!selection) return;

      var _this$quill$getLine = this.quill.getLine(selection.index),
          _this$quill$getLine2 = _slicedToArray(_this$quill$getLine, 2),
          line = _this$quill$getLine2[0],
          offset = _this$quill$getLine2[1];

      var text = line.domNode.textContent;
      var lineStart = selection.index - offset;

      if (this.isValid(text, line.domNode.tagName)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var match = _step.value;
            var matchedText = text.match(match.pattern);

            if (matchedText) {
              // We need to replace only matched text not the whole line
              console.log('matched:', match.name, text);
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      var selection = this.quill.getSelection();
      if (!selection) return;

      var _this$quill$getLine3 = this.quill.getLine(selection.index),
          _this$quill$getLine4 = _slicedToArray(_this$quill$getLine3, 2),
          line = _this$quill$getLine4[0],
          offset = _this$quill$getLine4[1];

      var text = line.domNode.textContent + ' ';
      var lineStart = selection.index - offset;
      selection.length = selection.index++;

      if (this.isValid(text, line.domNode.tagName)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.matches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var match = _step2.value;
            var matchedText = text.match(match.pattern);

            if (matchedText) {
              console.log('matched', match.name, text);
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  return MarkdownShortcuts;
}();

module.exports = MarkdownShortcuts;