"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _deepExtend = _interopRequireDefault(require("deep-extend"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "/Users/barrylow/Business/AdvancedAlgos/Algoteers/react-image-cropper/component/Cropper.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Cropper =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Cropper, _React$Component);

  function Cropper(props) {
    var _this;

    _classCallCheck(this, Cropper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cropper).call(this, props));
    var _this$props = _this.props,
        originX = _this$props.originX,
        originY = _this$props.originY,
        width = _this$props.width,
        height = _this$props.height,
        selectionNatural = _this$props.selectionNatural,
        fixedRatio = _this$props.fixedRatio,
        allowNewSelection = _this$props.allowNewSelection,
        rate = _this$props.rate,
        styles = _this$props.styles,
        imageLoaded = _this$props.imageLoaded,
        beforeImageLoaded = _this$props.beforeImageLoaded,
        imageLoadError = _this$props.imageLoadError,
        onDragStop = _this$props.onDragStop;
    _this.state = {
      img_width: '100%',
      img_height: 'auto',
      imgWidth: 200,
      imgHeight: 200,
      imgTop: 0,
      imgLeft: 0,
      originX: originX,
      originY: originY,
      startX: 0,
      startY: 0,
      frameWidth: width,
      fixedRatio: fixedRatio,
      selectionNatural: selectionNatural,
      allowNewSelection: allowNewSelection,
      frameHeight: fixedRatio ? width / rate : height,
      dragging: false,
      maxLeft: 0,
      maxTop: 0,
      action: null,
      imgLoaded: false,
      imgBeforeLoaded: false,
      styles: (0, _deepExtend.default)({}, defaultStyles, styles),
      imageLoaded: imageLoaded,
      beforeImageLoaded: beforeImageLoaded,
      imageLoadError: imageLoadError,
      onDragStop: onDragStop,
      moved: false,
      originalOriginX: originX,
      originalOriginY: originY,
      originalFrameWidth: width,
      originalFrameHeight: fixedRatio ? width / rate : height
    };
    _this.handleDragStart = _this.handleDragStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.imgOnLoad = _this.imgOnLoad.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.imgOnError = _this.imgOnError.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Cropper, [{
    key: "initStyles",
    value: function initStyles() {
      var _this$props2 = this.props,
          originX = _this$props2.originX,
          originY = _this$props2.originY;
      var _this$state = this.state,
          selectionNatural = _this$state.selectionNatural,
          img_width = _this$state.img_width,
          img_height = _this$state.img_height;
      var frameWidth = this.state.frameWidth || img_width;
      var frameHeight = this.state.frameHeight || img_height / 4;

      if (selectionNatural) {
        var img = _reactDom.default.findDOMNode(this.refs.img);

        var _rateWidth = img_width / img.naturalWidth;

        var _rateHeight = img_height / img.naturalHeight;

        var realWidth = Number(frameWidth * _rateWidth);
        var realHeight = Number(frameHeight * _rateHeight);
        var realX = Number(originX * _rateHeight);
        var realY = Number(originY * _rateWidth);
        frameWidth = realWidth;
        frameHeight = realHeight;
        originX = realX;
        originY = realY;
        this.setState({
          frameWidth: frameWidth,
          frameHeight: frameHeight,
          originX: originX,
          originY: originY
        });
      }

      var maxLeft = img_width - frameWidth;
      var maxTop = img_height - frameHeight;

      if (originX + frameWidth >= img_width) {
        originX = img_width - frameWidth;
        this.setState({
          originX: originX
        });
      }

      if (originY + frameHeight >= img_height) {
        originY = img_height - frameHeight;
        this.setState({
          originY: originY
        });
      }

      this.setState({
        maxLeft: maxLeft,
        maxTop: maxTop,
        img_height: img_height
      }); // calc clone position

      this.calcPosition(frameWidth, frameHeight, originX, originY);
    }
  }, {
    key: "updateFrame",
    value: function updateFrame(newWidth, newHeight, newOriginX, newOriginY) {
      var _this2 = this;

      this.setState({
        frameWidth: newWidth,
        frameHeight: newHeight,
        originX: newOriginX,
        originY: newOriginY,
        originalFrameWidth: newWidth,
        originalFrameHeight: newHeight,
        originalOriginX: newOriginX,
        originalOriginY: newOriginY
      }, function () {
        _this2.initStyles();
      });
    }
  }, {
    key: "calcPosition",
    value: function calcPosition(width, height, left, top, move) {
      var _this$state2 = this.state,
          img_width = _this$state2.img_width,
          img_height = _this$state2.img_height,
          fixedRatio = _this$state2.fixedRatio;
      var rate = this.props.rate;
      if (width < 0 || height < 0) return false;

      if (fixedRatio) {
        if (width / img_width > height / img_height) {
          if (width > img_width) {
            width = img_width;
            left = 0;

            if (fixedRatio) {
              height = width / rate;
            }
          }
        } else {
          if (height > img_height) {
            height = img_height;
            top = 0;

            if (fixedRatio) {
              width = height * rate;
            }
          }
        }
      }

      if (width + left > img_width) {
        if (fixedRatio) {
          left = img_width - width;
        } else {
          width = width - (width + left - img_width);
        }
      }

      if (height + top > img_height) {
        if (fixedRatio) {
          top = img_height - height;
        } else {
          height = height - (height + top - img_height);
        }
      }

      if (left < 0) {
        if (!fixedRatio && !move) {
          width = width + left;
        }

        left = 0;
      }

      if (top < 0) {
        if (!fixedRatio && !move) {
          height = height + top;
        }

        top = 0;
      }

      if (width > img_width) {
        width = img_width;
      }

      if (height > img_height) {
        height = img_height;
      }

      this.setState({
        imgLeft: left,
        imgTop: top,
        imgWidth: width,
        imgHeight: height
      });
    }
  }, {
    key: "imgOnLoad",
    value: function imgOnLoad() {
      if (this.state.imageLoaded) {
        var imageLoaded = this.state.imageLoaded;
        this.setState({
          imgLoaded: true
        });
        imageLoaded();
      }
    }
  }, {
    key: "imgOnError",
    value: function imgOnError() {
      if (this.state.imageLoadError) {
        var imageLoadError = this.state.imageLoadError;
        this.setState({
          imgLoaded: false
        });
        imageLoadError({
          error: 'Error loading image'
        });
      }
    }
  }, {
    key: "imgGetSizeBeforeLoad",
    value: function imgGetSizeBeforeLoad() {
      var that = this;
      setTimeout(function () {
        var img = _reactDom.default.findDOMNode(that.refs.img);

        if (img && img.naturalWidth) {
          var beforeImageLoaded = that.state.beforeImageLoaded;
          var heightRatio = img.offsetWidth / img.naturalWidth;
          var widthRatio = img.offsetHeight / img.naturalHeight;
          var img_height = Number(img.naturalHeight * heightRatio);
          var img_width = Number(img.naturalWidth * widthRatio);
          var imgSize = that.props.imgSize;

          if (imgSize && imgSize.default_width && imgSize.default_height) {
            img_width = img.naturalWidth > img.naturalHeight ? imgSize.default_width : imgSize.default_width * img.naturalWidth / img.naturalHeight;
            img_height = img.naturalHeight > img.naturalWidth ? imgSize.default_height : imgSize.default_height * img.naturalHeight / img.naturalWidth;
          }

          that.setState({
            img_height: img_height,
            img_width: img_width,
            imgBeforeLoaded: true
          }, function () {
            return that.initStyles();
          });
          beforeImageLoaded();
        } else if (img) {
          that.imgGetSizeBeforeLoad();
        }
      }, 0);
    }
  }, {
    key: "createNewFrame",
    value: function createNewFrame(e) {
      if (this.state.dragging) {
        var pageX = e.pageX ? e.pageX : e.targetTouches[0].pageX;
        var pageY = e.pageY ? e.pageY : e.targetTouches[0].pageY;
        var rate = this.props.rate;
        var _this$state3 = this.state,
            frameWidth = _this$state3.frameWidth,
            frameHeight = _this$state3.frameHeight,
            startX = _this$state3.startX,
            startY = _this$state3.startY,
            offsetLeft = _this$state3.offsetLeft,
            offsetTop = _this$state3.offsetTop,
            fixedRatio = _this$state3.fixedRatio;

        var _x = pageX - startX;

        var _y = pageY - startY;

        if (_x > 0) {
          if (_y < 0) {
            return this.calcPosition(frameWidth + _x, fixedRatio ? (frameWidth + _x) / rate : frameHeight - _y, offsetLeft, fixedRatio ? offsetTop - _x / rate : offsetTop + _y);
          }

          return this.calcPosition(frameWidth + _x, fixedRatio ? (frameWidth + _x) / rate : frameHeight + _y, offsetLeft, offsetTop);
        }

        if (_y > 0) {
          return this.calcPosition(frameWidth - _x, fixedRatio ? (frameWidth - _x) / rate : frameHeight + _y, offsetLeft + _x, offsetTop);
        }

        return this.calcPosition(frameWidth - _x, fixedRatio ? (frameWidth - _x) / rate : frameHeight - _y, offsetLeft + _x, fixedRatio ? offsetTop + _x / rate : offsetTop + _y);
      }
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(e) {
      if (this.state.dragging) {
        e.preventDefault();
        var action = this.state.action;
        if (!action) return this.createNewFrame(e);
        if (action == 'move') return this.frameMove(e);
        this.frameDotMove(action, e);
      }
    }
  }, {
    key: "frameMove",
    value: function frameMove(e) {
      var _this$state4 = this.state,
          originX = _this$state4.originX,
          originY = _this$state4.originY,
          startX = _this$state4.startX,
          startY = _this$state4.startY,
          frameWidth = _this$state4.frameWidth,
          frameHeight = _this$state4.frameHeight,
          maxLeft = _this$state4.maxLeft,
          maxTop = _this$state4.maxTop;
      var pageX = e.pageX ? e.pageX : e.targetTouches[0].pageX;
      var pageY = e.pageY ? e.pageY : e.targetTouches[0].pageY;

      var _x = pageX - startX + originX;

      var _y = pageY - startY + originY;

      if (pageX < 0 || pageY < 0) return false;

      if (pageX - startX > 0 || pageY - startY) {
        this.setState({
          moved: true
        });
      }

      if (_x > maxLeft) _x = maxLeft;
      if (_y > maxTop) _y = maxTop;
      this.calcPosition(frameWidth, frameHeight, _x, _y, true);
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart(e) {
      var _this3 = this;

      var allowNewSelection = this.state.allowNewSelection;
      var action = e.target.getAttribute('data-action') ? e.target.getAttribute('data-action') : e.target.parentNode.getAttribute('data-action');
      var pageX = e.pageX ? e.pageX : e.targetTouches[0].pageX;
      var pageY = e.pageY ? e.pageY : e.targetTouches[0].pageY;

      if (action || allowNewSelection) {
        e.preventDefault();
        this.setState({
          startX: pageX,
          startY: pageY,
          dragging: true,
          action: action
        });
      }

      if (!action && allowNewSelection) {
        var container = _reactDom.default.findDOMNode(this.refs.container);

        var offsetLeft = container.offsetLeft,
            offsetTop = container.offsetTop;
        this.setState({
          offsetLeft: pageX - offsetLeft,
          offsetTop: pageY - offsetTop,
          frameWidth: 2,
          frameHeight: 2,
          moved: true
        }, function () {
          _this3.calcPosition(2, 2, pageX - offsetLeft, pageY - offsetTop);
        });
      }
    }
  }, {
    key: "handleDragStop",
    value: function handleDragStop(e) {
      if (this.state.dragging) {
        e.preventDefault();

        var frameNode = _reactDom.default.findDOMNode(this.refs.frameNode);

        var offsetLeft = frameNode.offsetLeft,
            offsetTop = frameNode.offsetTop,
            offsetWidth = frameNode.offsetWidth,
            offsetHeight = frameNode.offsetHeight;
        var _this$state5 = this.state,
            img_width = _this$state5.img_width,
            img_height = _this$state5.img_height,
            onDragStop = _this$state5.onDragStop;
        this.setState({
          originX: offsetLeft,
          originY: offsetTop,
          dragging: false,
          frameWidth: offsetWidth,
          frameHeight: offsetHeight,
          maxLeft: img_width - offsetWidth,
          maxTop: img_height - offsetHeight,
          action: null
        }, function () {
          onDragStop(this.values());
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mousemove', this.handleDrag.bind(this));
      document.addEventListener('touchmove', this.handleDrag.bind(this));
      document.addEventListener('mouseup', this.handleDragStop.bind(this));
      document.addEventListener('touchend', this.handleDragStop.bind(this));
      this.imgGetSizeBeforeLoad();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousemove', this.handleDrag.bind(this));
      document.removeEventListener('touchmove', this.handleDrag.bind(this));
      document.removeEventListener('mouseup', this.handleDragStop.bind(this));
      document.removeEventListener('touchend', this.handleDragStop.bind(this));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var width = this.props.width !== newProps.width;
      var height = this.props.height !== newProps.height;
      var originX = this.props.originX !== newProps.originX;
      var originY = this.props.originY !== newProps.originY;

      if (width || height || originX || originY) {
        this.updateFrame(newProps.width, newProps.height, newProps.originX, newProps.originY);
      }
    }
  }, {
    key: "frameDotMove",
    value: function frameDotMove(dir, e) {
      var pageX = e.pageX ? e.pageX : e.targetTouches[0].pageX;
      var pageY = e.pageY ? e.pageY : e.targetTouches[0].pageY;
      var rate = this.props.rate;
      var _this$state6 = this.state,
          startX = _this$state6.startX,
          startY = _this$state6.startY,
          originX = _this$state6.originX,
          originY = _this$state6.originY,
          frameWidth = _this$state6.frameWidth,
          frameHeight = _this$state6.frameHeight,
          fixedRatio = _this$state6.fixedRatio;

      if (pageY !== 0 && pageX !== 0) {
        var _x = pageX - startX;

        var _y = pageY - startY;

        if (pageX - startX > 0 || pageY - startY) {
          this.setState({
            moved: true
          });
        }

        var new_width = frameWidth + _x;
        var new_height = fixedRatio ? new_width : frameHeight + _y;

        switch (dir) {
          case 'ne':
            new_height = frameHeight - _y;
            return this.calcPosition(new_width, fixedRatio ? new_width / rate : new_height, originX, fixedRatio ? originY - _x / rate : originY + _y);

          case 'e':
            return this.calcPosition(new_width, fixedRatio ? new_width / rate : frameHeight, originX, fixedRatio ? originY - _x / rate * 0.5 : originY);

          case 'se':
            return this.calcPosition(new_width, fixedRatio ? new_width / rate : new_height, originX, originY);

          case 'n':
            new_height = frameHeight - _y;
            return this.calcPosition(fixedRatio ? new_height * rate : frameWidth, new_height, fixedRatio ? originX + _y * rate * 0.5 : originX, originY + _y);

          case 'nw':
            new_width = frameWidth - _x;
            new_height = frameHeight - _y;
            return this.calcPosition(new_width, fixedRatio ? new_width / rate : new_height, originX + _x, fixedRatio ? originY + _x / rate : originY + _y);

          case 'w':
            new_width = frameWidth - _x;
            return this.calcPosition(new_width, fixedRatio ? new_width / rate : frameHeight, originX + _x, fixedRatio ? originY + _x / rate * 0.5 : originY);

          case 'sw':
            new_width = frameWidth - _x;
            return this.calcPosition(new_width, fixedRatio ? new_width / rate : new_height, originX + _x, originY);

          case 's':
            new_height = frameHeight + _y;
            return this.calcPosition(fixedRatio ? new_height * rate : frameWidth, new_height, fixedRatio ? originX - _y * rate * 0.5 : originX, originY);

          default:
        }
      }
    }
  }, {
    key: "crop",
    value: function crop() {
      var _this$state7 = this.state,
          frameWidth = _this$state7.frameWidth,
          frameHeight = _this$state7.frameHeight,
          originX = _this$state7.originX,
          originY = _this$state7.originY,
          img_width = _this$state7.img_width;
      var canvas = document.createElement('canvas');

      var img = _reactDom.default.findDOMNode(this.refs.img);

      var _rate = img.naturalWidth / img_width;

      var realWidth = frameWidth * _rate;
      var realHeight = frameHeight * _rate;
      canvas.width = realWidth;
      canvas.height = realHeight;
      canvas.getContext('2d').drawImage(img, originX * _rate, originY * _rate, realWidth, realHeight, 0, 0, realWidth, realHeight);
      return canvas.toDataURL();
    }
  }, {
    key: "values",
    value: function values() {
      var _this$state8 = this.state,
          frameWidth = _this$state8.frameWidth,
          frameHeight = _this$state8.frameHeight,
          originX = _this$state8.originX,
          originY = _this$state8.originY,
          img_width = _this$state8.img_width,
          img_height = _this$state8.img_height,
          selectionNatural = _this$state8.selectionNatural,
          moved = _this$state8.moved,
          originalOriginX = _this$state8.originalOriginX,
          originalOriginY = _this$state8.originalOriginY,
          originalFrameWidth = _this$state8.originalFrameWidth,
          originalFrameHeight = _this$state8.originalFrameHeight;

      var img = _reactDom.default.findDOMNode(this.refs.img);

      var _return = null;
      var thisOriginX = moved ? originX : originalOriginX;
      var thisOriginY = moved ? originY : originalOriginY;
      var thisFrameWidth = moved ? frameWidth : originalFrameWidth;
      var thisFrameHeight = moved ? frameHeight : originalFrameHeight;

      if (selectionNatural && moved) {
        var _rateWidth = img.naturalWidth / img_width;

        var _rateHeight = img.naturalHeight / img_height;

        var realWidth = Number(thisFrameWidth * _rateWidth);
        var realHeight = Number(thisFrameHeight * _rateHeight);
        var realX = Number(thisOriginX * _rateHeight);
        var realY = Number(thisOriginY * _rateWidth);
        _return = {
          width: realWidth,
          height: realHeight,
          x: realX,
          y: realY
        };
      } else {
        _return = {
          width: thisFrameWidth,
          height: thisFrameHeight,
          x: thisOriginX,
          y: thisOriginY
        };
      }

      return _return;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state9 = this.state,
          dragging = _this$state9.dragging,
          img_height = _this$state9.img_height,
          img_width = _this$state9.img_width,
          imgBeforeLoaded = _this$state9.imgBeforeLoaded;
      var _this$props3 = this.props,
          src = _this$props3.src,
          disabled = _this$props3.disabled;

      var imageNode = _react.default.createElement("div", {
        style: this.state.styles.source,
        ref: "sourceNode",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 591
        },
        __self: this
      }, _react.default.createElement("img", {
        crossOrigin: "anonymous",
        src: src,
        style: (0, _deepExtend.default)({}, this.state.styles.img, this.state.styles.source_img),
        ref: "img",
        onLoad: this.imgOnLoad,
        onError: this.imgOnError,
        width: img_width,
        height: img_height,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 592
        },
        __self: this
      }));

      var disabledStyle = disabled ? {
        display: 'none',
        cursor: 'initial'
      } : {};
      return _react.default.createElement("div", {
        ref: "container",
        onMouseDown: disabled ? undefined : this.handleDragStart,
        onTouchStart: disabled ? undefined : this.handleDragStart,
        style: (0, _deepExtend.default)({}, this.state.styles.container, {
          position: 'relative',
          height: img_height
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 612
        },
        __self: this
      }, imageNode, imgBeforeLoaded ? _react.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 623
        },
        __self: this
      }, _react.default.createElement("div", {
        style: this.state.styles.modal,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 624
        },
        __self: this
      }), _react.default.createElement("div", {
        style: (0, _deepExtend.default)({}, this.state.styles.frame, dragging ? this.state.styles.dragging_frame : {}, {
          display: 'block',
          left: this.state.imgLeft,
          top: this.state.imgTop,
          width: this.state.imgWidth,
          height: this.state.imgHeight
        }),
        ref: "frameNode",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 625
        },
        __self: this
      }, _react.default.createElement("div", {
        style: this.state.styles.clone,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 640
        },
        __self: this
      }, _react.default.createElement("img", {
        ref: "cloneImg",
        width: img_width,
        height: img_height,
        crossOrigin: "anonymous",
        src: src,
        style: (0, _deepExtend.default)({}, this.state.styles.img, {
          marginLeft: -this.state.imgLeft,
          marginTop: -this.state.imgTop
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 641
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.move, disabled ? {
          cursor: 'initial'
        } : {}),
        "data-action": "move",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 653
        },
        __self: this
      }), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotCenter, disabledStyle),
        "data-action": "move",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 661
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerCenterVertical),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 670
        },
        __self: this
      }), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerCenterHorizontal),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 677
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotNE),
        "data-action": "ne",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 685
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerNE, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 693
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotN),
        "data-action": "n",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 702
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerN, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 710
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotNW),
        "data-action": "nw",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 719
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerNW, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 727
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotE),
        "data-action": "e",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 736
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerE, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 744
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotW),
        "data-action": "w",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 753
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerW, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 761
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotSE),
        "data-action": "se",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 770
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerSE, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 778
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotS),
        "data-action": "s",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 787
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerS, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 795
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dot, this.state.styles.dotSW),
        "data-action": "sw",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 804
        },
        __self: this
      }, _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.dotInner, this.state.styles.dotInnerSW, disabledStyle),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 812
        },
        __self: this
      })), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.line, this.state.styles.lineN, disabledStyle),
        "data-action": "n",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 821
        },
        __self: this
      }), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.line, this.state.styles.lineS, disabledStyle),
        "data-action": "s",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 830
        },
        __self: this
      }), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.line, this.state.styles.lineW, disabledStyle),
        "data-action": "w",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 839
        },
        __self: this
      }), _react.default.createElement("span", {
        style: (0, _deepExtend.default)({}, this.state.styles.line, this.state.styles.lineE, disabledStyle),
        "data-action": "e",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 848
        },
        __self: this
      }))) : null);
    }
  }]);

  return Cropper;
}(_react.default.Component);

Cropper.propTypes = {
  src: _propTypes.default.string.isRequired,
  originX: _propTypes.default.number,
  originY: _propTypes.default.number,
  rate: _propTypes.default.number,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  imgSize: _propTypes.default.object,
  selectionNatural: _propTypes.default.bool,
  fixedRatio: _propTypes.default.bool,
  allowNewSelection: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  styles: _propTypes.default.object,
  imageLoaded: _propTypes.default.func,
  beforeImageLoaded: _propTypes.default.func,
  imageLoadError: _propTypes.default.func,
  onDragStop: _propTypes.default.func
};
Cropper.defaultProps = {
  width: 200,
  height: 200,
  selectionNatural: false,
  fixedRatio: true,
  allowNewSelection: true,
  rate: 1,
  originX: 0,
  originY: 0,
  styles: {},
  imageLoaded: function imageLoaded() {},
  beforeImageLoaded: function beforeImageLoaded() {},
  imageLoadError: function imageLoadError() {},
  onDragStop: function onDragStop() {}
};
var defaultStyles = {
  container: {},
  img: {
    userDrag: 'none',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    WebkitTransform: 'translateZ(0)',
    WebkitPerspective: 1000,
    WebkitBackfaceVisibility: 'hidden'
  },
  clone: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0
  },
  frame: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    display: 'none'
  },
  dragging_frame: {
    opacity: 0.8
  },
  source: {
    overflow: 'hidden'
  },
  source_img: {
    float: 'left'
  },
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.4,
    backgroundColor: '#222'
  },
  modal_disabled: {
    opacity: 0
  },
  move: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    cursor: 'move',
    outline: '1px dashed #88f',
    backgroundColor: 'transparent'
  },
  dot: {
    zIndex: 10
  },
  dotN: {
    cursor: 'n-resize'
  },
  dotS: {
    cursor: 's-resize'
  },
  dotE: {
    cursor: 'e-resize'
  },
  dotW: {
    cursor: 'w-resize'
  },
  dotNW: {
    cursor: 'nw-resize'
  },
  dotNE: {
    cursor: 'ne-resize'
  },
  dotSW: {
    cursor: 'sw-resize'
  },
  dotSE: {
    cursor: 'se-resize'
  },
  dotCenter: {
    backgroundColor: 'transparent',
    cursor: 'move'
  },
  dotInner: {
    border: '1px solid #88f',
    background: '#fff',
    display: 'block',
    width: 6,
    height: 6,
    padding: 0,
    margin: 0,
    position: 'absolute'
  },
  dotInnerN: {
    top: -4,
    left: '50%',
    marginLeft: -4
  },
  dotInnerS: {
    bottom: -4,
    left: '50%',
    marginLeft: -4
  },
  dotInnerE: {
    right: -4,
    top: '50%',
    marginTop: -4
  },
  dotInnerW: {
    left: -4,
    top: '50%',
    marginTop: -4
  },
  dotInnerNE: {
    top: -4,
    right: -4
  },
  dotInnerSE: {
    bottom: -4,
    right: -4
  },
  dotInnerNW: {
    top: -4,
    left: -4
  },
  dotInnerSW: {
    bottom: -4,
    left: -4
  },
  dotInnerCenterVertical: {
    position: 'absolute',
    border: 'none',
    width: 2,
    height: 8,
    backgroundColor: '#88f',
    top: '50%',
    left: '50%',
    marginLeft: -1,
    marginTop: -4
  },
  dotInnerCenterHorizontal: {
    position: 'absolute',
    border: 'none',
    width: 8,
    height: 2,
    backgroundColor: '#88f',
    top: '50%',
    left: '50%',
    marginLeft: -4,
    marginTop: -1
  },
  fixedRatio: true,
  line: {
    position: 'absolute',
    display: 'block',
    zIndex: 100
  },
  lineS: {
    cursor: 's-resize',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 4,
    background: 'transparent'
  },
  lineN: {
    cursor: 'n-resize',
    top: 0,
    left: 0,
    width: '100%',
    height: 4,
    background: 'transparent'
  },
  lineE: {
    cursor: 'e-resize',
    right: 0,
    top: 0,
    width: 4,
    height: '100%',
    background: 'transparent'
  },
  lineW: {
    cursor: 'w-resize',
    left: 0,
    top: 0,
    width: 4,
    height: '100%',
    background: 'transparent'
  }
};
var _default = Cropper;
exports.default = _default;