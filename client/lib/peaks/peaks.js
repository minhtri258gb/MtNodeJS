(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.peaks = factory());
})(this, (function () { 'use strict';

  var eventemitter3 = {exports: {}};

  (function (module) {

    var has = Object.prototype.hasOwnProperty,
        prefix = '~';
    /**
     * Constructor to create a storage for our `EE` objects.
     * An `Events` instance is a plain object whose properties are event names.
     *
     * @constructor
     * @private
     */

    function Events() {} //
    // We try to not inherit from `Object.prototype`. In some engines creating an
    // instance in this way is faster than calling `Object.create(null)` directly.
    // If `Object.create(null)` is not supported we prefix the event names with a
    // character to make sure that the built-in object properties are not
    // overridden or used as an attack vector.
    //


    if (Object.create) {
      Events.prototype = Object.create(null); //
      // This hack is needed because the `__proto__` property is still inherited in
      // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
      //

      if (!new Events().__proto__) prefix = false;
    }
    /**
     * Representation of a single event listener.
     *
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
     * @constructor
     * @private
     */


    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    /**
     * Add a listener for a given event.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} once Specify if the listener is a one-time listener.
     * @returns {EventEmitter}
     * @private
     */


    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
      }

      var listener = new EE(fn, context || emitter, once),
          evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    /**
     * Clear event by name.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} evt The Event name.
     * @private
     */


    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
    }
    /**
     * Minimal `EventEmitter` interface that is molded against the Node.js
     * `EventEmitter` interface.
     *
     * @constructor
     * @public
     */


    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     *
     * @returns {Array}
     * @public
     */


    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [],
          events,
          name;
      if (this._eventsCount === 0) return names;

      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }

      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }

      return names;
    };
    /**
     * Return the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Array} The registered listeners.
     * @public
     */


    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event,
          handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];

      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }

      return ee;
    };
    /**
     * Return the number of listeners listening to a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Number} The number of listeners.
     * @public
     */


    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event,
          listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @public
     */


    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt],
          len = arguments.length,
          args,
          i;

      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;

          case 2:
            return listeners.fn.call(listeners.context, a1), true;

          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;

          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;

          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }

        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }

        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length,
            j;

        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;

            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;

            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;

            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;

            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }

      return true;
    };
    /**
     * Add a listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */


    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    /**
     * Add a one-time listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */


    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    /**
     * Remove the listeners of a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn Only remove the listeners that match this function.
     * @param {*} context Only remove the listeners that have this context.
     * @param {Boolean} once Only remove one-time listeners.
     * @returns {EventEmitter} `this`.
     * @public
     */


    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;

      if (!fn) {
        clearEvent(this, evt);
        return this;
      }

      var listeners = this._events[evt];

      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        } //
        // Reset the array, or remove it completely if we have no more listeners.
        //


        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
      }

      return this;
    };
    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {(String|Symbol)} [event] The event name.
     * @returns {EventEmitter} `this`.
     * @public
     */


    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;

      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }

      return this;
    }; //
    // Alias methods names because people roll like that.
    //


    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
    // Expose the prefix.
    //

    EventEmitter.prefixed = prefix; //
    // Allow `EventEmitter` to be imported as module namespace.
    //

    EventEmitter.EventEmitter = EventEmitter; //
    // Expose the module.
    //

    {
      module.exports = EventEmitter;
    }
  })(eventemitter3);

  var EventEmitter = eventemitter3.exports;

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * @file
   *
   * Defines the {@link Cue} class.
   *
   * @module cue
   */

  /**
   * A cue represents an event to be triggered at some point on the media
   * timeline.
   *
   * @class
   * @alias Cue
   *
   * @param {Number} time Cue time, in seconds.
   * @param {Number} type Cue mark type, either <code>Cue.POINT</code>,
   *   <code>Cue.SEGMENT_START</code>, or <code>Cue.SEGMENT_END</code>.
   * @param {String} id The id of the {@link Point} or {@link Segment}.
   */
  function Cue(time, type, id) {
    this.time = time;
    this.type = type;
    this.id = id;
  }
  /**
    * @constant
    * @type {Number}
    */


  Cue.POINT = 0;
  Cue.SEGMENT_START = 1;
  Cue.SEGMENT_END = 2;
  /**
   * Callback function for use with Array.prototype.sort().
   *
   * @static
   * @param {Cue} a
   * @param {Cue} b
   * @return {Number}
   */

  Cue.sorter = function (a, b) {
    return a.time - b.time;
  };

  function zeroPad(number, precision) {
    number = number.toString();

    while (number.length < precision) {
      number = '0' + number;
    }

    return number;
  }
  /**
   * Returns a formatted time string.
   *
   * @param {Number} time The time to be formatted, in seconds.
   * @param {Number} precision Decimal places to which time is displayed
   * @returns {String}
   */


  function formatTime(time, precision) {
    var result = [];
    var fractionSeconds = Math.floor(time % 1 * Math.pow(10, precision));
    var seconds = Math.floor(time);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    if (hours > 0) {
      result.push(hours); // Hours
    }

    result.push(minutes % 60); // Mins

    result.push(seconds % 60); // Seconds

    for (var i = 0; i < result.length; i++) {
      result[i] = zeroPad(result[i], 2);
    }

    result = result.join(':');

    if (precision > 0) {
      result += '.' + zeroPad(fractionSeconds, precision);
    }

    return result;
  }
  /**
   * Rounds the given value up to the nearest given multiple.
   *
   * @param {Number} value
   * @param {Number} multiple
   * @returns {Number}
   *
   * @example
   * roundUpToNearest(5.5, 3); // returns 6
   * roundUpToNearest(141.0, 10); // returns 150
   * roundUpToNearest(-5.5, 3); // returns -6
   */

  function roundUpToNearest(value, multiple) {
    if (multiple === 0) {
      return 0;
    }

    var multiplier = 1;

    if (value < 0.0) {
      multiplier = -1;
      value = -value;
    }

    var roundedUp = Math.ceil(value);
    return multiplier * ((roundedUp + multiple - 1) / multiple | 0) * multiple;
  }
  function clamp(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }
  function objectHasProperty(object, field) {
    return Object.prototype.hasOwnProperty.call(object, field);
  }
  function extend(to, from) {
    for (var key in from) {
      if (objectHasProperty(from, key)) {
        to[key] = from[key];
      }
    }

    return to;
  }
  /**
   * Checks whether the given array contains values in ascending order.
   *
   * @param {Array<Number>} array The array to test
   * @returns {Boolean}
   */

  function isInAscendingOrder(array) {
    if (array.length === 0) {
      return true;
    }

    var value = array[0];

    for (var i = 1; i < array.length; i++) {
      if (value >= array[i]) {
        return false;
      }

      value = array[i];
    }

    return true;
  }
  /**
   * Checks whether the given value is a number.
   *
   * @param {Number} value The value to test
   * @returns {Boolean}
   */

  function isNumber(value) {
    return typeof value === 'number';
  }
  /**
   * Checks whether the given value is a finite number.
   *
   * @param {Number} value The value to test
   * @returns {Boolean}
   */

  function isFinite$1(value) {
    if (typeof value !== 'number') {
      return false;
    } // Check for NaN and infinity
    // eslint-disable-next-line no-self-compare


    if (value !== value || value === Infinity || value === -Infinity) {
      return false;
    }

    return true;
  }
  /**
   * Checks whether the given value is a valid timestamp.
   *
   * @param {Number} value The value to test
   * @returns {Boolean}
   */

  function isValidTime(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }
  /**
   * Checks whether the given value is a valid object.
   *
   * @param {Object|Array} value The value to test
   * @returns {Boolean}
   */

  function isObject(value) {
    return value !== null && _typeof$1(value) === 'object' && !Array.isArray(value);
  }
  /**
   * Checks whether the given value is a valid string.
   *
   * @param {String} value The value to test
   * @returns {Boolean}
   */

  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * Checks whether the given value is a valid ArrayBuffer.
   *
   * @param {ArrayBuffer} value The value to test
   * @returns {Boolean}
   */

  function isArrayBuffer(value) {
    return Object.prototype.toString.call(value).includes('ArrayBuffer');
  }
  /**
   * Checks whether the given value is null or undefined.
   *
   * @param {Object} value The value to test
   * @returns {Boolean}
   */

  function isNullOrUndefined(value) {
    return value === undefined || value === null;
  }
  /**
   * Checks whether the given value is a function.
   *
   * @param {Function} value The value to test
   * @returns {Boolean}
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Checks whether the given value is a boolean.
   *
   * @param {Function} value The value to test
   * @returns {Boolean}
   */

  function isBoolean(value) {
    return value === true || value === false;
  }
  /**
   * Checks whether the given value is a valid HTML element.
   *
   * @param {HTMLElement} value The value to test
   * @returns {Boolean}
   */

  function isHTMLElement(value) {
    return value instanceof HTMLElement;
  }
  /**
   * Checks whether the given value is an array
   * @param {Function} value The value to test
   * @returns {Boolean}
   */

  function isArray(value) {
    return Array.isArray(value);
  }
  /**
   * Checks whether the given value is a valid linear gradient color
   * @param {Function} value The value to test
   * @returns {Boolean}
   */

  function isLinearGradientColor(value) {
    return isObject(value) && objectHasProperty(value, 'linearGradientStart') && objectHasProperty(value, 'linearGradientEnd') && objectHasProperty(value, 'linearGradientColorStops') && isNumber(value.linearGradientStart) && isNumber(value.linearGradientEnd) && isArray(value.linearGradientColorStops) && value.linearGradientColorStops.length === 2;
  }

  var isHeadless = /HeadlessChrome/.test(navigator.userAgent);

  function windowIsVisible() {
    if (isHeadless || navigator.webdriver) {
      return false;
    }

    return (typeof document === "undefined" ? "undefined" : _typeof$1(document)) === 'object' && 'visibilityState' in document && document.visibilityState === 'visible';
  }

  var requestAnimationFrame$1 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
  var eventTypes = {
    forward: {},
    reverse: {}
  };
  var EVENT_TYPE_POINT = 0;
  var EVENT_TYPE_SEGMENT_ENTER = 1;
  var EVENT_TYPE_SEGMENT_EXIT = 2;
  eventTypes.forward[Cue.POINT] = EVENT_TYPE_POINT;
  eventTypes.forward[Cue.SEGMENT_START] = EVENT_TYPE_SEGMENT_ENTER;
  eventTypes.forward[Cue.SEGMENT_END] = EVENT_TYPE_SEGMENT_EXIT;
  eventTypes.reverse[Cue.POINT] = EVENT_TYPE_POINT;
  eventTypes.reverse[Cue.SEGMENT_START] = EVENT_TYPE_SEGMENT_EXIT;
  eventTypes.reverse[Cue.SEGMENT_END] = EVENT_TYPE_SEGMENT_ENTER;
  var eventNames = {};
  eventNames[EVENT_TYPE_POINT] = 'points.enter';
  eventNames[EVENT_TYPE_SEGMENT_ENTER] = 'segments.enter';
  eventNames[EVENT_TYPE_SEGMENT_EXIT] = 'segments.exit';
  /**
   * Given a cue instance, returns the corresponding {@link Point}
   * {@link Segment}.
   *
   * @param {Peaks} peaks
   * @param {Cue} cue
   * @return {Point|Segment}
   * @throws {Error}
   */

  function getPointOrSegment(peaks, cue) {
    switch (cue.type) {
      case Cue.POINT:
        return peaks.points.getPoint(cue.id);

      case Cue.SEGMENT_START:
      case Cue.SEGMENT_END:
        return peaks.segments.getSegment(cue.id);

      default:
        throw new Error('getPointOrSegment: id not found?');
    }
  }
  /**
   * CueEmitter is responsible for emitting <code>points.enter</code>,
   * <code>segments.enter</code>, and <code>segments.exit</code> events.
   *
   * @class
   * @alias CueEmitter
   *
   * @param {Peaks} peaks Parent {@link Peaks} instance.
   */


  function CueEmitter(peaks) {
    this._cues = [];
    this._peaks = peaks;
    this._previousTime = -1;
    this._updateCues = this._updateCues.bind(this); // Event handlers:

    this._onPlaying = this.onPlaying.bind(this);
    this._onSeeked = this.onSeeked.bind(this);
    this._onTimeUpdate = this.onTimeUpdate.bind(this);
    this._onAnimationFrame = this.onAnimationFrame.bind(this);
    this._rAFHandle = null;
    this._activeSegments = {};

    this._attachEventHandlers();
  }
  /**
   * This function is bound to all {@link Peaks} events relating to mutated
   * [Points]{@link Point} or [Segments]{@link Segment}, and updates the
   * list of cues accordingly.
   *
   * @private
   */


  CueEmitter.prototype._updateCues = function () {
    var self = this;

    var points = self._peaks.points.getPoints();

    var segments = self._peaks.segments.getSegments();

    self._cues.length = 0;
    points.forEach(function (point) {
      self._cues.push(new Cue(point.time, Cue.POINT, point.id));
    });
    segments.forEach(function (segment) {
      self._cues.push(new Cue(segment.startTime, Cue.SEGMENT_START, segment.id));

      self._cues.push(new Cue(segment.endTime, Cue.SEGMENT_END, segment.id));
    });

    self._cues.sort(Cue.sorter);

    var time = self._peaks.player.getCurrentTime();

    self._updateActiveSegments(time);
  };
  /**
   * Emits events for any cues passed through during media playback.
   *
   * @param {Number} time The current time on the media timeline.
   * @param {Number} previousTime The previous time on the media timeline when
   *   this function was called.
   */


  CueEmitter.prototype._onUpdate = function (time, previousTime) {
    var isForward = time > previousTime;
    var start;
    var end;
    var step;

    if (isForward) {
      start = 0;
      end = this._cues.length;
      step = 1;
    } else {
      start = this._cues.length - 1;
      end = -1;
      step = -1;
    } // Cues are sorted


    for (var i = start; isForward ? i < end : i > end; i += step) {
      var cue = this._cues[i];

      if (isForward ? cue.time > previousTime : cue.time < previousTime) {
        if (isForward ? cue.time > time : cue.time < time) {
          break;
        } // Cue falls between time and previousTime


        var marker = getPointOrSegment(this._peaks, cue);
        var eventType = isForward ? eventTypes.forward[cue.type] : eventTypes.reverse[cue.type];

        if (eventType === EVENT_TYPE_SEGMENT_ENTER) {
          this._activeSegments[marker.id] = marker;
        } else if (eventType === EVENT_TYPE_SEGMENT_EXIT) {
          delete this._activeSegments[marker.id];
        }

        this._peaks.emit(eventNames[eventType], marker);
      }
    }
  }; // the next handler and onAnimationFrame are bound together
  // when the window isn't in focus, rAF is throttled
  // falling back to timeUpdate


  CueEmitter.prototype.onTimeUpdate = function (time) {
    if (windowIsVisible()) {
      return;
    }

    if (this._peaks.player.isPlaying() && !this._peaks.player.isSeeking()) {
      this._onUpdate(time, this._previousTime);
    }

    this._previousTime = time;
  };

  CueEmitter.prototype.onAnimationFrame = function () {
    var time = this._peaks.player.getCurrentTime();

    if (!this._peaks.player.isSeeking()) {
      this._onUpdate(time, this._previousTime);
    }

    this._previousTime = time;

    if (this._peaks.player.isPlaying()) {
      this._rAFHandle = requestAnimationFrame$1(this._onAnimationFrame);
    }
  };

  CueEmitter.prototype.onPlaying = function () {
    this._previousTime = this._peaks.player.getCurrentTime();
    this._rAFHandle = requestAnimationFrame$1(this._onAnimationFrame);
  };

  CueEmitter.prototype.onSeeked = function (time) {
    this._previousTime = time;

    this._updateActiveSegments(time);
  };

  function getSegmentIdComparator(id) {
    return function compareSegmentIds(segment) {
      return segment.id === id;
    };
  }
  /**
   * The active segments is the set of all segments which overlap the current
   * playhead position. This function updates that set and emits
   * <code>segments.enter</code> and <code>segments.exit</code> events.
   */


  CueEmitter.prototype._updateActiveSegments = function (time) {
    var self = this;

    var activeSegments = self._peaks.segments.getSegmentsAtTime(time); // Remove any segments no longer active.


    for (var id in self._activeSegments) {
      if (objectHasProperty(self._activeSegments, id)) {
        var segment = activeSegments.find(getSegmentIdComparator(id));

        if (!segment) {
          self._peaks.emit('segments.exit', self._activeSegments[id]);

          delete self._activeSegments[id];
        }
      }
    } // Add new active segments.


    activeSegments.forEach(function (segment) {
      if (!(segment.id in self._activeSegments)) {
        self._activeSegments[segment.id] = segment;

        self._peaks.emit('segments.enter', segment);
      }
    });
  };

  var triggerUpdateOn = Array('points.update', 'points.dragmove', 'points.add', 'points.remove', 'points.remove_all', 'segments.update', 'segments.dragged', 'segments.add', 'segments.remove', 'segments.remove_all');

  CueEmitter.prototype._attachEventHandlers = function () {
    this._peaks.on('player.timeupdate', this._onTimeUpdate);

    this._peaks.on('player.playing', this._onPlaying);

    this._peaks.on('player.seeked', this._onSeeked);

    for (var i = 0; i < triggerUpdateOn.length; i++) {
      this._peaks.on(triggerUpdateOn[i], this._updateCues);
    }

    this._updateCues();
  };

  CueEmitter.prototype._detachEventHandlers = function () {
    this._peaks.off('player.timeupdate', this._onTimeUpdate);

    this._peaks.off('player.playing', this._onPlaying);

    this._peaks.off('player.seeked', this._onSeeked);

    for (var i = 0; i < triggerUpdateOn.length; i++) {
      this._peaks.off(triggerUpdateOn[i], this._updateCues);
    }
  };

  CueEmitter.prototype.destroy = function () {
    if (this._rAFHandle) {
      cancelAnimationFrame(this._rAFHandle);
      this._rAFHandle = null;
    }

    this._detachEventHandlers();

    this._previousTime = -1;
  };

  /**
   * @file
   *
   * Defines the {@link Point} class.
   *
   * @module point
   */
  var pointOptions = ['peaks', 'id', 'time', 'labelText', 'color', 'editable'];

  function validatePoint(options, context) {
    if (!isValidTime(options.time)) {
      // eslint-disable-next-line max-len
      throw new TypeError('peaks.points.' + context + ': time should be a numeric value');
    }

    if (options.time < 0) {
      // eslint-disable-next-line max-len
      throw new RangeError('peaks.points.' + context + ': time should not be negative');
    }

    if (isNullOrUndefined(options.labelText)) {
      // Set default label text
      options.labelText = '';
    } else if (!isString(options.labelText)) {
      throw new TypeError('peaks.points.' + context + ': labelText must be a string');
    }

    if (!isBoolean(options.editable)) {
      throw new TypeError('peaks.points.' + context + ': editable must be true or false');
    }

    if (options.color && !isString(options.color) && !isLinearGradientColor(options.color)) {
      // eslint-disable-next-line max-len
      throw new TypeError('peaks.points.' + context + ': color must be a string or a valid linear gradient object');
    }
  }
  /**
   * A point is a single instant of time, with associated label and color.
   *
   * @class
   * @alias Point
   *
   * @param {Peaks} peaks A reference to the Peaks instance.
   * @param {String} id A unique identifier for the point.
   * @param {Number} time Point time, in seconds.
   * @param {String} labelText Point label text.
   * @param {String} color Point marker color.
   * @param {Boolean} editable If <code>true</code> the segment start and
   *   end times can be adjusted via the user interface.
   * @param {*} data Optional application specific data.
   */


  function Point(options) {
    validatePoint(options, 'add()');
    this._peaks = options.peaks;
    this._id = options.id;
    this._time = options.time;
    this._labelText = options.labelText;
    this._color = options.color;
    this._editable = options.editable;

    this._setUserData(options);
  }

  Point.prototype._setUserData = function (options) {
    for (var key in options) {
      if (objectHasProperty(options, key) && pointOptions.indexOf(key) === -1) {
        this[key] = options[key];
      }
    }
  };

  Object.defineProperties(Point.prototype, {
    id: {
      enumerable: true,
      get: function get() {
        return this._id;
      }
    },
    time: {
      enumerable: true,
      get: function get() {
        return this._time;
      }
    },
    labelText: {
      get: function get() {
        return this._labelText;
      }
    },
    color: {
      enumerable: true,
      get: function get() {
        return this._color;
      }
    },
    editable: {
      enumerable: true,
      get: function get() {
        return this._editable;
      }
    }
  });

  Point.prototype.update = function (options) {
    var opts = {
      time: this.time,
      labelText: this.labelText,
      color: this.color,
      editable: this.editable
    };
    extend(opts, options);
    validatePoint(opts, 'update()');
    this._time = opts.time;
    this._labelText = opts.labelText;
    this._color = opts.color;
    this._editable = opts.editable;

    this._setUserData(options);

    this._peaks.emit('points.update', this);
  };
  /**
   * Returns <code>true</code> if the point lies with in a given time range.
   *
   * @param {Number} startTime The start of the time region, in seconds.
   * @param {Number} endTime The end of the time region, in seconds.
   * @returns {Boolean}
   */


  Point.prototype.isVisible = function (startTime, endTime) {
    return this.time >= startTime && this.time < endTime;
  };

  Point.prototype._setTime = function (time) {
    this._time = time;
  };

  /**
   * @file
   *
   * Defines the {@link WaveformPoints} class.
   *
   * @module waveform-points
   */
  /**
   * Point parameters.
   *
   * @typedef {Object} PointOptions
   * @global
   * @property {Number} point Point time, in seconds.
   * @property {Boolean=} editable If <code>true</code> the point time can be
   *   adjusted via the user interface.
   *   Default: <code>false</code>.
   * @property {String=} color Point marker color.
   *   Default: a random color.
   * @property {String=} labelText Point label text.
   *   Default: an empty string.
   * @property {String=} id A unique point identifier.
   *   Default: an automatically generated identifier.
   */

  /**
   * Handles all functionality related to the adding, removing and manipulation
   * of points. A point is a single instant of time.
   *
   * @class
   * @alias WaveformPoints
   *
   * @param {Peaks} peaks The parent Peaks object.
   */

  function WaveformPoints(peaks) {
    this._peaks = peaks;
    this._points = [];
    this._pointsById = {};
    this._pointIdCounter = 0;
  }
  /**
   * Returns a new unique point id value.
   *
   * @returns {String}
   */


  WaveformPoints.prototype._getNextPointId = function () {
    return 'peaks.point.' + this._pointIdCounter++;
  };
  /**
   * Adds a new point object.
   *
   * @private
   * @param {Point} point
   */


  WaveformPoints.prototype._addPoint = function (point) {
    this._points.push(point);

    this._pointsById[point.id] = point;
  };
  /**
   * Creates a new point object.
   *
   * @private
   * @param {PointOptions} options
   * @returns {Point}
   */


  WaveformPoints.prototype._createPoint = function (options) {
    var pointOptions = {
      peaks: this._peaks
    };
    extend(pointOptions, options);

    if (isNullOrUndefined(pointOptions.id)) {
      pointOptions.id = this._getNextPointId();
    }

    if (isNullOrUndefined(pointOptions.labelText)) {
      pointOptions.labelText = '';
    }

    if (isNullOrUndefined(pointOptions.editable)) {
      pointOptions.editable = false;
    }

    return new Point(pointOptions);
  };
  /**
   * Returns all points.
   *
   * @returns {Array<Point>}
   */


  WaveformPoints.prototype.getPoints = function () {
    return this._points;
  };
  /**
   * Returns the point with the given id, or <code>null</code> if not found.
   *
   * @param {String} id
   * @returns {Point|null}
   */


  WaveformPoints.prototype.getPoint = function (id) {
    return this._pointsById[id] || null;
  };
  /**
   * Returns all points within a given time region.
   *
   * @param {Number} startTime The start of the time region, in seconds.
   * @param {Number} endTime The end of the time region, in seconds.
   * @returns {Array<Point>}
   */


  WaveformPoints.prototype.find = function (startTime, endTime) {
    return this._points.filter(function (point) {
      return point.isVisible(startTime, endTime);
    });
  };
  /**
   * Adds one or more points to the timeline.
   *
   * @param {PointOptions|Array<PointOptions>} pointOrPoints
   *
   * @returns Point|Array<Point>
   */


  WaveformPoints.prototype.add = function
    /* pointOrPoints */
  () {
    var self = this;
    var arrayArgs = Array.isArray(arguments[0]);
    var points = arrayArgs ? arguments[0] : Array.prototype.slice.call(arguments);
    points = points.map(function (pointOptions) {
      var point = self._createPoint(pointOptions);

      if (objectHasProperty(self._pointsById, point.id)) {
        throw new Error('peaks.points.add(): duplicate id');
      }

      return point;
    });
    points.forEach(function (point) {
      self._addPoint(point);
    });

    this._peaks.emit('points.add', points);

    return arrayArgs ? points : points[0];
  };
  /**
   * Returns the indexes of points that match the given predicate.
   *
   * @private
   * @param {Function} predicate Predicate function to find matching points.
   * @returns {Array<Number>} An array of indexes into the points array of
   *   the matching elements.
   */


  WaveformPoints.prototype._findPoint = function (predicate) {
    var indexes = [];

    for (var i = 0, length = this._points.length; i < length; i++) {
      if (predicate(this._points[i])) {
        indexes.push(i);
      }
    }

    return indexes;
  };
  /**
   * Removes the points at the given array indexes.
   *
   * @private
   * @param {Array<Number>} indexes The array indexes to remove.
   * @returns {Array<Point>} The removed {@link Point} objects.
   */


  WaveformPoints.prototype._removeIndexes = function (indexes) {
    var removed = [];

    for (var i = 0; i < indexes.length; i++) {
      var index = indexes[i] - removed.length;

      var itemRemoved = this._points.splice(index, 1)[0];

      delete this._pointsById[itemRemoved.id];
      removed.push(itemRemoved);
    }

    return removed;
  };
  /**
   * Removes all points that match a given predicate function.
   *
   * After removing the points, this function emits a
   * <code>points.remove</code> event with the removed {@link Point}
   * objects.
   *
   * @private
   * @param {Function} predicate A predicate function that identifies which
   *   points to remove.
   * @returns {Array<Point>} The removed {@link Points} objects.
   */


  WaveformPoints.prototype._removePoints = function (predicate) {
    var indexes = this._findPoint(predicate);

    var removed = this._removeIndexes(indexes);

    this._peaks.emit('points.remove', removed);

    return removed;
  };
  /**
   * Removes the given point.
   *
   * @param {Point} point The point to remove.
   * @returns {Array<Point>} The removed points.
   */


  WaveformPoints.prototype.remove = function (point) {
    return this._removePoints(function (p) {
      return p === point;
    });
  };
  /**
   * Removes any points with the given id.
   *
   * @param {String} id
   * @returns {Array<Point>} The removed {@link Point} objects.
   */


  WaveformPoints.prototype.removeById = function (pointId) {
    return this._removePoints(function (point) {
      return point.id === pointId;
    });
  };
  /**
   * Removes any points at the given time.
   *
   * @param {Number} time
   * @returns {Array<Point>} The removed {@link Point} objects.
   */


  WaveformPoints.prototype.removeByTime = function (time) {
    return this._removePoints(function (point) {
      return point.time === time;
    });
  };
  /**
   * Removes all points.
   *
   * After removing the points, this function emits a
   * <code>points.remove_all</code> event.
   */


  WaveformPoints.prototype.removeAll = function () {
    this._points = [];
    this._pointsById = {};

    this._peaks.emit('points.remove_all');
  };

  /**
   * @file
   *
   * Defines the {@link Segment} class.
   *
   * @module segment
   */
  var segmentOptions = ['peaks', 'id', 'startTime', 'endTime', 'labelText', 'color', 'editable'];

  function validateSegment(options, context) {
    if (!isValidTime(options.startTime)) {
      // eslint-disable-next-line max-len
      throw new TypeError('peaks.segments.' + context + ': startTime should be a valid number');
    }

    if (!isValidTime(options.endTime)) {
      // eslint-disable-next-line max-len
      throw new TypeError('peaks.segments.' + context + ': endTime should be a valid number');
    }

    if (options.startTime < 0) {
      // eslint-disable-next-line max-len
      throw new RangeError('peaks.segments.' + context + ': startTime should not be negative');
    }

    if (options.endTime < 0) {
      // eslint-disable-next-line max-len
      throw new RangeError('peaks.segments.' + context + ': endTime should not be negative');
    }

    if (options.endTime < options.startTime) {
      // eslint-disable-next-line max-len
      throw new RangeError('peaks.segments.' + context + ': endTime should not be less than startTime');
    }

    if (isNullOrUndefined(options.labelText)) {
      // Set default label text
      options.labelText = '';
    } else if (!isString(options.labelText)) {
      throw new TypeError('peaks.segments.' + context + ': labelText must be a string');
    }

    if (!isBoolean(options.editable)) {
      throw new TypeError('peaks.segments.' + context + ': editable must be true or false');
    }

    if (options.color && !isString(options.color) && !isLinearGradientColor(options.color)) {
      // eslint-disable-next-line max-len
      throw new TypeError('peaks.segments.' + context + ': color must be a string or a valid linear gradient object');
    }
  }
  /**
   * A segment is a region of time, with associated label and color.
   *
   * @class
   * @alias Segment
   *
   * @param {Peaks} peaks A reference to the Peaks instance.
   * @param {String} id A unique identifier for the segment.
   * @param {Number} startTime Segment start time, in seconds.
   * @param {Number} endTime Segment end time, in seconds.
   * @param {String} labelText Segment label text.
   * @param {String | LinearGradientColor} color Segment waveform color.
   * @param {Boolean} editable If <code>true</code> the segment start and
   *   end times can be adjusted via the user interface.
   * @param {*} data Optional application specific data.
   */


  function Segment(options) {
    validateSegment(options, 'add()');
    this._peaks = options.peaks;
    this._id = options.id;
    this._startTime = options.startTime;
    this._endTime = options.endTime;
    this._labelText = options.labelText;
    this._color = options.color;
    this._editable = options.editable;

    this._setUserData(options);
  }

  Segment.prototype._setUserData = function (options) {
    for (var key in options) {
      if (objectHasProperty(options, key) && segmentOptions.indexOf(key) === -1) {
        this[key] = options[key];
      }
    }
  };

  Object.defineProperties(Segment.prototype, {
    id: {
      enumerable: true,
      get: function get() {
        return this._id;
      }
    },
    startTime: {
      enumerable: true,
      get: function get() {
        return this._startTime;
      }
    },
    endTime: {
      enumerable: true,
      get: function get() {
        return this._endTime;
      }
    },
    labelText: {
      enumerable: true,
      get: function get() {
        return this._labelText;
      }
    },
    color: {
      enumerable: true,
      get: function get() {
        return this._color;
      }
    },
    editable: {
      enumerable: true,
      get: function get() {
        return this._editable;
      }
    }
  });

  Segment.prototype.update = function (options) {
    var opts = {
      startTime: this.startTime,
      endTime: this.endTime,
      labelText: this.labelText,
      color: this.color,
      editable: this.editable
    };
    extend(opts, options);
    validateSegment(opts, 'update()');
    this._startTime = opts.startTime;
    this._endTime = opts.endTime;
    this._labelText = opts.labelText;
    this._color = opts.color;
    this._editable = opts.editable;

    this._setUserData(options);

    this._peaks.emit('segments.update', this);
  };
  /**
   * Returns <code>true</code> if the segment overlaps a given time region.
   *
   * @param {Number} startTime The start of the time region, in seconds.
   * @param {Number} endTime The end of the time region, in seconds.
   * @returns {Boolean}
   *
   * @see http://wiki.c2.com/?TestIfDateRangesOverlap
   */


  Segment.prototype.isVisible = function (startTime, endTime) {
    return this.startTime < endTime && startTime < this.endTime;
  };

  Segment.prototype._setStartTime = function (time) {
    this._startTime = time;
  };

  Segment.prototype._setEndTime = function (time) {
    this._endTime = time;
  };

  /**
   * @file
   *
   * Defines the {@link WaveformSegments} class.
   *
   * @module waveform-segments
   */
  /**
   * Segment parameters.
   *
   * @typedef {Object} SegmentOptions
   * @global
   * @property {Number} startTime Segment start time, in seconds.
   * @property {Number} endTime Segment end time, in seconds.
   * @property {Boolean=} editable If <code>true</code> the segment start and
   *   end times can be adjusted via the user interface.
   *   Default: <code>false</code>.
   * @property {String=} color Segment waveform color.
   *   Default: a random color.
   * @property {String=} labelText Segment label text.
   *   Default: an empty string.
   * @property {String=} id A unique segment identifier.
   *   Default: an automatically generated identifier.
   */

  /**
   * Handles all functionality related to the adding, removing and manipulation
   * of segments.
   *
   * @class
   * @alias WaveformSegments
   *
   * @param {Peaks} peaks The parent Peaks object.
   */

  function WaveformSegments(peaks) {
    this._peaks = peaks;
    this._segments = [];
    this._segmentsById = {};
    this._segmentIdCounter = 0;
    this._colorIndex = 0;
  }
  /**
   * Returns a new unique segment id value.
   *
   * @private
   * @returns {String}
   */


  WaveformSegments.prototype._getNextSegmentId = function () {
    return 'peaks.segment.' + this._segmentIdCounter++;
  };

  var colors = ['#001f3f', // navy
  '#0074d9', // blue
  '#7fdbff', // aqua
  '#39cccc', // teal
  '#ffdc00', // yellow
  '#ff851b', // orange
  '#ff4136', // red
  '#85144b', // maroon
  '#f012be', // fuchsia
  '#b10dc9' // purple
  ];
  /**
   * @private
   * @returns {String}
   */

  WaveformSegments.prototype._getSegmentColor = function () {
    if (this._peaks.options.randomizeSegmentColor) {
      if (++this._colorIndex === colors.length) {
        this._colorIndex = 0;
      }

      return colors[this._colorIndex];
    } else {
      return this._peaks.options.segmentColor;
    }
  };
  /**
   * Adds a new segment object.
   *
   * @private
   * @param {Segment} segment
   */


  WaveformSegments.prototype._addSegment = function (segment) {
    this._segments.push(segment);

    this._segmentsById[segment.id] = segment;
  };
  /**
   * Creates a new segment object.
   *
   * @private
   * @param {SegmentOptions} options
   * @return {Segment}
   */


  WaveformSegments.prototype._createSegment = function (options) {
    // Watch for anyone still trying to use the old
    // createSegment(startTime, endTime, ...) API
    if (!isObject(options)) {
      // eslint-disable-next-line max-len
      throw new TypeError('peaks.segments.add(): expected a Segment object parameter');
    }

    var segmentOptions = {
      peaks: this._peaks
    };
    extend(segmentOptions, options);

    if (isNullOrUndefined(segmentOptions.id)) {
      segmentOptions.id = this._getNextSegmentId();
    }

    if (isNullOrUndefined(segmentOptions.color)) {
      segmentOptions.color = this._getSegmentColor();
    }

    if (isNullOrUndefined(segmentOptions.labelText)) {
      segmentOptions.labelText = '';
    }

    if (isNullOrUndefined(segmentOptions.editable)) {
      segmentOptions.editable = false;
    }

    return new Segment(segmentOptions);
  };
  /**
   * Returns all segments.
   *
   * @returns {Array<Segment>}
   */


  WaveformSegments.prototype.getSegments = function () {
    return this._segments;
  };
  /**
   * Returns the segment with the given id, or <code>null</code> if not found.
   *
   * @param {String} id
   * @returns {Segment|null}
   */


  WaveformSegments.prototype.getSegment = function (id) {
    return this._segmentsById[id] || null;
  };
  /**
   * Returns all segments that overlap a given point in time.
   *
   * @param {Number} time
   * @returns {Array<Segment>}
   */


  WaveformSegments.prototype.getSegmentsAtTime = function (time) {
    return this._segments.filter(function (segment) {
      return time >= segment.startTime && time < segment.endTime;
    });
  };
  /**
   * Returns all segments that overlap a given time region.
   *
   * @param {Number} startTime The start of the time region, in seconds.
   * @param {Number} endTime The end of the time region, in seconds.
   *
   * @returns {Array<Segment>}
   */


  WaveformSegments.prototype.find = function (startTime, endTime) {
    return this._segments.filter(function (segment) {
      return segment.isVisible(startTime, endTime);
    });
  };
  /**
   * Adds one or more segments to the timeline.
   *
   * @param {SegmentOptions|Array<SegmentOptions>} segmentOrSegments
   *
   * @returns Segment|Array<Segment>
   */


  WaveformSegments.prototype.add = function
    /* segmentOrSegments */
  () {
    var self = this;
    var arrayArgs = Array.isArray(arguments[0]);
    var segments = arrayArgs ? arguments[0] : Array.prototype.slice.call(arguments);
    segments = segments.map(function (segmentOptions) {
      var segment = self._createSegment(segmentOptions);

      if (objectHasProperty(self._segmentsById, segment.id)) {
        throw new Error('peaks.segments.add(): duplicate id');
      }

      return segment;
    });
    segments.forEach(function (segment) {
      self._addSegment(segment);
    });

    this._peaks.emit('segments.add', segments);

    return arrayArgs ? segments : segments[0];
  };
  /**
   * Returns the indexes of segments that match the given predicate.
   *
   * @private
   * @param {Function} predicate Predicate function to find matching segments.
   * @returns {Array<Number>} An array of indexes into the segments array of
   *   the matching elements.
   */


  WaveformSegments.prototype._findSegment = function (predicate) {
    var indexes = [];

    for (var i = 0, length = this._segments.length; i < length; i++) {
      if (predicate(this._segments[i])) {
        indexes.push(i);
      }
    }

    return indexes;
  };
  /**
   * Removes the segments at the given array indexes.
   *
   * @private
   * @param {Array<Number>} indexes The array indexes to remove.
   * @returns {Array<Segment>} The removed {@link Segment} objects.
   */


  WaveformSegments.prototype._removeIndexes = function (indexes) {
    var removed = [];

    for (var i = 0; i < indexes.length; i++) {
      var index = indexes[i] - removed.length;

      var itemRemoved = this._segments.splice(index, 1)[0];

      delete this._segmentsById[itemRemoved.id];
      removed.push(itemRemoved);
    }

    return removed;
  };
  /**
   * Removes all segments that match a given predicate function.
   *
   * After removing the segments, this function also emits a
   * <code>segments.remove</code> event with the removed {@link Segment}
   * objects.
   *
   * @private
   * @param {Function} predicate A predicate function that identifies which
   *   segments to remove.
   * @returns {Array<Segment>} The removed {@link Segment} objects.
   */


  WaveformSegments.prototype._removeSegments = function (predicate) {
    var indexes = this._findSegment(predicate);

    var removed = this._removeIndexes(indexes);

    this._peaks.emit('segments.remove', removed);

    return removed;
  };
  /**
   * Removes the given segment.
   *
   * @param {Segment} segment The segment to remove.
   * @returns {Array<Segment>} The removed segment.
   */


  WaveformSegments.prototype.remove = function (segment) {
    return this._removeSegments(function (s) {
      return s === segment;
    });
  };
  /**
   * Removes any segments with the given id.
   *
   * @param {String} id
   * @returns {Array<Segment>} The removed {@link Segment} objects.
   */


  WaveformSegments.prototype.removeById = function (segmentId) {
    return this._removeSegments(function (segment) {
      return segment.id === segmentId;
    });
  };
  /**
   * Removes any segments with the given start time, and optional end time.
   *
   * @param {Number} startTime Segments with this start time are removed.
   * @param {Number?} endTime If present, only segments with both the given
   *   start time and end time are removed.
   * @returns {Array<Segment>} The removed {@link Segment} objects.
   */


  WaveformSegments.prototype.removeByTime = function (startTime, endTime) {
    endTime = typeof endTime === 'number' ? endTime : 0;
    var fnFilter;

    if (endTime > 0) {
      fnFilter = function fnFilter(segment) {
        return segment.startTime === startTime && segment.endTime === endTime;
      };
    } else {
      fnFilter = function fnFilter(segment) {
        return segment.startTime === startTime;
      };
    }

    return this._removeSegments(fnFilter);
  };
  /**
   * Removes all segments.
   *
   * After removing the segments, this function emits a
   * <code>segments.remove_all</code> event.
   */


  WaveformSegments.prototype.removeAll = function () {
    this._segments = [];
    this._segmentsById = {};

    this._peaks.emit('segments.remove_all');
  };

  /**
   * @file
   *
   * Defines the {@link KeyboardHandler} class.
   *
   * @module keyboard-handler
   */
  var nodes = ['OBJECT', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION'];
  var SPACE$2 = 32,
      TAB = 9,
      LEFT_ARROW = 37,
      RIGHT_ARROW = 39;
  var keys = [SPACE$2, TAB, LEFT_ARROW, RIGHT_ARROW];
  /**
   * Configures keyboard event handling.
   *
   * @class
   * @alias KeyboardHandler
   *
   * @param {EventEmitter} eventEmitter
   */

  function KeyboardHandler(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this._handleKeyEvent = this._handleKeyEvent.bind(this);
    document.addEventListener('keydown', this._handleKeyEvent);
    document.addEventListener('keypress', this._handleKeyEvent);
    document.addEventListener('keyup', this._handleKeyEvent);
  }
  /**
   * Keyboard event handler function.
   *
   * @note Arrow keys only triggered on keydown, not keypress.
   *
   * @param {KeyboardEvent} event
   * @private
   */


  KeyboardHandler.prototype._handleKeyEvent = function handleKeyEvent(event) {
    if (nodes.indexOf(event.target.nodeName) === -1) {
      if (keys.indexOf(event.type) > -1) {
        event.preventDefault();
      }

      if (event.type === 'keydown' || event.type === 'keypress') {
        switch (event.keyCode) {
          case SPACE$2:
            this.eventEmitter.emit('keyboard.space');
            break;

          case TAB:
            this.eventEmitter.emit('keyboard.tab');
            break;
        }
      } else if (event.type === 'keyup') {
        switch (event.keyCode) {
          case LEFT_ARROW:
            if (event.shiftKey) {
              this.eventEmitter.emit('keyboard.shift_left');
            } else {
              this.eventEmitter.emit('keyboard.left');
            }

            break;

          case RIGHT_ARROW:
            if (event.shiftKey) {
              this.eventEmitter.emit('keyboard.shift_right');
            } else {
              this.eventEmitter.emit('keyboard.right');
            }

            break;
        }
      }
    }
  };

  KeyboardHandler.prototype.destroy = function () {
    document.removeEventListener('keydown', this._handleKeyEvent);
    document.removeEventListener('keypress', this._handleKeyEvent);
    document.removeEventListener('keyup', this._handleKeyEvent);
  };

  /**
   * @file
   *
   * Implementation of {@link Player} adapter based on the HTML5 media element.
   *
   * @module player-medialement
   */

  /**
   * A wrapper for interfacing with the HTML5 media element API.
   * Initializes the player for a given media element.
   *
   * @class
   * @alias MediaElementPlayer
   * @param {HTMLMediaElement} mediaElement The HTML <code>&lt;audio&gt;</code>
   *   or <code>&lt;video&gt;</code> element to associate with the
   *   {@link Peaks} instance.
   */
  function MediaElementPlayer(mediaElement) {
    this._mediaElement = mediaElement;
  }
  /**
   * Adds an event listener to the media element.
   *
   * @private
   * @param {String} type The event type to listen for.
   * @param {Function} callback An event handler function.
   */


  MediaElementPlayer.prototype._addMediaListener = function (type, callback) {
    this._listeners.push({
      type: type,
      callback: callback
    });

    this._mediaElement.addEventListener(type, callback);
  };

  MediaElementPlayer.prototype.init = function (eventEmitter) {
    var self = this;
    self._eventEmitter = eventEmitter;
    self._listeners = [];
    self._duration = self.getDuration();

    self._addMediaListener('timeupdate', function () {
      self._eventEmitter.emit('player.timeupdate', self.getCurrentTime());
    });

    self._addMediaListener('playing', function () {
      self._eventEmitter.emit('player.playing', self.getCurrentTime());
    });

    self._addMediaListener('pause', function () {
      self._eventEmitter.emit('player.pause', self.getCurrentTime());
    });

    self._addMediaListener('ended', function () {
      self._eventEmitter.emit('player.ended');
    });

    self._addMediaListener('seeked', function () {
      self._eventEmitter.emit('player.seeked', self.getCurrentTime());
    });

    self._addMediaListener('canplay', function () {
      self._eventEmitter.emit('player.canplay');
    });

    self._addMediaListener('error', function (event) {
      self._eventEmitter.emit('player.error', event.target.error);
    });

    self._interval = null;
    return new Promise(function (resolve, reject) {
      function eventHandler(event) {
        self._mediaElement.removeEventListener('loadedmetadata', eventHandler);

        self._mediaElement.removeEventListener('error', eventHandler);

        if (event.type === 'loadedmetadata') {
          resolve();
        } else {
          reject(event.target.error);
        }
      } // If the media element has preload="none", clicking to seek in the
      // waveform won't work, so here we force the media to load.


      if (self._mediaElement.readyState === HTMLMediaElement.HAVE_NOTHING) {
        // Wait for the readyState to change to HAVE_METADATA so we know the
        // duration is valid, otherwise it could be NaN.
        self._mediaElement.addEventListener('loadedmetadata', eventHandler);

        self._mediaElement.addEventListener('error', eventHandler);

        self._mediaElement.load();
      } else {
        resolve();
      }
    });
  };
  /**
   * Cleans up the player object, removing all event listeners from the
   * associated media element.
   */


  MediaElementPlayer.prototype.destroy = function () {
    for (var i = 0; i < this._listeners.length; i++) {
      var listener = this._listeners[i];

      this._mediaElement.removeEventListener(listener.type, listener.callback);
    }

    this._listeners.length = 0;
    this._mediaElement = null;
  };

  MediaElementPlayer.prototype.play = function () {
    return this._mediaElement.play();
  };

  MediaElementPlayer.prototype.pause = function () {
    this._mediaElement.pause();
  };

  MediaElementPlayer.prototype.isPlaying = function () {
    return !this._mediaElement.paused;
  };

  MediaElementPlayer.prototype.isSeeking = function () {
    return this._mediaElement.seeking;
  };

  MediaElementPlayer.prototype.getCurrentTime = function () {
    return this._mediaElement.currentTime;
  };

  MediaElementPlayer.prototype.getDuration = function () {
    return this._mediaElement.duration;
  };

  MediaElementPlayer.prototype.seek = function (time) {
    this._mediaElement.currentTime = time;
  };

  function SetSourceHandler(eventEmitter, mediaElement) {
    this._eventEmitter = eventEmitter;
    this._mediaElement = mediaElement;
    this._playerCanPlayHandler = this._playerCanPlayHandler.bind(this);
    this._playerErrorHandler = this._playerErrorHandler.bind(this);
  }

  SetSourceHandler.prototype.setSource = function (options, callback) {
    var self = this;
    self._options = options;
    self._callback = callback;

    self._eventEmitter.on('player.canplay', self._playerCanPlayHandler);

    self._eventEmitter.on('player.error', self._playerErrorHandler);

    return new Promise(function (resolve, reject) {
      self._resolve = resolve;
      self._reject = reject;

      self._eventEmitter.on('player.canplay', self._playerCanPlayHandler);

      self._eventEmitter.on('player.error', self._playerErrorHandler);

      self._mediaElement.setAttribute('src', options.mediaUrl);
    });
  };

  SetSourceHandler.prototype._reset = function () {
    this._eventEmitter.removeListener('player.canplay', this._playerCanPlayHandler);

    this._eventEmitter.removeListener('player.error', this._playerErrorHandler);
  };

  SetSourceHandler.prototype._playerCanPlayHandler = function () {
    this._reset();

    this._resolve();
  };

  SetSourceHandler.prototype._playerErrorHandler = function (err) {
    this._reset(); // Return the MediaError object from the media element


    this._reject(err);
  };

  MediaElementPlayer.prototype.setSource = function (options) {
    if (!options.mediaUrl) {
      // eslint-disable-next-line max-len
      return Promise.reject(new Error('peaks.setSource(): options must contain a mediaUrl when using mediaElement'));
    }

    var setSourceHandler = new SetSourceHandler(this._eventEmitter, this._mediaElement);
    return setSourceHandler.setSource(options);
  };

  /**
   * @file
   *
   * A general audio player class which interfaces with external audio players.
   * The default audio player in Peaks.js is {@link MediaElementPlayer}.
   *
   * @module player
   */

  function getAllPropertiesFrom(adapter) {
    var allProperties = [];
    var obj = adapter;

    while (obj) {
      Object.getOwnPropertyNames(obj).forEach(function (p) {
        allProperties.push(p);
      });
      obj = Object.getPrototypeOf(obj);
    }

    return allProperties;
  }

  function validateAdapter(adapter) {
    var publicAdapterMethods = ['init', 'destroy', 'play', 'pause', 'isPlaying', 'isSeeking', 'getCurrentTime', 'getDuration', 'seek'];
    var allProperties = getAllPropertiesFrom(adapter);
    publicAdapterMethods.forEach(function (method) {
      if (!allProperties.includes(method)) {
        throw new TypeError('Peaks.init(): Player method ' + method + ' is undefined');
      }

      if (typeof adapter[method] !== 'function') {
        throw new TypeError('Peaks.init(): Player method ' + method + ' is not a function');
      }
    });
  }
  /**
   * A wrapper for interfacing with an external player API.
   *
   * @class
   * @alias Player
   *
   * @param {Peaks} peaks The parent {@link Peaks} object.
   * @param {Adapter} adapter The player adapter.
   */


  function Player(peaks, adapter) {
    this._peaks = peaks;
    this._playingSegment = false;
    this._segment = null;
    this._loop = false;
    this._playSegmentTimerCallback = this._playSegmentTimerCallback.bind(this);
    validateAdapter(adapter);
    this._adapter = adapter;
  }

  Player.prototype.init = function () {
    return this._adapter.init(this._peaks);
  };
  /**
   * Cleans up the player object.
   */


  Player.prototype.destroy = function () {
    this._adapter.destroy();
  };
  /**
   * Starts playback.
   * @returns {Promise}
   */


  Player.prototype.play = function () {
    return this._adapter.play();
  };
  /**
   * Pauses playback.
   */


  Player.prototype.pause = function () {
    this._adapter.pause();
  };
  /**
   * @returns {Boolean} <code>true</code> if playing, <code>false</code>
   * otherwise.
   */


  Player.prototype.isPlaying = function () {
    return this._adapter.isPlaying();
  };
  /**
   * @returns {boolean} <code>true</code> if seeking
   */


  Player.prototype.isSeeking = function () {
    return this._adapter.isSeeking();
  };
  /**
   * Returns the current playback time position, in seconds.
   *
   * @returns {Number}
   */


  Player.prototype.getCurrentTime = function () {
    return this._adapter.getCurrentTime();
  };
  /**
   * Returns the media duration, in seconds.
   *
   * @returns {Number}
   */


  Player.prototype.getDuration = function () {
    return this._adapter.getDuration();
  };
  /**
   * Seeks to a given time position within the media.
   *
   * @param {Number} time The time position, in seconds.
   */


  Player.prototype.seek = function (time) {
    if (!isValidTime(time)) {
      this._peaks._logger('peaks.player.seek(): parameter must be a valid time, in seconds');

      return;
    }

    this._adapter.seek(time);
  };
  /**
   * Plays the given segment.
   *
   * @param {Segment} segment The segment denoting the time region to play.
   * @param {Boolean} loop If true, playback is looped.
   */


  Player.prototype.playSegment = function (segment, loop) {
    var self = this;

    if (!segment || !isValidTime(segment.startTime) || !isValidTime(segment.endTime)) {
      return Promise.reject(new Error('peaks.player.playSegment(): parameter must be a segment object'));
    }

    self._segment = segment;
    self._loop = loop; // Set audio time to segment start time

    self.seek(segment.startTime);

    self._peaks.once('player.playing', function () {
      if (!self._playingSegment) {
        self._playingSegment = true; // We need to use requestAnimationFrame here as the timeupdate event
        // doesn't fire often enough.

        window.requestAnimationFrame(self._playSegmentTimerCallback);
      }
    }); // Start playing audio


    return self.play();
  };

  Player.prototype._playSegmentTimerCallback = function () {
    if (!this.isPlaying()) {
      this._playingSegment = false;
      return;
    } else if (this.getCurrentTime() >= this._segment.endTime) {
      if (this._loop) {
        this.seek(this._segment.startTime);
      } else {
        this.pause();

        this._peaks.emit('player.ended');

        this._playingSegment = false;
        return;
      }
    }

    window.requestAnimationFrame(this._playSegmentTimerCallback);
  };

  Player.prototype._setSource = function (options) {
    return this._adapter.setSource(options);
  };

  var PI_OVER_180 = Math.PI / 180;

  function detectBrowser() {
    return typeof window !== 'undefined' && ({}.toString.call(window) === '[object Window]' || {}.toString.call(window) === '[object global]');
  }

  var glob = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' ? self : {};
  var Konva$1 = {
    _global: glob,
    version: '8.3.10',
    isBrowser: detectBrowser(),
    isUnminified: /param/.test(function (param) {}.toString()),
    dblClickWindow: 400,
    getAngle: function getAngle(angle) {
      return Konva$1.angleDeg ? angle * PI_OVER_180 : angle;
    },
    enableTrace: false,
    pointerEventsEnabled: true,
    autoDrawEnabled: true,
    hitOnDragEnabled: false,
    capturePointerEventsEnabled: false,
    _mouseListenClick: false,
    _touchListenClick: false,
    _pointerListenClick: false,
    _mouseInDblClickWindow: false,
    _touchInDblClickWindow: false,
    _pointerInDblClickWindow: false,
    _mouseDblClickPointerId: null,
    _touchDblClickPointerId: null,
    _pointerDblClickPointerId: null,
    pixelRatio: typeof window !== 'undefined' && window.devicePixelRatio || 1,
    dragDistance: 3,
    angleDeg: true,
    showWarnings: true,
    dragButtons: [0, 1],
    isDragging: function isDragging() {
      return Konva$1['DD'].isDragging;
    },
    isDragReady: function isDragReady() {
      return !!Konva$1['DD'].node;
    },
    document: glob.document,
    _injectGlobal: function _injectGlobal(Konva) {
      glob.Konva = Konva;
    }
  };
  var _registerNode = function _registerNode(NodeClass) {
    Konva$1[NodeClass.prototype.getClassName()] = NodeClass;
  };

  Konva$1._injectGlobal(Konva$1);

  var Transform = /*#__PURE__*/function () {
    function Transform() {
      var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1, 0, 0, 1, 0, 0];

      _classCallCheck(this, Transform);

      this.dirty = false;
      this.m = m && m.slice() || [1, 0, 0, 1, 0, 0];
    }

    _createClass(Transform, [{
      key: "reset",
      value: function reset() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 1;
        this.m[4] = 0;
        this.m[5] = 0;
      }
    }, {
      key: "copy",
      value: function copy() {
        return new Transform(this.m);
      }
    }, {
      key: "copyInto",
      value: function copyInto(tr) {
        tr.m[0] = this.m[0];
        tr.m[1] = this.m[1];
        tr.m[2] = this.m[2];
        tr.m[3] = this.m[3];
        tr.m[4] = this.m[4];
        tr.m[5] = this.m[5];
      }
    }, {
      key: "point",
      value: function point(_point) {
        var m = this.m;
        return {
          x: m[0] * _point.x + m[2] * _point.y + m[4],
          y: m[1] * _point.x + m[3] * _point.y + m[5]
        };
      }
    }, {
      key: "translate",
      value: function translate(x, y) {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;
        return this;
      }
    }, {
      key: "scale",
      value: function scale(sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
        return this;
      }
    }, {
      key: "rotate",
      value: function rotate(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.m[0] * c + this.m[2] * s;
        var m12 = this.m[1] * c + this.m[3] * s;
        var m21 = this.m[0] * -s + this.m[2] * c;
        var m22 = this.m[1] * -s + this.m[3] * c;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
      }
    }, {
      key: "getTranslation",
      value: function getTranslation() {
        return {
          x: this.m[4],
          y: this.m[5]
        };
      }
    }, {
      key: "skew",
      value: function skew(sx, sy) {
        var m11 = this.m[0] + this.m[2] * sy;
        var m12 = this.m[1] + this.m[3] * sy;
        var m21 = this.m[2] + this.m[0] * sx;
        var m22 = this.m[3] + this.m[1] * sx;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
      }
    }, {
      key: "multiply",
      value: function multiply(matrix) {
        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
      }
    }, {
      key: "invert",
      value: function invert() {
        var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        var m0 = this.m[3] * d;
        var m1 = -this.m[1] * d;
        var m2 = -this.m[2] * d;
        var m3 = this.m[0] * d;
        var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
        return this;
      }
    }, {
      key: "getMatrix",
      value: function getMatrix() {
        return this.m;
      }
    }, {
      key: "decompose",
      value: function decompose() {
        var a = this.m[0];
        var b = this.m[1];
        var c = this.m[2];
        var d = this.m[3];
        var e = this.m[4];
        var f = this.m[5];
        var delta = a * d - b * c;
        var result = {
          x: e,
          y: f,
          rotation: 0,
          scaleX: 0,
          scaleY: 0,
          skewX: 0,
          skewY: 0
        };

        if (a != 0 || b != 0) {
          var r = Math.sqrt(a * a + b * b);
          result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
          result.scaleX = r;
          result.scaleY = delta / r;
          result.skewX = (a * c + b * d) / delta;
          result.skewY = 0;
        } else if (c != 0 || d != 0) {
          var s = Math.sqrt(c * c + d * d);
          result.rotation = Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
          result.scaleX = delta / s;
          result.scaleY = s;
          result.skewX = 0;
          result.skewY = (a * c + b * d) / delta;
        } else ;

        result.rotation = Util._getRotation(result.rotation);
        return result;
      }
    }]);

    return Transform;
  }();
  var OBJECT_ARRAY = '[object Array]',
      OBJECT_NUMBER = '[object Number]',
      OBJECT_STRING = '[object String]',
      OBJECT_BOOLEAN = '[object Boolean]',
      PI_OVER_DEG180 = Math.PI / 180,
      DEG180_OVER_PI = 180 / Math.PI,
      HASH$1 = '#',
      EMPTY_STRING = '',
      ZERO = '0',
      KONVA_WARNING = 'Konva warning: ',
      KONVA_ERROR = 'Konva error: ',
      RGB_PAREN = 'rgb(',
      COLORS = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 132, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 255, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 203],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [119, 128, 144],
    slategrey: [119, 128, 144],
    snow: [255, 255, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    transparent: [255, 255, 255, 0],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 5]
  },
      RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/,
      animQueue = [];

  var req = typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame || function (f) {
    setTimeout(f, 60);
  };

  var Util = {
    _isElement: function _isElement(obj) {
      return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function _isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isPlainObject: function _isPlainObject(obj) {
      return !!obj && obj.constructor === Object;
    },
    _isArray: function _isArray(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber: function _isNumber(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_NUMBER && !isNaN(obj) && isFinite(obj);
    },
    _isString: function _isString(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    _isBoolean: function _isBoolean(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
    },
    isObject: function isObject(val) {
      return val instanceof Object;
    },
    isValidSelector: function isValidSelector(selector) {
      if (typeof selector !== 'string') {
        return false;
      }

      var firstChar = selector[0];
      return firstChar === '#' || firstChar === '.' || firstChar === firstChar.toUpperCase();
    },
    _sign: function _sign(number) {
      if (number === 0) {
        return 1;
      }

      if (number > 0) {
        return 1;
      } else {
        return -1;
      }
    },
    requestAnimFrame: function requestAnimFrame(callback) {
      animQueue.push(callback);

      if (animQueue.length === 1) {
        req(function () {
          var queue = animQueue;
          animQueue = [];
          queue.forEach(function (cb) {
            cb();
          });
        });
      }
    },
    createCanvasElement: function createCanvasElement() {
      var canvas = document.createElement('canvas');

      try {
        canvas.style = canvas.style || {};
      } catch (e) {}

      return canvas;
    },
    createImageElement: function createImageElement() {
      return document.createElement('img');
    },
    _isInDocument: function _isInDocument(el) {
      while (el = el.parentNode) {
        if (el == document) {
          return true;
        }
      }

      return false;
    },
    _urlToImage: function _urlToImage(url, callback) {
      var imageObj = Util.createImageElement();

      imageObj.onload = function () {
        callback(imageObj);
      };

      imageObj.src = url;
    },
    _rgbToHex: function _rgbToHex(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb: function _hexToRgb(hex) {
      hex = hex.replace(HASH$1, EMPTY_STRING);
      var bigint = parseInt(hex, 16);
      return {
        r: bigint >> 16 & 255,
        g: bigint >> 8 & 255,
        b: bigint & 255
      };
    },
    getRandomColor: function getRandomColor() {
      var randColor = (Math.random() * 0xffffff << 0).toString(16);

      while (randColor.length < 6) {
        randColor = ZERO + randColor;
      }

      return HASH$1 + randColor;
    },
    getRGB: function getRGB(color) {
      var rgb;

      if (color in COLORS) {
        rgb = COLORS[color];
        return {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2]
        };
      } else if (color[0] === HASH$1) {
        return this._hexToRgb(color.substring(1));
      } else if (color.substr(0, 4) === RGB_PAREN) {
        rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
        return {
          r: parseInt(rgb[1], 10),
          g: parseInt(rgb[2], 10),
          b: parseInt(rgb[3], 10)
        };
      } else {
        return {
          r: 0,
          g: 0,
          b: 0
        };
      }
    },
    colorToRGBA: function colorToRGBA(str) {
      str = str || 'black';
      return Util._namedColorToRBA(str) || Util._hex3ColorToRGBA(str) || Util._hex6ColorToRGBA(str) || Util._rgbColorToRGBA(str) || Util._rgbaColorToRGBA(str) || Util._hslColorToRGBA(str);
    },
    _namedColorToRBA: function _namedColorToRBA(str) {
      var c = COLORS[str.toLowerCase()];

      if (!c) {
        return null;
      }

      return {
        r: c[0],
        g: c[1],
        b: c[2],
        a: 1
      };
    },
    _rgbColorToRGBA: function _rgbColorToRGBA(str) {
      if (str.indexOf('rgb(') === 0) {
        str = str.match(/rgb\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(Number);
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: 1
        };
      }
    },
    _rgbaColorToRGBA: function _rgbaColorToRGBA(str) {
      if (str.indexOf('rgba(') === 0) {
        str = str.match(/rgba\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(function (n, index) {
          if (n.slice(-1) === '%') {
            return index === 3 ? parseInt(n) / 100 : parseInt(n) / 100 * 255;
          }

          return Number(n);
        });
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: parts[3]
        };
      }
    },
    _hex6ColorToRGBA: function _hex6ColorToRGBA(str) {
      if (str[0] === '#' && str.length === 7) {
        return {
          r: parseInt(str.slice(1, 3), 16),
          g: parseInt(str.slice(3, 5), 16),
          b: parseInt(str.slice(5, 7), 16),
          a: 1
        };
      }
    },
    _hex3ColorToRGBA: function _hex3ColorToRGBA(str) {
      if (str[0] === '#' && str.length === 4) {
        return {
          r: parseInt(str[1] + str[1], 16),
          g: parseInt(str[2] + str[2], 16),
          b: parseInt(str[3] + str[3], 16),
          a: 1
        };
      }
    },
    _hslColorToRGBA: function _hslColorToRGBA(str) {
      if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
        var _exec = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str),
            _exec2 = _toArray(_exec);
            _exec2[0];
            var hsl = _exec2.slice(1);

        var h = Number(hsl[0]) / 360;
        var s = Number(hsl[1]) / 100;
        var l = Number(hsl[2]) / 100;
        var t2;
        var t3;
        var val;

        if (s === 0) {
          val = l * 255;
          return {
            r: Math.round(val),
            g: Math.round(val),
            b: Math.round(val),
            a: 1
          };
        }

        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }

        var t1 = 2 * l - t2;
        var rgb = [0, 0, 0];

        for (var i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);

          if (t3 < 0) {
            t3++;
          }

          if (t3 > 1) {
            t3--;
          }

          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }

          rgb[i] = val * 255;
        }

        return {
          r: Math.round(rgb[0]),
          g: Math.round(rgb[1]),
          b: Math.round(rgb[2]),
          a: 1
        };
      }
    },
    haveIntersection: function haveIntersection(r1, r2) {
      return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
    },
    cloneObject: function cloneObject(obj) {
      var retObj = {};

      for (var key in obj) {
        if (this._isPlainObject(obj[key])) {
          retObj[key] = this.cloneObject(obj[key]);
        } else if (this._isArray(obj[key])) {
          retObj[key] = this.cloneArray(obj[key]);
        } else {
          retObj[key] = obj[key];
        }
      }

      return retObj;
    },
    cloneArray: function cloneArray(arr) {
      return arr.slice(0);
    },
    degToRad: function degToRad(deg) {
      return deg * PI_OVER_DEG180;
    },
    radToDeg: function radToDeg(rad) {
      return rad * DEG180_OVER_PI;
    },
    _degToRad: function _degToRad(deg) {
      Util.warn('Util._degToRad is removed. Please use public Util.degToRad instead.');
      return Util.degToRad(deg);
    },
    _radToDeg: function _radToDeg(rad) {
      Util.warn('Util._radToDeg is removed. Please use public Util.radToDeg instead.');
      return Util.radToDeg(rad);
    },
    _getRotation: function _getRotation(radians) {
      return Konva$1.angleDeg ? Util.radToDeg(radians) : radians;
    },
    _capitalize: function _capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw: function _throw(str) {
      throw new Error(KONVA_ERROR + str);
    },
    error: function error(str) {
      console.error(KONVA_ERROR + str);
    },
    warn: function warn(str) {
      if (!Konva$1.showWarnings) {
        return;
      }

      console.warn(KONVA_WARNING + str);
    },
    each: function each(obj, func) {
      for (var key in obj) {
        func(key, obj[key]);
      }
    },
    _inRange: function _inRange(val, left, right) {
      return left <= val && val < right;
    },
    _getProjectionToSegment: function _getProjectionToSegment(x1, y1, x2, y2, x3, y3) {
      var x, y, dist;
      var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

      if (pd2 == 0) {
        x = x1;
        y = y1;
        dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
      } else {
        var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;

        if (u < 0) {
          x = x1;
          y = y1;
          dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
        } else if (u > 1.0) {
          x = x2;
          y = y2;
          dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
        } else {
          x = x1 + u * (x2 - x1);
          y = y1 + u * (y2 - y1);
          dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
        }
      }

      return [x, y, dist];
    },
    _getProjectionToLine: function _getProjectionToLine(pt, line, isClosed) {
      var pc = Util.cloneObject(pt);
      var dist = Number.MAX_VALUE;
      line.forEach(function (p1, i) {
        if (!isClosed && i === line.length - 1) {
          return;
        }

        var p2 = line[(i + 1) % line.length];

        var proj = Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);

        var px = proj[0],
            py = proj[1],
            pdist = proj[2];

        if (pdist < dist) {
          pc.x = px;
          pc.y = py;
          dist = pdist;
        }
      });
      return pc;
    },
    _prepareArrayForTween: function _prepareArrayForTween(startArray, endArray, isClosed) {
      var n,
          start = [],
          end = [];

      if (startArray.length > endArray.length) {
        var temp = endArray;
        endArray = startArray;
        startArray = temp;
      }

      for (n = 0; n < startArray.length; n += 2) {
        start.push({
          x: startArray[n],
          y: startArray[n + 1]
        });
      }

      for (n = 0; n < endArray.length; n += 2) {
        end.push({
          x: endArray[n],
          y: endArray[n + 1]
        });
      }

      var newStart = [];
      end.forEach(function (point) {
        var pr = Util._getProjectionToLine(point, start, isClosed);

        newStart.push(pr.x);
        newStart.push(pr.y);
      });
      return newStart;
    },
    _prepareToStringify: function _prepareToStringify(obj) {
      var desc;
      obj.visitedByCircularReferenceRemoval = true;

      for (var key in obj) {
        if (!(obj.hasOwnProperty(key) && obj[key] && _typeof$1(obj[key]) == 'object')) {
          continue;
        }

        desc = Object.getOwnPropertyDescriptor(obj, key);

        if (obj[key].visitedByCircularReferenceRemoval || Util._isElement(obj[key])) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        } else if (Util._prepareToStringify(obj[key]) === null) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        }
      }

      delete obj.visitedByCircularReferenceRemoval;
      return obj;
    },
    _assign: function _assign(target, source) {
      for (var key in source) {
        target[key] = source[key];
      }

      return target;
    },
    _getFirstPointerId: function _getFirstPointerId(evt) {
      if (!evt.touches) {
        return evt.pointerId || 999;
      } else {
        return evt.changedTouches[0].identifier;
      }
    }
  };

  function _formatValue(val) {
    if (Util._isString(val)) {
      return '"' + val + '"';
    }

    if (Object.prototype.toString.call(val) === '[object Number]') {
      return val;
    }

    if (Util._isBoolean(val)) {
      return val;
    }

    return Object.prototype.toString.call(val);
  }
  function getNumberValidator() {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        if (!Util._isNumber(val)) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number.');
        }

        return val;
      };
    }
  }
  function getNumberOrArrayOfNumbersValidator(noOfElements) {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        var isNumber = Util._isNumber(val);

        var isValidArray = Util._isArray(val) && val.length == noOfElements;

        if (!isNumber && !isValidArray) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or Array<number>(' + noOfElements + ')');
        }

        return val;
      };
    }
  }
  function getNumberOrAutoValidator() {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        var isNumber = Util._isNumber(val);

        var isAuto = val === 'auto';

        if (!(isNumber || isAuto)) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or "auto".');
        }

        return val;
      };
    }
  }
  function getStringValidator() {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        if (!Util._isString(val)) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string.');
        }

        return val;
      };
    }
  }
  function getStringOrGradientValidator() {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        var isString = Util._isString(val);

        var isGradient = Object.prototype.toString.call(val) === '[object CanvasGradient]' || val && val.addColorStop;

        if (!(isString || isGradient)) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string or a native gradient.');
        }

        return val;
      };
    }
  }
  function getNumberArrayValidator() {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        if (!Util._isArray(val)) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a array of numbers.');
        } else {
          val.forEach(function (item) {
            if (!Util._isNumber(item)) {
              Util.warn('"' + attr + '" attribute has non numeric element ' + item + '. Make sure that all elements are numbers.');
            }
          });
        }

        return val;
      };
    }
  }
  function getBooleanValidator() {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        var isBool = val === true || val === false;

        if (!isBool) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a boolean.');
        }

        return val;
      };
    }
  }
  function getComponentValidator(components) {
    if (Konva$1.isUnminified) {
      return function (val, attr) {
        if (!Util.isObject(val)) {
          Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be an object with properties ' + components);
        }

        return val;
      };
    }
  }

  var GET = 'get',
      SET$1 = 'set';
  var Factory = {
    addGetterSetter: function addGetterSetter(constructor, attr, def, validator, after) {
      Factory.addGetter(constructor, attr, def);
      Factory.addSetter(constructor, attr, validator, after);
      Factory.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter: function addGetter(constructor, attr, def) {
      var method = GET + Util._capitalize(attr);

      constructor.prototype[method] = constructor.prototype[method] || function () {
        var val = this.attrs[attr];
        return val === undefined ? def : val;
      };
    },
    addSetter: function addSetter(constructor, attr, validator, after) {
      var method = SET$1 + Util._capitalize(attr);

      if (!constructor.prototype[method]) {
        Factory.overWriteSetter(constructor, attr, validator, after);
      }
    },
    overWriteSetter: function overWriteSetter(constructor, attr, validator, after) {
      var method = SET$1 + Util._capitalize(attr);

      constructor.prototype[method] = function (val) {
        if (validator && val !== undefined && val !== null) {
          val = validator.call(this, val, attr);
        }

        this._setAttr(attr, val);

        if (after) {
          after.call(this);
        }

        return this;
      };
    },
    addComponentsGetterSetter: function addComponentsGetterSetter(constructor, attr, components, validator, after) {
      var len = components.length,
          capitalize = Util._capitalize,
          getter = GET + capitalize(attr),
          setter = SET$1 + capitalize(attr),
          n,
          component;

      constructor.prototype[getter] = function () {
        var ret = {};

        for (n = 0; n < len; n++) {
          component = components[n];
          ret[component] = this.getAttr(attr + capitalize(component));
        }

        return ret;
      };

      var basicValidator = getComponentValidator(components);

      constructor.prototype[setter] = function (val) {
        var oldVal = this.attrs[attr],
            key;

        if (validator) {
          val = validator.call(this, val);
        }

        if (basicValidator) {
          basicValidator.call(this, val, attr);
        }

        for (key in val) {
          if (!val.hasOwnProperty(key)) {
            continue;
          }

          this._setAttr(attr + capitalize(key), val[key]);
        }

        this._fireChangeEvent(attr, oldVal, val);

        if (after) {
          after.call(this);
        }

        return this;
      };

      Factory.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter: function addOverloadedGetterSetter(constructor, attr) {
      var capitalizedAttr = Util._capitalize(attr),
          setter = SET$1 + capitalizedAttr,
          getter = GET + capitalizedAttr;

      constructor.prototype[attr] = function () {
        if (arguments.length) {
          this[setter](arguments[0]);
          return this;
        }

        return this[getter]();
      };
    },
    addDeprecatedGetterSetter: function addDeprecatedGetterSetter(constructor, attr, def, validator) {
      Util.error('Adding deprecated ' + attr);

      var method = GET + Util._capitalize(attr);

      var message = attr + ' property is deprecated and will be removed soon. Look at Konva change log for more information.';

      constructor.prototype[method] = function () {
        Util.error(message);
        var val = this.attrs[attr];
        return val === undefined ? def : val;
      };

      Factory.addSetter(constructor, attr, validator, function () {
        Util.error(message);
      });
      Factory.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat: function backCompat(constructor, methods) {
      Util.each(methods, function (oldMethodName, newMethodName) {
        var method = constructor.prototype[newMethodName];

        var oldGetter = GET + Util._capitalize(oldMethodName);

        var oldSetter = SET$1 + Util._capitalize(oldMethodName);

        function deprecated() {
          method.apply(this, arguments);
          Util.error('"' + oldMethodName + '" method is deprecated and will be removed soon. Use ""' + newMethodName + '" instead.');
        }

        constructor.prototype[oldMethodName] = deprecated;
        constructor.prototype[oldGetter] = deprecated;
        constructor.prototype[oldSetter] = deprecated;
      });
    },
    afterSetFilter: function afterSetFilter() {
      this._filterUpToDate = false;
    }
  };

  function simplifyArray(arr) {
    var retArr = [],
        len = arr.length,
        util = Util,
        n,
        val;

    for (n = 0; n < len; n++) {
      val = arr[n];

      if (util._isNumber(val)) {
        val = Math.round(val * 1000) / 1000;
      } else if (!util._isString(val)) {
        val = val + '';
      }

      retArr.push(val);
    }

    return retArr;
  }

  var COMMA = ',',
      OPEN_PAREN = '(',
      CLOSE_PAREN = ')',
      OPEN_PAREN_BRACKET = '([',
      CLOSE_BRACKET_PAREN = '])',
      SEMICOLON = ';',
      DOUBLE_PAREN = '()',
      EQUALS = '=',
      CONTEXT_METHODS = ['arc', 'arcTo', 'beginPath', 'bezierCurveTo', 'clearRect', 'clip', 'closePath', 'createLinearGradient', 'createPattern', 'createRadialGradient', 'drawImage', 'ellipse', 'fill', 'fillText', 'getImageData', 'createImageData', 'lineTo', 'moveTo', 'putImageData', 'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save', 'scale', 'setLineDash', 'setTransform', 'stroke', 'strokeText', 'transform', 'translate'];
  var CONTEXT_PROPERTIES = ['fillStyle', 'strokeStyle', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'lineCap', 'lineDashOffset', 'lineJoin', 'lineWidth', 'miterLimit', 'font', 'textAlign', 'textBaseline', 'globalAlpha', 'globalCompositeOperation', 'imageSmoothingEnabled'];
  var traceArrMax = 100;
  var Context = /*#__PURE__*/function () {
    function Context(canvas) {
      _classCallCheck(this, Context);

      this.canvas = canvas;
      this._context = canvas._canvas.getContext('2d');

      if (Konva$1.enableTrace) {
        this.traceArr = [];

        this._enableTrace();
      }
    }

    _createClass(Context, [{
      key: "fillShape",
      value: function fillShape(shape) {
        if (shape.fillEnabled()) {
          this._fill(shape);
        }
      }
    }, {
      key: "_fill",
      value: function _fill(shape) {}
    }, {
      key: "strokeShape",
      value: function strokeShape(shape) {
        if (shape.hasStroke()) {
          this._stroke(shape);
        }
      }
    }, {
      key: "_stroke",
      value: function _stroke(shape) {}
    }, {
      key: "fillStrokeShape",
      value: function fillStrokeShape(shape) {
        if (shape.attrs.fillAfterStrokeEnabled) {
          this.strokeShape(shape);
          this.fillShape(shape);
        } else {
          this.fillShape(shape);
          this.strokeShape(shape);
        }
      }
    }, {
      key: "getTrace",
      value: function getTrace(relaxed, rounded) {
        var traceArr = this.traceArr,
            len = traceArr.length,
            str = '',
            n,
            trace,
            method,
            args;

        for (n = 0; n < len; n++) {
          trace = traceArr[n];
          method = trace.method;

          if (method) {
            args = trace.args;
            str += method;

            if (relaxed) {
              str += DOUBLE_PAREN;
            } else {
              if (Util._isArray(args[0])) {
                str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
              } else {
                if (rounded) {
                  args = args.map(function (a) {
                    return typeof a === 'number' ? Math.floor(a) : a;
                  });
                }

                str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
              }
            }
          } else {
            str += trace.property;

            if (!relaxed) {
              str += EQUALS + trace.val;
            }
          }

          str += SEMICOLON;
        }

        return str;
      }
    }, {
      key: "clearTrace",
      value: function clearTrace() {
        this.traceArr = [];
      }
    }, {
      key: "_trace",
      value: function _trace(str) {
        var traceArr = this.traceArr,
            len;
        traceArr.push(str);
        len = traceArr.length;

        if (len >= traceArrMax) {
          traceArr.shift();
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        var pixelRatio = this.getCanvas().getPixelRatio();
        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
      }
    }, {
      key: "getCanvas",
      value: function getCanvas() {
        return this.canvas;
      }
    }, {
      key: "clear",
      value: function clear(bounds) {
        var canvas = this.getCanvas();

        if (bounds) {
          this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
        } else {
          this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
        }
      }
    }, {
      key: "_applyLineCap",
      value: function _applyLineCap(shape) {
        var lineCap = shape.getLineCap();

        if (lineCap) {
          this.setAttr('lineCap', lineCap);
        }
      }
    }, {
      key: "_applyOpacity",
      value: function _applyOpacity(shape) {
        var absOpacity = shape.getAbsoluteOpacity();

        if (absOpacity !== 1) {
          this.setAttr('globalAlpha', absOpacity);
        }
      }
    }, {
      key: "_applyLineJoin",
      value: function _applyLineJoin(shape) {
        var lineJoin = shape.attrs.lineJoin;

        if (lineJoin) {
          this.setAttr('lineJoin', lineJoin);
        }
      }
    }, {
      key: "setAttr",
      value: function setAttr(attr, val) {
        this._context[attr] = val;
      }
    }, {
      key: "arc",
      value: function arc(a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
      }
    }, {
      key: "arcTo",
      value: function arcTo(a0, a1, a2, a3, a4) {
        this._context.arcTo(a0, a1, a2, a3, a4);
      }
    }, {
      key: "beginPath",
      value: function beginPath() {
        this._context.beginPath();
      }
    }, {
      key: "bezierCurveTo",
      value: function bezierCurveTo(a0, a1, a2, a3, a4, a5) {
        this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
      }
    }, {
      key: "clearRect",
      value: function clearRect(a0, a1, a2, a3) {
        this._context.clearRect(a0, a1, a2, a3);
      }
    }, {
      key: "clip",
      value: function clip() {
        this._context.clip();
      }
    }, {
      key: "closePath",
      value: function closePath() {
        this._context.closePath();
      }
    }, {
      key: "createImageData",
      value: function createImageData(a0, a1) {
        var a = arguments;

        if (a.length === 2) {
          return this._context.createImageData(a0, a1);
        } else if (a.length === 1) {
          return this._context.createImageData(a0);
        }
      }
    }, {
      key: "createLinearGradient",
      value: function createLinearGradient(a0, a1, a2, a3) {
        return this._context.createLinearGradient(a0, a1, a2, a3);
      }
    }, {
      key: "createPattern",
      value: function createPattern(a0, a1) {
        return this._context.createPattern(a0, a1);
      }
    }, {
      key: "createRadialGradient",
      value: function createRadialGradient(a0, a1, a2, a3, a4, a5) {
        return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
      }
    }, {
      key: "drawImage",
      value: function drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        var a = arguments,
            _context = this._context;

        if (a.length === 3) {
          _context.drawImage(a0, a1, a2);
        } else if (a.length === 5) {
          _context.drawImage(a0, a1, a2, a3, a4);
        } else if (a.length === 9) {
          _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        }
      }
    }, {
      key: "ellipse",
      value: function ellipse(a0, a1, a2, a3, a4, a5, a6, a7) {
        this._context.ellipse(a0, a1, a2, a3, a4, a5, a6, a7);
      }
    }, {
      key: "isPointInPath",
      value: function isPointInPath(x, y) {
        return this._context.isPointInPath(x, y);
      }
    }, {
      key: "fill",
      value: function fill(path2d) {
        if (path2d) {
          this._context.fill(path2d);
        } else {
          this._context.fill();
        }
      }
    }, {
      key: "fillRect",
      value: function fillRect(x, y, width, height) {
        this._context.fillRect(x, y, width, height);
      }
    }, {
      key: "strokeRect",
      value: function strokeRect(x, y, width, height) {
        this._context.strokeRect(x, y, width, height);
      }
    }, {
      key: "fillText",
      value: function fillText(text, x, y, maxWidth) {
        if (maxWidth) {
          this._context.fillText(text, x, y, maxWidth);
        } else {
          this._context.fillText(text, x, y);
        }
      }
    }, {
      key: "measureText",
      value: function measureText(text) {
        return this._context.measureText(text);
      }
    }, {
      key: "getImageData",
      value: function getImageData(a0, a1, a2, a3) {
        return this._context.getImageData(a0, a1, a2, a3);
      }
    }, {
      key: "lineTo",
      value: function lineTo(a0, a1) {
        this._context.lineTo(a0, a1);
      }
    }, {
      key: "moveTo",
      value: function moveTo(a0, a1) {
        this._context.moveTo(a0, a1);
      }
    }, {
      key: "rect",
      value: function rect(a0, a1, a2, a3) {
        this._context.rect(a0, a1, a2, a3);
      }
    }, {
      key: "putImageData",
      value: function putImageData(a0, a1, a2) {
        this._context.putImageData(a0, a1, a2);
      }
    }, {
      key: "quadraticCurveTo",
      value: function quadraticCurveTo(a0, a1, a2, a3) {
        this._context.quadraticCurveTo(a0, a1, a2, a3);
      }
    }, {
      key: "restore",
      value: function restore() {
        this._context.restore();
      }
    }, {
      key: "rotate",
      value: function rotate(a0) {
        this._context.rotate(a0);
      }
    }, {
      key: "save",
      value: function save() {
        this._context.save();
      }
    }, {
      key: "scale",
      value: function scale(a0, a1) {
        this._context.scale(a0, a1);
      }
    }, {
      key: "setLineDash",
      value: function setLineDash(a0) {
        if (this._context.setLineDash) {
          this._context.setLineDash(a0);
        } else if ('mozDash' in this._context) {
          this._context['mozDash'] = a0;
        } else if ('webkitLineDash' in this._context) {
          this._context['webkitLineDash'] = a0;
        }
      }
    }, {
      key: "getLineDash",
      value: function getLineDash() {
        return this._context.getLineDash();
      }
    }, {
      key: "setTransform",
      value: function setTransform(a0, a1, a2, a3, a4, a5) {
        this._context.setTransform(a0, a1, a2, a3, a4, a5);
      }
    }, {
      key: "stroke",
      value: function stroke(path2d) {
        if (path2d) {
          this._context.stroke(path2d);
        } else {
          this._context.stroke();
        }
      }
    }, {
      key: "strokeText",
      value: function strokeText(a0, a1, a2, a3) {
        this._context.strokeText(a0, a1, a2, a3);
      }
    }, {
      key: "transform",
      value: function transform(a0, a1, a2, a3, a4, a5) {
        this._context.transform(a0, a1, a2, a3, a4, a5);
      }
    }, {
      key: "translate",
      value: function translate(a0, a1) {
        this._context.translate(a0, a1);
      }
    }, {
      key: "_enableTrace",
      value: function _enableTrace() {
        var that = this,
            len = CONTEXT_METHODS.length,
            origSetter = this.setAttr,
            n,
            args;

        var func = function func(methodName) {
          var origMethod = that[methodName],
              ret;

          that[methodName] = function () {
            args = simplifyArray(Array.prototype.slice.call(arguments, 0));
            ret = origMethod.apply(that, arguments);

            that._trace({
              method: methodName,
              args: args
            });

            return ret;
          };
        };

        for (n = 0; n < len; n++) {
          func(CONTEXT_METHODS[n]);
        }

        that.setAttr = function () {
          origSetter.apply(that, arguments);
          var prop = arguments[0];
          var val = arguments[1];

          if (prop === 'shadowOffsetX' || prop === 'shadowOffsetY' || prop === 'shadowBlur') {
            val = val / this.canvas.getPixelRatio();
          }

          that._trace({
            property: prop,
            val: val
          });
        };
      }
    }, {
      key: "_applyGlobalCompositeOperation",
      value: function _applyGlobalCompositeOperation(node) {
        var op = node.attrs.globalCompositeOperation;
        var def = !op || op === 'source-over';

        if (!def) {
          this.setAttr('globalCompositeOperation', op);
        }
      }
    }]);

    return Context;
  }();
  CONTEXT_PROPERTIES.forEach(function (prop) {
    Object.defineProperty(Context.prototype, prop, {
      get: function get() {
        return this._context[prop];
      },
      set: function set(val) {
        this._context[prop] = val;
      }
    });
  });
  var SceneContext = /*#__PURE__*/function (_Context) {
    _inherits(SceneContext, _Context);

    var _super = _createSuper(SceneContext);

    function SceneContext() {
      _classCallCheck(this, SceneContext);

      return _super.apply(this, arguments);
    }

    _createClass(SceneContext, [{
      key: "_fillColor",
      value: function _fillColor(shape) {
        var fill = shape.fill();
        this.setAttr('fillStyle', fill);

        shape._fillFunc(this);
      }
    }, {
      key: "_fillPattern",
      value: function _fillPattern(shape) {
        this.setAttr('fillStyle', shape._getFillPattern());

        shape._fillFunc(this);
      }
    }, {
      key: "_fillLinearGradient",
      value: function _fillLinearGradient(shape) {
        var grd = shape._getLinearGradient();

        if (grd) {
          this.setAttr('fillStyle', grd);

          shape._fillFunc(this);
        }
      }
    }, {
      key: "_fillRadialGradient",
      value: function _fillRadialGradient(shape) {
        var grd = shape._getRadialGradient();

        if (grd) {
          this.setAttr('fillStyle', grd);

          shape._fillFunc(this);
        }
      }
    }, {
      key: "_fill",
      value: function _fill(shape) {
        var hasColor = shape.fill(),
            fillPriority = shape.getFillPriority();

        if (hasColor && fillPriority === 'color') {
          this._fillColor(shape);

          return;
        }

        var hasPattern = shape.getFillPatternImage();

        if (hasPattern && fillPriority === 'pattern') {
          this._fillPattern(shape);

          return;
        }

        var hasLinearGradient = shape.getFillLinearGradientColorStops();

        if (hasLinearGradient && fillPriority === 'linear-gradient') {
          this._fillLinearGradient(shape);

          return;
        }

        var hasRadialGradient = shape.getFillRadialGradientColorStops();

        if (hasRadialGradient && fillPriority === 'radial-gradient') {
          this._fillRadialGradient(shape);

          return;
        }

        if (hasColor) {
          this._fillColor(shape);
        } else if (hasPattern) {
          this._fillPattern(shape);
        } else if (hasLinearGradient) {
          this._fillLinearGradient(shape);
        } else if (hasRadialGradient) {
          this._fillRadialGradient(shape);
        }
      }
    }, {
      key: "_strokeLinearGradient",
      value: function _strokeLinearGradient(shape) {
        var start = shape.getStrokeLinearGradientStartPoint(),
            end = shape.getStrokeLinearGradientEndPoint(),
            colorStops = shape.getStrokeLinearGradientColorStops(),
            grd = this.createLinearGradient(start.x, start.y, end.x, end.y);

        if (colorStops) {
          for (var n = 0; n < colorStops.length; n += 2) {
            grd.addColorStop(colorStops[n], colorStops[n + 1]);
          }

          this.setAttr('strokeStyle', grd);
        }
      }
    }, {
      key: "_stroke",
      value: function _stroke(shape) {
        var dash = shape.dash(),
            strokeScaleEnabled = shape.getStrokeScaleEnabled();

        if (shape.hasStroke()) {
          if (!strokeScaleEnabled) {
            this.save();
            var pixelRatio = this.getCanvas().getPixelRatio();
            this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          }

          this._applyLineCap(shape);

          if (dash && shape.dashEnabled()) {
            this.setLineDash(dash);
            this.setAttr('lineDashOffset', shape.dashOffset());
          }

          this.setAttr('lineWidth', shape.strokeWidth());

          if (!shape.getShadowForStrokeEnabled()) {
            this.setAttr('shadowColor', 'rgba(0,0,0,0)');
          }

          var hasLinearGradient = shape.getStrokeLinearGradientColorStops();

          if (hasLinearGradient) {
            this._strokeLinearGradient(shape);
          } else {
            this.setAttr('strokeStyle', shape.stroke());
          }

          shape._strokeFunc(this);

          if (!strokeScaleEnabled) {
            this.restore();
          }
        }
      }
    }, {
      key: "_applyShadow",
      value: function _applyShadow(shape) {
        var _a, _b, _c;

        var color = (_a = shape.getShadowRGBA()) !== null && _a !== void 0 ? _a : 'black',
            blur = (_b = shape.getShadowBlur()) !== null && _b !== void 0 ? _b : 5,
            offset = (_c = shape.getShadowOffset()) !== null && _c !== void 0 ? _c : {
          x: 0,
          y: 0
        },
            scale = shape.getAbsoluteScale(),
            ratio = this.canvas.getPixelRatio(),
            scaleX = scale.x * ratio,
            scaleY = scale.y * ratio;
        this.setAttr('shadowColor', color);
        this.setAttr('shadowBlur', blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
        this.setAttr('shadowOffsetX', offset.x * scaleX);
        this.setAttr('shadowOffsetY', offset.y * scaleY);
      }
    }]);

    return SceneContext;
  }(Context);
  var HitContext = /*#__PURE__*/function (_Context2) {
    _inherits(HitContext, _Context2);

    var _super2 = _createSuper(HitContext);

    function HitContext() {
      _classCallCheck(this, HitContext);

      return _super2.apply(this, arguments);
    }

    _createClass(HitContext, [{
      key: "_fill",
      value: function _fill(shape) {
        this.save();
        this.setAttr('fillStyle', shape.colorKey);

        shape._fillFuncHit(this);

        this.restore();
      }
    }, {
      key: "strokeShape",
      value: function strokeShape(shape) {
        if (shape.hasHitStroke()) {
          this._stroke(shape);
        }
      }
    }, {
      key: "_stroke",
      value: function _stroke(shape) {
        if (shape.hasHitStroke()) {
          var strokeScaleEnabled = shape.getStrokeScaleEnabled();

          if (!strokeScaleEnabled) {
            this.save();
            var pixelRatio = this.getCanvas().getPixelRatio();
            this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          }

          this._applyLineCap(shape);

          var hitStrokeWidth = shape.hitStrokeWidth();
          var strokeWidth = hitStrokeWidth === 'auto' ? shape.strokeWidth() : hitStrokeWidth;
          this.setAttr('lineWidth', strokeWidth);
          this.setAttr('strokeStyle', shape.colorKey);

          shape._strokeFuncHit(this);

          if (!strokeScaleEnabled) {
            this.restore();
          }
        }
      }
    }]);

    return HitContext;
  }(Context);

  var _pixelRatio;

  function getDevicePixelRatio() {
    if (_pixelRatio) {
      return _pixelRatio;
    }

    var canvas = Util.createCanvasElement();
    var context = canvas.getContext('2d');

    _pixelRatio = function () {
      var devicePixelRatio = Konva$1._global.devicePixelRatio || 1,
          backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
      return devicePixelRatio / backingStoreRatio;
    }();

    return _pixelRatio;
  }

  var Canvas = /*#__PURE__*/function () {
    function Canvas(config) {
      _classCallCheck(this, Canvas);

      this.pixelRatio = 1;
      this.width = 0;
      this.height = 0;
      this.isCache = false;
      var conf = config || {};
      var pixelRatio = conf.pixelRatio || Konva$1.pixelRatio || getDevicePixelRatio();
      this.pixelRatio = pixelRatio;
      this._canvas = Util.createCanvasElement();
      this._canvas.style.padding = '0';
      this._canvas.style.margin = '0';
      this._canvas.style.border = '0';
      this._canvas.style.background = 'transparent';
      this._canvas.style.position = 'absolute';
      this._canvas.style.top = '0';
      this._canvas.style.left = '0';
    }

    _createClass(Canvas, [{
      key: "getContext",
      value: function getContext() {
        return this.context;
      }
    }, {
      key: "getPixelRatio",
      value: function getPixelRatio() {
        return this.pixelRatio;
      }
    }, {
      key: "setPixelRatio",
      value: function setPixelRatio(pixelRatio) {
        var previousRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
      }
    }, {
      key: "setWidth",
      value: function setWidth(width) {
        this.width = this._canvas.width = width * this.pixelRatio;
        this._canvas.style.width = width + 'px';

        var pixelRatio = this.pixelRatio,
            _context = this.getContext()._context;

        _context.scale(pixelRatio, pixelRatio);
      }
    }, {
      key: "setHeight",
      value: function setHeight(height) {
        this.height = this._canvas.height = height * this.pixelRatio;
        this._canvas.style.height = height + 'px';

        var pixelRatio = this.pixelRatio,
            _context = this.getContext()._context;

        _context.scale(pixelRatio, pixelRatio);
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        return this.width;
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        return this.height;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setWidth(width || 0);
        this.setHeight(height || 0);
      }
    }, {
      key: "toDataURL",
      value: function toDataURL(mimeType, quality) {
        try {
          return this._canvas.toDataURL(mimeType, quality);
        } catch (e) {
          try {
            return this._canvas.toDataURL();
          } catch (err) {
            Util.error('Unable to get data URL. ' + err.message + ' For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.');
            return '';
          }
        }
      }
    }]);

    return Canvas;
  }();
  Factory.addGetterSetter(Canvas, 'pixelRatio', undefined, getNumberValidator());
  var SceneCanvas = /*#__PURE__*/function (_Canvas) {
    _inherits(SceneCanvas, _Canvas);

    var _super = _createSuper(SceneCanvas);

    function SceneCanvas() {
      var _this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        width: 0,
        height: 0
      };

      _classCallCheck(this, SceneCanvas);

      _this = _super.call(this, config);
      _this.context = new SceneContext(_assertThisInitialized(_this));

      _this.setSize(config.width, config.height);

      return _this;
    }

    return _createClass(SceneCanvas);
  }(Canvas);
  var HitCanvas = /*#__PURE__*/function (_Canvas2) {
    _inherits(HitCanvas, _Canvas2);

    var _super2 = _createSuper(HitCanvas);

    function HitCanvas() {
      var _this2;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        width: 0,
        height: 0
      };

      _classCallCheck(this, HitCanvas);

      _this2 = _super2.call(this, config);
      _this2.hitCanvas = true;
      _this2.context = new HitContext(_assertThisInitialized(_this2));

      _this2.setSize(config.width, config.height);

      return _this2;
    }

    return _createClass(HitCanvas);
  }(Canvas);

  var DD = {
    get isDragging() {
      var flag = false;

      DD._dragElements.forEach(function (elem) {
        if (elem.dragStatus === 'dragging') {
          flag = true;
        }
      });

      return flag;
    },

    justDragged: false,

    get node() {
      var node;

      DD._dragElements.forEach(function (elem) {
        node = elem.node;
      });

      return node;
    },

    _dragElements: new Map(),
    _drag: function _drag(evt) {
      var nodesToFireEvents = [];

      DD._dragElements.forEach(function (elem, key) {
        var node = elem.node;
        var stage = node.getStage();
        stage.setPointersPositions(evt);

        if (elem.pointerId === undefined) {
          elem.pointerId = Util._getFirstPointerId(evt);
        }

        var pos = stage._changedPointerPositions.find(function (pos) {
          return pos.id === elem.pointerId;
        });

        if (!pos) {
          return;
        }

        if (elem.dragStatus !== 'dragging') {
          var dragDistance = node.dragDistance();
          var distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));

          if (distance < dragDistance) {
            return;
          }

          node.startDrag({
            evt: evt
          });

          if (!node.isDragging()) {
            return;
          }
        }

        node._setDragPosition(evt, elem);

        nodesToFireEvents.push(node);
      });

      nodesToFireEvents.forEach(function (node) {
        node.fire('dragmove', {
          type: 'dragmove',
          target: node,
          evt: evt
        }, true);
      });
    },
    _endDragBefore: function _endDragBefore(evt) {
      DD._dragElements.forEach(function (elem) {
        var node = elem.node;
        var stage = node.getStage();

        if (evt) {
          stage.setPointersPositions(evt);
        }

        var pos = stage._changedPointerPositions.find(function (pos) {
          return pos.id === elem.pointerId;
        });

        if (!pos) {
          return;
        }

        if (elem.dragStatus === 'dragging' || elem.dragStatus === 'stopped') {
          DD.justDragged = true;
          Konva$1._mouseListenClick = false;
          Konva$1._touchListenClick = false;
          Konva$1._pointerListenClick = false;
          elem.dragStatus = 'stopped';
        }

        var drawNode = elem.node.getLayer() || elem.node instanceof Konva$1['Stage'] && elem.node;

        if (drawNode) {
          drawNode.batchDraw();
        }
      });
    },
    _endDragAfter: function _endDragAfter(evt) {
      DD._dragElements.forEach(function (elem, key) {
        if (elem.dragStatus === 'stopped') {
          elem.node.fire('dragend', {
            type: 'dragend',
            target: elem.node,
            evt: evt
          }, true);
        }

        if (elem.dragStatus !== 'dragging') {
          DD._dragElements.delete(key);
        }
      });
    }
  };

  if (Konva$1.isBrowser) {
    window.addEventListener('mouseup', DD._endDragBefore, true);
    window.addEventListener('touchend', DD._endDragBefore, true);
    window.addEventListener('mousemove', DD._drag);
    window.addEventListener('touchmove', DD._drag);
    window.addEventListener('mouseup', DD._endDragAfter, false);
    window.addEventListener('touchend', DD._endDragAfter, false);
  }

  var ABSOLUTE_OPACITY = 'absoluteOpacity',
      ALL_LISTENERS = 'allEventListeners',
      ABSOLUTE_TRANSFORM = 'absoluteTransform',
      ABSOLUTE_SCALE = 'absoluteScale',
      CANVAS = 'canvas',
      CHANGE = 'Change',
      CHILDREN = 'children',
      KONVA = 'konva',
      LISTENING = 'listening',
      MOUSEENTER$1 = 'mouseenter',
      MOUSELEAVE$1 = 'mouseleave',
      SET = 'set',
      SHAPE = 'Shape',
      SPACE$1 = ' ',
      STAGE$1 = 'stage',
      TRANSFORM = 'transform',
      UPPER_STAGE = 'Stage',
      VISIBLE = 'visible',
      TRANSFORM_CHANGE_STR = ['xChange.konva', 'yChange.konva', 'scaleXChange.konva', 'scaleYChange.konva', 'skewXChange.konva', 'skewYChange.konva', 'rotationChange.konva', 'offsetXChange.konva', 'offsetYChange.konva', 'transformsEnabledChange.konva'].join(SPACE$1);
  var idCounter$1 = 1;
  var Node = /*#__PURE__*/function () {
    function Node(config) {
      _classCallCheck(this, Node);

      this._id = idCounter$1++;
      this.eventListeners = {};
      this.attrs = {};
      this.index = 0;
      this._allEventListeners = null;
      this.parent = null;
      this._cache = new Map();
      this._attachedDepsListeners = new Map();
      this._lastPos = null;
      this._batchingTransformChange = false;
      this._needClearTransformCache = false;
      this._filterUpToDate = false;
      this._isUnderCache = false;
      this._dragEventId = null;
      this._shouldFireChangeEvents = false;
      this.setAttrs(config);
      this._shouldFireChangeEvents = true;
    }

    _createClass(Node, [{
      key: "hasChildren",
      value: function hasChildren() {
        return false;
      }
    }, {
      key: "_clearCache",
      value: function _clearCache(attr) {
        if ((attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) && this._cache.get(attr)) {
          this._cache.get(attr).dirty = true;
        } else if (attr) {
          this._cache.delete(attr);
        } else {
          this._cache.clear();
        }
      }
    }, {
      key: "_getCache",
      value: function _getCache(attr, privateGetter) {
        var cache = this._cache.get(attr);

        var isTransform = attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM;
        var invalid = cache === undefined || isTransform && cache.dirty === true;

        if (invalid) {
          cache = privateGetter.call(this);

          this._cache.set(attr, cache);
        }

        return cache;
      }
    }, {
      key: "_calculate",
      value: function _calculate(name, deps, getter) {
        var _this = this;

        if (!this._attachedDepsListeners.get(name)) {
          var depsString = deps.map(function (dep) {
            return dep + 'Change.konva';
          }).join(SPACE$1);
          this.on(depsString, function () {
            _this._clearCache(name);
          });

          this._attachedDepsListeners.set(name, true);
        }

        return this._getCache(name, getter);
      }
    }, {
      key: "_getCanvasCache",
      value: function _getCanvasCache() {
        return this._cache.get(CANVAS);
      }
    }, {
      key: "_clearSelfAndDescendantCache",
      value: function _clearSelfAndDescendantCache(attr) {
        this._clearCache(attr);

        if (attr === ABSOLUTE_TRANSFORM) {
          this.fire('absoluteTransformChange');
        }
      }
    }, {
      key: "clearCache",
      value: function clearCache() {
        this._cache.delete(CANVAS);

        this._clearSelfAndDescendantCache();

        this._requestDraw();

        return this;
      }
    }, {
      key: "cache",
      value: function cache(config) {
        var conf = config || {};
        var rect = {};

        if (conf.x === undefined || conf.y === undefined || conf.width === undefined || conf.height === undefined) {
          rect = this.getClientRect({
            skipTransform: true,
            relativeTo: this.getParent()
          });
        }

        var width = Math.ceil(conf.width || rect.width),
            height = Math.ceil(conf.height || rect.height),
            pixelRatio = conf.pixelRatio,
            x = conf.x === undefined ? Math.floor(rect.x) : conf.x,
            y = conf.y === undefined ? Math.floor(rect.y) : conf.y,
            offset = conf.offset || 0,
            drawBorder = conf.drawBorder || false,
            hitCanvasPixelRatio = conf.hitCanvasPixelRatio || 1;

        if (!width || !height) {
          Util.error('Can not cache the node. Width or height of the node equals 0. Caching is skipped.');
          return;
        }

        width += offset * 2 + 1;
        height += offset * 2 + 1;
        x -= offset;
        y -= offset;
        var cachedSceneCanvas = new SceneCanvas({
          pixelRatio: pixelRatio,
          width: width,
          height: height
        }),
            cachedFilterCanvas = new SceneCanvas({
          pixelRatio: pixelRatio,
          width: 0,
          height: 0
        }),
            cachedHitCanvas = new HitCanvas({
          pixelRatio: hitCanvasPixelRatio,
          width: width,
          height: height
        }),
            sceneContext = cachedSceneCanvas.getContext(),
            hitContext = cachedHitCanvas.getContext();
        cachedHitCanvas.isCache = true;
        cachedSceneCanvas.isCache = true;

        this._cache.delete(CANVAS);

        this._filterUpToDate = false;

        if (conf.imageSmoothingEnabled === false) {
          cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
          cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
        }

        sceneContext.save();
        hitContext.save();
        sceneContext.translate(-x, -y);
        hitContext.translate(-x, -y);
        this._isUnderCache = true;

        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);

        this.drawScene(cachedSceneCanvas, this);
        this.drawHit(cachedHitCanvas, this);
        this._isUnderCache = false;
        sceneContext.restore();
        hitContext.restore();

        if (drawBorder) {
          sceneContext.save();
          sceneContext.beginPath();
          sceneContext.rect(0, 0, width, height);
          sceneContext.closePath();
          sceneContext.setAttr('strokeStyle', 'red');
          sceneContext.setAttr('lineWidth', 5);
          sceneContext.stroke();
          sceneContext.restore();
        }

        this._cache.set(CANVAS, {
          scene: cachedSceneCanvas,
          filter: cachedFilterCanvas,
          hit: cachedHitCanvas,
          x: x,
          y: y
        });

        this._requestDraw();

        return this;
      }
    }, {
      key: "isCached",
      value: function isCached() {
        return this._cache.has(CANVAS);
      }
    }, {
      key: "getClientRect",
      value: function getClientRect(config) {
        throw new Error('abstract "getClientRect" method call');
      }
    }, {
      key: "_transformedRect",
      value: function _transformedRect(rect, top) {
        var points = [{
          x: rect.x,
          y: rect.y
        }, {
          x: rect.x + rect.width,
          y: rect.y
        }, {
          x: rect.x + rect.width,
          y: rect.y + rect.height
        }, {
          x: rect.x,
          y: rect.y + rect.height
        }];
        var minX, minY, maxX, maxY;
        var trans = this.getAbsoluteTransform(top);
        points.forEach(function (point) {
          var transformed = trans.point(point);

          if (minX === undefined) {
            minX = maxX = transformed.x;
            minY = maxY = transformed.y;
          }

          minX = Math.min(minX, transformed.x);
          minY = Math.min(minY, transformed.y);
          maxX = Math.max(maxX, transformed.x);
          maxY = Math.max(maxY, transformed.y);
        });
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }
    }, {
      key: "_drawCachedSceneCanvas",
      value: function _drawCachedSceneCanvas(context) {
        context.save();

        context._applyOpacity(this);

        context._applyGlobalCompositeOperation(this);

        var canvasCache = this._getCanvasCache();

        context.translate(canvasCache.x, canvasCache.y);

        var cacheCanvas = this._getCachedSceneCanvas();

        var ratio = cacheCanvas.pixelRatio;
        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
        context.restore();
      }
    }, {
      key: "_drawCachedHitCanvas",
      value: function _drawCachedHitCanvas(context) {
        var canvasCache = this._getCanvasCache(),
            hitCanvas = canvasCache.hit;

        context.save();
        context.translate(canvasCache.x, canvasCache.y);
        context.drawImage(hitCanvas._canvas, 0, 0, hitCanvas.width / hitCanvas.pixelRatio, hitCanvas.height / hitCanvas.pixelRatio);
        context.restore();
      }
    }, {
      key: "_getCachedSceneCanvas",
      value: function _getCachedSceneCanvas() {
        var filters = this.filters(),
            cachedCanvas = this._getCanvasCache(),
            sceneCanvas = cachedCanvas.scene,
            filterCanvas = cachedCanvas.filter,
            filterContext = filterCanvas.getContext(),
            len,
            imageData,
            n,
            filter;

        if (filters) {
          if (!this._filterUpToDate) {
            var ratio = sceneCanvas.pixelRatio;
            filterCanvas.setSize(sceneCanvas.width / sceneCanvas.pixelRatio, sceneCanvas.height / sceneCanvas.pixelRatio);

            try {
              len = filters.length;
              filterContext.clear();
              filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
              imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());

              for (n = 0; n < len; n++) {
                filter = filters[n];

                if (typeof filter !== 'function') {
                  Util.error('Filter should be type of function, but got ' + _typeof$1(filter) + ' instead. Please check correct filters');
                  continue;
                }

                filter.call(this, imageData);
                filterContext.putImageData(imageData, 0, 0);
              }
            } catch (e) {
              Util.error('Unable to apply filter. ' + e.message + ' This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.');
            }

            this._filterUpToDate = true;
          }

          return filterCanvas;
        }

        return sceneCanvas;
      }
    }, {
      key: "on",
      value: function on(evtStr, handler) {
        this._cache && this._cache.delete(ALL_LISTENERS);

        if (arguments.length === 3) {
          return this._delegate.apply(this, arguments);
        }

        var events = evtStr.split(SPACE$1),
            len = events.length,
            n,
            event,
            parts,
            baseEvent,
            name;

        for (n = 0; n < len; n++) {
          event = events[n];
          parts = event.split('.');
          baseEvent = parts[0];
          name = parts[1] || '';

          if (!this.eventListeners[baseEvent]) {
            this.eventListeners[baseEvent] = [];
          }

          this.eventListeners[baseEvent].push({
            name: name,
            handler: handler
          });
        }

        return this;
      }
    }, {
      key: "off",
      value: function off(evtStr, callback) {
        var events = (evtStr || '').split(SPACE$1),
            len = events.length,
            n,
            t,
            event,
            parts,
            baseEvent,
            name;
        this._cache && this._cache.delete(ALL_LISTENERS);

        if (!evtStr) {
          for (t in this.eventListeners) {
            this._off(t);
          }
        }

        for (n = 0; n < len; n++) {
          event = events[n];
          parts = event.split('.');
          baseEvent = parts[0];
          name = parts[1];

          if (baseEvent) {
            if (this.eventListeners[baseEvent]) {
              this._off(baseEvent, name, callback);
            }
          } else {
            for (t in this.eventListeners) {
              this._off(t, name, callback);
            }
          }
        }

        return this;
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(evt) {
        var e = {
          target: this,
          type: evt.type,
          evt: evt
        };
        this.fire(evt.type, e);
        return this;
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(type, handler) {
        this.on(type, function (evt) {
          handler.call(this, evt.evt);
        });
        return this;
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type) {
        this.off(type);
        return this;
      }
    }, {
      key: "_delegate",
      value: function _delegate(event, selector, handler) {
        var stopNode = this;
        this.on(event, function (evt) {
          var targets = evt.target.findAncestors(selector, true, stopNode);

          for (var i = 0; i < targets.length; i++) {
            evt = Util.cloneObject(evt);
            evt.currentTarget = targets[i];
            handler.call(targets[i], evt);
          }
        });
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this.isDragging()) {
          this.stopDrag();
        }

        DD._dragElements.delete(this._id);

        this._remove();

        return this;
      }
    }, {
      key: "_clearCaches",
      value: function _clearCaches() {
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);

        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);

        this._clearSelfAndDescendantCache(STAGE$1);

        this._clearSelfAndDescendantCache(VISIBLE);

        this._clearSelfAndDescendantCache(LISTENING);
      }
    }, {
      key: "_remove",
      value: function _remove() {
        this._clearCaches();

        var parent = this.getParent();

        if (parent && parent.children) {
          parent.children.splice(this.index, 1);

          parent._setChildrenIndices();

          this.parent = null;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.remove();
        return this;
      }
    }, {
      key: "getAttr",
      value: function getAttr(attr) {
        var method = 'get' + Util._capitalize(attr);

        if (Util._isFunction(this[method])) {
          return this[method]();
        }

        return this.attrs[attr];
      }
    }, {
      key: "getAncestors",
      value: function getAncestors() {
        var parent = this.getParent(),
            ancestors = [];

        while (parent) {
          ancestors.push(parent);
          parent = parent.getParent();
        }

        return ancestors;
      }
    }, {
      key: "getAttrs",
      value: function getAttrs() {
        return this.attrs || {};
      }
    }, {
      key: "setAttrs",
      value: function setAttrs(config) {
        var _this2 = this;

        this._batchTransformChanges(function () {
          var key, method;

          if (!config) {
            return _this2;
          }

          for (key in config) {
            if (key === CHILDREN) {
              continue;
            }

            method = SET + Util._capitalize(key);

            if (Util._isFunction(_this2[method])) {
              _this2[method](config[key]);
            } else {
              _this2._setAttr(key, config[key]);
            }
          }
        });

        return this;
      }
    }, {
      key: "isListening",
      value: function isListening() {
        return this._getCache(LISTENING, this._isListening);
      }
    }, {
      key: "_isListening",
      value: function _isListening(relativeTo) {
        var listening = this.listening();

        if (!listening) {
          return false;
        }

        var parent = this.getParent();

        if (parent && parent !== relativeTo && this !== relativeTo) {
          return parent._isListening(relativeTo);
        } else {
          return true;
        }
      }
    }, {
      key: "isVisible",
      value: function isVisible() {
        return this._getCache(VISIBLE, this._isVisible);
      }
    }, {
      key: "_isVisible",
      value: function _isVisible(relativeTo) {
        var visible = this.visible();

        if (!visible) {
          return false;
        }

        var parent = this.getParent();

        if (parent && parent !== relativeTo && this !== relativeTo) {
          return parent._isVisible(relativeTo);
        } else {
          return true;
        }
      }
    }, {
      key: "shouldDrawHit",
      value: function shouldDrawHit(top) {
        var skipDragCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (top) {
          return this._isVisible(top) && this._isListening(top);
        }

        var layer = this.getLayer();
        var layerUnderDrag = false;

        DD._dragElements.forEach(function (elem) {
          if (elem.dragStatus !== 'dragging') {
            return;
          } else if (elem.node.nodeType === 'Stage') {
            layerUnderDrag = true;
          } else if (elem.node.getLayer() === layer) {
            layerUnderDrag = true;
          }
        });

        var dragSkip = !skipDragCheck && !Konva$1.hitOnDragEnabled && layerUnderDrag;
        return this.isListening() && this.isVisible() && !dragSkip;
      }
    }, {
      key: "show",
      value: function show() {
        this.visible(true);
        return this;
      }
    }, {
      key: "hide",
      value: function hide() {
        this.visible(false);
        return this;
      }
    }, {
      key: "getZIndex",
      value: function getZIndex() {
        return this.index || 0;
      }
    }, {
      key: "getAbsoluteZIndex",
      value: function getAbsoluteZIndex() {
        var depth = this.getDepth(),
            that = this,
            index = 0,
            nodes,
            len,
            n,
            child;

        function addChildren(children) {
          nodes = [];
          len = children.length;

          for (n = 0; n < len; n++) {
            child = children[n];
            index++;

            if (child.nodeType !== SHAPE) {
              nodes = nodes.concat(child.getChildren().slice());
            }

            if (child._id === that._id) {
              n = len;
            }
          }

          if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
            addChildren(nodes);
          }
        }

        if (that.nodeType !== UPPER_STAGE) {
          addChildren(that.getStage().getChildren());
        }

        return index;
      }
    }, {
      key: "getDepth",
      value: function getDepth() {
        var depth = 0,
            parent = this.parent;

        while (parent) {
          depth++;
          parent = parent.parent;
        }

        return depth;
      }
    }, {
      key: "_batchTransformChanges",
      value: function _batchTransformChanges(func) {
        this._batchingTransformChange = true;
        func();
        this._batchingTransformChange = false;

        if (this._needClearTransformCache) {
          this._clearCache(TRANSFORM);

          this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        }

        this._needClearTransformCache = false;
      }
    }, {
      key: "setPosition",
      value: function setPosition(pos) {
        var _this3 = this;

        this._batchTransformChanges(function () {
          _this3.x(pos.x);

          _this3.y(pos.y);
        });

        return this;
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        return {
          x: this.x(),
          y: this.y()
        };
      }
    }, {
      key: "getRelativePointerPosition",
      value: function getRelativePointerPosition() {
        if (!this.getStage()) {
          return null;
        }

        var pos = this.getStage().getPointerPosition();

        if (!pos) {
          return null;
        }

        var transform = this.getAbsoluteTransform().copy();
        transform.invert();
        return transform.point(pos);
      }
    }, {
      key: "getAbsolutePosition",
      value: function getAbsolutePosition(top) {
        var haveCachedParent = false;
        var parent = this.parent;

        while (parent) {
          if (parent.isCached()) {
            haveCachedParent = true;
            break;
          }

          parent = parent.parent;
        }

        if (haveCachedParent && !top) {
          top = true;
        }

        var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(),
            absoluteTransform = new Transform(),
            offset = this.offset();
        absoluteTransform.m = absoluteMatrix.slice();
        absoluteTransform.translate(offset.x, offset.y);
        return absoluteTransform.getTranslation();
      }
    }, {
      key: "setAbsolutePosition",
      value: function setAbsolutePosition(pos) {
        var origTrans = this._clearTransform();

        this.attrs.x = origTrans.x;
        this.attrs.y = origTrans.y;
        delete origTrans.x;
        delete origTrans.y;

        this._clearCache(TRANSFORM);

        var it = this._getAbsoluteTransform().copy();

        it.invert();
        it.translate(pos.x, pos.y);
        pos = {
          x: this.attrs.x + it.getTranslation().x,
          y: this.attrs.y + it.getTranslation().y
        };

        this._setTransform(origTrans);

        this.setPosition({
          x: pos.x,
          y: pos.y
        });

        this._clearCache(TRANSFORM);

        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);

        return this;
      }
    }, {
      key: "_setTransform",
      value: function _setTransform(trans) {
        var key;

        for (key in trans) {
          this.attrs[key] = trans[key];
        }
      }
    }, {
      key: "_clearTransform",
      value: function _clearTransform() {
        var trans = {
          x: this.x(),
          y: this.y(),
          rotation: this.rotation(),
          scaleX: this.scaleX(),
          scaleY: this.scaleY(),
          offsetX: this.offsetX(),
          offsetY: this.offsetY(),
          skewX: this.skewX(),
          skewY: this.skewY()
        };
        this.attrs.x = 0;
        this.attrs.y = 0;
        this.attrs.rotation = 0;
        this.attrs.scaleX = 1;
        this.attrs.scaleY = 1;
        this.attrs.offsetX = 0;
        this.attrs.offsetY = 0;
        this.attrs.skewX = 0;
        this.attrs.skewY = 0;
        return trans;
      }
    }, {
      key: "move",
      value: function move(change) {
        var changeX = change.x,
            changeY = change.y,
            x = this.x(),
            y = this.y();

        if (changeX !== undefined) {
          x += changeX;
        }

        if (changeY !== undefined) {
          y += changeY;
        }

        this.setPosition({
          x: x,
          y: y
        });
        return this;
      }
    }, {
      key: "_eachAncestorReverse",
      value: function _eachAncestorReverse(func, top) {
        var family = [],
            parent = this.getParent(),
            len,
            n;

        if (top && top._id === this._id) {
          return;
        }

        family.unshift(this);

        while (parent && (!top || parent._id !== top._id)) {
          family.unshift(parent);
          parent = parent.parent;
        }

        len = family.length;

        for (n = 0; n < len; n++) {
          func(family[n]);
        }
      }
    }, {
      key: "rotate",
      value: function rotate(theta) {
        this.rotation(this.rotation() + theta);
        return this;
      }
    }, {
      key: "moveToTop",
      value: function moveToTop() {
        if (!this.parent) {
          Util.warn('Node has no parent. moveToTop function is ignored.');
          return false;
        }

        var index = this.index,
            len = this.parent.getChildren().length;

        if (index < len - 1) {
          this.parent.children.splice(index, 1);
          this.parent.children.push(this);

          this.parent._setChildrenIndices();

          return true;
        }

        return false;
      }
    }, {
      key: "moveUp",
      value: function moveUp() {
        if (!this.parent) {
          Util.warn('Node has no parent. moveUp function is ignored.');
          return false;
        }

        var index = this.index,
            len = this.parent.getChildren().length;

        if (index < len - 1) {
          this.parent.children.splice(index, 1);
          this.parent.children.splice(index + 1, 0, this);

          this.parent._setChildrenIndices();

          return true;
        }

        return false;
      }
    }, {
      key: "moveDown",
      value: function moveDown() {
        if (!this.parent) {
          Util.warn('Node has no parent. moveDown function is ignored.');
          return false;
        }

        var index = this.index;

        if (index > 0) {
          this.parent.children.splice(index, 1);
          this.parent.children.splice(index - 1, 0, this);

          this.parent._setChildrenIndices();

          return true;
        }

        return false;
      }
    }, {
      key: "moveToBottom",
      value: function moveToBottom() {
        if (!this.parent) {
          Util.warn('Node has no parent. moveToBottom function is ignored.');
          return false;
        }

        var index = this.index;

        if (index > 0) {
          this.parent.children.splice(index, 1);
          this.parent.children.unshift(this);

          this.parent._setChildrenIndices();

          return true;
        }

        return false;
      }
    }, {
      key: "setZIndex",
      value: function setZIndex(zIndex) {
        if (!this.parent) {
          Util.warn('Node has no parent. zIndex parameter is ignored.');
          return this;
        }

        if (zIndex < 0 || zIndex >= this.parent.children.length) {
          Util.warn('Unexpected value ' + zIndex + ' for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to ' + (this.parent.children.length - 1) + '.');
        }

        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.splice(zIndex, 0, this);

        this.parent._setChildrenIndices();

        return this;
      }
    }, {
      key: "getAbsoluteOpacity",
      value: function getAbsoluteOpacity() {
        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
      }
    }, {
      key: "_getAbsoluteOpacity",
      value: function _getAbsoluteOpacity() {
        var absOpacity = this.opacity();
        var parent = this.getParent();

        if (parent && !parent._isUnderCache) {
          absOpacity *= parent.getAbsoluteOpacity();
        }

        return absOpacity;
      }
    }, {
      key: "moveTo",
      value: function moveTo(newContainer) {
        if (this.getParent() !== newContainer) {
          this._remove();

          newContainer.add(this);
        }

        return this;
      }
    }, {
      key: "toObject",
      value: function toObject() {
        var obj = {},
            attrs = this.getAttrs(),
            key,
            val,
            getter,
            defaultValue,
            nonPlainObject;
        obj.attrs = {};

        for (key in attrs) {
          val = attrs[key];
          nonPlainObject = Util.isObject(val) && !Util._isPlainObject(val) && !Util._isArray(val);

          if (nonPlainObject) {
            continue;
          }

          getter = typeof this[key] === 'function' && this[key];
          delete attrs[key];
          defaultValue = getter ? getter.call(this) : null;
          attrs[key] = val;

          if (defaultValue !== val) {
            obj.attrs[key] = val;
          }
        }

        obj.className = this.getClassName();
        return Util._prepareToStringify(obj);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return JSON.stringify(this.toObject());
      }
    }, {
      key: "getParent",
      value: function getParent() {
        return this.parent;
      }
    }, {
      key: "findAncestors",
      value: function findAncestors(selector, includeSelf, stopNode) {
        var res = [];

        if (includeSelf && this._isMatch(selector)) {
          res.push(this);
        }

        var ancestor = this.parent;

        while (ancestor) {
          if (ancestor === stopNode) {
            return res;
          }

          if (ancestor._isMatch(selector)) {
            res.push(ancestor);
          }

          ancestor = ancestor.parent;
        }

        return res;
      }
    }, {
      key: "isAncestorOf",
      value: function isAncestorOf(node) {
        return false;
      }
    }, {
      key: "findAncestor",
      value: function findAncestor(selector, includeSelf, stopNode) {
        return this.findAncestors(selector, includeSelf, stopNode)[0];
      }
    }, {
      key: "_isMatch",
      value: function _isMatch(selector) {
        if (!selector) {
          return false;
        }

        if (typeof selector === 'function') {
          return selector(this);
        }

        var selectorArr = selector.replace(/ /g, '').split(','),
            len = selectorArr.length,
            n,
            sel;

        for (n = 0; n < len; n++) {
          sel = selectorArr[n];

          if (!Util.isValidSelector(sel)) {
            Util.warn('Selector "' + sel + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
            Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
            Util.warn('Konva is awesome, right?');
          }

          if (sel.charAt(0) === '#') {
            if (this.id() === sel.slice(1)) {
              return true;
            }
          } else if (sel.charAt(0) === '.') {
            if (this.hasName(sel.slice(1))) {
              return true;
            }
          } else if (this.className === sel || this.nodeType === sel) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "getLayer",
      value: function getLayer() {
        var parent = this.getParent();
        return parent ? parent.getLayer() : null;
      }
    }, {
      key: "getStage",
      value: function getStage() {
        return this._getCache(STAGE$1, this._getStage);
      }
    }, {
      key: "_getStage",
      value: function _getStage() {
        var parent = this.getParent();

        if (parent) {
          return parent.getStage();
        } else {
          return undefined;
        }
      }
    }, {
      key: "fire",
      value: function fire(eventType) {
        var evt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var bubble = arguments.length > 2 ? arguments[2] : undefined;
        evt.target = evt.target || this;

        if (bubble) {
          this._fireAndBubble(eventType, evt);
        } else {
          this._fire(eventType, evt);
        }

        return this;
      }
    }, {
      key: "getAbsoluteTransform",
      value: function getAbsoluteTransform(top) {
        if (top) {
          return this._getAbsoluteTransform(top);
        } else {
          return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
        }
      }
    }, {
      key: "_getAbsoluteTransform",
      value: function _getAbsoluteTransform(top) {
        var at;

        if (top) {
          at = new Transform();

          this._eachAncestorReverse(function (node) {
            var transformsEnabled = node.transformsEnabled();

            if (transformsEnabled === 'all') {
              at.multiply(node.getTransform());
            } else if (transformsEnabled === 'position') {
              at.translate(node.x() - node.offsetX(), node.y() - node.offsetY());
            }
          }, top);

          return at;
        } else {
          at = this._cache.get(ABSOLUTE_TRANSFORM) || new Transform();

          if (this.parent) {
            this.parent.getAbsoluteTransform().copyInto(at);
          } else {
            at.reset();
          }

          var transformsEnabled = this.transformsEnabled();

          if (transformsEnabled === 'all') {
            at.multiply(this.getTransform());
          } else if (transformsEnabled === 'position') {
            var x = this.attrs.x || 0;
            var y = this.attrs.y || 0;
            var offsetX = this.attrs.offsetX || 0;
            var offsetY = this.attrs.offsetY || 0;
            at.translate(x - offsetX, y - offsetY);
          }

          at.dirty = false;
          return at;
        }
      }
    }, {
      key: "getAbsoluteScale",
      value: function getAbsoluteScale(top) {
        var parent = this;

        while (parent) {
          if (parent._isUnderCache) {
            top = parent;
          }

          parent = parent.getParent();
        }

        var transform = this.getAbsoluteTransform(top);
        var attrs = transform.decompose();
        return {
          x: attrs.scaleX,
          y: attrs.scaleY
        };
      }
    }, {
      key: "getAbsoluteRotation",
      value: function getAbsoluteRotation() {
        return this.getAbsoluteTransform().decompose().rotation;
      }
    }, {
      key: "getTransform",
      value: function getTransform() {
        return this._getCache(TRANSFORM, this._getTransform);
      }
    }, {
      key: "_getTransform",
      value: function _getTransform() {
        var _a, _b;

        var m = this._cache.get(TRANSFORM) || new Transform();
        m.reset();
        var x = this.x(),
            y = this.y(),
            rotation = Konva$1.getAngle(this.rotation()),
            scaleX = (_a = this.attrs.scaleX) !== null && _a !== void 0 ? _a : 1,
            scaleY = (_b = this.attrs.scaleY) !== null && _b !== void 0 ? _b : 1,
            skewX = this.attrs.skewX || 0,
            skewY = this.attrs.skewY || 0,
            offsetX = this.attrs.offsetX || 0,
            offsetY = this.attrs.offsetY || 0;

        if (x !== 0 || y !== 0) {
          m.translate(x, y);
        }

        if (rotation !== 0) {
          m.rotate(rotation);
        }

        if (skewX !== 0 || skewY !== 0) {
          m.skew(skewX, skewY);
        }

        if (scaleX !== 1 || scaleY !== 1) {
          m.scale(scaleX, scaleY);
        }

        if (offsetX !== 0 || offsetY !== 0) {
          m.translate(-1 * offsetX, -1 * offsetY);
        }

        m.dirty = false;
        return m;
      }
    }, {
      key: "clone",
      value: function clone(obj) {
        var attrs = Util.cloneObject(this.attrs),
            key,
            allListeners,
            len,
            n,
            listener;

        for (key in obj) {
          attrs[key] = obj[key];
        }

        var node = new this.constructor(attrs);

        for (key in this.eventListeners) {
          allListeners = this.eventListeners[key];
          len = allListeners.length;

          for (n = 0; n < len; n++) {
            listener = allListeners[n];

            if (listener.name.indexOf(KONVA) < 0) {
              if (!node.eventListeners[key]) {
                node.eventListeners[key] = [];
              }

              node.eventListeners[key].push(listener);
            }
          }
        }

        return node;
      }
    }, {
      key: "_toKonvaCanvas",
      value: function _toKonvaCanvas(config) {
        config = config || {};
        var box = this.getClientRect();
        var stage = this.getStage(),
            x = config.x !== undefined ? config.x : Math.floor(box.x),
            y = config.y !== undefined ? config.y : Math.floor(box.y),
            pixelRatio = config.pixelRatio || 1,
            canvas = new SceneCanvas({
          width: config.width || Math.ceil(box.width) || (stage ? stage.width() : 0),
          height: config.height || Math.ceil(box.height) || (stage ? stage.height() : 0),
          pixelRatio: pixelRatio
        }),
            context = canvas.getContext();

        if (config.imageSmoothingEnabled === false) {
          context._context.imageSmoothingEnabled = false;
        }

        context.save();

        if (x || y) {
          context.translate(-1 * x, -1 * y);
        }

        this.drawScene(canvas);
        context.restore();
        return canvas;
      }
    }, {
      key: "toCanvas",
      value: function toCanvas(config) {
        return this._toKonvaCanvas(config)._canvas;
      }
    }, {
      key: "toDataURL",
      value: function toDataURL(config) {
        config = config || {};
        var mimeType = config.mimeType || null,
            quality = config.quality || null;

        var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);

        if (config.callback) {
          config.callback(url);
        }

        return url;
      }
    }, {
      key: "toImage",
      value: function toImage(config) {
        if (!config || !config.callback) {
          throw 'callback required for toImage method config argument';
        }

        var callback = config.callback;
        delete config.callback;

        Util._urlToImage(this.toDataURL(config), function (img) {
          callback(img);
        });
      }
    }, {
      key: "setSize",
      value: function setSize(size) {
        this.width(size.width);
        this.height(size.height);
        return this;
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return {
          width: this.width(),
          height: this.height()
        };
      }
    }, {
      key: "getClassName",
      value: function getClassName() {
        return this.className || this.nodeType;
      }
    }, {
      key: "getType",
      value: function getType() {
        return this.nodeType;
      }
    }, {
      key: "getDragDistance",
      value: function getDragDistance() {
        if (this.attrs.dragDistance !== undefined) {
          return this.attrs.dragDistance;
        } else if (this.parent) {
          return this.parent.getDragDistance();
        } else {
          return Konva$1.dragDistance;
        }
      }
    }, {
      key: "_off",
      value: function _off(type, name, callback) {
        var evtListeners = this.eventListeners[type],
            i,
            evtName,
            handler;

        for (i = 0; i < evtListeners.length; i++) {
          evtName = evtListeners[i].name;
          handler = evtListeners[i].handler;

          if ((evtName !== 'konva' || name === 'konva') && (!name || evtName === name) && (!callback || callback === handler)) {
            evtListeners.splice(i, 1);

            if (evtListeners.length === 0) {
              delete this.eventListeners[type];
              break;
            }

            i--;
          }
        }
      }
    }, {
      key: "_fireChangeEvent",
      value: function _fireChangeEvent(attr, oldVal, newVal) {
        this._fire(attr + CHANGE, {
          oldVal: oldVal,
          newVal: newVal
        });
      }
    }, {
      key: "addName",
      value: function addName(name) {
        if (!this.hasName(name)) {
          var oldName = this.name();
          var newName = oldName ? oldName + ' ' + name : name;
          this.name(newName);
        }

        return this;
      }
    }, {
      key: "hasName",
      value: function hasName(name) {
        if (!name) {
          return false;
        }

        var fullName = this.name();

        if (!fullName) {
          return false;
        }

        var names = (fullName || '').split(/\s/g);
        return names.indexOf(name) !== -1;
      }
    }, {
      key: "removeName",
      value: function removeName(name) {
        var names = (this.name() || '').split(/\s/g);
        var index = names.indexOf(name);

        if (index !== -1) {
          names.splice(index, 1);
          this.name(names.join(' '));
        }

        return this;
      }
    }, {
      key: "setAttr",
      value: function setAttr(attr, val) {
        var func = this[SET + Util._capitalize(attr)];

        if (Util._isFunction(func)) {
          func.call(this, val);
        } else {
          this._setAttr(attr, val);
        }

        return this;
      }
    }, {
      key: "_requestDraw",
      value: function _requestDraw() {
        if (Konva$1.autoDrawEnabled) {
          var drawNode = this.getLayer() || this.getStage();
          drawNode === null || drawNode === void 0 ? void 0 : drawNode.batchDraw();
        }
      }
    }, {
      key: "_setAttr",
      value: function _setAttr(key, val) {
        var oldVal = this.attrs[key];

        if (oldVal === val && !Util.isObject(val)) {
          return;
        }

        if (val === undefined || val === null) {
          delete this.attrs[key];
        } else {
          this.attrs[key] = val;
        }

        if (this._shouldFireChangeEvents) {
          this._fireChangeEvent(key, oldVal, val);
        }

        this._requestDraw();
      }
    }, {
      key: "_setComponentAttr",
      value: function _setComponentAttr(key, component, val) {
        var oldVal;

        if (val !== undefined) {
          oldVal = this.attrs[key];

          if (!oldVal) {
            this.attrs[key] = this.getAttr(key);
          }

          this.attrs[key][component] = val;

          this._fireChangeEvent(key, oldVal, val);
        }
      }
    }, {
      key: "_fireAndBubble",
      value: function _fireAndBubble(eventType, evt, compareShape) {
        if (evt && this.nodeType === SHAPE) {
          evt.target = this;
        }

        var shouldStop = (eventType === MOUSEENTER$1 || eventType === MOUSELEAVE$1) && (compareShape && (this === compareShape || this.isAncestorOf && this.isAncestorOf(compareShape)) || this.nodeType === 'Stage' && !compareShape);

        if (!shouldStop) {
          this._fire(eventType, evt);

          var stopBubble = (eventType === MOUSEENTER$1 || eventType === MOUSELEAVE$1) && compareShape && compareShape.isAncestorOf && compareShape.isAncestorOf(this) && !compareShape.isAncestorOf(this.parent);

          if ((evt && !evt.cancelBubble || !evt) && this.parent && this.parent.isListening() && !stopBubble) {
            if (compareShape && compareShape.parent) {
              this._fireAndBubble.call(this.parent, eventType, evt, compareShape);
            } else {
              this._fireAndBubble.call(this.parent, eventType, evt);
            }
          }
        }
      }
    }, {
      key: "_getProtoListeners",
      value: function _getProtoListeners(eventType) {
        var listeners = this._cache.get(ALL_LISTENERS);

        if (!listeners) {
          listeners = {};
          var obj = Object.getPrototypeOf(this);

          while (obj) {
            if (!obj.eventListeners) {
              obj = Object.getPrototypeOf(obj);
              continue;
            }

            for (var event in obj.eventListeners) {
              var newEvents = obj.eventListeners[event];
              var oldEvents = listeners[event] || [];
              listeners[event] = newEvents.concat(oldEvents);
            }

            obj = Object.getPrototypeOf(obj);
          }

          this._cache.set(ALL_LISTENERS, listeners);
        }

        return listeners[eventType];
      }
    }, {
      key: "_fire",
      value: function _fire(eventType, evt) {
        evt = evt || {};
        evt.currentTarget = this;
        evt.type = eventType;

        var topListeners = this._getProtoListeners(eventType);

        if (topListeners) {
          for (var i = 0; i < topListeners.length; i++) {
            topListeners[i].handler.call(this, evt);
          }
        }

        var selfListeners = this.eventListeners[eventType];

        if (selfListeners) {
          for (var i = 0; i < selfListeners.length; i++) {
            selfListeners[i].handler.call(this, evt);
          }
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        this.drawScene();
        this.drawHit();
        return this;
      }
    }, {
      key: "_createDragElement",
      value: function _createDragElement(evt) {
        var pointerId = evt ? evt.pointerId : undefined;
        var stage = this.getStage();
        var ap = this.getAbsolutePosition();
        var pos = stage._getPointerById(pointerId) || stage._changedPointerPositions[0] || ap;

        DD._dragElements.set(this._id, {
          node: this,
          startPointerPos: pos,
          offset: {
            x: pos.x - ap.x,
            y: pos.y - ap.y
          },
          dragStatus: 'ready',
          pointerId: pointerId
        });
      }
    }, {
      key: "startDrag",
      value: function startDrag(evt) {
        var bubbleEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (!DD._dragElements.has(this._id)) {
          this._createDragElement(evt);
        }

        var elem = DD._dragElements.get(this._id);

        elem.dragStatus = 'dragging';
        this.fire('dragstart', {
          type: 'dragstart',
          target: this,
          evt: evt && evt.evt
        }, bubbleEvent);
      }
    }, {
      key: "_setDragPosition",
      value: function _setDragPosition(evt, elem) {
        var pos = this.getStage()._getPointerById(elem.pointerId);

        if (!pos) {
          return;
        }

        var newNodePos = {
          x: pos.x - elem.offset.x,
          y: pos.y - elem.offset.y
        };
        var dbf = this.dragBoundFunc();

        if (dbf !== undefined) {
          var bounded = dbf.call(this, newNodePos, evt);

          if (!bounded) {
            Util.warn('dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.');
          } else {
            newNodePos = bounded;
          }
        }

        if (!this._lastPos || this._lastPos.x !== newNodePos.x || this._lastPos.y !== newNodePos.y) {
          this.setAbsolutePosition(newNodePos);

          this._requestDraw();
        }

        this._lastPos = newNodePos;
      }
    }, {
      key: "stopDrag",
      value: function stopDrag(evt) {
        var elem = DD._dragElements.get(this._id);

        if (elem) {
          elem.dragStatus = 'stopped';
        }

        DD._endDragBefore(evt);

        DD._endDragAfter(evt);
      }
    }, {
      key: "setDraggable",
      value: function setDraggable(draggable) {
        this._setAttr('draggable', draggable);

        this._dragChange();
      }
    }, {
      key: "isDragging",
      value: function isDragging() {
        var elem = DD._dragElements.get(this._id);

        return elem ? elem.dragStatus === 'dragging' : false;
      }
    }, {
      key: "_listenDrag",
      value: function _listenDrag() {
        this._dragCleanup();

        this.on('mousedown.konva touchstart.konva', function (evt) {
          var _this4 = this;

          var shouldCheckButton = evt.evt['button'] !== undefined;
          var canDrag = !shouldCheckButton || Konva$1.dragButtons.indexOf(evt.evt['button']) >= 0;

          if (!canDrag) {
            return;
          }

          if (this.isDragging()) {
            return;
          }

          var hasDraggingChild = false;

          DD._dragElements.forEach(function (elem) {
            if (_this4.isAncestorOf(elem.node)) {
              hasDraggingChild = true;
            }
          });

          if (!hasDraggingChild) {
            this._createDragElement(evt);
          }
        });
      }
    }, {
      key: "_dragChange",
      value: function _dragChange() {
        if (this.attrs.draggable) {
          this._listenDrag();
        } else {
          this._dragCleanup();

          var stage = this.getStage();

          if (!stage) {
            return;
          }

          var dragElement = DD._dragElements.get(this._id);

          var isDragging = dragElement && dragElement.dragStatus === 'dragging';
          var isReady = dragElement && dragElement.dragStatus === 'ready';

          if (isDragging) {
            this.stopDrag();
          } else if (isReady) {
            DD._dragElements.delete(this._id);
          }
        }
      }
    }, {
      key: "_dragCleanup",
      value: function _dragCleanup() {
        this.off('mousedown.konva');
        this.off('touchstart.konva');
      }
    }, {
      key: "isClientRectOnScreen",
      value: function isClientRectOnScreen() {
        var margin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          x: 0,
          y: 0
        };
        var stage = this.getStage();

        if (!stage) {
          return false;
        }

        var screenRect = {
          x: -margin.x,
          y: -margin.y,
          width: stage.width() + 2 * margin.x,
          height: stage.height() + 2 * margin.y
        };
        return Util.haveIntersection(screenRect, this.getClientRect());
      }
    }], [{
      key: "create",
      value: function create(data, container) {
        if (Util._isString(data)) {
          data = JSON.parse(data);
        }

        return this._createNode(data, container);
      }
    }, {
      key: "_createNode",
      value: function _createNode(obj, container) {
        var className = Node.prototype.getClassName.call(obj),
            children = obj.children,
            no,
            len,
            n;

        if (container) {
          obj.attrs.container = container;
        }

        if (!Konva$1[className]) {
          Util.warn('Can not find a node with class name "' + className + '". Fallback to "Shape".');
          className = 'Shape';
        }

        var Class = Konva$1[className];
        no = new Class(obj.attrs);

        if (children) {
          len = children.length;

          for (n = 0; n < len; n++) {
            no.add(Node._createNode(children[n]));
          }
        }

        return no;
      }
    }]);

    return Node;
  }();
  Node.prototype.nodeType = 'Node';
  Node.prototype._attrsAffectingSize = [];
  Node.prototype.eventListeners = {};
  Node.prototype.on.call(Node.prototype, TRANSFORM_CHANGE_STR, function () {
    if (this._batchingTransformChange) {
      this._needClearTransformCache = true;
      return;
    }

    this._clearCache(TRANSFORM);

    this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
  });
  Node.prototype.on.call(Node.prototype, 'visibleChange.konva', function () {
    this._clearSelfAndDescendantCache(VISIBLE);
  });
  Node.prototype.on.call(Node.prototype, 'listeningChange.konva', function () {
    this._clearSelfAndDescendantCache(LISTENING);
  });
  Node.prototype.on.call(Node.prototype, 'opacityChange.konva', function () {
    this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
  });
  var addGetterSetter = Factory.addGetterSetter;
  addGetterSetter(Node, 'zIndex');
  addGetterSetter(Node, 'absolutePosition');
  addGetterSetter(Node, 'position');
  addGetterSetter(Node, 'x', 0, getNumberValidator());
  addGetterSetter(Node, 'y', 0, getNumberValidator());
  addGetterSetter(Node, 'globalCompositeOperation', 'source-over', getStringValidator());
  addGetterSetter(Node, 'opacity', 1, getNumberValidator());
  addGetterSetter(Node, 'name', '', getStringValidator());
  addGetterSetter(Node, 'id', '', getStringValidator());
  addGetterSetter(Node, 'rotation', 0, getNumberValidator());
  Factory.addComponentsGetterSetter(Node, 'scale', ['x', 'y']);
  addGetterSetter(Node, 'scaleX', 1, getNumberValidator());
  addGetterSetter(Node, 'scaleY', 1, getNumberValidator());
  Factory.addComponentsGetterSetter(Node, 'skew', ['x', 'y']);
  addGetterSetter(Node, 'skewX', 0, getNumberValidator());
  addGetterSetter(Node, 'skewY', 0, getNumberValidator());
  Factory.addComponentsGetterSetter(Node, 'offset', ['x', 'y']);
  addGetterSetter(Node, 'offsetX', 0, getNumberValidator());
  addGetterSetter(Node, 'offsetY', 0, getNumberValidator());
  addGetterSetter(Node, 'dragDistance', null, getNumberValidator());
  addGetterSetter(Node, 'width', 0, getNumberValidator());
  addGetterSetter(Node, 'height', 0, getNumberValidator());
  addGetterSetter(Node, 'listening', true, getBooleanValidator());
  addGetterSetter(Node, 'preventDefault', true, getBooleanValidator());
  addGetterSetter(Node, 'filters', null, function (val) {
    this._filterUpToDate = false;
    return val;
  });
  addGetterSetter(Node, 'visible', true, getBooleanValidator());
  addGetterSetter(Node, 'transformsEnabled', 'all', getStringValidator());
  addGetterSetter(Node, 'size');
  addGetterSetter(Node, 'dragBoundFunc');
  addGetterSetter(Node, 'draggable', false, getBooleanValidator());
  Factory.backCompat(Node, {
    rotateDeg: 'rotate',
    setRotationDeg: 'setRotation',
    getRotationDeg: 'getRotation'
  });

  var Captures = new Map();
  var SUPPORT_POINTER_EVENTS = Konva$1._global['PointerEvent'] !== undefined;
  function getCapturedShape(pointerId) {
    return Captures.get(pointerId);
  }
  function createEvent(evt) {
    return {
      evt: evt,
      pointerId: evt.pointerId
    };
  }
  function hasPointerCapture(pointerId, shape) {
    return Captures.get(pointerId) === shape;
  }
  function setPointerCapture(pointerId, shape) {
    releaseCapture(pointerId);
    var stage = shape.getStage();
    if (!stage) return;
    Captures.set(pointerId, shape);

    if (SUPPORT_POINTER_EVENTS) {
      shape._fire('gotpointercapture', createEvent(new PointerEvent('gotpointercapture')));
    }
  }
  function releaseCapture(pointerId, target) {
    var shape = Captures.get(pointerId);
    if (!shape) return;
    var stage = shape.getStage();

    if (stage && stage.content) ;

    Captures.delete(pointerId);

    if (SUPPORT_POINTER_EVENTS) {
      shape._fire('lostpointercapture', createEvent(new PointerEvent('lostpointercapture')));
    }
  }

  var HAS_SHADOW = 'hasShadow';
  var SHADOW_RGBA = 'shadowRGBA';
  var patternImage = 'patternImage';
  var linearGradient = 'linearGradient';
  var radialGradient = 'radialGradient';
  var dummyContext$1;

  function getDummyContext$1() {
    if (dummyContext$1) {
      return dummyContext$1;
    }

    dummyContext$1 = Util.createCanvasElement().getContext('2d');
    return dummyContext$1;
  }

  var shapes = {};

  function _fillFunc$1(context) {
    context.fill();
  }

  function _strokeFunc$1(context) {
    context.stroke();
  }

  function _fillFuncHit(context) {
    context.fill();
  }

  function _strokeFuncHit(context) {
    context.stroke();
  }

  function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
  }

  function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
  }

  function _clearFillPatternCache() {
    this._clearCache(patternImage);
  }

  function _clearLinearGradientCache() {
    this._clearCache(linearGradient);
  }

  function _clearRadialGradientCache() {
    this._clearCache(radialGradient);
  }

  var Shape = /*#__PURE__*/function (_Node) {
    _inherits(Shape, _Node);

    var _super = _createSuper(Shape);

    function Shape(config) {
      var _this;

      _classCallCheck(this, Shape);

      _this = _super.call(this, config);
      var key;

      while (true) {
        key = Util.getRandomColor();

        if (key && !(key in shapes)) {
          break;
        }
      }

      _this.colorKey = key;
      shapes[key] = _assertThisInitialized(_this);
      return _this;
    }

    _createClass(Shape, [{
      key: "getContext",
      value: function getContext() {
        Util.warn('shape.getContext() method is deprecated. Please do not use it.');
        return this.getLayer().getContext();
      }
    }, {
      key: "getCanvas",
      value: function getCanvas() {
        Util.warn('shape.getCanvas() method is deprecated. Please do not use it.');
        return this.getLayer().getCanvas();
      }
    }, {
      key: "getSceneFunc",
      value: function getSceneFunc() {
        return this.attrs.sceneFunc || this['_sceneFunc'];
      }
    }, {
      key: "getHitFunc",
      value: function getHitFunc() {
        return this.attrs.hitFunc || this['_hitFunc'];
      }
    }, {
      key: "hasShadow",
      value: function hasShadow() {
        return this._getCache(HAS_SHADOW, this._hasShadow);
      }
    }, {
      key: "_hasShadow",
      value: function _hasShadow() {
        return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
      }
    }, {
      key: "_getFillPattern",
      value: function _getFillPattern() {
        return this._getCache(patternImage, this.__getFillPattern);
      }
    }, {
      key: "__getFillPattern",
      value: function __getFillPattern() {
        if (this.fillPatternImage()) {
          var ctx = getDummyContext$1();
          var pattern = ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || 'repeat');

          if (pattern && pattern.setTransform) {
            var tr = new Transform();
            tr.translate(this.fillPatternX(), this.fillPatternY());
            tr.rotate(Konva$1.getAngle(this.fillPatternRotation()));
            tr.scale(this.fillPatternScaleX(), this.fillPatternScaleY());
            tr.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
            var m = tr.getMatrix();
            var matrix = typeof DOMMatrix === 'undefined' ? {
              a: m[0],
              b: m[1],
              c: m[2],
              d: m[3],
              e: m[4],
              f: m[5]
            } : new DOMMatrix(m);
            pattern.setTransform(matrix);
          }

          return pattern;
        }
      }
    }, {
      key: "_getLinearGradient",
      value: function _getLinearGradient() {
        return this._getCache(linearGradient, this.__getLinearGradient);
      }
    }, {
      key: "__getLinearGradient",
      value: function __getLinearGradient() {
        var colorStops = this.fillLinearGradientColorStops();

        if (colorStops) {
          var ctx = getDummyContext$1();
          var start = this.fillLinearGradientStartPoint();
          var end = this.fillLinearGradientEndPoint();
          var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);

          for (var n = 0; n < colorStops.length; n += 2) {
            grd.addColorStop(colorStops[n], colorStops[n + 1]);
          }

          return grd;
        }
      }
    }, {
      key: "_getRadialGradient",
      value: function _getRadialGradient() {
        return this._getCache(radialGradient, this.__getRadialGradient);
      }
    }, {
      key: "__getRadialGradient",
      value: function __getRadialGradient() {
        var colorStops = this.fillRadialGradientColorStops();

        if (colorStops) {
          var ctx = getDummyContext$1();
          var start = this.fillRadialGradientStartPoint();
          var end = this.fillRadialGradientEndPoint();
          var grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());

          for (var n = 0; n < colorStops.length; n += 2) {
            grd.addColorStop(colorStops[n], colorStops[n + 1]);
          }

          return grd;
        }
      }
    }, {
      key: "getShadowRGBA",
      value: function getShadowRGBA() {
        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
      }
    }, {
      key: "_getShadowRGBA",
      value: function _getShadowRGBA() {
        if (this.hasShadow()) {
          var rgba = Util.colorToRGBA(this.shadowColor());
          return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a * (this.shadowOpacity() || 1) + ')';
        }
      }
    }, {
      key: "hasFill",
      value: function hasFill() {
        var _this2 = this;

        return this._calculate('hasFill', ['fillEnabled', 'fill', 'fillPatternImage', 'fillLinearGradientColorStops', 'fillRadialGradientColorStops'], function () {
          return _this2.fillEnabled() && !!(_this2.fill() || _this2.fillPatternImage() || _this2.fillLinearGradientColorStops() || _this2.fillRadialGradientColorStops());
        });
      }
    }, {
      key: "hasStroke",
      value: function hasStroke() {
        var _this3 = this;

        return this._calculate('hasStroke', ['strokeEnabled', 'strokeWidth', 'stroke', 'strokeLinearGradientColorStops'], function () {
          return _this3.strokeEnabled() && _this3.strokeWidth() && !!(_this3.stroke() || _this3.strokeLinearGradientColorStops());
        });
      }
    }, {
      key: "hasHitStroke",
      value: function hasHitStroke() {
        var width = this.hitStrokeWidth();

        if (width === 'auto') {
          return this.hasStroke();
        }

        return this.strokeEnabled() && !!width;
      }
    }, {
      key: "intersects",
      value: function intersects(point) {
        var stage = this.getStage(),
            bufferHitCanvas = stage.bufferHitCanvas,
            p;
        bufferHitCanvas.getContext().clear();
        this.drawHit(bufferHitCanvas, null, true);
        p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
        return p[3] > 0;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        Node.prototype.destroy.call(this);
        delete shapes[this.colorKey];
        delete this.colorKey;
        return this;
      }
    }, {
      key: "_useBufferCanvas",
      value: function _useBufferCanvas(forceFill) {
        var _a;

        if (!this.getStage()) {
          return false;
        }

        var perfectDrawEnabled = (_a = this.attrs.perfectDrawEnabled) !== null && _a !== void 0 ? _a : true;

        if (!perfectDrawEnabled) {
          return false;
        }

        var hasFill = forceFill || this.hasFill();
        var hasStroke = this.hasStroke();
        var isTransparent = this.getAbsoluteOpacity() !== 1;

        if (hasFill && hasStroke && isTransparent) {
          return true;
        }

        var hasShadow = this.hasShadow();
        var strokeForShadow = this.shadowForStrokeEnabled();

        if (hasFill && hasStroke && hasShadow && strokeForShadow) {
          return true;
        }

        return false;
      }
    }, {
      key: "setStrokeHitEnabled",
      value: function setStrokeHitEnabled(val) {
        Util.warn('strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.');

        if (val) {
          this.hitStrokeWidth('auto');
        } else {
          this.hitStrokeWidth(0);
        }
      }
    }, {
      key: "getStrokeHitEnabled",
      value: function getStrokeHitEnabled() {
        if (this.hitStrokeWidth() === 0) {
          return false;
        } else {
          return true;
        }
      }
    }, {
      key: "getSelfRect",
      value: function getSelfRect() {
        var size = this.size();
        return {
          x: this._centroid ? -size.width / 2 : 0,
          y: this._centroid ? -size.height / 2 : 0,
          width: size.width,
          height: size.height
        };
      }
    }, {
      key: "getClientRect",
      value: function getClientRect() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var skipTransform = config.skipTransform;
        var relativeTo = config.relativeTo;
        var fillRect = this.getSelfRect();
        var applyStroke = !config.skipStroke && this.hasStroke();
        var strokeWidth = applyStroke && this.strokeWidth() || 0;
        var fillAndStrokeWidth = fillRect.width + strokeWidth;
        var fillAndStrokeHeight = fillRect.height + strokeWidth;
        var applyShadow = !config.skipShadow && this.hasShadow();
        var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
        var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
        var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
        var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
        var blurRadius = applyShadow && this.shadowBlur() || 0;
        var width = preWidth + blurRadius * 2;
        var height = preHeight + blurRadius * 2;
        var rect = {
          width: width,
          height: height,
          x: -(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetX, 0) + fillRect.x,
          y: -(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetY, 0) + fillRect.y
        };

        if (!skipTransform) {
          return this._transformedRect(rect, relativeTo);
        }

        return rect;
      }
    }, {
      key: "drawScene",
      value: function drawScene(can, top) {
        var layer = this.getLayer(),
            canvas = can || layer.getCanvas(),
            context = canvas.getContext(),
            cachedCanvas = this._getCanvasCache(),
            drawFunc = this.getSceneFunc(),
            hasShadow = this.hasShadow(),
            stage,
            bufferCanvas,
            bufferContext;

        var skipBuffer = canvas.isCache;
        var cachingSelf = top === this;

        if (!this.isVisible() && !cachingSelf) {
          return this;
        }

        if (cachedCanvas) {
          context.save();
          var m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);

          this._drawCachedSceneCanvas(context);

          context.restore();
          return this;
        }

        if (!drawFunc) {
          return this;
        }

        context.save();

        if (this._useBufferCanvas() && !skipBuffer) {
          stage = this.getStage();
          bufferCanvas = stage.bufferCanvas;
          bufferContext = bufferCanvas.getContext();
          bufferContext.clear();
          bufferContext.save();

          bufferContext._applyLineJoin(this);

          var o = this.getAbsoluteTransform(top).getMatrix();
          bufferContext.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
          drawFunc.call(this, bufferContext, this);
          bufferContext.restore();
          var ratio = bufferCanvas.pixelRatio;

          if (hasShadow) {
            context._applyShadow(this);
          }

          context._applyOpacity(this);

          context._applyGlobalCompositeOperation(this);

          context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
        } else {
          context._applyLineJoin(this);

          if (!cachingSelf) {
            var o = this.getAbsoluteTransform(top).getMatrix();
            context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);

            context._applyOpacity(this);

            context._applyGlobalCompositeOperation(this);
          }

          if (hasShadow) {
            context._applyShadow(this);
          }

          drawFunc.call(this, context, this);
        }

        context.restore();
        return this;
      }
    }, {
      key: "drawHit",
      value: function drawHit(can, top) {
        var skipDragCheck = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!this.shouldDrawHit(top, skipDragCheck)) {
          return this;
        }

        var layer = this.getLayer(),
            canvas = can || layer.hitCanvas,
            context = canvas && canvas.getContext(),
            drawFunc = this.hitFunc() || this.sceneFunc(),
            cachedCanvas = this._getCanvasCache(),
            cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

        if (!this.colorKey) {
          Util.warn('Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()');
        }

        if (cachedHitCanvas) {
          context.save();
          var m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);

          this._drawCachedHitCanvas(context);

          context.restore();
          return this;
        }

        if (!drawFunc) {
          return this;
        }

        context.save();

        context._applyLineJoin(this);

        var selfCache = this === top;

        if (!selfCache) {
          var o = this.getAbsoluteTransform(top).getMatrix();
          context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
        }

        drawFunc.call(this, context, this);
        context.restore();
        return this;
      }
    }, {
      key: "drawHitFromCache",
      value: function drawHitFromCache() {
        var alphaThreshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var cachedCanvas = this._getCanvasCache(),
            sceneCanvas = this._getCachedSceneCanvas(),
            hitCanvas = cachedCanvas.hit,
            hitContext = hitCanvas.getContext(),
            hitWidth = hitCanvas.getWidth(),
            hitHeight = hitCanvas.getHeight(),
            hitImageData,
            hitData,
            len,
            rgbColorKey,
            i,
            alpha;

        hitContext.clear();
        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);

        try {
          hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
          hitData = hitImageData.data;
          len = hitData.length;
          rgbColorKey = Util._hexToRgb(this.colorKey);

          for (i = 0; i < len; i += 4) {
            alpha = hitData[i + 3];

            if (alpha > alphaThreshold) {
              hitData[i] = rgbColorKey.r;
              hitData[i + 1] = rgbColorKey.g;
              hitData[i + 2] = rgbColorKey.b;
              hitData[i + 3] = 255;
            } else {
              hitData[i + 3] = 0;
            }
          }

          hitContext.putImageData(hitImageData, 0, 0);
        } catch (e) {
          Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
        }

        return this;
      }
    }, {
      key: "hasPointerCapture",
      value: function hasPointerCapture$1(pointerId) {
        return hasPointerCapture(pointerId, this);
      }
    }, {
      key: "setPointerCapture",
      value: function setPointerCapture$1(pointerId) {
        setPointerCapture(pointerId, this);
      }
    }, {
      key: "releaseCapture",
      value: function releaseCapture$1(pointerId) {
        releaseCapture(pointerId);
      }
    }]);

    return Shape;
  }(Node);
  Shape.prototype._fillFunc = _fillFunc$1;
  Shape.prototype._strokeFunc = _strokeFunc$1;
  Shape.prototype._fillFuncHit = _fillFuncHit;
  Shape.prototype._strokeFuncHit = _strokeFuncHit;
  Shape.prototype._centroid = false;
  Shape.prototype.nodeType = 'Shape';

  _registerNode(Shape);

  Shape.prototype.eventListeners = {};
  Shape.prototype.on.call(Shape.prototype, 'shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearHasShadowCache);
  Shape.prototype.on.call(Shape.prototype, 'shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearGetShadowRGBACache);
  Shape.prototype.on.call(Shape.prototype, 'fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva', _clearFillPatternCache);
  Shape.prototype.on.call(Shape.prototype, 'fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva', _clearLinearGradientCache);
  Shape.prototype.on.call(Shape.prototype, 'fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva', _clearRadialGradientCache);
  Factory.addGetterSetter(Shape, 'stroke', undefined, getStringOrGradientValidator());
  Factory.addGetterSetter(Shape, 'strokeWidth', 2, getNumberValidator());
  Factory.addGetterSetter(Shape, 'fillAfterStrokeEnabled', false);
  Factory.addGetterSetter(Shape, 'hitStrokeWidth', 'auto', getNumberOrAutoValidator());
  Factory.addGetterSetter(Shape, 'strokeHitEnabled', true, getBooleanValidator());
  Factory.addGetterSetter(Shape, 'perfectDrawEnabled', true, getBooleanValidator());
  Factory.addGetterSetter(Shape, 'shadowForStrokeEnabled', true, getBooleanValidator());
  Factory.addGetterSetter(Shape, 'lineJoin');
  Factory.addGetterSetter(Shape, 'lineCap');
  Factory.addGetterSetter(Shape, 'sceneFunc');
  Factory.addGetterSetter(Shape, 'hitFunc');
  Factory.addGetterSetter(Shape, 'dash');
  Factory.addGetterSetter(Shape, 'dashOffset', 0, getNumberValidator());
  Factory.addGetterSetter(Shape, 'shadowColor', undefined, getStringValidator());
  Factory.addGetterSetter(Shape, 'shadowBlur', 0, getNumberValidator());
  Factory.addGetterSetter(Shape, 'shadowOpacity', 1, getNumberValidator());
  Factory.addComponentsGetterSetter(Shape, 'shadowOffset', ['x', 'y']);
  Factory.addGetterSetter(Shape, 'shadowOffsetX', 0, getNumberValidator());
  Factory.addGetterSetter(Shape, 'shadowOffsetY', 0, getNumberValidator());
  Factory.addGetterSetter(Shape, 'fillPatternImage');
  Factory.addGetterSetter(Shape, 'fill', undefined, getStringOrGradientValidator());
  Factory.addGetterSetter(Shape, 'fillPatternX', 0, getNumberValidator());
  Factory.addGetterSetter(Shape, 'fillPatternY', 0, getNumberValidator());
  Factory.addGetterSetter(Shape, 'fillLinearGradientColorStops');
  Factory.addGetterSetter(Shape, 'strokeLinearGradientColorStops');
  Factory.addGetterSetter(Shape, 'fillRadialGradientStartRadius', 0);
  Factory.addGetterSetter(Shape, 'fillRadialGradientEndRadius', 0);
  Factory.addGetterSetter(Shape, 'fillRadialGradientColorStops');
  Factory.addGetterSetter(Shape, 'fillPatternRepeat', 'repeat');
  Factory.addGetterSetter(Shape, 'fillEnabled', true);
  Factory.addGetterSetter(Shape, 'strokeEnabled', true);
  Factory.addGetterSetter(Shape, 'shadowEnabled', true);
  Factory.addGetterSetter(Shape, 'dashEnabled', true);
  Factory.addGetterSetter(Shape, 'strokeScaleEnabled', true);
  Factory.addGetterSetter(Shape, 'fillPriority', 'color');
  Factory.addComponentsGetterSetter(Shape, 'fillPatternOffset', ['x', 'y']);
  Factory.addGetterSetter(Shape, 'fillPatternOffsetX', 0, getNumberValidator());
  Factory.addGetterSetter(Shape, 'fillPatternOffsetY', 0, getNumberValidator());
  Factory.addComponentsGetterSetter(Shape, 'fillPatternScale', ['x', 'y']);
  Factory.addGetterSetter(Shape, 'fillPatternScaleX', 1, getNumberValidator());
  Factory.addGetterSetter(Shape, 'fillPatternScaleY', 1, getNumberValidator());
  Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientStartPoint', ['x', 'y']);
  Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientStartPoint', ['x', 'y']);
  Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointX', 0);
  Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointX', 0);
  Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointY', 0);
  Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointY', 0);
  Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientEndPoint', ['x', 'y']);
  Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientEndPoint', ['x', 'y']);
  Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointX', 0);
  Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointX', 0);
  Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointY', 0);
  Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointY', 0);
  Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientStartPoint', ['x', 'y']);
  Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointX', 0);
  Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointY', 0);
  Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientEndPoint', ['x', 'y']);
  Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointX', 0);
  Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointY', 0);
  Factory.addGetterSetter(Shape, 'fillPatternRotation', 0);
  Factory.backCompat(Shape, {
    dashArray: 'dash',
    getDashArray: 'getDash',
    setDashArray: 'getDash',
    drawFunc: 'sceneFunc',
    getDrawFunc: 'getSceneFunc',
    setDrawFunc: 'setSceneFunc',
    drawHitFunc: 'hitFunc',
    getDrawHitFunc: 'getHitFunc',
    setDrawHitFunc: 'setHitFunc'
  });

  function getControlPoints(x0, y0, x1, y1, x2, y2, t) {
    var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)),
        d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        fa = t * d01 / (d01 + d12),
        fb = t * d12 / (d01 + d12),
        p1x = x1 - fa * (x2 - x0),
        p1y = y1 - fa * (y2 - y0),
        p2x = x1 + fb * (x2 - x0),
        p2y = y1 + fb * (y2 - y0);
    return [p1x, p1y, p2x, p2y];
  }

  function expandPoints(p, tension) {
    var len = p.length,
        allPoints = [],
        n,
        cp;

    for (n = 2; n < len - 2; n += 2) {
      cp = getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);

      if (isNaN(cp[0])) {
        continue;
      }

      allPoints.push(cp[0]);
      allPoints.push(cp[1]);
      allPoints.push(p[n]);
      allPoints.push(p[n + 1]);
      allPoints.push(cp[2]);
      allPoints.push(cp[3]);
    }

    return allPoints;
  }

  var Line = /*#__PURE__*/function (_Shape) {
    _inherits(Line, _Shape);

    var _super = _createSuper(Line);

    function Line(config) {
      var _this;

      _classCallCheck(this, Line);

      _this = _super.call(this, config);

      _this.on('pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva', function () {
        this._clearCache('tensionPoints');
      });

      return _this;
    }

    _createClass(Line, [{
      key: "_sceneFunc",
      value: function _sceneFunc(context) {
        var points = this.points(),
            length = points.length,
            tension = this.tension(),
            closed = this.closed(),
            bezier = this.bezier(),
            tp,
            len,
            n;

        if (!length) {
          return;
        }

        context.beginPath();
        context.moveTo(points[0], points[1]);

        if (tension !== 0 && length > 4) {
          tp = this.getTensionPoints();
          len = tp.length;
          n = closed ? 0 : 4;

          if (!closed) {
            context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
          }

          while (n < len - 2) {
            context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
          }

          if (!closed) {
            context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
          }
        } else if (bezier) {
          n = 2;

          while (n < length) {
            context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
          }
        } else {
          for (n = 2; n < length; n += 2) {
            context.lineTo(points[n], points[n + 1]);
          }
        }

        if (closed) {
          context.closePath();
          context.fillStrokeShape(this);
        } else {
          context.strokeShape(this);
        }
      }
    }, {
      key: "getTensionPoints",
      value: function getTensionPoints() {
        return this._getCache('tensionPoints', this._getTensionPoints);
      }
    }, {
      key: "_getTensionPoints",
      value: function _getTensionPoints() {
        if (this.closed()) {
          return this._getTensionPointsClosed();
        } else {
          return expandPoints(this.points(), this.tension());
        }
      }
    }, {
      key: "_getTensionPointsClosed",
      value: function _getTensionPointsClosed() {
        var p = this.points(),
            len = p.length,
            tension = this.tension(),
            firstControlPoints = getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension),
            lastControlPoints = getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension),
            middle = expandPoints(p, tension),
            tp = [firstControlPoints[2], firstControlPoints[3]].concat(middle).concat([lastControlPoints[0], lastControlPoints[1], p[len - 2], p[len - 1], lastControlPoints[2], lastControlPoints[3], firstControlPoints[0], firstControlPoints[1], p[0], p[1]]);
        return tp;
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        return this.getSelfRect().width;
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        return this.getSelfRect().height;
      }
    }, {
      key: "getSelfRect",
      value: function getSelfRect() {
        var points = this.points();

        if (points.length < 4) {
          return {
            x: points[0] || 0,
            y: points[1] || 0,
            width: 0,
            height: 0
          };
        }

        if (this.tension() !== 0) {
          points = [points[0], points[1]].concat(_toConsumableArray(this._getTensionPoints()), [points[points.length - 2], points[points.length - 1]]);
        } else {
          points = this.points();
        }

        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x, y;

        for (var i = 0; i < points.length / 2; i++) {
          x = points[i * 2];
          y = points[i * 2 + 1];
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }

        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }
    }]);

    return Line;
  }(Shape);
  Line.prototype.className = 'Line';
  Line.prototype._attrsAffectingSize = ['points', 'bezier', 'tension'];

  _registerNode(Line);

  Factory.addGetterSetter(Line, 'closed', false);
  Factory.addGetterSetter(Line, 'bezier', false);
  Factory.addGetterSetter(Line, 'tension', 0, getNumberValidator());
  Factory.addGetterSetter(Line, 'points', [], getNumberArrayValidator());

  var Rect = /*#__PURE__*/function (_Shape) {
    _inherits(Rect, _Shape);

    var _super = _createSuper(Rect);

    function Rect() {
      _classCallCheck(this, Rect);

      return _super.apply(this, arguments);
    }

    _createClass(Rect, [{
      key: "_sceneFunc",
      value: function _sceneFunc(context) {
        var cornerRadius = this.cornerRadius(),
            width = this.width(),
            height = this.height();
        context.beginPath();

        if (!cornerRadius) {
          context.rect(0, 0, width, height);
        } else {
          var topLeft = 0;
          var topRight = 0;
          var bottomLeft = 0;
          var bottomRight = 0;

          if (typeof cornerRadius === 'number') {
            topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
          } else {
            topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
            topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
            bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
            bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
          }

          context.moveTo(topLeft, 0);
          context.lineTo(width - topRight, 0);
          context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
          context.lineTo(width, height - bottomRight);
          context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
          context.lineTo(bottomLeft, height);
          context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
          context.lineTo(0, topLeft);
          context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
        }

        context.closePath();
        context.fillStrokeShape(this);
      }
    }]);

    return Rect;
  }(Shape);
  Rect.prototype.className = 'Rect';

  _registerNode(Rect);

  Factory.addGetterSetter(Rect, 'cornerRadius', 0, getNumberOrArrayOfNumbersValidator(4));

  function stringToArray(string) {
    return Array.from(string);
  }
  var AUTO = 'auto',
      CENTER = 'center',
      JUSTIFY = 'justify',
      CHANGE_KONVA = 'Change.konva',
      CONTEXT_2D = '2d',
      DASH = '-',
      LEFT = 'left',
      TEXT = 'text',
      TEXT_UPPER = 'Text',
      TOP = 'top',
      BOTTOM = 'bottom',
      MIDDLE = 'middle',
      NORMAL = 'normal',
      PX_SPACE = 'px ',
      SPACE = ' ',
      RIGHT = 'right',
      WORD = 'word',
      CHAR = 'char',
      NONE = 'none',
      ELLIPSIS = '…',
      ATTR_CHANGE_LIST = ['fontFamily', 'fontSize', 'fontStyle', 'fontVariant', 'padding', 'align', 'verticalAlign', 'lineHeight', 'text', 'width', 'height', 'wrap', 'ellipsis', 'letterSpacing'],
      attrChangeListLen = ATTR_CHANGE_LIST.length;

  function normalizeFontFamily(fontFamily) {
    return fontFamily.split(',').map(function (family) {
      family = family.trim();
      var hasSpace = family.indexOf(' ') >= 0;
      var hasQuotes = family.indexOf('"') >= 0 || family.indexOf("'") >= 0;

      if (hasSpace && !hasQuotes) {
        family = "\"".concat(family, "\"");
      }

      return family;
    }).join(', ');
  }

  var dummyContext;

  function getDummyContext() {
    if (dummyContext) {
      return dummyContext;
    }

    dummyContext = Util.createCanvasElement().getContext(CONTEXT_2D);
    return dummyContext;
  }

  function _fillFunc(context) {
    context.fillText(this._partialText, this._partialTextX, this._partialTextY);
  }

  function _strokeFunc(context) {
    context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
  }

  function checkDefaultFill(config) {
    config = config || {};

    if (!config.fillLinearGradientColorStops && !config.fillRadialGradientColorStops && !config.fillPatternImage) {
      config.fill = config.fill || 'black';
    }

    return config;
  }

  var Text = /*#__PURE__*/function (_Shape) {
    _inherits(Text, _Shape);

    var _super = _createSuper(Text);

    function Text(config) {
      var _this;

      _classCallCheck(this, Text);

      _this = _super.call(this, checkDefaultFill(config));
      _this._partialTextX = 0;
      _this._partialTextY = 0;

      for (var n = 0; n < attrChangeListLen; n++) {
        _this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, _this._setTextData);
      }

      _this._setTextData();

      return _this;
    }

    _createClass(Text, [{
      key: "_sceneFunc",
      value: function _sceneFunc(context) {
        var textArr = this.textArr,
            textArrLen = textArr.length;

        if (!this.text()) {
          return;
        }

        var padding = this.padding(),
            fontSize = this.fontSize(),
            lineHeightPx = this.lineHeight() * fontSize,
            verticalAlign = this.verticalAlign(),
            alignY = 0,
            align = this.align(),
            totalWidth = this.getWidth(),
            letterSpacing = this.letterSpacing(),
            fill = this.fill(),
            textDecoration = this.textDecoration(),
            shouldUnderline = textDecoration.indexOf('underline') !== -1,
            shouldLineThrough = textDecoration.indexOf('line-through') !== -1,
            n;
        var translateY = 0;
        var translateY = lineHeightPx / 2;
        var lineTranslateX = 0;
        var lineTranslateY = 0;
        context.setAttr('font', this._getContextFont());
        context.setAttr('textBaseline', MIDDLE);
        context.setAttr('textAlign', LEFT);

        if (verticalAlign === MIDDLE) {
          alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
        } else if (verticalAlign === BOTTOM) {
          alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
        }

        context.translate(padding, alignY + padding);

        for (n = 0; n < textArrLen; n++) {
          var lineTranslateX = 0;
          var lineTranslateY = 0;
          var obj = textArr[n],
              text = obj.text,
              width = obj.width,
              lastLine = obj.lastInParagraph,
              spacesNumber,
              oneWord,
              lineWidth;
          context.save();

          if (align === RIGHT) {
            lineTranslateX += totalWidth - width - padding * 2;
          } else if (align === CENTER) {
            lineTranslateX += (totalWidth - width - padding * 2) / 2;
          }

          if (shouldUnderline) {
            context.save();
            context.beginPath();
            context.moveTo(lineTranslateX, translateY + lineTranslateY + Math.round(fontSize / 2));
            spacesNumber = text.split(' ').length - 1;
            oneWord = spacesNumber === 0;
            lineWidth = align === JUSTIFY && lastLine && !oneWord ? totalWidth - padding * 2 : width;
            context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + Math.round(fontSize / 2));
            context.lineWidth = fontSize / 15;
            context.strokeStyle = fill;
            context.stroke();
            context.restore();
          }

          if (shouldLineThrough) {
            context.save();
            context.beginPath();
            context.moveTo(lineTranslateX, translateY + lineTranslateY);
            spacesNumber = text.split(' ').length - 1;
            oneWord = spacesNumber === 0;
            lineWidth = align === JUSTIFY && lastLine && !oneWord ? totalWidth - padding * 2 : width;
            context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY);
            context.lineWidth = fontSize / 15;
            context.strokeStyle = fill;
            context.stroke();
            context.restore();
          }

          if (letterSpacing !== 0 || align === JUSTIFY) {
            spacesNumber = text.split(' ').length - 1;
            var array = stringToArray(text);

            for (var li = 0; li < array.length; li++) {
              var letter = array[li];

              if (letter === ' ' && !lastLine && align === JUSTIFY) {
                lineTranslateX += (totalWidth - padding * 2 - width) / spacesNumber;
              }

              this._partialTextX = lineTranslateX;
              this._partialTextY = translateY + lineTranslateY;
              this._partialText = letter;
              context.fillStrokeShape(this);
              lineTranslateX += this.measureSize(letter).width + letterSpacing;
            }
          } else {
            this._partialTextX = lineTranslateX;
            this._partialTextY = translateY + lineTranslateY;
            this._partialText = text;
            context.fillStrokeShape(this);
          }

          context.restore();

          if (textArrLen > 1) {
            translateY += lineHeightPx;
          }
        }
      }
    }, {
      key: "_hitFunc",
      value: function _hitFunc(context) {
        var width = this.getWidth(),
            height = this.getHeight();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }
    }, {
      key: "setText",
      value: function setText(text) {
        var str = Util._isString(text) ? text : text === null || text === undefined ? '' : text + '';

        this._setAttr(TEXT, str);

        return this;
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
        return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        var isAuto = this.attrs.height === AUTO || this.attrs.height === undefined;
        return isAuto ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
      }
    }, {
      key: "getTextWidth",
      value: function getTextWidth() {
        return this.textWidth;
      }
    }, {
      key: "getTextHeight",
      value: function getTextHeight() {
        Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
        return this.textHeight;
      }
    }, {
      key: "measureSize",
      value: function measureSize(text) {
        var _context = getDummyContext(),
            fontSize = this.fontSize(),
            metrics;

        _context.save();

        _context.font = this._getContextFont();
        metrics = _context.measureText(text);

        _context.restore();

        return {
          width: metrics.width,
          height: fontSize
        };
      }
    }, {
      key: "_getContextFont",
      value: function _getContextFont() {
        return this.fontStyle() + SPACE + this.fontVariant() + SPACE + (this.fontSize() + PX_SPACE) + normalizeFontFamily(this.fontFamily());
      }
    }, {
      key: "_addTextLine",
      value: function _addTextLine(line) {
        if (this.align() === JUSTIFY) {
          line = line.trim();
        }

        var width = this._getTextWidth(line);

        return this.textArr.push({
          text: line,
          width: width,
          lastInParagraph: false
        });
      }
    }, {
      key: "_getTextWidth",
      value: function _getTextWidth(text) {
        var letterSpacing = this.letterSpacing();
        var length = text.length;
        return getDummyContext().measureText(text).width + (length ? letterSpacing * (length - 1) : 0);
      }
    }, {
      key: "_setTextData",
      value: function _setTextData() {
        var lines = this.text().split('\n'),
            fontSize = +this.fontSize(),
            textWidth = 0,
            lineHeightPx = this.lineHeight() * fontSize,
            width = this.attrs.width,
            height = this.attrs.height,
            fixedWidth = width !== AUTO && width !== undefined,
            fixedHeight = height !== AUTO && height !== undefined,
            padding = this.padding(),
            maxWidth = width - padding * 2,
            maxHeightPx = height - padding * 2,
            currentHeightPx = 0,
            wrap = this.wrap(),
            shouldWrap = wrap !== NONE,
            wrapAtWord = wrap !== CHAR && shouldWrap,
            shouldAddEllipsis = this.ellipsis();
        this.textArr = [];
        getDummyContext().font = this._getContextFont();
        var additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;

        for (var i = 0, max = lines.length; i < max; ++i) {
          var line = lines[i];

          var lineWidth = this._getTextWidth(line);

          if (fixedWidth && lineWidth > maxWidth) {
            while (line.length > 0) {
              var low = 0,
                  high = line.length,
                  match = '',
                  matchWidth = 0;

              while (low < high) {
                var mid = low + high >>> 1,
                    substr = line.slice(0, mid + 1),
                    substrWidth = this._getTextWidth(substr) + additionalWidth;

                if (substrWidth <= maxWidth) {
                  low = mid + 1;
                  match = substr;
                  matchWidth = substrWidth;
                } else {
                  high = mid;
                }
              }

              if (match) {
                if (wrapAtWord) {
                  var wrapIndex;
                  var nextChar = line[match.length];
                  var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;

                  if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                    wrapIndex = match.length;
                  } else {
                    wrapIndex = Math.max(match.lastIndexOf(SPACE), match.lastIndexOf(DASH)) + 1;
                  }

                  if (wrapIndex > 0) {
                    low = wrapIndex;
                    match = match.slice(0, low);
                    matchWidth = this._getTextWidth(match);
                  }
                }

                match = match.trimRight();

                this._addTextLine(match);

                textWidth = Math.max(textWidth, matchWidth);
                currentHeightPx += lineHeightPx;

                if (!shouldWrap || fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
                  var lastLine = this.textArr[this.textArr.length - 1];

                  if (lastLine) {
                    if (shouldAddEllipsis) {
                      var haveSpace = this._getTextWidth(lastLine.text + ELLIPSIS) < maxWidth;

                      if (!haveSpace) {
                        lastLine.text = lastLine.text.slice(0, lastLine.text.length - 3);
                      }

                      this.textArr.splice(this.textArr.length - 1, 1);

                      this._addTextLine(lastLine.text + ELLIPSIS);
                    }
                  }

                  break;
                }

                line = line.slice(low);
                line = line.trimLeft();

                if (line.length > 0) {
                  lineWidth = this._getTextWidth(line);

                  if (lineWidth <= maxWidth) {
                    this._addTextLine(line);

                    currentHeightPx += lineHeightPx;
                    textWidth = Math.max(textWidth, lineWidth);
                    break;
                  }
                }
              } else {
                break;
              }
            }
          } else {
            this._addTextLine(line);

            currentHeightPx += lineHeightPx;
            textWidth = Math.max(textWidth, lineWidth);
          }

          if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
            break;
          }

          if (this.textArr[this.textArr.length - 1]) {
            this.textArr[this.textArr.length - 1].lastInParagraph = true;
          }
        }

        this.textHeight = fontSize;
        this.textWidth = textWidth;
      }
    }, {
      key: "getStrokeScaleEnabled",
      value: function getStrokeScaleEnabled() {
        return true;
      }
    }]);

    return Text;
  }(Shape);
  Text.prototype._fillFunc = _fillFunc;
  Text.prototype._strokeFunc = _strokeFunc;
  Text.prototype.className = TEXT_UPPER;
  Text.prototype._attrsAffectingSize = ['text', 'fontSize', 'padding', 'wrap', 'lineHeight', 'letterSpacing'];

  _registerNode(Text);

  Factory.overWriteSetter(Text, 'width', getNumberOrAutoValidator());
  Factory.overWriteSetter(Text, 'height', getNumberOrAutoValidator());
  Factory.addGetterSetter(Text, 'fontFamily', 'Arial');
  Factory.addGetterSetter(Text, 'fontSize', 12, getNumberValidator());
  Factory.addGetterSetter(Text, 'fontStyle', NORMAL);
  Factory.addGetterSetter(Text, 'fontVariant', NORMAL);
  Factory.addGetterSetter(Text, 'padding', 0, getNumberValidator());
  Factory.addGetterSetter(Text, 'align', LEFT);
  Factory.addGetterSetter(Text, 'verticalAlign', TOP);
  Factory.addGetterSetter(Text, 'lineHeight', 1, getNumberValidator());
  Factory.addGetterSetter(Text, 'wrap', WORD);
  Factory.addGetterSetter(Text, 'ellipsis', false, getBooleanValidator());
  Factory.addGetterSetter(Text, 'letterSpacing', 0, getNumberValidator());
  Factory.addGetterSetter(Text, 'text', '', getStringValidator());
  Factory.addGetterSetter(Text, 'textDecoration', '');

  /**
   * @file
   *
   * Defines the {@link DefaultPointMarker} class.
   *
   * @module default-point-marker
   */
  /**
   * Creates a point marker handle.
   *
   * @class
   * @alias DefaultPointMarker
   *
   * @param {CreatePointMarkerOptions} options
   */

  function DefaultPointMarker(options) {
    this._options = options;
  }

  DefaultPointMarker.prototype.init = function (group) {
    var handleWidth = 10;
    var handleHeight = 20;
    var handleX = -(handleWidth / 2) + 0.5; // Place in the middle of the marker
    // Label

    if (this._options.view === 'zoomview') {
      // Label - create with default y, the real value is set in fitToView().
      this._label = new Text({
        x: 2,
        y: 0,
        text: this._options.point.labelText,
        textAlign: 'left',
        fontFamily: this._options.fontFamily || 'sans-serif',
        fontSize: this._options.fontSize || 10,
        fontStyle: this._options.fontStyle || 'normal',
        fill: '#000'
      });
    } // Handle - create with default y, the real value is set in fitToView().


    if (this._options.draggable) {
      this._handle = new Rect({
        x: handleX,
        y: 0,
        width: handleWidth,
        height: handleHeight,
        fill: this._options.color
      });
    } // Line - create with default y and points, the real values
    // are set in fitToView().


    this._line = new Line({
      x: 0,
      y: 0,
      stroke: this._options.color,
      strokeWidth: 1
    }); // Time label

    if (this._handle) {
      // Time - create with default y, the real value is set in fitToView().
      this._time = new Text({
        x: -24,
        y: 0,
        text: this._options.layer.formatTime(this._options.point.time),
        fontFamily: this._options.fontFamily,
        fontSize: this._options.fontSize,
        fontStyle: this._options.fontStyle,
        fill: '#000',
        textAlign: 'center'
      });

      this._time.hide();
    }

    if (this._handle) {
      group.add(this._handle);
    }

    group.add(this._line);

    if (this._label) {
      group.add(this._label);
    }

    if (this._time) {
      group.add(this._time);
    }

    this.fitToView();
    this.bindEventHandlers(group);
  };

  DefaultPointMarker.prototype.bindEventHandlers = function (group) {
    var self = this;

    if (self._handle) {
      self._handle.on('mouseover touchstart', function () {
        // Position text to the left of the marker
        self._time.setX(-24 - self._time.getWidth());

        self._time.show();
      });

      self._handle.on('mouseout touchend', function () {
        self._time.hide();
      });

      group.on('dragstart', function () {
        self._time.setX(-24 - self._time.getWidth());

        self._time.show();
      });
      group.on('dragend', function () {
        self._time.hide();
      });
    }
  };

  DefaultPointMarker.prototype.fitToView = function () {
    var height = this._options.layer.getHeight();

    this._line.points([0.5, 0, 0.5, height]);

    if (this._label) {
      this._label.y(12);
    }

    if (this._handle) {
      this._handle.y(height / 2 - 10.5);
    }

    if (this._time) {
      this._time.y(height / 2 - 5);
    }
  };

  DefaultPointMarker.prototype.timeUpdated = function (time) {
    if (this._time) {
      this._time.setText(this._options.layer.formatTime(time));
    }
  };

  /**
   * @file
   *
   * Defines the {@link DefaultSegmentMarker} class.
   *
   * @module default-segment-marker
   */
  /**
   * Creates a segment marker handle.
   *
   * @class
   * @alias DefaultSegmentMarker
   *
   * @param {CreateSegmentMarkerOptions} options
   */

  function DefaultSegmentMarker(options) {
    this._options = options;
  }

  DefaultSegmentMarker.prototype.init = function (group) {
    var handleWidth = 10;
    var handleHeight = 20;
    var handleX = -(handleWidth / 2) + 0.5; // Place in the middle of the marker

    var xPosition = this._options.startMarker ? -24 : 24;
    var time = this._options.startMarker ? this._options.segment.startTime : this._options.segment.endTime; // Label - create with default y, the real value is set in fitToView().

    this._label = new Text({
      x: xPosition,
      y: 0,
      text: this._options.layer.formatTime(time),
      fontFamily: this._options.fontFamily,
      fontSize: this._options.fontSize,
      fontStyle: this._options.fontStyle,
      fill: '#000',
      textAlign: 'center'
    });

    this._label.hide(); // Handle - create with default y, the real value is set in fitToView().


    this._handle = new Rect({
      x: handleX,
      y: 0,
      width: handleWidth,
      height: handleHeight,
      fill: this._options.color,
      stroke: this._options.color,
      strokeWidth: 1
    }); // Vertical Line - create with default y and points, the real values
    // are set in fitToView().

    this._line = new Line({
      x: 0,
      y: 0,
      stroke: this._options.color,
      strokeWidth: 1
    });
    group.add(this._label);
    group.add(this._line);
    group.add(this._handle);
    this.fitToView();
    this.bindEventHandlers(group);
  };

  DefaultSegmentMarker.prototype.bindEventHandlers = function (group) {
    var self = this;
    var xPosition = self._options.startMarker ? -24 : 24;

    if (self._options.draggable) {
      group.on('dragstart', function () {
        if (self._options.startMarker) {
          self._label.setX(xPosition - self._label.getWidth());
        }

        self._label.show();
      });
      group.on('dragend', function () {
        self._label.hide();
      });
    }

    self._handle.on('mouseover touchstart', function () {
      if (self._options.startMarker) {
        self._label.setX(xPosition - self._label.getWidth());
      }

      self._label.show();
    });

    self._handle.on('mouseout touchend', function () {
      self._label.hide();
    });
  };

  DefaultSegmentMarker.prototype.fitToView = function () {
    var height = this._options.layer.getHeight();

    this._label.y(height / 2 - 5);

    this._handle.y(height / 2 - 10.5);

    this._line.points([0.5, 0, 0.5, height]);
  };

  DefaultSegmentMarker.prototype.timeUpdated = function (time) {
    this._label.setText(this._options.layer.formatTime(time));
  };

  /**
   * @file
   *
   * Factory functions for creating point and segment marker handles.
   *
   * @module marker-factories
   */
  /**
   * Parameters for the {@link createSegmentMarker} function.
   *
   * @typedef {Object} CreateSegmentMarkerOptions
   * @global
   * @property {Segment} segment
   * @property {Boolean} draggable If true, marker is draggable.
   * @property {Boolean} startMarker
   * @property {String} color
   * @property {String} fontFamily
   * @property {Number} fontSize
   * @property {String} fontStyle
   * @property {Layer} layer
   * @property {String} view
   */

  /**
   * Creates a left or right side segment marker handle.
   *
   * @param {CreateSegmentMarkerOptions} options
   * @returns {Marker}
   */

  function createSegmentMarker(options) {
    if (options.view === 'zoomview') {
      return new DefaultSegmentMarker(options);
    }

    return null;
  }
  /**
   * Parameters for the {@link createSegmentLabel} function.
   *
   * @typedef {Object} SegmentLabelOptions
   * @global
   * @property {Segment} segment The {@link Segment} object associated with this
   *   label.
   * @property {String} view The name of the view that the label is being
   *   created in, either <code>zoomview</code> or <code>overview</code>.
   * @property {SegmentsLayer} layer
   * @property {String} fontFamily
   * @property {Number} fontSize
   * @property {String} fontStyle
   */

  /**
   * Creates a Konva object that renders information about a segment, such as
   * its label text.
   *
   * @param {SegmentLabelOptions} options
   * @returns {Konva.Text}
   */

  function createSegmentLabel(options) {
    return new Text({
      x: 12,
      y: 12,
      text: options.segment.labelText,
      textAlign: 'center',
      fontFamily: options.fontFamily || 'sans-serif',
      fontSize: options.fontSize || 12,
      fontStyle: options.fontStyle || 'normal',
      fill: '#000'
    });
  }
  /**
   * Parameters for the {@link createPointMarker} function.
   *
   * @typedef {Object} CreatePointMarkerOptions
   * @global
   * @property {Point} point
   * @property {Boolean} draggable If true, marker is draggable.
   * @property {String} color
   * @property {Layer} layer
   * @property {String} view
   * @property {String} fontFamily
   * @property {Number} fontSize
   * @property {String} fontStyle
   */

  /**
   * Creates a point marker handle.
   *
   * @param {CreatePointMarkerOptions} options
   * @returns {Marker}
   */

  function createPointMarker(options) {
    return new DefaultPointMarker(options);
  }

  var Container = /*#__PURE__*/function (_Node) {
    _inherits(Container, _Node);

    var _super = _createSuper(Container);

    function Container() {
      var _this;

      _classCallCheck(this, Container);

      _this = _super.apply(this, arguments);
      _this.children = [];
      return _this;
    }

    _createClass(Container, [{
      key: "getChildren",
      value: function getChildren(filterFunc) {
        if (!filterFunc) {
          return this.children || [];
        }

        var children = this.children || [];
        var results = [];
        children.forEach(function (child) {
          if (filterFunc(child)) {
            results.push(child);
          }
        });
        return results;
      }
    }, {
      key: "hasChildren",
      value: function hasChildren() {
        return this.getChildren().length > 0;
      }
    }, {
      key: "removeChildren",
      value: function removeChildren() {
        this.getChildren().forEach(function (child) {
          child.parent = null;
          child.index = 0;
          child.remove();
        });
        this.children = [];

        this._requestDraw();

        return this;
      }
    }, {
      key: "destroyChildren",
      value: function destroyChildren() {
        this.getChildren().forEach(function (child) {
          child.parent = null;
          child.index = 0;
          child.destroy();
        });
        this.children = [];

        this._requestDraw();

        return this;
      }
    }, {
      key: "add",
      value: function add() {
        for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
          children[_key] = arguments[_key];
        }

        if (arguments.length > 1) {
          for (var i = 0; i < arguments.length; i++) {
            this.add(arguments[i]);
          }

          return this;
        }

        var child = children[0];

        if (child.getParent()) {
          child.moveTo(this);
          return this;
        }

        this._validateAdd(child);

        child.index = this.getChildren().length;
        child.parent = this;

        child._clearCaches();

        this.getChildren().push(child);

        this._fire('add', {
          child: child
        });

        this._requestDraw();

        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.hasChildren()) {
          this.destroyChildren();
        }

        _get(_getPrototypeOf(Container.prototype), "destroy", this).call(this);

        return this;
      }
    }, {
      key: "find",
      value: function find(selector) {
        return this._generalFind(selector, false);
      }
    }, {
      key: "findOne",
      value: function findOne(selector) {
        var result = this._generalFind(selector, true);

        return result.length > 0 ? result[0] : undefined;
      }
    }, {
      key: "_generalFind",
      value: function _generalFind(selector, findOne) {
        var retArr = [];

        this._descendants(function (node) {
          var valid = node._isMatch(selector);

          if (valid) {
            retArr.push(node);
          }

          if (valid && findOne) {
            return true;
          }

          return false;
        });

        return retArr;
      }
    }, {
      key: "_descendants",
      value: function _descendants(fn) {
        var shouldStop = false;
        var children = this.getChildren();

        var _iterator = _createForOfIteratorHelper(children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            shouldStop = fn(child);

            if (shouldStop) {
              return true;
            }

            if (!child.hasChildren()) {
              continue;
            }

            shouldStop = child._descendants(fn);

            if (shouldStop) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return false;
      }
    }, {
      key: "toObject",
      value: function toObject() {
        var obj = Node.prototype.toObject.call(this);
        obj.children = [];
        this.getChildren().forEach(function (child) {
          obj.children.push(child.toObject());
        });
        return obj;
      }
    }, {
      key: "isAncestorOf",
      value: function isAncestorOf(node) {
        var parent = node.getParent();

        while (parent) {
          if (parent._id === this._id) {
            return true;
          }

          parent = parent.getParent();
        }

        return false;
      }
    }, {
      key: "clone",
      value: function clone(obj) {
        var node = Node.prototype.clone.call(this, obj);
        this.getChildren().forEach(function (no) {
          node.add(no.clone());
        });
        return node;
      }
    }, {
      key: "getAllIntersections",
      value: function getAllIntersections(pos) {
        var arr = [];
        this.find('Shape').forEach(function (shape) {
          if (shape.isVisible() && shape.intersects(pos)) {
            arr.push(shape);
          }
        });
        return arr;
      }
    }, {
      key: "_clearSelfAndDescendantCache",
      value: function _clearSelfAndDescendantCache(attr) {
        var _a;

        _get(_getPrototypeOf(Container.prototype), "_clearSelfAndDescendantCache", this).call(this, attr);

        if (this.isCached()) {
          return;
        }

        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (node) {
          node._clearSelfAndDescendantCache(attr);
        });
      }
    }, {
      key: "_setChildrenIndices",
      value: function _setChildrenIndices() {
        var _a;

        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child, n) {
          child.index = n;
        });

        this._requestDraw();
      }
    }, {
      key: "drawScene",
      value: function drawScene(can, top) {
        var layer = this.getLayer(),
            canvas = can || layer && layer.getCanvas(),
            context = canvas && canvas.getContext(),
            cachedCanvas = this._getCanvasCache(),
            cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;

        var caching = canvas && canvas.isCache;

        if (!this.isVisible() && !caching) {
          return this;
        }

        if (cachedSceneCanvas) {
          context.save();
          var m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);

          this._drawCachedSceneCanvas(context);

          context.restore();
        } else {
          this._drawChildren('drawScene', canvas, top);
        }

        return this;
      }
    }, {
      key: "drawHit",
      value: function drawHit(can, top) {
        if (!this.shouldDrawHit(top)) {
          return this;
        }

        var layer = this.getLayer(),
            canvas = can || layer && layer.hitCanvas,
            context = canvas && canvas.getContext(),
            cachedCanvas = this._getCanvasCache(),
            cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

        if (cachedHitCanvas) {
          context.save();
          var m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);

          this._drawCachedHitCanvas(context);

          context.restore();
        } else {
          this._drawChildren('drawHit', canvas, top);
        }

        return this;
      }
    }, {
      key: "_drawChildren",
      value: function _drawChildren(drawMethod, canvas, top) {
        var _a;

        var context = canvas && canvas.getContext(),
            clipWidth = this.clipWidth(),
            clipHeight = this.clipHeight(),
            clipFunc = this.clipFunc(),
            hasClip = clipWidth && clipHeight || clipFunc;
        var selfCache = top === this;

        if (hasClip) {
          context.save();
          var transform = this.getAbsoluteTransform(top);
          var m = transform.getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          context.beginPath();

          if (clipFunc) {
            clipFunc.call(this, context, this);
          } else {
            var clipX = this.clipX();
            var clipY = this.clipY();
            context.rect(clipX, clipY, clipWidth, clipHeight);
          }

          context.clip();
          m = transform.copy().invert().getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }

        var hasComposition = !selfCache && this.globalCompositeOperation() !== 'source-over' && drawMethod === 'drawScene';

        if (hasComposition) {
          context.save();

          context._applyGlobalCompositeOperation(this);
        }

        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
          child[drawMethod](canvas, top);
        });

        if (hasComposition) {
          context.restore();
        }

        if (hasClip) {
          context.restore();
        }
      }
    }, {
      key: "getClientRect",
      value: function getClientRect(config) {
        var _a;

        config = config || {};
        var skipTransform = config.skipTransform;
        var relativeTo = config.relativeTo;
        var minX, minY, maxX, maxY;
        var selfRect = {
          x: Infinity,
          y: Infinity,
          width: 0,
          height: 0
        };
        var that = this;
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
          if (!child.visible()) {
            return;
          }

          var rect = child.getClientRect({
            relativeTo: that,
            skipShadow: config.skipShadow,
            skipStroke: config.skipStroke
          });

          if (rect.width === 0 && rect.height === 0) {
            return;
          }

          if (minX === undefined) {
            minX = rect.x;
            minY = rect.y;
            maxX = rect.x + rect.width;
            maxY = rect.y + rect.height;
          } else {
            minX = Math.min(minX, rect.x);
            minY = Math.min(minY, rect.y);
            maxX = Math.max(maxX, rect.x + rect.width);
            maxY = Math.max(maxY, rect.y + rect.height);
          }
        });
        var shapes = this.find('Shape');
        var hasVisible = false;

        for (var i = 0; i < shapes.length; i++) {
          var shape = shapes[i];

          if (shape._isVisible(this)) {
            hasVisible = true;
            break;
          }
        }

        if (hasVisible && minX !== undefined) {
          selfRect = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };
        } else {
          selfRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }

        if (!skipTransform) {
          return this._transformedRect(selfRect, relativeTo);
        }

        return selfRect;
      }
    }]);

    return Container;
  }(Node);
  Factory.addComponentsGetterSetter(Container, 'clip', ['x', 'y', 'width', 'height']);
  Factory.addGetterSetter(Container, 'clipX', undefined, getNumberValidator());
  Factory.addGetterSetter(Container, 'clipY', undefined, getNumberValidator());
  Factory.addGetterSetter(Container, 'clipWidth', undefined, getNumberValidator());
  Factory.addGetterSetter(Container, 'clipHeight', undefined, getNumberValidator());
  Factory.addGetterSetter(Container, 'clipFunc');

  var _mouse, _touch, _pointer;
  var STAGE = 'Stage',
      STRING = 'string',
      PX = 'px',
      MOUSEOUT = 'mouseout',
      MOUSELEAVE = 'mouseleave',
      MOUSEOVER = 'mouseover',
      MOUSEENTER = 'mouseenter',
      MOUSEMOVE = 'mousemove',
      MOUSEDOWN = 'mousedown',
      MOUSEUP = 'mouseup',
      POINTERMOVE = 'pointermove',
      POINTERDOWN = 'pointerdown',
      POINTERUP = 'pointerup',
      POINTERCANCEL = 'pointercancel',
      LOSTPOINTERCAPTURE = 'lostpointercapture',
      POINTEROUT = 'pointerout',
      POINTERLEAVE = 'pointerleave',
      POINTEROVER = 'pointerover',
      POINTERENTER = 'pointerenter',
      CONTEXTMENU = 'contextmenu',
      TOUCHSTART = 'touchstart',
      TOUCHEND = 'touchend',
      TOUCHMOVE = 'touchmove',
      TOUCHCANCEL = 'touchcancel',
      WHEEL = 'wheel',
      MAX_LAYERS_NUMBER = 5,
      EVENTS = [[MOUSEENTER, '_pointerenter'], [MOUSEDOWN, '_pointerdown'], [MOUSEMOVE, '_pointermove'], [MOUSEUP, '_pointerup'], [MOUSELEAVE, '_pointerleave'], [TOUCHSTART, '_pointerdown'], [TOUCHMOVE, '_pointermove'], [TOUCHEND, '_pointerup'], [TOUCHCANCEL, '_pointercancel'], [MOUSEOVER, '_pointerover'], [WHEEL, '_wheel'], [CONTEXTMENU, '_contextmenu'], [POINTERDOWN, '_pointerdown'], [POINTERMOVE, '_pointermove'], [POINTERUP, '_pointerup'], [POINTERCANCEL, '_pointercancel'], [LOSTPOINTERCAPTURE, '_lostpointercapture']];
  var EVENTS_MAP = {
    mouse: (_mouse = {}, _defineProperty(_mouse, POINTEROUT, MOUSEOUT), _defineProperty(_mouse, POINTERLEAVE, MOUSELEAVE), _defineProperty(_mouse, POINTEROVER, MOUSEOVER), _defineProperty(_mouse, POINTERENTER, MOUSEENTER), _defineProperty(_mouse, POINTERMOVE, MOUSEMOVE), _defineProperty(_mouse, POINTERDOWN, MOUSEDOWN), _defineProperty(_mouse, POINTERUP, MOUSEUP), _defineProperty(_mouse, POINTERCANCEL, 'mousecancel'), _defineProperty(_mouse, "pointerclick", 'click'), _defineProperty(_mouse, "pointerdblclick", 'dblclick'), _mouse),
    touch: (_touch = {}, _defineProperty(_touch, POINTEROUT, 'touchout'), _defineProperty(_touch, POINTERLEAVE, 'touchleave'), _defineProperty(_touch, POINTEROVER, 'touchover'), _defineProperty(_touch, POINTERENTER, 'touchenter'), _defineProperty(_touch, POINTERMOVE, TOUCHMOVE), _defineProperty(_touch, POINTERDOWN, TOUCHSTART), _defineProperty(_touch, POINTERUP, TOUCHEND), _defineProperty(_touch, POINTERCANCEL, TOUCHCANCEL), _defineProperty(_touch, "pointerclick", 'tap'), _defineProperty(_touch, "pointerdblclick", 'dbltap'), _touch),
    pointer: (_pointer = {}, _defineProperty(_pointer, POINTEROUT, POINTEROUT), _defineProperty(_pointer, POINTERLEAVE, POINTERLEAVE), _defineProperty(_pointer, POINTEROVER, POINTEROVER), _defineProperty(_pointer, POINTERENTER, POINTERENTER), _defineProperty(_pointer, POINTERMOVE, POINTERMOVE), _defineProperty(_pointer, POINTERDOWN, POINTERDOWN), _defineProperty(_pointer, POINTERUP, POINTERUP), _defineProperty(_pointer, POINTERCANCEL, POINTERCANCEL), _defineProperty(_pointer, "pointerclick", 'pointerclick'), _defineProperty(_pointer, "pointerdblclick", 'pointerdblclick'), _pointer)
  };

  var getEventType = function getEventType(type) {
    if (type.indexOf('pointer') >= 0) {
      return 'pointer';
    }

    if (type.indexOf('touch') >= 0) {
      return 'touch';
    }

    return 'mouse';
  };

  var getEventsMap = function getEventsMap(eventType) {
    var type = getEventType(eventType);

    if (type === 'pointer') {
      return Konva$1.pointerEventsEnabled && EVENTS_MAP.pointer;
    }

    if (type === 'touch') {
      return EVENTS_MAP.touch;
    }

    if (type === 'mouse') {
      return EVENTS_MAP.mouse;
    }
  };

  function checkNoClip() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
      Util.warn('Stage does not support clipping. Please use clip for Layers or Groups.');
    }

    return attrs;
  }

  var NO_POINTERS_MESSAGE = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
  var stages = [];
  var Stage = /*#__PURE__*/function (_Container) {
    _inherits(Stage, _Container);

    var _super = _createSuper(Stage);

    function Stage(config) {
      var _this;

      _classCallCheck(this, Stage);

      _this = _super.call(this, checkNoClip(config));
      _this._pointerPositions = [];
      _this._changedPointerPositions = [];

      _this._buildDOM();

      _this._bindContentEvents();

      stages.push(_assertThisInitialized(_this));

      _this.on('widthChange.konva heightChange.konva', _this._resizeDOM);

      _this.on('visibleChange.konva', _this._checkVisibility);

      _this.on('clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva', function () {
        checkNoClip(_this.attrs);
      });

      _this._checkVisibility();

      return _this;
    }

    _createClass(Stage, [{
      key: "_validateAdd",
      value: function _validateAdd(child) {
        var isLayer = child.getType() === 'Layer';
        var isFastLayer = child.getType() === 'FastLayer';
        var valid = isLayer || isFastLayer;

        if (!valid) {
          Util.throw('You may only add layers to the stage.');
        }
      }
    }, {
      key: "_checkVisibility",
      value: function _checkVisibility() {
        if (!this.content) {
          return;
        }

        var style = this.visible() ? '' : 'none';
        this.content.style.display = style;
      }
    }, {
      key: "setContainer",
      value: function setContainer(container) {
        if (_typeof$1(container) === STRING) {
          if (container.charAt(0) === '.') {
            var className = container.slice(1);
            container = document.getElementsByClassName(className)[0];
          } else {
            var id;

            if (container.charAt(0) !== '#') {
              id = container;
            } else {
              id = container.slice(1);
            }

            container = document.getElementById(id);
          }

          if (!container) {
            throw 'Can not find container in document with id ' + id;
          }
        }

        this._setAttr('container', container);

        if (this.content) {
          if (this.content.parentElement) {
            this.content.parentElement.removeChild(this.content);
          }

          container.appendChild(this.content);
        }

        return this;
      }
    }, {
      key: "shouldDrawHit",
      value: function shouldDrawHit() {
        return true;
      }
    }, {
      key: "clear",
      value: function clear() {
        var layers = this.children,
            len = layers.length,
            n;

        for (n = 0; n < len; n++) {
          layers[n].clear();
        }

        return this;
      }
    }, {
      key: "clone",
      value: function clone(obj) {
        if (!obj) {
          obj = {};
        }

        obj.container = typeof document !== 'undefined' && document.createElement('div');
        return Container.prototype.clone.call(this, obj);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(Stage.prototype), "destroy", this).call(this);

        var content = this.content;

        if (content && Util._isInDocument(content)) {
          this.container().removeChild(content);
        }

        var index = stages.indexOf(this);

        if (index > -1) {
          stages.splice(index, 1);
        }

        return this;
      }
    }, {
      key: "getPointerPosition",
      value: function getPointerPosition() {
        var pos = this._pointerPositions[0] || this._changedPointerPositions[0];

        if (!pos) {
          Util.warn(NO_POINTERS_MESSAGE);
          return null;
        }

        return {
          x: pos.x,
          y: pos.y
        };
      }
    }, {
      key: "_getPointerById",
      value: function _getPointerById(id) {
        return this._pointerPositions.find(function (p) {
          return p.id === id;
        });
      }
    }, {
      key: "getPointersPositions",
      value: function getPointersPositions() {
        return this._pointerPositions;
      }
    }, {
      key: "getStage",
      value: function getStage() {
        return this;
      }
    }, {
      key: "getContent",
      value: function getContent() {
        return this.content;
      }
    }, {
      key: "_toKonvaCanvas",
      value: function _toKonvaCanvas(config) {
        config = config || {};
        config.x = config.x || 0;
        config.y = config.y || 0;
        config.width = config.width || this.width();
        config.height = config.height || this.height();
        var canvas = new SceneCanvas({
          width: config.width,
          height: config.height,
          pixelRatio: config.pixelRatio || 1
        });

        var _context = canvas.getContext()._context;

        var layers = this.children;

        if (config.x || config.y) {
          _context.translate(-1 * config.x, -1 * config.y);
        }

        layers.forEach(function (layer) {
          if (!layer.isVisible()) {
            return;
          }

          var layerCanvas = layer._toKonvaCanvas(config);

          _context.drawImage(layerCanvas._canvas, config.x, config.y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
        });
        return canvas;
      }
    }, {
      key: "getIntersection",
      value: function getIntersection(pos) {
        if (!pos) {
          return null;
        }

        var layers = this.children,
            len = layers.length,
            end = len - 1,
            n;

        for (n = end; n >= 0; n--) {
          var shape = layers[n].getIntersection(pos);

          if (shape) {
            return shape;
          }
        }

        return null;
      }
    }, {
      key: "_resizeDOM",
      value: function _resizeDOM() {
        var width = this.width();
        var height = this.height();

        if (this.content) {
          this.content.style.width = width + PX;
          this.content.style.height = height + PX;
        }

        this.bufferCanvas.setSize(width, height);
        this.bufferHitCanvas.setSize(width, height);
        this.children.forEach(function (layer) {
          layer.setSize({
            width: width,
            height: height
          });
          layer.draw();
        });
      }
    }, {
      key: "add",
      value: function add(layer) {
        for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        if (arguments.length > 1) {
          for (var i = 0; i < arguments.length; i++) {
            this.add(arguments[i]);
          }

          return this;
        }

        _get(_getPrototypeOf(Stage.prototype), "add", this).call(this, layer);

        var length = this.children.length;

        if (length > MAX_LAYERS_NUMBER) {
          Util.warn('The stage has ' + length + ' layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.');
        }

        layer.setSize({
          width: this.width(),
          height: this.height()
        });
        layer.draw();

        if (Konva$1.isBrowser) {
          this.content.appendChild(layer.canvas._canvas);
        }

        return this;
      }
    }, {
      key: "getParent",
      value: function getParent() {
        return null;
      }
    }, {
      key: "getLayer",
      value: function getLayer() {
        return null;
      }
    }, {
      key: "hasPointerCapture",
      value: function hasPointerCapture$1(pointerId) {
        return hasPointerCapture(pointerId, this);
      }
    }, {
      key: "setPointerCapture",
      value: function setPointerCapture$1(pointerId) {
        setPointerCapture(pointerId, this);
      }
    }, {
      key: "releaseCapture",
      value: function releaseCapture$1(pointerId) {
        releaseCapture(pointerId);
      }
    }, {
      key: "getLayers",
      value: function getLayers() {
        return this.children;
      }
    }, {
      key: "_bindContentEvents",
      value: function _bindContentEvents() {
        var _this2 = this;

        if (!Konva$1.isBrowser) {
          return;
        }

        EVENTS.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              event = _ref2[0],
              methodName = _ref2[1];

          _this2.content.addEventListener(event, function (evt) {
            _this2[methodName](evt);
          });
        });
      }
    }, {
      key: "_pointerenter",
      value: function _pointerenter(evt) {
        this.setPointersPositions(evt);
        var events = getEventsMap(evt.type);

        this._fire(events.pointerenter, {
          evt: evt,
          target: this,
          currentTarget: this
        });
      }
    }, {
      key: "_pointerover",
      value: function _pointerover(evt) {
        this.setPointersPositions(evt);
        var events = getEventsMap(evt.type);

        this._fire(events.pointerover, {
          evt: evt,
          target: this,
          currentTarget: this
        });
      }
    }, {
      key: "_getTargetShape",
      value: function _getTargetShape(evenType) {
        var shape = this[evenType + 'targetShape'];

        if (shape && !shape.getStage()) {
          shape = null;
        }

        return shape;
      }
    }, {
      key: "_pointerleave",
      value: function _pointerleave(evt) {
        var events = getEventsMap(evt.type);
        var eventType = getEventType(evt.type);

        if (!events) {
          return;
        }

        this.setPointersPositions(evt);

        var targetShape = this._getTargetShape(eventType);

        var eventsEnabled = !DD.isDragging || Konva$1.hitOnDragEnabled;

        if (targetShape && eventsEnabled) {
          targetShape._fireAndBubble(events.pointerout, {
            evt: evt
          });

          targetShape._fireAndBubble(events.pointerleave, {
            evt: evt
          });

          this._fire(events.pointerleave, {
            evt: evt,
            target: this,
            currentTarget: this
          });

          this[eventType + 'targetShape'] = null;
        } else if (eventsEnabled) {
          this._fire(events.pointerleave, {
            evt: evt,
            target: this,
            currentTarget: this
          });

          this._fire(events.pointerout, {
            evt: evt,
            target: this,
            currentTarget: this
          });
        }

        this.pointerPos = undefined;
        this._pointerPositions = [];
      }
    }, {
      key: "_pointerdown",
      value: function _pointerdown(evt) {
        var _this3 = this;

        var events = getEventsMap(evt.type);
        var eventType = getEventType(evt.type);

        if (!events) {
          return;
        }

        this.setPointersPositions(evt);
        var triggeredOnShape = false;

        this._changedPointerPositions.forEach(function (pos) {
          var shape = _this3.getIntersection(pos);

          DD.justDragged = false;
          Konva$1['_' + eventType + 'ListenClick'] = true;
          var hasShape = shape && shape.isListening();

          if (!hasShape) {
            return;
          }

          if (Konva$1.capturePointerEventsEnabled) {
            shape.setPointerCapture(pos.id);
          }

          _this3[eventType + 'ClickStartShape'] = shape;

          shape._fireAndBubble(events.pointerdown, {
            evt: evt,
            pointerId: pos.id
          });

          triggeredOnShape = true;
          var isTouch = evt.type.indexOf('touch') >= 0;

          if (shape.preventDefault() && evt.cancelable && isTouch) {
            evt.preventDefault();
          }
        });

        if (!triggeredOnShape) {
          this._fire(events.pointerdown, {
            evt: evt,
            target: this,
            currentTarget: this,
            pointerId: this._pointerPositions[0].id
          });
        }
      }
    }, {
      key: "_pointermove",
      value: function _pointermove(evt) {
        var _this4 = this;

        var events = getEventsMap(evt.type);
        var eventType = getEventType(evt.type);

        if (!events) {
          return;
        }

        if (DD.isDragging && DD.node.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }

        this.setPointersPositions(evt);
        var eventsEnabled = !DD.isDragging || Konva$1.hitOnDragEnabled;

        if (!eventsEnabled) {
          return;
        }

        var processedShapesIds = {};
        var triggeredOnShape = false;

        var targetShape = this._getTargetShape(eventType);

        this._changedPointerPositions.forEach(function (pos) {
          var shape = getCapturedShape(pos.id) || _this4.getIntersection(pos);

          var pointerId = pos.id;
          var event = {
            evt: evt,
            pointerId: pointerId
          };
          var differentTarget = targetShape !== shape;

          if (differentTarget && targetShape) {
            targetShape._fireAndBubble(events.pointerout, Object.assign({}, event), shape);

            targetShape._fireAndBubble(events.pointerleave, Object.assign({}, event), shape);
          }

          if (shape) {
            if (processedShapesIds[shape._id]) {
              return;
            }

            processedShapesIds[shape._id] = true;
          }

          if (shape && shape.isListening()) {
            triggeredOnShape = true;

            if (differentTarget) {
              shape._fireAndBubble(events.pointerover, Object.assign({}, event), targetShape);

              shape._fireAndBubble(events.pointerenter, Object.assign({}, event), targetShape);

              _this4[eventType + 'targetShape'] = shape;
            }

            shape._fireAndBubble(events.pointermove, Object.assign({}, event));
          } else {
            if (targetShape) {
              _this4._fire(events.pointerover, {
                evt: evt,
                target: _this4,
                currentTarget: _this4,
                pointerId: pointerId
              });

              _this4[eventType + 'targetShape'] = null;
            }
          }
        });

        if (!triggeredOnShape) {
          this._fire(events.pointermove, {
            evt: evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
      }
    }, {
      key: "_pointerup",
      value: function _pointerup(evt) {
        var _this5 = this;

        var events = getEventsMap(evt.type);
        var eventType = getEventType(evt.type);

        if (!events) {
          return;
        }

        this.setPointersPositions(evt);
        var clickStartShape = this[eventType + 'ClickStartShape'];
        var clickEndShape = this[eventType + 'ClickEndShape'];
        var processedShapesIds = {};
        var triggeredOnShape = false;

        this._changedPointerPositions.forEach(function (pos) {
          var shape = getCapturedShape(pos.id) || _this5.getIntersection(pos);

          if (shape) {
            shape.releaseCapture(pos.id);

            if (processedShapesIds[shape._id]) {
              return;
            }

            processedShapesIds[shape._id] = true;
          }

          var pointerId = pos.id;
          var event = {
            evt: evt,
            pointerId: pointerId
          };
          var fireDblClick = false;

          if (Konva$1['_' + eventType + 'InDblClickWindow']) {
            fireDblClick = true;
            clearTimeout(_this5[eventType + 'DblTimeout']);
          } else if (!DD.justDragged) {
            Konva$1['_' + eventType + 'InDblClickWindow'] = true;
            clearTimeout(_this5[eventType + 'DblTimeout']);
          }

          _this5[eventType + 'DblTimeout'] = setTimeout(function () {
            Konva$1['_' + eventType + 'InDblClickWindow'] = false;
          }, Konva$1.dblClickWindow);

          if (shape && shape.isListening()) {
            triggeredOnShape = true;
            _this5[eventType + 'ClickEndShape'] = shape;

            shape._fireAndBubble(events.pointerup, Object.assign({}, event));

            if (Konva$1['_' + eventType + 'ListenClick'] && clickStartShape && clickStartShape === shape) {
              shape._fireAndBubble(events.pointerclick, Object.assign({}, event));

              if (fireDblClick && clickEndShape && clickEndShape === shape) {
                shape._fireAndBubble(events.pointerdblclick, Object.assign({}, event));
              }
            }
          } else {
            _this5[eventType + 'ClickEndShape'] = null;

            if (Konva$1['_' + eventType + 'ListenClick']) {
              _this5._fire(events.pointerclick, {
                evt: evt,
                target: _this5,
                currentTarget: _this5,
                pointerId: pointerId
              });
            }

            if (fireDblClick) {
              _this5._fire(events.pointerdblclick, {
                evt: evt,
                target: _this5,
                currentTarget: _this5,
                pointerId: pointerId
              });
            }
          }
        });

        if (!triggeredOnShape) {
          this._fire(events.pointerup, {
            evt: evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }

        Konva$1['_' + eventType + 'ListenClick'] = false;

        if (evt.cancelable) {
          evt.preventDefault();
        }
      }
    }, {
      key: "_contextmenu",
      value: function _contextmenu(evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());

        if (shape && shape.isListening()) {
          shape._fireAndBubble(CONTEXTMENU, {
            evt: evt
          });
        } else {
          this._fire(CONTEXTMENU, {
            evt: evt,
            target: this,
            currentTarget: this
          });
        }
      }
    }, {
      key: "_wheel",
      value: function _wheel(evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());

        if (shape && shape.isListening()) {
          shape._fireAndBubble(WHEEL, {
            evt: evt
          });
        } else {
          this._fire(WHEEL, {
            evt: evt,
            target: this,
            currentTarget: this
          });
        }
      }
    }, {
      key: "_pointercancel",
      value: function _pointercancel(evt) {
        this.setPointersPositions(evt);
        var shape = getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());

        if (shape) {
          shape._fireAndBubble(POINTERUP, createEvent(evt));
        }

        releaseCapture(evt.pointerId);
      }
    }, {
      key: "_lostpointercapture",
      value: function _lostpointercapture(evt) {
        releaseCapture(evt.pointerId);
      }
    }, {
      key: "setPointersPositions",
      value: function setPointersPositions(evt) {
        var _this6 = this;

        var contentPosition = this._getContentPosition(),
            x = null,
            y = null;

        evt = evt ? evt : window.event;

        if (evt.touches !== undefined) {
          this._pointerPositions = [];
          this._changedPointerPositions = [];
          Array.prototype.forEach.call(evt.touches, function (touch) {
            _this6._pointerPositions.push({
              id: touch.identifier,
              x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
              y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
            });
          });
          Array.prototype.forEach.call(evt.changedTouches || evt.touches, function (touch) {
            _this6._changedPointerPositions.push({
              id: touch.identifier,
              x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
              y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
            });
          });
        } else {
          x = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
          y = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
          this.pointerPos = {
            x: x,
            y: y
          };
          this._pointerPositions = [{
            x: x,
            y: y,
            id: Util._getFirstPointerId(evt)
          }];
          this._changedPointerPositions = [{
            x: x,
            y: y,
            id: Util._getFirstPointerId(evt)
          }];
        }
      }
    }, {
      key: "_setPointerPosition",
      value: function _setPointerPosition(evt) {
        Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
        this.setPointersPositions(evt);
      }
    }, {
      key: "_getContentPosition",
      value: function _getContentPosition() {
        if (!this.content || !this.content.getBoundingClientRect) {
          return {
            top: 0,
            left: 0,
            scaleX: 1,
            scaleY: 1
          };
        }

        var rect = this.content.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          scaleX: rect.width / this.content.clientWidth || 1,
          scaleY: rect.height / this.content.clientHeight || 1
        };
      }
    }, {
      key: "_buildDOM",
      value: function _buildDOM() {
        this.bufferCanvas = new SceneCanvas({
          width: this.width(),
          height: this.height()
        });
        this.bufferHitCanvas = new HitCanvas({
          pixelRatio: 1,
          width: this.width(),
          height: this.height()
        });

        if (!Konva$1.isBrowser) {
          return;
        }

        var container = this.container();

        if (!container) {
          throw 'Stage has no container. A container is required.';
        }

        container.innerHTML = '';
        this.content = document.createElement('div');
        this.content.style.position = 'relative';
        this.content.style.userSelect = 'none';
        this.content.className = 'konvajs-content';
        this.content.setAttribute('role', 'presentation');
        container.appendChild(this.content);

        this._resizeDOM();
      }
    }, {
      key: "cache",
      value: function cache() {
        Util.warn('Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.');
        return this;
      }
    }, {
      key: "clearCache",
      value: function clearCache() {
        return this;
      }
    }, {
      key: "batchDraw",
      value: function batchDraw() {
        this.getChildren().forEach(function (layer) {
          layer.batchDraw();
        });
        return this;
      }
    }]);

    return Stage;
  }(Container);
  Stage.prototype.nodeType = STAGE;

  _registerNode(Stage);

  Factory.addGetterSetter(Stage, 'container');

  var HASH = '#',
      BEFORE_DRAW = 'beforeDraw',
      DRAW = 'draw',
      INTERSECTION_OFFSETS = [{
    x: 0,
    y: 0
  }, {
    x: -1,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 1,
    y: 1
  }, {
    x: -1,
    y: 1
  }],
      INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
  var Layer = /*#__PURE__*/function (_Container) {
    _inherits(Layer, _Container);

    var _super = _createSuper(Layer);

    function Layer(config) {
      var _this;

      _classCallCheck(this, Layer);

      _this = _super.call(this, config);
      _this.canvas = new SceneCanvas();
      _this.hitCanvas = new HitCanvas({
        pixelRatio: 1
      });
      _this._waitingForDraw = false;

      _this.on('visibleChange.konva', _this._checkVisibility);

      _this._checkVisibility();

      _this.on('imageSmoothingEnabledChange.konva', _this._setSmoothEnabled);

      _this._setSmoothEnabled();

      return _this;
    }

    _createClass(Layer, [{
      key: "createPNGStream",
      value: function createPNGStream() {
        var c = this.canvas._canvas;
        return c.createPNGStream();
      }
    }, {
      key: "getCanvas",
      value: function getCanvas() {
        return this.canvas;
      }
    }, {
      key: "getNativeCanvasElement",
      value: function getNativeCanvasElement() {
        return this.canvas._canvas;
      }
    }, {
      key: "getHitCanvas",
      value: function getHitCanvas() {
        return this.hitCanvas;
      }
    }, {
      key: "getContext",
      value: function getContext() {
        return this.getCanvas().getContext();
      }
    }, {
      key: "clear",
      value: function clear(bounds) {
        this.getContext().clear(bounds);
        this.getHitCanvas().getContext().clear(bounds);
        return this;
      }
    }, {
      key: "setZIndex",
      value: function setZIndex(index) {
        _get(_getPrototypeOf(Layer.prototype), "setZIndex", this).call(this, index);

        var stage = this.getStage();

        if (stage && stage.content) {
          stage.content.removeChild(this.getNativeCanvasElement());

          if (index < stage.children.length - 1) {
            stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[index + 1].getCanvas()._canvas);
          } else {
            stage.content.appendChild(this.getNativeCanvasElement());
          }
        }

        return this;
      }
    }, {
      key: "moveToTop",
      value: function moveToTop() {
        Node.prototype.moveToTop.call(this);
        var stage = this.getStage();

        if (stage && stage.content) {
          stage.content.removeChild(this.getNativeCanvasElement());
          stage.content.appendChild(this.getNativeCanvasElement());
        }

        return true;
      }
    }, {
      key: "moveUp",
      value: function moveUp() {
        var moved = Node.prototype.moveUp.call(this);

        if (!moved) {
          return false;
        }

        var stage = this.getStage();

        if (!stage || !stage.content) {
          return false;
        }

        stage.content.removeChild(this.getNativeCanvasElement());

        if (this.index < stage.children.length - 1) {
          stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[this.index + 1].getCanvas()._canvas);
        } else {
          stage.content.appendChild(this.getNativeCanvasElement());
        }

        return true;
      }
    }, {
      key: "moveDown",
      value: function moveDown() {
        if (Node.prototype.moveDown.call(this)) {
          var stage = this.getStage();

          if (stage) {
            var children = stage.children;

            if (stage.content) {
              stage.content.removeChild(this.getNativeCanvasElement());
              stage.content.insertBefore(this.getNativeCanvasElement(), children[this.index + 1].getCanvas()._canvas);
            }
          }

          return true;
        }

        return false;
      }
    }, {
      key: "moveToBottom",
      value: function moveToBottom() {
        if (Node.prototype.moveToBottom.call(this)) {
          var stage = this.getStage();

          if (stage) {
            var children = stage.children;

            if (stage.content) {
              stage.content.removeChild(this.getNativeCanvasElement());
              stage.content.insertBefore(this.getNativeCanvasElement(), children[1].getCanvas()._canvas);
            }
          }

          return true;
        }

        return false;
      }
    }, {
      key: "getLayer",
      value: function getLayer() {
        return this;
      }
    }, {
      key: "remove",
      value: function remove() {
        var _canvas = this.getNativeCanvasElement();

        Node.prototype.remove.call(this);

        if (_canvas && _canvas.parentNode && Util._isInDocument(_canvas)) {
          _canvas.parentNode.removeChild(_canvas);
        }

        return this;
      }
    }, {
      key: "getStage",
      value: function getStage() {
        return this.parent;
      }
    }, {
      key: "setSize",
      value: function setSize(_ref) {
        var width = _ref.width,
            height = _ref.height;
        this.canvas.setSize(width, height);
        this.hitCanvas.setSize(width, height);

        this._setSmoothEnabled();

        return this;
      }
    }, {
      key: "_validateAdd",
      value: function _validateAdd(child) {
        var type = child.getType();

        if (type !== 'Group' && type !== 'Shape') {
          Util.throw('You may only add groups and shapes to a layer.');
        }
      }
    }, {
      key: "_toKonvaCanvas",
      value: function _toKonvaCanvas(config) {
        config = config || {};
        config.width = config.width || this.getWidth();
        config.height = config.height || this.getHeight();
        config.x = config.x !== undefined ? config.x : this.x();
        config.y = config.y !== undefined ? config.y : this.y();
        return Node.prototype._toKonvaCanvas.call(this, config);
      }
    }, {
      key: "_checkVisibility",
      value: function _checkVisibility() {
        var visible = this.visible();

        if (visible) {
          this.canvas._canvas.style.display = 'block';
        } else {
          this.canvas._canvas.style.display = 'none';
        }
      }
    }, {
      key: "_setSmoothEnabled",
      value: function _setSmoothEnabled() {
        this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        if (this.parent) {
          return this.parent.width();
        }
      }
    }, {
      key: "setWidth",
      value: function setWidth() {
        Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        if (this.parent) {
          return this.parent.height();
        }
      }
    }, {
      key: "setHeight",
      value: function setHeight() {
        Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
      }
    }, {
      key: "batchDraw",
      value: function batchDraw() {
        var _this2 = this;

        if (!this._waitingForDraw) {
          this._waitingForDraw = true;
          Util.requestAnimFrame(function () {
            _this2.draw();

            _this2._waitingForDraw = false;
          });
        }

        return this;
      }
    }, {
      key: "getIntersection",
      value: function getIntersection(pos) {
        if (!this.isListening() || !this.isVisible()) {
          return null;
        }

        var spiralSearchDistance = 1;
        var continueSearch = false;

        while (true) {
          for (var i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
            var intersectionOffset = INTERSECTION_OFFSETS[i];

            var obj = this._getIntersection({
              x: pos.x + intersectionOffset.x * spiralSearchDistance,
              y: pos.y + intersectionOffset.y * spiralSearchDistance
            });

            var shape = obj.shape;

            if (shape) {
              return shape;
            }

            continueSearch = !!obj.antialiased;

            if (!obj.antialiased) {
              break;
            }
          }

          if (continueSearch) {
            spiralSearchDistance += 1;
          } else {
            return null;
          }
        }
      }
    }, {
      key: "_getIntersection",
      value: function _getIntersection(pos) {
        var ratio = this.hitCanvas.pixelRatio;
        var p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data;
        var p3 = p[3];

        if (p3 === 255) {
          var colorKey = Util._rgbToHex(p[0], p[1], p[2]);

          var shape = shapes[HASH + colorKey];

          if (shape) {
            return {
              shape: shape
            };
          }

          return {
            antialiased: true
          };
        } else if (p3 > 0) {
          return {
            antialiased: true
          };
        }

        return {};
      }
    }, {
      key: "drawScene",
      value: function drawScene(can, top) {
        var layer = this.getLayer(),
            canvas = can || layer && layer.getCanvas();

        this._fire(BEFORE_DRAW, {
          node: this
        });

        if (this.clearBeforeDraw()) {
          canvas.getContext().clear();
        }

        Container.prototype.drawScene.call(this, canvas, top);

        this._fire(DRAW, {
          node: this
        });

        return this;
      }
    }, {
      key: "drawHit",
      value: function drawHit(can, top) {
        var layer = this.getLayer(),
            canvas = can || layer && layer.hitCanvas;

        if (layer && layer.clearBeforeDraw()) {
          layer.getHitCanvas().getContext().clear();
        }

        Container.prototype.drawHit.call(this, canvas, top);
        return this;
      }
    }, {
      key: "enableHitGraph",
      value: function enableHitGraph() {
        this.hitGraphEnabled(true);
        return this;
      }
    }, {
      key: "disableHitGraph",
      value: function disableHitGraph() {
        this.hitGraphEnabled(false);
        return this;
      }
    }, {
      key: "setHitGraphEnabled",
      value: function setHitGraphEnabled(val) {
        Util.warn('hitGraphEnabled method is deprecated. Please use layer.listening() instead.');
        this.listening(val);
      }
    }, {
      key: "getHitGraphEnabled",
      value: function getHitGraphEnabled(val) {
        Util.warn('hitGraphEnabled method is deprecated. Please use layer.listening() instead.');
        return this.listening();
      }
    }, {
      key: "toggleHitCanvas",
      value: function toggleHitCanvas() {
        if (!this.parent || !this.parent['content']) {
          return;
        }

        var parent = this.parent;
        var added = !!this.hitCanvas._canvas.parentNode;

        if (added) {
          parent.content.removeChild(this.hitCanvas._canvas);
        } else {
          parent.content.appendChild(this.hitCanvas._canvas);
        }
      }
    }]);

    return Layer;
  }(Container);
  Layer.prototype.nodeType = 'Layer';

  _registerNode(Layer);

  Factory.addGetterSetter(Layer, 'imageSmoothingEnabled', true);
  Factory.addGetterSetter(Layer, 'clearBeforeDraw', true);
  Factory.addGetterSetter(Layer, 'hitGraphEnabled', true, getBooleanValidator());

  var FastLayer = /*#__PURE__*/function (_Layer) {
    _inherits(FastLayer, _Layer);

    var _super = _createSuper(FastLayer);

    function FastLayer(attrs) {
      var _this;

      _classCallCheck(this, FastLayer);

      _this = _super.call(this, attrs);

      _this.listening(false);

      Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
      return _this;
    }

    return _createClass(FastLayer);
  }(Layer);
  FastLayer.prototype.nodeType = 'FastLayer';

  _registerNode(FastLayer);

  var Group = /*#__PURE__*/function (_Container) {
    _inherits(Group, _Container);

    var _super = _createSuper(Group);

    function Group() {
      _classCallCheck(this, Group);

      return _super.apply(this, arguments);
    }

    _createClass(Group, [{
      key: "_validateAdd",
      value: function _validateAdd(child) {
        var type = child.getType();

        if (type !== 'Group' && type !== 'Shape') {
          Util.throw('You may only add groups and shapes to groups.');
        }
      }
    }]);

    return Group;
  }(Container);
  Group.prototype.nodeType = 'Group';

  _registerNode(Group);

  var now = function () {
    if (glob.performance && glob.performance.now) {
      return function () {
        return glob.performance.now();
      };
    }

    return function () {
      return new Date().getTime();
    };
  }();

  var Animation = /*#__PURE__*/function () {
    function Animation(func, layers) {
      _classCallCheck(this, Animation);

      this.id = Animation.animIdCounter++;
      this.frame = {
        time: 0,
        timeDiff: 0,
        lastTime: now(),
        frameRate: 0
      };
      this.func = func;
      this.setLayers(layers);
    }

    _createClass(Animation, [{
      key: "setLayers",
      value: function setLayers(layers) {
        var lays = [];

        if (!layers) {
          lays = [];
        } else if (layers.length > 0) {
          lays = layers;
        } else {
          lays = [layers];
        }

        this.layers = lays;
        return this;
      }
    }, {
      key: "getLayers",
      value: function getLayers() {
        return this.layers;
      }
    }, {
      key: "addLayer",
      value: function addLayer(layer) {
        var layers = this.layers,
            len = layers.length,
            n;

        for (n = 0; n < len; n++) {
          if (layers[n]._id === layer._id) {
            return false;
          }
        }

        this.layers.push(layer);
        return true;
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        var a = Animation,
            animations = a.animations,
            len = animations.length,
            n;

        for (n = 0; n < len; n++) {
          if (animations[n].id === this.id) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "start",
      value: function start() {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();

        Animation._addAnimation(this);

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        Animation._removeAnimation(this);

        return this;
      }
    }, {
      key: "_updateFrameObject",
      value: function _updateFrameObject(time) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1000 / this.frame.timeDiff;
      }
    }], [{
      key: "_addAnimation",
      value: function _addAnimation(anim) {
        this.animations.push(anim);

        this._handleAnimation();
      }
    }, {
      key: "_removeAnimation",
      value: function _removeAnimation(anim) {
        var id = anim.id,
            animations = this.animations,
            len = animations.length,
            n;

        for (n = 0; n < len; n++) {
          if (animations[n].id === id) {
            this.animations.splice(n, 1);
            break;
          }
        }
      }
    }, {
      key: "_runFrames",
      value: function _runFrames() {
        var layerHash = {},
            animations = this.animations,
            anim,
            layers,
            func,
            n,
            i,
            layersLen,
            layer,
            key,
            needRedraw;

        for (n = 0; n < animations.length; n++) {
          anim = animations[n];
          layers = anim.layers;
          func = anim.func;

          anim._updateFrameObject(now());

          layersLen = layers.length;

          if (func) {
            needRedraw = func.call(anim, anim.frame) !== false;
          } else {
            needRedraw = true;
          }

          if (!needRedraw) {
            continue;
          }

          for (i = 0; i < layersLen; i++) {
            layer = layers[i];

            if (layer._id !== undefined) {
              layerHash[layer._id] = layer;
            }
          }
        }

        for (key in layerHash) {
          if (!layerHash.hasOwnProperty(key)) {
            continue;
          }

          layerHash[key].batchDraw();
        }
      }
    }, {
      key: "_animationLoop",
      value: function _animationLoop() {
        var Anim = Animation;

        if (Anim.animations.length) {
          Anim._runFrames();

          Util.requestAnimFrame(Anim._animationLoop);
        } else {
          Anim.animRunning = false;
        }
      }
    }, {
      key: "_handleAnimation",
      value: function _handleAnimation() {
        if (!this.animRunning) {
          this.animRunning = true;
          Util.requestAnimFrame(this._animationLoop);
        }
      }
    }]);

    return Animation;
  }();
  Animation.animations = [];
  Animation.animIdCounter = 0;
  Animation.animRunning = false;

  var blacklist = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1
  },
      PAUSED = 1,
      PLAYING = 2,
      REVERSING = 3,
      idCounter = 0,
      colorAttrs = ['fill', 'stroke', 'shadowColor'];

  var TweenEngine = /*#__PURE__*/function () {
    function TweenEngine(prop, propFunc, func, begin, finish, duration, yoyo) {
      _classCallCheck(this, TweenEngine);

      this.prop = prop;
      this.propFunc = propFunc;
      this.begin = begin;
      this._pos = begin;
      this.duration = duration;
      this._change = 0;
      this.prevPos = 0;
      this.yoyo = yoyo;
      this._time = 0;
      this._position = 0;
      this._startTime = 0;
      this._finish = 0;
      this.func = func;
      this._change = finish - this.begin;
      this.pause();
    }

    _createClass(TweenEngine, [{
      key: "fire",
      value: function fire(str) {
        var handler = this[str];

        if (handler) {
          handler();
        }
      }
    }, {
      key: "setTime",
      value: function setTime(t) {
        if (t > this.duration) {
          if (this.yoyo) {
            this._time = this.duration;
            this.reverse();
          } else {
            this.finish();
          }
        } else if (t < 0) {
          if (this.yoyo) {
            this._time = 0;
            this.play();
          } else {
            this.reset();
          }
        } else {
          this._time = t;
          this.update();
        }
      }
    }, {
      key: "getTime",
      value: function getTime() {
        return this._time;
      }
    }, {
      key: "setPosition",
      value: function setPosition(p) {
        this.prevPos = this._pos;
        this.propFunc(p);
        this._pos = p;
      }
    }, {
      key: "getPosition",
      value: function getPosition(t) {
        if (t === undefined) {
          t = this._time;
        }

        return this.func(t, this.begin, this._change, this.duration);
      }
    }, {
      key: "play",
      value: function play() {
        this.state = PLAYING;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onPlay');
      }
    }, {
      key: "reverse",
      value: function reverse() {
        this.state = REVERSING;
        this._time = this.duration - this._time;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onReverse');
      }
    }, {
      key: "seek",
      value: function seek(t) {
        this.pause();
        this._time = t;
        this.update();
        this.fire('onSeek');
      }
    }, {
      key: "reset",
      value: function reset() {
        this.pause();
        this._time = 0;
        this.update();
        this.fire('onReset');
      }
    }, {
      key: "finish",
      value: function finish() {
        this.pause();
        this._time = this.duration;
        this.update();
        this.fire('onFinish');
      }
    }, {
      key: "update",
      value: function update() {
        this.setPosition(this.getPosition(this._time));
        this.fire('onUpdate');
      }
    }, {
      key: "onEnterFrame",
      value: function onEnterFrame() {
        var t = this.getTimer() - this._startTime;

        if (this.state === PLAYING) {
          this.setTime(t);
        } else if (this.state === REVERSING) {
          this.setTime(this.duration - t);
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        this.state = PAUSED;
        this.fire('onPause');
      }
    }, {
      key: "getTimer",
      value: function getTimer() {
        return new Date().getTime();
      }
    }]);

    return TweenEngine;
  }();

  var Tween = /*#__PURE__*/function () {
    function Tween(config) {
      _classCallCheck(this, Tween);

      var that = this,
          node = config.node,
          nodeId = node._id,
          duration,
          easing = config.easing || Easings.Linear,
          yoyo = !!config.yoyo,
          key;

      if (typeof config.duration === 'undefined') {
        duration = 0.3;
      } else if (config.duration === 0) {
        duration = 0.001;
      } else {
        duration = config.duration;
      }

      this.node = node;
      this._id = idCounter++;
      var layers = node.getLayer() || (node instanceof Konva$1['Stage'] ? node.getLayers() : null);

      if (!layers) {
        Util.error('Tween constructor have `node` that is not in a layer. Please add node into layer first.');
      }

      this.anim = new Animation(function () {
        that.tween.onEnterFrame();
      }, layers);
      this.tween = new TweenEngine(key, function (i) {
        that._tweenFunc(i);
      }, easing, 0, 1, duration * 1000, yoyo);

      this._addListeners();

      if (!Tween.attrs[nodeId]) {
        Tween.attrs[nodeId] = {};
      }

      if (!Tween.attrs[nodeId][this._id]) {
        Tween.attrs[nodeId][this._id] = {};
      }

      if (!Tween.tweens[nodeId]) {
        Tween.tweens[nodeId] = {};
      }

      for (key in config) {
        if (blacklist[key] === undefined) {
          this._addAttr(key, config[key]);
        }
      }

      this.reset();
      this.onFinish = config.onFinish;
      this.onReset = config.onReset;
      this.onUpdate = config.onUpdate;
    }

    _createClass(Tween, [{
      key: "_addAttr",
      value: function _addAttr(key, end) {
        var node = this.node,
            nodeId = node._id,
            start,
            diff,
            tweenId,
            n,
            len,
            trueEnd,
            trueStart,
            endRGBA;
        tweenId = Tween.tweens[nodeId][key];

        if (tweenId) {
          delete Tween.attrs[nodeId][tweenId][key];
        }

        start = node.getAttr(key);

        if (Util._isArray(end)) {
          diff = [];
          len = Math.max(end.length, start.length);

          if (key === 'points' && end.length !== start.length) {
            if (end.length > start.length) {
              trueStart = start;
              start = Util._prepareArrayForTween(start, end, node.closed());
            } else {
              trueEnd = end;
              end = Util._prepareArrayForTween(end, start, node.closed());
            }
          }

          if (key.indexOf('fill') === 0) {
            for (n = 0; n < len; n++) {
              if (n % 2 === 0) {
                diff.push(end[n] - start[n]);
              } else {
                var startRGBA = Util.colorToRGBA(start[n]);
                endRGBA = Util.colorToRGBA(end[n]);
                start[n] = startRGBA;
                diff.push({
                  r: endRGBA.r - startRGBA.r,
                  g: endRGBA.g - startRGBA.g,
                  b: endRGBA.b - startRGBA.b,
                  a: endRGBA.a - startRGBA.a
                });
              }
            }
          } else {
            for (n = 0; n < len; n++) {
              diff.push(end[n] - start[n]);
            }
          }
        } else if (colorAttrs.indexOf(key) !== -1) {
          start = Util.colorToRGBA(start);
          endRGBA = Util.colorToRGBA(end);
          diff = {
            r: endRGBA.r - start.r,
            g: endRGBA.g - start.g,
            b: endRGBA.b - start.b,
            a: endRGBA.a - start.a
          };
        } else {
          diff = end - start;
        }

        Tween.attrs[nodeId][this._id][key] = {
          start: start,
          diff: diff,
          end: end,
          trueEnd: trueEnd,
          trueStart: trueStart
        };
        Tween.tweens[nodeId][key] = this._id;
      }
    }, {
      key: "_tweenFunc",
      value: function _tweenFunc(i) {
        var node = this.node,
            attrs = Tween.attrs[node._id][this._id],
            key,
            attr,
            start,
            diff,
            newVal,
            n,
            len,
            end;

        for (key in attrs) {
          attr = attrs[key];
          start = attr.start;
          diff = attr.diff;
          end = attr.end;

          if (Util._isArray(start)) {
            newVal = [];
            len = Math.max(start.length, end.length);

            if (key.indexOf('fill') === 0) {
              for (n = 0; n < len; n++) {
                if (n % 2 === 0) {
                  newVal.push((start[n] || 0) + diff[n] * i);
                } else {
                  newVal.push('rgba(' + Math.round(start[n].r + diff[n].r * i) + ',' + Math.round(start[n].g + diff[n].g * i) + ',' + Math.round(start[n].b + diff[n].b * i) + ',' + (start[n].a + diff[n].a * i) + ')');
                }
              }
            } else {
              for (n = 0; n < len; n++) {
                newVal.push((start[n] || 0) + diff[n] * i);
              }
            }
          } else if (colorAttrs.indexOf(key) !== -1) {
            newVal = 'rgba(' + Math.round(start.r + diff.r * i) + ',' + Math.round(start.g + diff.g * i) + ',' + Math.round(start.b + diff.b * i) + ',' + (start.a + diff.a * i) + ')';
          } else {
            newVal = start + diff * i;
          }

          node.setAttr(key, newVal);
        }
      }
    }, {
      key: "_addListeners",
      value: function _addListeners() {
        var _this = this;

        this.tween.onPlay = function () {
          _this.anim.start();
        };

        this.tween.onReverse = function () {
          _this.anim.start();
        };

        this.tween.onPause = function () {
          _this.anim.stop();
        };

        this.tween.onFinish = function () {
          var node = _this.node;
          var attrs = Tween.attrs[node._id][_this._id];

          if (attrs.points && attrs.points.trueEnd) {
            node.setAttr('points', attrs.points.trueEnd);
          }

          if (_this.onFinish) {
            _this.onFinish.call(_this);
          }
        };

        this.tween.onReset = function () {
          var node = _this.node;
          var attrs = Tween.attrs[node._id][_this._id];

          if (attrs.points && attrs.points.trueStart) {
            node.points(attrs.points.trueStart);
          }

          if (_this.onReset) {
            _this.onReset();
          }
        };

        this.tween.onUpdate = function () {
          if (_this.onUpdate) {
            _this.onUpdate.call(_this);
          }
        };
      }
    }, {
      key: "play",
      value: function play() {
        this.tween.play();
        return this;
      }
    }, {
      key: "reverse",
      value: function reverse() {
        this.tween.reverse();
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.tween.reset();
        return this;
      }
    }, {
      key: "seek",
      value: function seek(t) {
        this.tween.seek(t * 1000);
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.tween.pause();
        return this;
      }
    }, {
      key: "finish",
      value: function finish() {
        this.tween.finish();
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var nodeId = this.node._id,
            thisId = this._id,
            attrs = Tween.tweens[nodeId],
            key;
        this.pause();

        for (key in attrs) {
          delete Tween.tweens[nodeId][key];
        }

        delete Tween.attrs[nodeId][thisId];
      }
    }]);

    return Tween;
  }();
  Tween.attrs = {};
  Tween.tweens = {};

  Node.prototype.to = function (params) {
    var onFinish = params.onFinish;
    params.node = this;

    params.onFinish = function () {
      this.destroy();

      if (onFinish) {
        onFinish();
      }
    };

    var tween = new Tween(params);
    tween.play();
  };

  var Easings = {
    BackEaseIn: function BackEaseIn(t, b, c, d) {
      var s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function BackEaseOut(t, b, c, d) {
      var s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function BackEaseInOut(t, b, c, d) {
      var s = 1.70158;

      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      }

      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    ElasticEaseIn: function ElasticEaseIn(t, b, c, d, a, p) {
      var s = 0;

      if (t === 0) {
        return b;
      }

      if ((t /= d) === 1) {
        return b + c;
      }

      if (!p) {
        p = d * 0.3;
      }

      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }

      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    ElasticEaseOut: function ElasticEaseOut(t, b, c, d, a, p) {
      var s = 0;

      if (t === 0) {
        return b;
      }

      if ((t /= d) === 1) {
        return b + c;
      }

      if (!p) {
        p = d * 0.3;
      }

      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }

      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    ElasticEaseInOut: function ElasticEaseInOut(t, b, c, d, a, p) {
      var s = 0;

      if (t === 0) {
        return b;
      }

      if ((t /= d / 2) === 2) {
        return b + c;
      }

      if (!p) {
        p = d * (0.3 * 1.5);
      }

      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }

      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      }

      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    BounceEaseOut: function BounceEaseOut(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    BounceEaseIn: function BounceEaseIn(t, b, c, d) {
      return c - Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseInOut: function BounceEaseInOut(t, b, c, d) {
      if (t < d / 2) {
        return Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
      } else {
        return Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
      }
    },
    EaseIn: function EaseIn(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    EaseOut: function EaseOut(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    EaseInOut: function EaseInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }

      return -c / 2 * (--t * (t - 2) - 1) + b;
    },
    StrongEaseIn: function StrongEaseIn(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    StrongEaseOut: function StrongEaseOut(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    StrongEaseInOut: function StrongEaseInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }

      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    Linear: function Linear(t, b, c, d) {
      return c * t / d + b;
    }
  };

  var Konva = Util._assign(Konva$1, {
    Util: Util,
    Transform: Transform,
    Node: Node,
    Container: Container,
    Stage: Stage,
    stages: stages,
    Layer: Layer,
    FastLayer: FastLayer,
    Group: Group,
    DD: DD,
    Shape: Shape,
    shapes: shapes,
    Animation: Animation,
    Tween: Tween,
    Easings: Easings,
    Context: Context,
    Canvas: Canvas
  });

  /**
   * @file
   *
   * Defines the {@link HighlightLayer} class.
   *
   * @module highlight-layer
   */
  /**
   * Highlight layer options
   *
   * @typedef {Object} HighlightLayerOptions
   * @global
   * @property {Number} highlightOffset
   * @property {String} highlightColor
   * @property {String} highlightStrokeColor
   * @property {Number} highlightOpacity
   * @property {Number} highlightCornerRadius
   */

  /**
   * Creates the highlight region that shows the position of the zoomable
   * waveform view in the overview waveform.
   *
   * @class
   * @alias HighlightLayer
   *
   * @param {WaveformOverview} view
   * @param {HighlightLayerOptions} options
   */

  function HighlightLayer(view, options) {
    this._view = view;
    this._offset = options.highlightOffset;
    this._color = options.highlightColor;
    this._layer = new Konva.Layer({
      listening: false
    });
    this._highlightRect = null;
    this._startTime = null;
    this._endTime = null;
    this._strokeColor = options.highlightStrokeColor;
    this._opacity = options.highlightOpacity;
    this._cornerRadius = options.highlightCornerRadius;
  }

  HighlightLayer.prototype.addToStage = function (stage) {
    stage.add(this._layer);
  };

  HighlightLayer.prototype.showHighlight = function (startTime, endTime) {
    if (!this._highlightRect) {
      this._createHighlightRect(startTime, endTime);
    }

    this._update(startTime, endTime);
  };
  /**
   * Updates the position of the highlight region.
   *
   * @param {Number} startTime The start of the highlight region, in seconds.
   * @param {Number} endTime The end of the highlight region, in seconds.
   */


  HighlightLayer.prototype._update = function (startTime, endTime) {
    this._startTime = startTime;
    this._endTime = endTime;

    var startOffset = this._view.timeToPixels(startTime);

    var endOffset = this._view.timeToPixels(endTime);

    this._highlightRect.setAttrs({
      x: startOffset,
      width: endOffset - startOffset
    });
  };

  HighlightLayer.prototype._createHighlightRect = function (startTime, endTime) {
    this._startTime = startTime;
    this._endTime = endTime;

    var startOffset = this._view.timeToPixels(startTime);

    var endOffset = this._view.timeToPixels(endTime); // Create with default y and height, the real values are set in fitToView().


    this._highlightRect = new Rect({
      x: startOffset,
      y: 0,
      width: endOffset - startOffset,
      stroke: this._strokeColor,
      strokeWidth: 1,
      height: 0,
      fill: this._color,
      opacity: this._opacity,
      cornerRadius: this._cornerRadius
    });
    this.fitToView();

    this._layer.add(this._highlightRect);
  };

  HighlightLayer.prototype.removeHighlight = function () {
    if (this._highlightRect) {
      this._highlightRect.destroy();

      this._highlightRect = null;
    }
  };

  HighlightLayer.prototype.updateHighlight = function () {
    if (this._highlightRect) {
      this._update(this._startTime, this._endTime);
    }
  };

  HighlightLayer.prototype.fitToView = function () {
    if (this._highlightRect) {
      var height = this._view.getHeight();

      var offset = clamp(this._offset, 0, Math.floor(height / 2));

      this._highlightRect.setAttrs({
        y: offset,
        height: height - offset * 2
      });
    }
  };

  /**
   * @file
   *
   * Defines the {@link MouseDragHandler} class.
   *
   * @module mouse-drag-handler
   */

  function getMarkerObject(obj) {
    while (obj.parent !== null) {
      if (obj.parent instanceof Konva.Layer) {
        return obj;
      }

      obj = obj.parent;
    }

    return null;
  }
  /**
   * An object to receive callbacks on mouse drag events. Each function is
   * called with the current mouse X position, relative to the stage's
   * container HTML element.
   *
   * @typedef {Object} MouseDragHandlers
   * @global
   * @property {Function} onMouseDown Mouse down event handler.
   * @property {Function} onMouseMove Mouse move event handler.
   * @property {Function} onMouseUp Mouse up event handler.
   */

  /**
   * Creates a handler for mouse events to allow interaction with the waveform
   * views by clicking and dragging the mouse.
   *
   * @class
   * @alias MouseDragHandler
   *
   * @param {Konva.Stage} stage
   * @param {MouseDragHandlers} handlers
   */


  function MouseDragHandler(stage, handlers) {
    this._stage = stage;
    this._handlers = handlers;
    this._dragging = false;
    this._mouseDown = this._mouseDown.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
    this._mouseMove = this._mouseMove.bind(this);

    this._stage.on('mousedown', this._mouseDown);

    this._stage.on('touchstart', this._mouseDown);

    this._lastMouseClientX = null;
  }
  /**
   * Mouse down event handler.
   *
   * @param {MouseEvent} event
   */


  MouseDragHandler.prototype._mouseDown = function (event) {
    if (event.type === 'mousedown' && event.evt.button !== 0) {
      // Mouse drag only applies to the primary mouse button.
      // The secondary button may be used to show a context menu
      // and we don't want to also treat this as a mouse drag operation.
      return;
    }

    var marker = getMarkerObject(event.target); // Avoid interfering with drag/drop of point and segment markers.

    if (marker && marker.attrs.draggable) {
      return;
    }

    this._lastMouseClientX = Math.floor(event.type === 'touchstart' ? event.evt.touches[0].clientX : event.evt.clientX);

    if (this._handlers.onMouseDown) {
      var mouseDownPosX = this._getMousePosX(this._lastMouseClientX);

      this._handlers.onMouseDown(mouseDownPosX);
    } // Use the window mousemove and mouseup handlers instead of the
    // Konva.Stage ones so that we still receive events if the user moves the
    // mouse outside the stage.


    window.addEventListener('mousemove', this._mouseMove, false);
    window.addEventListener('touchmove', this._mouseMove, false);
    window.addEventListener('mouseup', this._mouseUp, false);
    window.addEventListener('touchend', this._mouseUp, false);
    window.addEventListener('blur', this._mouseUp, false);
  };
  /**
   * Mouse move event handler.
   *
   * @param {MouseEvent} event
   */


  MouseDragHandler.prototype._mouseMove = function (event) {
    var clientX = Math.floor(event.type === 'touchmove' ? event.changedTouches[0].clientX : event.clientX); // Don't update on vertical mouse movement.

    if (clientX === this._lastMouseClientX) {
      return;
    }

    this._lastMouseClientX = clientX;
    this._dragging = true;

    if (this._handlers.onMouseMove) {
      var mousePosX = this._getMousePosX(clientX);

      this._handlers.onMouseMove(mousePosX);
    }
  };
  /**
   * Mouse up event handler.
   *
   * @param {MouseEvent} event
   */


  MouseDragHandler.prototype._mouseUp = function (event) {
    var clientX;

    if (event.type === 'touchend') {
      clientX = Math.floor(event.changedTouches[0].clientX);

      if (event.cancelable) {
        event.preventDefault();
      }
    } else {
      clientX = Math.floor(event.clientX);
    }

    if (this._handlers.onMouseUp) {
      var mousePosX = this._getMousePosX(clientX);

      this._handlers.onMouseUp(mousePosX);
    }

    window.removeEventListener('mousemove', this._mouseMove, false);
    window.removeEventListener('touchmove', this._mouseMove, false);
    window.removeEventListener('mouseup', this._mouseUp, false);
    window.removeEventListener('touchend', this._mouseUp, false);
    window.removeEventListener('blur', this._mouseUp, false);
    this._dragging = false;
  };
  /**
   * @returns {Number} The mouse X position, relative to the container that
   * received the mouse down event.
   *
   * @private
   * @param {Number} clientX Mouse client X position.
   */


  MouseDragHandler.prototype._getMousePosX = function (clientX) {
    var containerPos = this._stage.getContainer().getBoundingClientRect();

    return clientX - containerPos.left;
  };
  /**
   * Returns <code>true</code> if the mouse is being dragged, i.e., moved with
   * the mouse button held down.
   *
   * @returns {Boolean}
   */


  MouseDragHandler.prototype.isDragging = function () {
    return this._dragging;
  };

  /**
   * @file
   *
   * Defines the {@link PlayheadLayer} class.
   *
   * @module playhead-layer
   */
  /**
   * Creates a Konva.Layer that displays a playhead marker.
   *
   * @class
   * @alias PlayheadLayer
   *
   * @param {Object} options
   * @param {Player} options.player
   * @param {WaveformOverview|WaveformZoomView} options.view
   * @param {Boolean} options.showPlayheadTime If <code>true</code> The playback time position
   *   is shown next to the playhead.
   * @param {String} options.playheadColor
   * @param {String} options.playheadTextColor
   * @param {String} options.playheadFontFamily
   * @param {Number} options.playheadFontSize
   * @param {String} options.playheadFontStyle
   */

  function PlayheadLayer(options) {
    this._player = options.player;
    this._view = options.view;
    this._playheadPixel = 0;
    this._playheadLineAnimation = null;
    this._playheadVisible = false;
    this._playheadColor = options.playheadColor;
    this._playheadTextColor = options.playheadTextColor;
    this._playheadFontFamily = options.playheadFontFamily;
    this._playheadFontSize = options.playheadFontSize;
    this._playheadFontStyle = options.playheadFontStyle;
    this._playheadLayer = new Konva.Layer();

    this._createPlayhead(this._playheadColor);

    if (options.showPlayheadTime) {
      this._createPlayheadText(this._playheadTextColor);
    }

    this.fitToView();
    this.zoomLevelChanged();
  }
  /**
   * Adds the layer to the given {Konva.Stage}.
   *
   * @param {Konva.Stage} stage
   */


  PlayheadLayer.prototype.addToStage = function (stage) {
    stage.add(this._playheadLayer);
  };
  /**
   * Decides whether to use an animation to update the playhead position.
   *
   * If the zoom level is such that the number of pixels per second of audio is
   * low, we can use timeupdate events from the HTMLMediaElement to
   * set the playhead position. Otherwise, we use an animation to update the
   * playhead position more smoothly. The animation is CPU intensive, so we
   * avoid using it where possible.
   */


  PlayheadLayer.prototype.zoomLevelChanged = function () {
    var pixelsPerSecond = this._view.timeToPixels(1.0);

    var time;
    this._useAnimation = pixelsPerSecond >= 5;

    if (this._useAnimation) {
      if (this._player.isPlaying() && !this._playheadLineAnimation) {
        // Start the animation
        this._start();
      }
    } else {
      if (this._playheadLineAnimation) {
        // Stop the animation
        time = this._player.getCurrentTime();
        this.stop(time);
      }
    }
  };
  /**
   * Resizes the playhead UI objects to fit the available space in the
   * view.
   */


  PlayheadLayer.prototype.fitToView = function () {
    var height = this._view.getHeight();

    this._playheadLine.points([0.5, 0, 0.5, height]);

    if (this._playheadText) {
      this._playheadText.y(12);
    }
  };
  /**
   * Creates the playhead UI objects.
   *
   * @private
   * @param {String} color
   */


  PlayheadLayer.prototype._createPlayhead = function (color) {
    // Create with default points, the real values are set in fitToView().
    this._playheadLine = new Line({
      stroke: color,
      strokeWidth: 1
    });
    this._playheadGroup = new Konva.Group({
      x: 0,
      y: 0
    });

    this._playheadGroup.add(this._playheadLine);

    this._playheadLayer.add(this._playheadGroup);
  };

  PlayheadLayer.prototype._createPlayheadText = function (color) {
    var time = this._player.getCurrentTime();

    var text = this._view.formatTime(time); // Create with default y, the real value is set in fitToView().


    this._playheadText = new Text({
      x: 2,
      y: 0,
      text: text,
      fontSize: this._playheadFontSize,
      fontFamily: this._playheadFontFamily,
      fontStyle: this._playheadFontStyle,
      fill: color,
      align: 'right'
    });

    this._playheadGroup.add(this._playheadText);
  };
  /**
   * Updates the playhead position.
   *
   * @param {Number} time Current playhead position, in seconds.
   */


  PlayheadLayer.prototype.updatePlayheadTime = function (time) {
    this._syncPlayhead(time);

    if (this._player.isPlaying()) {
      this._start();
    }
  };
  /**
   * Updates the playhead position.
   *
   * @private
   * @param {Number} time Current playhead position, in seconds.
   */


  PlayheadLayer.prototype._syncPlayhead = function (time) {
    var pixelIndex = this._view.timeToPixels(time);

    var frameOffset = this._view.getFrameOffset();

    var width = this._view.getWidth();

    var isVisible = pixelIndex >= frameOffset && pixelIndex <= frameOffset + width;
    this._playheadPixel = pixelIndex;

    if (isVisible) {
      var playheadX = this._playheadPixel - frameOffset;

      if (!this._playheadVisible) {
        this._playheadVisible = true;

        this._playheadGroup.show();
      }

      this._playheadGroup.setX(playheadX);

      if (this._playheadText) {
        var text = this._view.formatTime(time);

        var playheadTextWidth = this._playheadText.getTextWidth();

        this._playheadText.setText(text);

        if (playheadTextWidth + playheadX > width - 2) {
          this._playheadText.setX(-playheadTextWidth - 2);
        } else if (playheadTextWidth + playheadX < width) {
          this._playheadText.setX(2);
        }
      }
    } else {
      if (this._playheadVisible) {
        this._playheadVisible = false;

        this._playheadGroup.hide();
      }
    }

    if (this._view.playheadPosChanged) {
      this._view.playheadPosChanged(time);
    }
  };
  /**
   * Starts a playhead animation in sync with the media playback.
   *
   * @private
   */


  PlayheadLayer.prototype._start = function () {
    var self = this;

    if (self._playheadLineAnimation) {
      self._playheadLineAnimation.stop();

      self._playheadLineAnimation = null;
    }

    if (!self._useAnimation) {
      return;
    }

    var lastPlayheadPosition = null;
    self._playheadLineAnimation = new Animation(function () {
      var time = self._player.getCurrentTime();

      var playheadPosition = self._view.timeToPixels(time);

      if (playheadPosition !== lastPlayheadPosition) {
        self._syncPlayhead(time);

        lastPlayheadPosition = playheadPosition;
      }
    }, self._playheadLayer);

    self._playheadLineAnimation.start();
  };

  PlayheadLayer.prototype.stop = function (time) {
    if (this._playheadLineAnimation) {
      this._playheadLineAnimation.stop();

      this._playheadLineAnimation = null;
    }

    this._syncPlayhead(time);
  };
  /**
   * Returns the position of the playhead marker, in pixels relative to the
   * left hand side of the waveform view.
   *
   * @return {Number}
   */


  PlayheadLayer.prototype.getPlayheadOffset = function () {
    return this._playheadPixel - this._view.getFrameOffset();
  };

  PlayheadLayer.prototype.getPlayheadPixel = function () {
    return this._playheadPixel;
  };

  PlayheadLayer.prototype.showPlayheadTime = function (show) {
    if (show) {
      if (!this._playheadText) {
        // Create it
        this._createPlayheadText(this._playheadTextColor);

        this.fitToView();
      }
    } else {
      if (this._playheadText) {
        this._playheadText.remove();

        this._playheadText.destroy();

        this._playheadText = null;
      }
    }
  };

  PlayheadLayer.prototype.updatePlayheadText = function () {
    if (this._playheadText) {
      var time = this._player.getCurrentTime();

      var text = this._view.formatTime(time);

      this._playheadText.setText(text);
    }
  };

  PlayheadLayer.prototype.destroy = function () {
    if (this._playheadLineAnimation) {
      this._playheadLineAnimation.stop();

      this._playheadLineAnimation = null;
    }
  };

  /**
   * @file
   *
   * Defines the {@link PointMarker} class.
   *
   * @module point-marker
   */
  /**
   * Parameters for the {@link PointMarker} constructor.
   *
   * @typedef {Object} PointMarkerOptions
   * @global
   * @property {Point} point Point object with timestamp.
   * @property {Boolean} draggable If true, marker is draggable.
   * @property {Marker} marker
   * @property {Function} onclick
   * @property {Function} onDblClick
   * @property {Function} onDragStart
   * @property {Function} onDragMove Callback during mouse drag operations.
   * @property {Function} onDragEnd
   * @property {Function} onMouseEnter
   * @property {Function} onMouseLeave
   * @property {Function} onContextMenu
   */

  /**
   * Creates a point marker handle.
   *
   * @class
   * @alias PointMarker
   *
   * @param {PointMarkerOptions} options
   */

  function PointMarker(options) {
    this._point = options.point;
    this._marker = options.marker;
    this._draggable = options.draggable;
    this._onClick = options.onClick;
    this._onDblClick = options.onDblClick;
    this._onDragStart = options.onDragStart;
    this._onDragMove = options.onDragMove;
    this._onDragEnd = options.onDragEnd;
    this._onMouseEnter = options.onMouseEnter;
    this._onMouseLeave = options.onMouseLeave;
    this._onContextMenu = options.onContextMenu;
    this._dragBoundFunc = this._dragBoundFunc.bind(this);
    this._group = new Konva.Group({
      draggable: this._draggable,
      dragBoundFunc: this._dragBoundFunc
    });

    this._bindDefaultEventHandlers();

    this._marker.init(this._group);
  }

  PointMarker.prototype._bindDefaultEventHandlers = function () {
    var self = this;

    self._group.on('dragstart', function (event) {
      self._onDragStart(event, self._point);
    });

    self._group.on('dragmove', function (event) {
      self._onDragMove(event, self._point);
    });

    self._group.on('dragend', function (event) {
      self._onDragEnd(event, self._point);
    });

    self._group.on('click', function (event) {
      self._onClick(event, self._point);
    });

    self._group.on('dblclick', function (event) {
      self._onDblClick(event, self._point);
    });

    self._group.on('mouseenter', function (event) {
      self._onMouseEnter(event, self._point);
    });

    self._group.on('mouseleave', function (event) {
      self._onMouseLeave(event, self._point);
    });

    self._group.on('contextmenu', function (event) {
      self._onContextMenu(event, self._point);
    });
  };

  PointMarker.prototype._dragBoundFunc = function (pos) {
    // Allow the marker to be moved horizontally but not vertically.
    return {
      x: pos.x,
      y: this._group.getAbsolutePosition().y
    };
  };
  /**
   * @param {Konva.Layer} layer
   */


  PointMarker.prototype.addToLayer = function (layer) {
    layer.add(this._group);
  };

  PointMarker.prototype.fitToView = function () {
    this._marker.fitToView();
  };

  PointMarker.prototype.getPoint = function () {
    return this._point;
  };

  PointMarker.prototype.getX = function () {
    return this._group.getX();
  };

  PointMarker.prototype.getWidth = function () {
    return this._group.getWidth();
  };

  PointMarker.prototype.setX = function (x) {
    this._group.setX(x);
  };

  PointMarker.prototype.timeUpdated = function (time) {
    if (this._marker.timeUpdated) {
      this._marker.timeUpdated(time);
    }
  };

  PointMarker.prototype.destroy = function () {
    if (this._marker.destroy) {
      this._marker.destroy();
    }

    this._group.destroyChildren();

    this._group.destroy();
  };

  /**
   * @file
   *
   * Defines the {@link PointsLayer} class.
   *
   * @module points-layer
   */
  var defaultFontFamily$1 = 'sans-serif';
  var defaultFontSize$1 = 10;
  var defaultFontShape$1 = 'normal';
  /**
   * Creates a Konva.Layer that displays point markers against the audio
   * waveform.
   *
   * @class
   * @alias PointsLayer
   *
   * @param {Peaks} peaks
   * @param {WaveformOverview|WaveformZoomView} view
   * @param {Boolean} allowEditing
   */

  function PointsLayer(peaks, view, allowEditing) {
    this._peaks = peaks;
    this._view = view;
    this._allowEditing = allowEditing;
    this._pointMarkers = {};
    this._layer = new Konva.Layer();
    this._onPointsDrag = this._onPointsDrag.bind(this);
    this._onPointHandleClick = this._onPointHandleClick.bind(this);
    this._onPointHandleDblClick = this._onPointHandleDblClick.bind(this);
    this._onPointHandleDragStart = this._onPointHandleDragStart.bind(this);
    this._onPointHandleDragMove = this._onPointHandleDragMove.bind(this);
    this._onPointHandleDragEnd = this._onPointHandleDragEnd.bind(this);
    this._onPointHandleMouseEnter = this._onPointHandleMouseEnter.bind(this);
    this._onPointHandleMouseLeave = this._onPointHandleMouseLeave.bind(this);
    this._onPointHandleContextMenu = this._onPointHandleContextMenu.bind(this);
    this._onPointsUpdate = this._onPointsUpdate.bind(this);
    this._onPointsAdd = this._onPointsAdd.bind(this);
    this._onPointsRemove = this._onPointsRemove.bind(this);
    this._onPointsRemoveAll = this._onPointsRemoveAll.bind(this);

    this._peaks.on('points.update', this._onPointsUpdate);

    this._peaks.on('points.add', this._onPointsAdd);

    this._peaks.on('points.remove', this._onPointsRemove);

    this._peaks.on('points.remove_all', this._onPointsRemoveAll);

    this._peaks.on('points.dragstart', this._onPointsDrag);

    this._peaks.on('points.dragmove', this._onPointsDrag);

    this._peaks.on('points.dragend', this._onPointsDrag);
  }
  /**
   * Adds the layer to the given {Konva.Stage}.
   *
   * @param {Konva.Stage} stage
   */


  PointsLayer.prototype.addToStage = function (stage) {
    stage.add(this._layer);
  };

  PointsLayer.prototype.enableEditing = function (enable) {
    this._allowEditing = enable;
  };

  PointsLayer.prototype.formatTime = function (time) {
    return this._view.formatTime(time);
  };

  PointsLayer.prototype._onPointsUpdate = function (point) {
    var frameStartTime = this._view.getStartTime();

    var frameEndTime = this._view.getEndTime();

    this._removePoint(point);

    if (point.isVisible(frameStartTime, frameEndTime)) {
      this._addPointMarker(point);
    }

    this.updatePoints(frameStartTime, frameEndTime);
  };

  PointsLayer.prototype._onPointsAdd = function (points) {
    var self = this;

    var frameStartTime = self._view.getStartTime();

    var frameEndTime = self._view.getEndTime();

    points.forEach(function (point) {
      if (point.isVisible(frameStartTime, frameEndTime)) {
        self._addPointMarker(point);
      }
    });
    self.updatePoints(frameStartTime, frameEndTime);
  };

  PointsLayer.prototype._onPointsRemove = function (points) {
    var self = this;
    points.forEach(function (point) {
      self._removePoint(point);
    });
  };

  PointsLayer.prototype._onPointsRemoveAll = function () {
    this._layer.removeChildren();

    this._pointMarkers = {};
  };

  PointsLayer.prototype._onPointsDrag = function (event) {
    this._updatePoint(event.point);
  };
  /**
   * Creates the Konva UI objects for a given point.
   *
   * @private
   * @param {Point} point
   * @returns {PointMarker}
   */


  PointsLayer.prototype._createPointMarker = function (point) {
    var editable = this._allowEditing && point.editable;

    var marker = this._peaks.options.createPointMarker({
      point: point,
      draggable: editable,
      color: point.color ? point.color : this._peaks.options.pointMarkerColor,
      fontFamily: this._peaks.options.fontFamily || defaultFontFamily$1,
      fontSize: this._peaks.options.fontSize || defaultFontSize$1,
      fontStyle: this._peaks.options.fontStyle || defaultFontShape$1,
      layer: this,
      view: this._view.getName()
    });

    return new PointMarker({
      point: point,
      draggable: editable,
      marker: marker,
      onClick: this._onPointHandleClick,
      onDblClick: this._onPointHandleDblClick,
      onDragStart: this._onPointHandleDragStart,
      onDragMove: this._onPointHandleDragMove,
      onDragEnd: this._onPointHandleDragEnd,
      onMouseEnter: this._onPointHandleMouseEnter,
      onMouseLeave: this._onPointHandleMouseLeave,
      onContextMenu: this._onPointHandleContextMenu
    });
  };

  PointsLayer.prototype.getHeight = function () {
    return this._view.getHeight();
  };
  /**
   * Adds a Konva UI object to the layer for a given point.
   *
   * @private
   * @param {Point} point
   * @returns {PointMarker}
   */


  PointsLayer.prototype._addPointMarker = function (point) {
    var pointMarker = this._createPointMarker(point);

    this._pointMarkers[point.id] = pointMarker;
    pointMarker.addToLayer(this._layer);
    return pointMarker;
  };
  /**
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleDragMove = function (event, point) {
    var pointMarker = this._pointMarkers[point.id];
    var markerX = pointMarker.getX();

    if (markerX >= 0 && markerX < this._view.getWidth()) {
      var offset = markerX + pointMarker.getWidth();

      point._setTime(this._view.pixelOffsetToTime(offset));

      pointMarker.timeUpdated(point.time);
    }

    this._peaks.emit('points.dragmove', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * @param {KonvaEventObject} event
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleMouseEnter = function (event, point) {
    this._peaks.emit('points.mouseenter', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * @param {KonvaEventObject} event
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleMouseLeave = function (event, point) {
    this._peaks.emit('points.mouseleave', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * @param {KonvaEventObject} event
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleClick = function (event, point) {
    this._peaks.emit('points.click', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * @param {KonvaEventObject} event
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleDblClick = function (event, point) {
    this._peaks.emit('points.dblclick', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * @param {KonvaEventObject} event
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleDragStart = function (event, point) {
    this._peaks.emit('points.dragstart', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * @param {KonvaEventObject} event
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleDragEnd = function (event, point) {
    this._peaks.emit('points.dragend', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * @param {KonvaEventObject} event
   * @param {Point} point
   */


  PointsLayer.prototype._onPointHandleContextMenu = function (event, point) {
    this._peaks.emit('points.contextmenu', {
      point: point,
      evt: event.evt
    });
  };
  /**
   * Updates the positions of all displayed points in the view.
   *
   * @param {Number} startTime The start of the visible range in the view,
   *   in seconds.
   * @param {Number} endTime The end of the visible range in the view,
   *   in seconds.
   */


  PointsLayer.prototype.updatePoints = function (startTime, endTime) {
    // Update all points in the visible time range.
    var points = this._peaks.points.find(startTime, endTime);

    points.forEach(this._updatePoint.bind(this)); // TODO: in the overview all points are visible, so no need to check

    this._removeInvisiblePoints(startTime, endTime);
  };
  /**
   * @private
   * @param {Point} point
   */


  PointsLayer.prototype._updatePoint = function (point) {
    var pointMarker = this._findOrAddPointMarker(point);

    var pointMarkerOffset = this._view.timeToPixels(point.time);

    var pointMarkerX = pointMarkerOffset - this._view.getFrameOffset();

    pointMarker.setX(pointMarkerX);
  };
  /**
   * @private
   * @param {Point} point
   * @return {PointMarker}
   */


  PointsLayer.prototype._findOrAddPointMarker = function (point) {
    var pointMarker = this._pointMarkers[point.id];

    if (!pointMarker) {
      pointMarker = this._addPointMarker(point);
    }

    return pointMarker;
  };
  /**
   * Remove any points that are not visible, i.e., are outside the given time
   * range.
   *
   * @private
   * @param {Number} startTime The start of the visible time range, in seconds.
   * @param {Number} endTime The end of the visible time range, in seconds.
   * @returns {Number} The number of points removed.
   */


  PointsLayer.prototype._removeInvisiblePoints = function (startTime, endTime) {
    var count = 0;

    for (var pointId in this._pointMarkers) {
      if (objectHasProperty(this._pointMarkers, pointId)) {
        var point = this._pointMarkers[pointId].getPoint();

        if (!point.isVisible(startTime, endTime)) {
          this._removePoint(point);

          count++;
        }
      }
    }

    return count;
  };
  /**
   * Removes the UI object for a given point.
   *
   * @private
   * @param {Point} point
   */


  PointsLayer.prototype._removePoint = function (point) {
    var pointMarker = this._pointMarkers[point.id];

    if (pointMarker) {
      pointMarker.destroy();
      delete this._pointMarkers[point.id];
    }
  };
  /**
   * Toggles visibility of the points layer.
   *
   * @param {Boolean} visible
   */


  PointsLayer.prototype.setVisible = function (visible) {
    this._layer.setVisible(visible);
  };

  PointsLayer.prototype.destroy = function () {
    this._peaks.off('points.update', this._onPointsUpdate);

    this._peaks.off('points.add', this._onPointsAdd);

    this._peaks.off('points.remove', this._onPointsRemove);

    this._peaks.off('points.remove_all', this._onPointsRemoveAll);

    this._peaks.off('points.dragstart', this._onPointsDrag);

    this._peaks.off('points.dragmove', this._onPointsDrag);

    this._peaks.off('points.dragend', this._onPointsDrag);
  };

  PointsLayer.prototype.fitToView = function () {
    for (var pointId in this._pointMarkers) {
      if (objectHasProperty(this._pointMarkers, pointId)) {
        var pointMarker = this._pointMarkers[pointId];
        pointMarker.fitToView();
      }
    }
  };

  PointsLayer.prototype.draw = function () {
    this._layer.draw();
  };

  /**
   * @file
   *
   * Defines the {@link SegmentMarker} class.
   *
   * @module segment-marker
   */
  /**
   * Parameters for the {@link SegmentMarker} constructor.
   *
   * @typedef {Object} SegmentMarkerOptions
   * @global
   * @property {Segment} segment
   * @property {SegmentShape} segmentShape
   * @property {Boolean} draggable If true, marker is draggable.
   * @property {Boolean} startMarker If <code>true</code>, the marker indicates
   *   the start time of the segment. If <code>false</code>, the marker
   *   indicates the end time of the segment.
   * @property {Function} onDrag
   * @property {Function} onDragStart
   * @property {Function} onDragEnd
   */

  /**
   * Creates a Left or Right side segment handle marker.
   *
   * @class
   * @alias SegmentMarker
   *
   * @param {SegmentMarkerOptions} options
   */

  function SegmentMarker(options) {
    this._segment = options.segment;
    this._marker = options.marker;
    this._segmentShape = options.segmentShape;
    this._draggable = options.draggable;
    this._startMarker = options.startMarker;
    this._onDrag = options.onDrag;
    this._onDragStart = options.onDragStart;
    this._onDragEnd = options.onDragEnd;
    this._dragBoundFunc = this._dragBoundFunc.bind(this);
    this._group = new Konva.Group({
      draggable: this._draggable,
      dragBoundFunc: this._dragBoundFunc
    });

    this._bindDefaultEventHandlers();

    this._marker.init(this._group);
  }

  SegmentMarker.prototype._bindDefaultEventHandlers = function () {
    var self = this;

    if (self._draggable) {
      self._group.on('dragmove', function (event) {
        self._onDrag(event, self);
      });

      self._group.on('dragstart', function (event) {
        self._onDragStart(event, self);
      });

      self._group.on('dragend', function (event) {
        self._onDragEnd(event, self);
      });
    }
  };

  SegmentMarker.prototype._dragBoundFunc = function (pos) {
    var marker;
    var limit;

    if (this._startMarker) {
      marker = this._segmentShape.getEndMarker();
      limit = marker.getX() - marker.getWidth();

      if (pos.x > limit) {
        pos.x = limit;
      }
    } else {
      marker = this._segmentShape.getStartMarker();
      limit = marker.getX() + marker.getWidth();

      if (pos.x < limit) {
        pos.x = limit;
      }
    }

    return {
      x: pos.x,
      y: this._group.getAbsolutePosition().y
    };
  };

  SegmentMarker.prototype.addToLayer = function (layer) {
    layer.add(this._group);
  };

  SegmentMarker.prototype.fitToView = function () {
    this._marker.fitToView();
  };

  SegmentMarker.prototype.getSegment = function () {
    return this._segment;
  };

  SegmentMarker.prototype.getX = function () {
    return this._group.getX();
  };

  SegmentMarker.prototype.getWidth = function () {
    return this._group.getWidth();
  };

  SegmentMarker.prototype.isStartMarker = function () {
    return this._startMarker;
  };

  SegmentMarker.prototype.setX = function (x) {
    this._group.setX(x);
  };

  SegmentMarker.prototype.timeUpdated = function (time) {
    if (this._marker.timeUpdated) {
      this._marker.timeUpdated(time);
    }
  };

  SegmentMarker.prototype.destroy = function () {
    if (this._marker.destroy) {
      this._marker.destroy();
    }

    this._group.destroyChildren();

    this._group.destroy();
  };

  /**
   * @file
   *
   * Defines the {@link WaveformShape} class.
   *
   * @module waveform-shape
   */
  /**
   * Waveform shape options.
   *
   * @typedef {Object} WaveformShapeOptions
   * @global
   * @property {String | LinearGradientColor} color Waveform color.
   * @property {WaveformOverview|WaveformZoomView} view The view object
   *   that contains the waveform shape.
   * @property {Segment?} segment If given, render a waveform image
   *   covering the segment's time range. Otherwise, render the entire
   *   waveform duration.
   */

  /**
   * Creates a Konva.Shape object that renders a waveform image.
   *
   * @class
   * @alias WaveformShape
   *
   * @param {WaveformShapeOptions} options
   */

  function WaveformShape(options) {
    this._color = options.color;
    var shapeOptions = {};

    if (isString(options.color)) {
      shapeOptions.fill = options.color;
    } else if (isLinearGradientColor(options.color)) {
      var startY = options.view._height * (options.color.linearGradientStart / 100);
      var endY = options.view._height * (options.color.linearGradientEnd / 100);
      shapeOptions.fillLinearGradientStartPointY = startY;
      shapeOptions.fillLinearGradientEndPointY = endY;
      shapeOptions.fillLinearGradientColorStops = [0, options.color.linearGradientColorStops[0], 1, options.color.linearGradientColorStops[1]];
    } else {
      throw new TypeError('Unknown type for color property');
    }

    this._shape = new Konva.Shape(shapeOptions);
    this._view = options.view;
    this._segment = options.segment;

    this._shape.sceneFunc(this._sceneFunc.bind(this));

    this._shape.hitFunc(this._waveformShapeHitFunc.bind(this));
  }

  WaveformShape.prototype.setSegment = function (segment) {
    this._segment = segment;
  };

  WaveformShape.prototype.setWaveformColor = function (color) {
    if (isString(color)) {
      this._shape.fill(color);

      this._shape.fillLinearGradientStartPointY(null);

      this._shape.fillLinearGradientEndPointY(null);

      this._shape.fillLinearGradientColorStops(null);
    } else if (isLinearGradientColor(color)) {
      this._shape.fill(null);

      var startY = this._view._height * (color.linearGradientStart / 100);
      var endY = this._view._height * (color.linearGradientEnd / 100);

      this._shape.fillLinearGradientStartPointY(startY);

      this._shape.fillLinearGradientEndPointY(endY);

      this._shape.fillLinearGradientColorStops([0, color.linearGradientColorStops[0], 1, color.linearGradientColorStops[1]]);
    } else {
      throw new TypeError('Unknown type for color property');
    }
  };

  WaveformShape.prototype.fitToView = function () {
    this.setWaveformColor(this._color);
  };

  WaveformShape.prototype._sceneFunc = function (context) {
    var frameOffset = this._view.getFrameOffset();

    var width = this._view.getWidth();

    var height = this._view.getHeight();

    this._drawWaveform(context, this._view.getWaveformData(), frameOffset, this._segment ? this._view.timeToPixels(this._segment.startTime) : frameOffset, this._segment ? this._view.timeToPixels(this._segment.endTime) : frameOffset + width, width, height);
  };
  /**
   * Draws a waveform on a canvas context.
   *
   * @param {Konva.Context} context The canvas context to draw on.
   * @param {WaveformData} waveformData The waveform data to draw.
   * @param {Number} frameOffset The start position of the waveform shown
   *   in the view, in pixels.
   * @param {Number} startPixels The start position of the waveform to draw,
   *   in pixels.
   * @param {Number} endPixels The end position of the waveform to draw,
   *   in pixels.
   * @param {Number} width The width of the waveform area, in pixels.
   * @param {Number} height The height of the waveform area, in pixels.
   */


  WaveformShape.prototype._drawWaveform = function (context, waveformData, frameOffset, startPixels, endPixels, width, height) {
    if (startPixels < frameOffset) {
      startPixels = frameOffset;
    }

    var limit = frameOffset + width;

    if (endPixels > limit) {
      endPixels = limit;
    }

    if (endPixels > waveformData.length - 1) {
      endPixels = waveformData.length - 1;
    }

    var channels = waveformData.channels;
    var waveformTop = 0;
    var waveformHeight = Math.floor(height / channels);

    for (var i = 0; i < channels; i++) {
      if (i === channels - 1) {
        waveformHeight = height - (channels - 1) * waveformHeight;
      }

      this._drawChannel(context, waveformData.channel(i), frameOffset, startPixels, endPixels, waveformTop, waveformHeight);

      waveformTop += waveformHeight;
    }
  };
  /**
   * Draws a single waveform channel on a canvas context.
   *
   * @param {Konva.Context} context The canvas context to draw on.
   * @param {WaveformDataChannel} channel The waveform data to draw.
   * @param {Number} frameOffset The start position of the waveform shown
   *   in the view, in pixels.
   * @param {Number} startPixels The start position of the waveform to draw,
   *   in pixels.
   * @param {Number} endPixels The end position of the waveform to draw,
   *   in pixels.
   * @param {Number} top The top of the waveform channel area, in pixels.
   * @param {Number} height The height of the waveform channel area, in pixels.
   */


  WaveformShape.prototype._drawChannel = function (context, channel, frameOffset, startPixels, endPixels, top, height) {
    var x, amplitude;

    var amplitudeScale = this._view.getAmplitudeScale();

    var lineX, lineY;
    context.beginPath();

    for (x = startPixels; x <= endPixels; x++) {
      amplitude = channel.min_sample(x);
      lineX = x - frameOffset + 0.5;
      lineY = top + WaveformShape.scaleY(amplitude, height, amplitudeScale) + 0.5;
      context.lineTo(lineX, lineY);
    }

    for (x = endPixels; x >= startPixels; x--) {
      amplitude = channel.max_sample(x);
      lineX = x - frameOffset + 0.5;
      lineY = top + WaveformShape.scaleY(amplitude, height, amplitudeScale) + 1.0;
      context.lineTo(lineX, lineY);
    }

    context.closePath();
    context.fillShape(this._shape);
  };

  WaveformShape.prototype._waveformShapeHitFunc = function (context) {
    if (!this._segment) {
      return;
    }

    var frameOffset = this._view.getFrameOffset();

    var viewWidth = this._view.getWidth();

    var viewHeight = this._view.getHeight();

    var startPixels = this._view.timeToPixels(this._segment.startTime);

    var endPixels = this._view.timeToPixels(this._segment.endTime);

    var offsetY = 10;
    var hitRectHeight = viewHeight - 2 * offsetY;

    if (hitRectHeight < 0) {
      hitRectHeight = 0;
    }

    var hitRectLeft = startPixels - frameOffset;
    var hitRectWidth = endPixels - startPixels;

    if (hitRectLeft < 0) {
      hitRectWidth -= -hitRectLeft;
      hitRectLeft = 0;
    }

    if (hitRectLeft + hitRectWidth > viewWidth) {
      hitRectWidth -= hitRectLeft + hitRectWidth - viewWidth;
    }

    context.beginPath();
    context.rect(hitRectLeft, offsetY, hitRectWidth, hitRectHeight);
    context.closePath();
    context.fillStrokeShape(this._shape);
  };

  WaveformShape.prototype.addToLayer = function (layer) {
    layer.add(this._shape);
  };

  WaveformShape.prototype.destroy = function () {
    this._shape.destroy();

    this._shape = null;
  };

  WaveformShape.prototype.on = function (event, handler) {
    this._shape.on(event, handler);
  };
  /**
   * Scales the waveform data for drawing on a canvas context.
   *
   * @see {@link https://stats.stackexchange.com/questions/281162}
   *
   * @todo Assumes 8-bit waveform data (-128 to 127 range)
   *
   * @param {Number} amplitude The waveform data point amplitude.
   * @param {Number} height The height of the waveform, in pixels.
   * @param {Number} scale Amplitude scaling factor.
   * @returns {Number} The scaled waveform data point.
   */


  WaveformShape.scaleY = function (amplitude, height, scale) {
    var y = -(height - 1) * (amplitude * scale + 128) / 255 + (height - 1);
    return clamp(Math.floor(y), 0, height - 1);
  };

  /**
   * @file
   *
   * Defines the {@link SegmentShape} class.
   *
   * @module segment-shape
   */
  var defaultFontFamily = 'sans-serif';
  var defaultFontSize = 10;
  var defaultFontShape = 'normal';
  /**
   * Creates a waveform segment shape with optional start and end markers.
   *
   * @class
   * @alias SegmentShape
   *
   * @param {Segment} segment
   * @param {Peaks} peaks
   * @param {SegmentsLayer} layer
   * @param {WaveformOverview|WaveformZoomView} view
   */

  function SegmentShape(segment, peaks, layer, view) {
    this._segment = segment;
    this._peaks = peaks;
    this._layer = layer;
    this._view = view;
    this._label = null;
    this._startMarker = null;
    this._endMarker = null;
    this._color = segment.color;
    this._waveformShape = new WaveformShape({
      color: segment.color,
      view: view,
      segment: segment
    });
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onDblClick = this._onDblClick.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this); // Set up event handlers to show/hide the segment label text when the user
    // hovers the mouse over the segment.

    this._waveformShape.on('mouseenter', this._onMouseEnter);

    this._waveformShape.on('mouseleave', this._onMouseLeave);

    this._waveformShape.on('click', this._onClick);

    this._waveformShape.on('dblclick', this._onDblClick);

    this._waveformShape.on('contextmenu', this._onContextMenu); // Event handlers for markers


    this._onSegmentHandleDrag = this._onSegmentHandleDrag.bind(this);
    this._onSegmentHandleDragStart = this._onSegmentHandleDragStart.bind(this);
    this._onSegmentHandleDragEnd = this._onSegmentHandleDragEnd.bind(this);
    this._label = this._peaks.options.createSegmentLabel({
      segment: segment,
      view: this._view.getName(),
      layer: this._layer,
      fontFamily: this._peaks.options.fontFamily,
      fontSize: this._peaks.options.fontSize,
      fontStyle: this._peaks.options.fontStyle
    });

    if (this._label) {
      this._label.hide();
    }

    this._createMarkers();
  }

  SegmentShape.prototype.updatePosition = function () {
    var segmentStartOffset = this._view.timeToPixels(this._segment.startTime);

    var segmentEndOffset = this._view.timeToPixels(this._segment.endTime);

    var frameStartOffset = this._view.getFrameOffset();

    var startPixel = segmentStartOffset - frameStartOffset;
    var endPixel = segmentEndOffset - frameStartOffset;
    var marker = this.getStartMarker();

    if (marker) {
      marker.setX(startPixel - marker.getWidth());
    }

    marker = this.getEndMarker();

    if (marker) {
      marker.setX(endPixel);
    }
  };

  SegmentShape.prototype.getSegment = function () {
    return this._segment;
  };

  SegmentShape.prototype.getStartMarker = function () {
    return this._startMarker;
  };

  SegmentShape.prototype.getEndMarker = function () {
    return this._endMarker;
  };

  SegmentShape.prototype.addToLayer = function (layer) {
    this._waveformShape.addToLayer(layer);

    if (this._label) {
      layer.add(this._label);
    }

    if (this._startMarker) {
      this._startMarker.addToLayer(layer);
    }

    if (this._endMarker) {
      this._endMarker.addToLayer(layer);
    }
  };

  SegmentShape.prototype._createMarkers = function () {
    var editable = this._layer.isEditingEnabled() && this._segment.editable;

    if (!editable) {
      return;
    }

    var startMarker = this._peaks.options.createSegmentMarker({
      segment: this._segment,
      draggable: editable,
      startMarker: true,
      color: this._peaks.options.segmentStartMarkerColor,
      fontFamily: this._peaks.options.fontFamily || defaultFontFamily,
      fontSize: this._peaks.options.fontSize || defaultFontSize,
      fontStyle: this._peaks.options.fontStyle || defaultFontShape,
      layer: this._layer,
      view: this._view.getName()
    });

    if (startMarker) {
      this._startMarker = new SegmentMarker({
        segment: this._segment,
        segmentShape: this,
        draggable: editable,
        startMarker: true,
        marker: startMarker,
        onDrag: this._onSegmentHandleDrag,
        onDragStart: this._onSegmentHandleDragStart,
        onDragEnd: this._onSegmentHandleDragEnd
      });
    }

    var endMarker = this._peaks.options.createSegmentMarker({
      segment: this._segment,
      draggable: editable,
      startMarker: false,
      color: this._peaks.options.segmentEndMarkerColor,
      fontFamily: this._peaks.options.fontFamily || defaultFontFamily,
      fontSize: this._peaks.options.fontSize || defaultFontSize,
      fontStyle: this._peaks.options.fontStyle || defaultFontShape,
      layer: this._layer,
      view: this._view.getName()
    });

    if (endMarker) {
      this._endMarker = new SegmentMarker({
        segment: this._segment,
        segmentShape: this,
        draggable: editable,
        startMarker: false,
        marker: endMarker,
        onDrag: this._onSegmentHandleDrag,
        onDragStart: this._onSegmentHandleDragStart,
        onDragEnd: this._onSegmentHandleDragEnd
      });
    }
  };

  SegmentShape.prototype._onMouseEnter = function (event) {
    if (this._label) {
      this._label.moveToTop();

      this._label.show();
    }

    this._peaks.emit('segments.mouseenter', {
      segment: this._segment,
      evt: event.evt
    });
  };

  SegmentShape.prototype._onMouseLeave = function (event) {
    if (this._label) {
      this._label.hide();
    }

    this._peaks.emit('segments.mouseleave', {
      segment: this._segment,
      evt: event.evt
    });
  };

  SegmentShape.prototype._onClick = function (event) {
    this._peaks.emit('segments.click', {
      segment: this._segment,
      evt: event.evt
    });
  };

  SegmentShape.prototype._onDblClick = function (event) {
    this._peaks.emit('segments.dblclick', {
      segment: this._segment,
      evt: event.evt
    });
  };

  SegmentShape.prototype._onContextMenu = function (event) {
    this._peaks.emit('segments.contextmenu', {
      segment: this._segment,
      evt: event.evt
    });
  };
  /**
   * @param {SegmentMarker} segmentMarker
   */


  SegmentShape.prototype._onSegmentHandleDrag = function (event, segmentMarker) {
    var width = this._view.getWidth();

    var startMarker = segmentMarker.isStartMarker();

    var startMarkerX = this._startMarker.getX();

    var endMarkerX = this._endMarker.getX();

    if (startMarker && startMarkerX >= 0) {
      var startMarkerOffset = startMarkerX + this._startMarker.getWidth();

      this._segment._setStartTime(this._view.pixelOffsetToTime(startMarkerOffset));

      segmentMarker.timeUpdated(this._segment.startTime);
    }

    if (!startMarker && endMarkerX < width) {
      var endMarkerOffset = endMarkerX;

      this._segment._setEndTime(this._view.pixelOffsetToTime(endMarkerOffset));

      segmentMarker.timeUpdated(this._segment.endTime);
    }

    this._peaks.emit('segments.dragged', {
      segment: this._segment,
      startMarker: startMarker,
      evt: event.evt
    });
  };
  /**
   * @param {SegmentMarker} segmentMarker
   */


  SegmentShape.prototype._onSegmentHandleDragStart = function (event, segmentMarker) {
    var startMarker = segmentMarker.isStartMarker();

    this._peaks.emit('segments.dragstart', {
      segment: this._segment,
      startMarker: startMarker,
      evt: event.evt
    });
  };
  /**
   * @param {SegmentMarker} segmentMarker
   */


  SegmentShape.prototype._onSegmentHandleDragEnd = function (event, segmentMarker) {
    var startMarker = segmentMarker.isStartMarker();

    this._peaks.emit('segments.dragend', {
      segment: this._segment,
      startMarker: startMarker,
      evt: event.evt
    });
  };

  SegmentShape.prototype.fitToView = function () {
    if (this._startMarker) {
      this._startMarker.fitToView();
    }

    if (this._endMarker) {
      this._endMarker.fitToView();
    }

    this._waveformShape.setWaveformColor(this._color);
  };

  SegmentShape.prototype.destroy = function () {
    this._waveformShape.destroy();

    if (this._label) {
      this._label.destroy();
    }

    if (this._startMarker) {
      this._startMarker.destroy();
    }

    if (this._endMarker) {
      this._endMarker.destroy();
    }
  };

  /**
   * @file
   *
   * Defines the {@link SegmentsLayer} class.
   *
   * @module segments-layer
   */
  /**
   * Creates a Konva.Layer that displays segment markers against the audio
   * waveform.
   *
   * @class
   * @alias SegmentsLayer
   *
   * @param {Peaks} peaks
   * @param {WaveformOverview|WaveformZoomView} view
   * @param {Boolean} allowEditing
   */

  function SegmentsLayer(peaks, view, allowEditing) {
    this._peaks = peaks;
    this._view = view;
    this._allowEditing = allowEditing;
    this._segmentShapes = {};
    this._layer = new Konva.Layer();
    this._onSegmentsUpdate = this._onSegmentsUpdate.bind(this);
    this._onSegmentsAdd = this._onSegmentsAdd.bind(this);
    this._onSegmentsRemove = this._onSegmentsRemove.bind(this);
    this._onSegmentsRemoveAll = this._onSegmentsRemoveAll.bind(this);
    this._onSegmentsDragged = this._onSegmentsDragged.bind(this);

    this._peaks.on('segments.update', this._onSegmentsUpdate);

    this._peaks.on('segments.add', this._onSegmentsAdd);

    this._peaks.on('segments.remove', this._onSegmentsRemove);

    this._peaks.on('segments.remove_all', this._onSegmentsRemoveAll);

    this._peaks.on('segments.dragged', this._onSegmentsDragged);
  }
  /**
   * Adds the layer to the given {Konva.Stage}.
   *
   * @param {Konva.Stage} stage
   */


  SegmentsLayer.prototype.addToStage = function (stage) {
    stage.add(this._layer);
  };

  SegmentsLayer.prototype.enableEditing = function (enable) {
    this._allowEditing = enable;
  };

  SegmentsLayer.prototype.isEditingEnabled = function () {
    return this._allowEditing;
  };

  SegmentsLayer.prototype.formatTime = function (time) {
    return this._view.formatTime(time);
  };

  SegmentsLayer.prototype._onSegmentsUpdate = function (segment) {
    var redraw = false;
    var segmentShape = this._segmentShapes[segment.id];

    var frameStartTime = this._view.getStartTime();

    var frameEndTime = this._view.getEndTime();

    if (segmentShape) {
      this._removeSegment(segment);

      redraw = true;
    }

    if (segment.isVisible(frameStartTime, frameEndTime)) {
      this._addSegmentShape(segment);

      redraw = true;
    }

    if (redraw) {
      this.updateSegments(frameStartTime, frameEndTime);
    }
  };

  SegmentsLayer.prototype._onSegmentsAdd = function (segments) {
    var self = this;

    var frameStartTime = self._view.getStartTime();

    var frameEndTime = self._view.getEndTime();

    segments.forEach(function (segment) {
      if (segment.isVisible(frameStartTime, frameEndTime)) {
        self._addSegmentShape(segment);
      }
    });
    self.updateSegments(frameStartTime, frameEndTime);
  };

  SegmentsLayer.prototype._onSegmentsRemove = function (segments) {
    var self = this;
    segments.forEach(function (segment) {
      self._removeSegment(segment);
    });
  };

  SegmentsLayer.prototype._onSegmentsRemoveAll = function () {
    this._layer.removeChildren();

    this._segmentShapes = {};
  };

  SegmentsLayer.prototype._onSegmentsDragged = function (event) {
    this._updateSegment(event.segment);
  };
  /**
   * Creates the Konva UI objects for a given segment.
   *
   * @private
   * @param {Segment} segment
   * @returns {SegmentShape}
   */


  SegmentsLayer.prototype._createSegmentShape = function (segment) {
    return new SegmentShape(segment, this._peaks, this, this._view);
  };
  /**
   * Adds a Konva UI object to the layer for a given segment.
   *
   * @private
   * @param {Segment} segment
   * @returns {SegmentShape}
   */


  SegmentsLayer.prototype._addSegmentShape = function (segment) {
    var segmentShape = this._createSegmentShape(segment);

    segmentShape.addToLayer(this._layer);
    this._segmentShapes[segment.id] = segmentShape;
    return segmentShape;
  };
  /**
   * Updates the positions of all displayed segments in the view.
   *
   * @param {Number} startTime The start of the visible range in the view,
   *   in seconds.
   * @param {Number} endTime The end of the visible range in the view,
   *   in seconds.
   */


  SegmentsLayer.prototype.updateSegments = function (startTime, endTime) {
    // Update segments in visible time range.
    var segments = this._peaks.segments.find(startTime, endTime);

    var count = segments.length;
    segments.forEach(this._updateSegment.bind(this)); // TODO: in the overview all segments are visible, so no need to check

    count += this._removeInvisibleSegments(startTime, endTime);

    if (count > 0) {
      this._layer.draw();
    }
  };
  /**
   * @private
   * @param {Segment} segment
   */


  SegmentsLayer.prototype._updateSegment = function (segment) {
    var segmentShape = this._findOrAddSegmentShape(segment);

    segmentShape.updatePosition();
  };
  /**
   * @private
   * @param {Segment} segment
   */


  SegmentsLayer.prototype._findOrAddSegmentShape = function (segment) {
    var segmentShape = this._segmentShapes[segment.id];

    if (!segmentShape) {
      segmentShape = this._addSegmentShape(segment);
    }

    return segmentShape;
  };
  /**
   * Removes any segments that are not visible, i.e., are not within and do not
   * overlap the given time range.
   *
   * @private
   * @param {Number} startTime The start of the visible time range, in seconds.
   * @param {Number} endTime The end of the visible time range, in seconds.
   * @returns {Number} The number of segments removed.
   */


  SegmentsLayer.prototype._removeInvisibleSegments = function (startTime, endTime) {
    var count = 0;

    for (var segmentId in this._segmentShapes) {
      if (objectHasProperty(this._segmentShapes, segmentId)) {
        var segment = this._segmentShapes[segmentId].getSegment();

        if (!segment.isVisible(startTime, endTime)) {
          this._removeSegment(segment);

          count++;
        }
      }
    }

    return count;
  };
  /**
   * Removes the given segment from the view.
   *
   * @param {Segment} segment
   */


  SegmentsLayer.prototype._removeSegment = function (segment) {
    var segmentShape = this._segmentShapes[segment.id];

    if (segmentShape) {
      segmentShape.destroy();
      delete this._segmentShapes[segment.id];
    }
  };
  /**
   * Toggles visibility of the segments layer.
   *
   * @param {Boolean} visible
   */


  SegmentsLayer.prototype.setVisible = function (visible) {
    this._layer.setVisible(visible);
  };

  SegmentsLayer.prototype.destroy = function () {
    this._peaks.off('segments.update', this._onSegmentsUpdate);

    this._peaks.off('segments.add', this._onSegmentsAdd);

    this._peaks.off('segments.remove', this._onSegmentsRemove);

    this._peaks.off('segments.remove_all', this._onSegmentsRemoveAll);

    this._peaks.off('segments.dragged', this._onSegmentsDragged);
  };

  SegmentsLayer.prototype.fitToView = function () {
    for (var segmentId in this._segmentShapes) {
      if (objectHasProperty(this._segmentShapes, segmentId)) {
        var segmentShape = this._segmentShapes[segmentId];
        segmentShape.fitToView();
      }
    }
  };

  SegmentsLayer.prototype.draw = function () {
    this._layer.draw();
  };

  SegmentsLayer.prototype.getHeight = function () {
    return this._layer.getHeight();
  };

  /**
   * @file
   *
   * Defines the {@link WaveformAxis} class.
   *
   * @module waveform-axis
   */
  /**
   * Creates the waveform axis shapes and adds them to the given view layer.
   *
   * @class
   * @alias WaveformAxis
   *
   * @param {WaveformOverview|WaveformZoomView} view
   * @param {Object} options
   * @param {String} options.axisGridlineColor
   * @param {String} options.axisLabelColor
   * @param {Boolean} options.showAxisLabels
   * @param {Function} options.formatAxisTime
   * @param {String} options.fontFamily
   * @param {Number} options.fontSize
   * @param {String} options.fontStyle
   */

  function WaveformAxis(view, options) {
    var self = this;
    self._axisGridlineColor = options.axisGridlineColor;
    self._axisLabelColor = options.axisLabelColor;
    self._showAxisLabels = options.showAxisLabels;

    if (options.formatAxisTime) {
      self._formatAxisTime = options.formatAxisTime;
    } else {
      self._formatAxisTime = function (time) {
        // precision = 0, drops the fractional seconds
        return formatTime(time, 0);
      };
    }

    self._axisLabelFont = WaveformAxis._buildFontString(options.fontFamily, options.fontSize, options.fontStyle);
    self._axisShape = new Konva.Shape({
      sceneFunc: function sceneFunc(context) {
        self._drawAxis(context, view);
      }
    });
  }

  WaveformAxis._buildFontString = function (fontFamily, fontSize, fontStyle) {
    if (!fontSize) {
      fontSize = 11;
    }

    if (!fontFamily) {
      fontFamily = 'sans-serif';
    }

    if (!fontStyle) {
      fontStyle = 'normal';
    }

    return fontStyle + ' ' + fontSize + 'px ' + fontFamily;
  };

  WaveformAxis.prototype.addToLayer = function (layer) {
    layer.add(this._axisShape);
  };

  WaveformAxis.prototype.showAxisLabels = function (show) {
    this._showAxisLabels = show;
  };
  /**
   * Returns number of seconds for each x-axis marker, appropriate for the
   * current zoom level, ensuring that markers are not too close together
   * and that markers are placed at intuitive time intervals (i.e., every 1,
   * 2, 5, 10, 20, 30 seconds, then every 1, 2, 5, 10, 20, 30 minutes, then
   * every 1, 2, 5, 10, 20, 30 hours).
   *
   * @param {WaveformOverview|WaveformZoomView} view
   * @returns {Number}
   */


  WaveformAxis.prototype._getAxisLabelScale = function (view) {
    var baseSecs = 1; // seconds

    var steps = [1, 2, 5, 10, 20, 30];
    var minSpacing = 60;
    var index = 0;
    var secs;

    for (;;) {
      secs = baseSecs * steps[index];
      var pixels = view.timeToPixels(secs);

      if (pixels < minSpacing) {
        if (++index === steps.length) {
          baseSecs *= 60; // seconds -> minutes -> hours

          index = 0;
        }
      } else {
        break;
      }
    }

    return secs;
  };
  /**
   * Draws the time axis and labels onto a view.
   *
   * @param {Konva.Context} context The context to draw on.
   * @param {WaveformOverview|WaveformZoomView} view
   */


  WaveformAxis.prototype._drawAxis = function (context, view) {
    var currentFrameStartTime = view.getStartTime(); // Draw axis markers

    var markerHeight = 10; // Time interval between axis markers (seconds)

    var axisLabelIntervalSecs = this._getAxisLabelScale(view); // Time of first axis marker (seconds)


    var firstAxisLabelSecs = roundUpToNearest(currentFrameStartTime, axisLabelIntervalSecs); // Distance between waveform start time and first axis marker (seconds)

    var axisLabelOffsetSecs = firstAxisLabelSecs - currentFrameStartTime; // Distance between waveform start time and first axis marker (pixels)

    var axisLabelOffsetPixels = view.timeToPixels(axisLabelOffsetSecs);
    context.setAttr('strokeStyle', this._axisGridlineColor);
    context.setAttr('lineWidth', 1); // Set text style

    context.setAttr('font', this._axisLabelFont);
    context.setAttr('fillStyle', this._axisLabelColor);
    context.setAttr('textAlign', 'left');
    context.setAttr('textBaseline', 'bottom');
    var secs = firstAxisLabelSecs;
    var x;
    var width = view.getWidth();
    var height = view.getHeight();

    for (;;) {
      // Position of axis marker (pixels)
      x = axisLabelOffsetPixels + view.timeToPixels(secs - firstAxisLabelSecs);

      if (x >= width) {
        break;
      }

      context.beginPath();
      context.moveTo(x + 0.5, 0);
      context.lineTo(x + 0.5, 0 + markerHeight);
      context.moveTo(x + 0.5, height);
      context.lineTo(x + 0.5, height - markerHeight);
      context.stroke();

      if (this._showAxisLabels) {
        var label = this._formatAxisTime(secs);

        var labelWidth = context.measureText(label).width;
        var labelX = x - labelWidth / 2;
        var labelY = height - 1 - markerHeight;

        if (labelX >= 0) {
          context.fillText(label, labelX, labelY);
        }
      }

      secs += axisLabelIntervalSecs;
    }
  };

  /**
   * @file
   *
   * Defines the {@link WaveformOverview} class.
   *
   * @module waveform-overview
   */
  /**
   * Creates the overview waveform view.
   *
   * @class
   * @alias WaveformOverview
   *
   * @param {WaveformData} waveformData
   * @param {HTMLElement} container
   * @param {Peaks} peaks
   */

  function WaveformOverview(waveformData, container, peaks) {
    var self = this;
    self._originalWaveformData = waveformData;
    self._container = container;
    self._peaks = peaks;
    self._options = peaks.options;
    self._viewOptions = peaks.options.overview; // Bind event handlers

    self._onTimeUpdate = self._onTimeUpdate.bind(this);
    self._onPlaying = self._onPlaying.bind(this);
    self._onPause = self._onPause.bind(this);
    self._onZoomviewDisplaying = self._onZoomviewDisplaying.bind(this);
    self._onWindowResize = self._onWindowResize.bind(this); // Register event handlers

    peaks.on('player.timeupdate', self._onTimeUpdate);
    peaks.on('player.playing', self._onPlaying);
    peaks.on('player.pause', self._onPause);
    peaks.on('zoomview.displaying', self._onZoomviewDisplaying);
    peaks.on('window_resize', self._onWindowResize);
    self._amplitudeScale = 1.0;
    self._timeLabelPrecision = self._viewOptions.timeLabelPrecision;
    self._enableSeek = true;

    if (self._viewOptions.formatPlayheadTime) {
      self._formatPlayheadTime = self._viewOptions.formatPlayheadTime;
    } else {
      self._formatPlayheadTime = function (time) {
        return formatTime(time, self._timeLabelPrecision);
      };
    }

    self._width = container.clientWidth;
    self._height = container.clientHeight;
    self._data = waveformData;

    if (self._width !== 0) {
      try {
        self._data = waveformData.resample({
          width: self._width
        });
      } catch (error) {// This error usually indicates that the waveform length
        // is less than the container width
      }
    } // Disable warning: The stage has 6 layers.
    // Recommended maximum number of layers is 3-5.


    Konva.showWarnings = false;
    self._resizeTimeoutId = null;
    self._stage = new Konva.Stage({
      container: container,
      width: self._width,
      height: self._height
    });
    self._waveformColor = self._viewOptions.waveformColor;
    self._playedWaveformColor = self._viewOptions.playedWaveformColor;

    self._createWaveform();

    self._segmentsLayer = new SegmentsLayer(peaks, self, false);

    self._segmentsLayer.addToStage(self._stage);

    self._pointsLayer = new PointsLayer(peaks, self, false);

    self._pointsLayer.addToStage(self._stage);

    self._highlightLayer = new HighlightLayer(self, self._viewOptions);

    self._highlightLayer.addToStage(self._stage);

    self._createAxisLabels();

    self._playheadLayer = new PlayheadLayer({
      player: self._peaks.player,
      view: self,
      showPlayheadTime: self._viewOptions.showPlayheadTime,
      playheadColor: self._viewOptions.playheadColor,
      playheadTextColor: self._viewOptions.playheadTextColor,
      playheadFontFamily: self._viewOptions.fontFamily,
      playheadFontSize: self._viewOptions.fontSize,
      playheadFontStyle: self._viewOptions.fontStyle
    });

    self._playheadLayer.addToStage(self._stage);

    var time = self._peaks.player.getCurrentTime();

    this._playheadLayer.updatePlayheadTime(time);

    self._createMouseDragHandler();

    self._onClick = self._onClick.bind(this);
    self._onDblClick = self._onDblClick.bind(this);
    self._onContextMenu = self._onContextMenu.bind(this);

    self._stage.on('click', self._onClick);

    self._stage.on('dblclick', self._onDblClick);

    self._stage.on('contextmenu', self._onContextMenu);
  }

  WaveformOverview.prototype._createMouseDragHandler = function () {
    var self = this;
    self._mouseDragHandler = new MouseDragHandler(self._stage, {
      onMouseDown: function onMouseDown(mousePosX) {
        this._seek(mousePosX);
      },
      onMouseMove: function onMouseMove(mousePosX) {
        this._seek(mousePosX);
      },
      _seek: function _seek(mousePosX) {
        if (!self._enableSeek) {
          return;
        }

        mousePosX = clamp(mousePosX, 0, self._width);
        var time = self.pixelsToTime(mousePosX);

        var duration = self._getDuration(); // Prevent the playhead position from jumping by limiting click
        // handling to the waveform duration.


        if (time > duration) {
          time = duration;
        } // Update the playhead position. This gives a smoother visual update
        // than if we only use the player.timeupdate event.


        self._playheadLayer.updatePlayheadTime(time);

        self._peaks.player.seek(time);
      }
    });
  };

  WaveformOverview.prototype.enableSeek = function (enable) {
    this._enableSeek = enable;
  };

  WaveformOverview.prototype._onClick = function (event) {
    this._clickHandler(event, 'overview.click');
  };

  WaveformOverview.prototype._onDblClick = function (event) {
    this._clickHandler(event, 'overview.dblclick');
  };

  WaveformOverview.prototype._onContextMenu = function (event) {
    this._clickHandler(event, 'overview.contextmenu');
  };

  WaveformOverview.prototype._clickHandler = function (event, eventName) {
    var pixelIndex = event.evt.layerX;
    var time = this.pixelsToTime(pixelIndex);

    this._peaks.emit(eventName, {
      time: time,
      evt: event.evt
    });
  };

  WaveformOverview.prototype.getName = function () {
    return 'overview';
  };

  WaveformOverview.prototype._onTimeUpdate = function (time) {
    this._playheadLayer.updatePlayheadTime(time);
  };

  WaveformOverview.prototype._onPlaying = function (time) {
    this._playheadLayer.updatePlayheadTime(time);
  };

  WaveformOverview.prototype._onPause = function (time) {
    this._playheadLayer.stop(time);
  };

  WaveformOverview.prototype._onZoomviewDisplaying = function (startTime, endTime) {
    this.showHighlight(startTime, endTime);
  };

  WaveformOverview.prototype.showHighlight = function (startTime, endTime) {
    this._highlightLayer.showHighlight(startTime, endTime);
  };

  WaveformOverview.prototype._onWindowResize = function () {
    var self = this;

    if (self._resizeTimeoutId) {
      clearTimeout(self._resizeTimeoutId);
      self._resizeTimeoutId = null;
    } // Avoid resampling waveform data to zero width


    if (self._container.clientWidth !== 0) {
      self._width = self._container.clientWidth;

      self._stage.setWidth(self._width);

      self._resizeTimeoutId = setTimeout(function () {
        self._width = self._container.clientWidth;
        self._data = self._originalWaveformData.resample({
          width: self._width
        });

        self._stage.setWidth(self._width);

        self._updateWaveform();
      }, 500);
    }
  };

  WaveformOverview.prototype.setWaveformData = function (waveformData) {
    this._originalWaveformData = waveformData;

    if (this._width !== 0) {
      this._data = waveformData.resample({
        width: this._width
      });
    } else {
      this._data = waveformData;
    }

    this._updateWaveform();
  };

  WaveformOverview.prototype.playheadPosChanged = function (time) {
    if (this._playedWaveformShape) {
      this._playedSegment.endTime = time;
      this._unplayedSegment.startTime = time;

      this._waveformLayer.draw();
    }
  };
  /**
   * Returns the pixel index for a given time, for the current zoom level.
   *
   * @param {Number} time Time, in seconds.
   * @returns {Number} Pixel index.
   */


  WaveformOverview.prototype.timeToPixels = function (time) {
    return Math.floor(time * this._data.sample_rate / this._data.scale);
  };
  /**
   * Returns the time for a given pixel index, for the current zoom level.
   *
   * @param {Number} pixels Pixel index.
   * @returns {Number} Time, in seconds.
   */


  WaveformOverview.prototype.pixelsToTime = function (pixels) {
    return pixels * this._data.scale / this._data.sample_rate;
  };
  /**
   * Returns the time for a given pixel index, for the current zoom level.
   * (This is presented for symmetry with WaveformZoomview. Since WaveformOverview
   * doesn't scroll, its pixelOffsetToTime & pixelsToTime methods are identical.)
   *
   * @param {Number} pixels Pixel index.
   * @returns {Number} Time, in seconds.
   */


  WaveformOverview.prototype.pixelOffsetToTime = WaveformOverview.prototype.pixelsToTime;
  /**
   * @returns {Number} The start position of the waveform shown in the view,
   *   in pixels.
   */

  WaveformOverview.prototype.getFrameOffset = function () {
    return 0;
  };
  /**
   * @returns {Number} The time at the leftmost edge
   */


  WaveformOverview.prototype.getStartTime = function () {
    return 0;
  };
  /**
   * @returns {Number} The time at the rightmost edge
   */


  WaveformOverview.prototype.getEndTime = function () {
    return this._getDuration();
  };
  /**
   * @returns {Number} The width of the view, in pixels.
   */


  WaveformOverview.prototype.getWidth = function () {
    return this._width;
  };
  /**
   * @returns {Number} The height of the view, in pixels.
   */


  WaveformOverview.prototype.getHeight = function () {
    return this._height;
  };
  /**
   * @returns {Number} The media duration, in seconds.
   */


  WaveformOverview.prototype._getDuration = function () {
    return this._peaks.player.getDuration();
  };
  /**
   * Adjusts the amplitude scale of waveform shown in the view, which allows
   * users to zoom the waveform vertically.
   *
   * @param {Number} scale The new amplitude scale factor
   */


  WaveformOverview.prototype.setAmplitudeScale = function (scale) {
    if (!isNumber(scale) || !isFinite$1(scale)) {
      throw new Error('view.setAmplitudeScale(): Scale must be a valid number');
    }

    this._amplitudeScale = scale;

    this._waveformLayer.draw();

    this._segmentsLayer.draw();
  };

  WaveformOverview.prototype.getAmplitudeScale = function () {
    return this._amplitudeScale;
  };
  /**
   * @returns {WaveformData} The view's waveform data.
   */


  WaveformOverview.prototype.getWaveformData = function () {
    return this._data;
  };

  WaveformOverview.prototype._createWaveformShapes = function () {
    if (!this._waveformShape) {
      this._waveformShape = new WaveformShape({
        color: this._waveformColor,
        view: this
      });

      this._waveformShape.addToLayer(this._waveformLayer);
    }

    if (this._playedWaveformColor && !this._playedWaveformShape) {
      var time = this._peaks.player.getCurrentTime();

      this._playedSegment = {
        startTime: 0,
        endTime: time
      };
      this._unplayedSegment = {
        startTime: time,
        endTime: this._getDuration()
      };

      this._waveformShape.setSegment(this._unplayedSegment);

      this._playedWaveformShape = new WaveformShape({
        color: this._playedWaveformColor,
        view: this,
        segment: this._playedSegment
      });

      this._playedWaveformShape.addToLayer(this._waveformLayer);
    }
  };

  WaveformOverview.prototype._destroyPlayedWaveformShape = function () {
    this._waveformShape.setSegment(null);

    this._playedWaveformShape.destroy();

    this._playedWaveformShape = null;
    this._playedSegment = null;
    this._unplayedSegment = null;
  };

  WaveformOverview.prototype._createWaveform = function () {
    this._waveformLayer = new Konva.Layer({
      listening: false
    });

    this._createWaveformShapes();

    this._stage.add(this._waveformLayer);
  };

  WaveformOverview.prototype._createAxisLabels = function () {
    this._axisLayer = new Konva.Layer({
      listening: false
    });
    this._axis = new WaveformAxis(this, this._viewOptions);

    this._axis.addToLayer(this._axisLayer);

    this._stage.add(this._axisLayer);
  };

  WaveformOverview.prototype.removeHighlightRect = function () {
    this._highlightLayer.removeHighlight();
  };

  WaveformOverview.prototype._updateWaveform = function () {
    this._waveformLayer.draw();

    this._axisLayer.draw();

    var playheadTime = this._peaks.player.getCurrentTime();

    this._playheadLayer.updatePlayheadTime(playheadTime);

    this._highlightLayer.updateHighlight();

    var frameStartTime = 0;
    var frameEndTime = this.pixelsToTime(this._width);

    this._pointsLayer.updatePoints(frameStartTime, frameEndTime);

    this._segmentsLayer.updateSegments(frameStartTime, frameEndTime);
  };

  WaveformOverview.prototype.setWaveformColor = function (color) {
    this._waveformColor = color;

    this._waveformShape.setWaveformColor(color);
  };

  WaveformOverview.prototype.setPlayedWaveformColor = function (color) {
    this._playedWaveformColor = color;

    if (color) {
      if (!this._playedWaveformShape) {
        this._createWaveformShapes();
      }

      this._playedWaveformShape.setWaveformColor(color);
    } else {
      if (this._playedWaveformShape) {
        this._destroyPlayedWaveformShape();
      }
    }
  };

  WaveformOverview.prototype.showPlayheadTime = function (show) {
    this._playheadLayer.showPlayheadTime(show);
  };

  WaveformOverview.prototype.setTimeLabelPrecision = function (precision) {
    this._timeLabelPrecision = precision;

    this._playheadLayer.updatePlayheadText();
  };

  WaveformOverview.prototype.formatTime = function (time) {
    return this._formatPlayheadTime(time);
  };

  WaveformOverview.prototype.showAxisLabels = function (show) {
    this._axis.showAxisLabels(show);

    this._axisLayer.draw();
  };

  WaveformOverview.prototype.enableMarkerEditing = function (enable) {
    this._segmentsLayer.enableEditing(enable);

    this._pointsLayer.enableEditing(enable);
  };

  WaveformOverview.prototype.fitToContainer = function () {
    if (this._container.clientWidth === 0 && this._container.clientHeight === 0) {
      return;
    }

    var updateWaveform = false;

    if (this._container.clientWidth !== this._width) {
      this._width = this._container.clientWidth;

      this._stage.setWidth(this._width);

      try {
        this._data = this._originalWaveformData.resample({
          width: this._width
        });
        updateWaveform = true;
      } catch (error) {// Ignore, and leave this._data as it was
      }
    }

    this._height = this._container.clientHeight;

    this._stage.setHeight(this._height);

    this._waveformShape.fitToView();

    this._playheadLayer.fitToView();

    this._segmentsLayer.fitToView();

    this._pointsLayer.fitToView();

    this._highlightLayer.fitToView();

    if (updateWaveform) {
      this._updateWaveform();
    }

    this._stage.draw();
  };

  WaveformOverview.prototype.destroy = function () {
    if (this._resizeTimeoutId) {
      clearTimeout(this._resizeTimeoutId);
      this._resizeTimeoutId = null;
    }

    this._peaks.off('player.playing', this._onPlaying);

    this._peaks.off('player.pause', this._onPause);

    this._peaks.off('player.timeupdate', this._onTimeUpdate);

    this._peaks.off('zoomview.displaying', this._onZoomviewDisplaying);

    this._peaks.off('window_resize', this._onWindowResize);

    this._playheadLayer.destroy();

    this._segmentsLayer.destroy();

    this._pointsLayer.destroy();

    if (this._stage) {
      this._stage.destroy();

      this._stage = null;
    }
  };

  /**
   * @file
   *
   * Defines the {@link WaveformZoomView} class.
   *
   * @module waveform-zoomview
   */
  /**
   * Creates a zoomable waveform view.
   *
   * @class
   * @alias WaveformZoomView
   *
   * @param {WaveformData} waveformData
   * @param {HTMLElement} container
   * @param {Peaks} peaks
   */

  function WaveformZoomView(waveformData, container, peaks) {
    var self = this;
    self._container = container;
    self._peaks = peaks;
    self._options = peaks.options;
    self._viewOptions = self._options.zoomview;
    self._enableWaveformCache = self._options.waveformCache;
    self._originalWaveformData = waveformData;

    self._initWaveformCache(); // Bind event handlers


    self._onTimeUpdate = self._onTimeUpdate.bind(self);
    self._onPlaying = self._onPlaying.bind(self);
    self._onPause = self._onPause.bind(self);
    self._onWindowResize = self._onWindowResize.bind(self);
    self._onKeyboardLeft = self._onKeyboardLeft.bind(self);
    self._onKeyboardRight = self._onKeyboardRight.bind(self);
    self._onKeyboardShiftLeft = self._onKeyboardShiftLeft.bind(self);
    self._onKeyboardShiftRight = self._onKeyboardShiftRight.bind(self); // Register event handlers

    self._peaks.on('player.timeupdate', self._onTimeUpdate);

    self._peaks.on('player.playing', self._onPlaying);

    self._peaks.on('player.pause', self._onPause);

    self._peaks.on('window_resize', self._onWindowResize);

    self._peaks.on('keyboard.left', self._onKeyboardLeft);

    self._peaks.on('keyboard.right', self._onKeyboardRight);

    self._peaks.on('keyboard.shift_left', self._onKeyboardShiftLeft);

    self._peaks.on('keyboard.shift_right', self._onKeyboardShiftRight);

    self._enableAutoScroll = true;
    self._amplitudeScale = 1.0;
    self._timeLabelPrecision = self._viewOptions.timeLabelPrecision;
    self._enableSeek = true;

    if (self._viewOptions.formatPlayheadTime) {
      self._formatPlayheadTime = self._viewOptions.formatPlayheadTime;
    } else {
      self._formatPlayheadTime = function (time) {
        return formatTime(time, self._timeLabelPrecision);
      };
    }

    self._playheadClickTolerance = self._viewOptions.playheadClickTolerance;
    self._data = null;
    self._pixelLength = 0;
    var initialZoomLevel = peaks.zoom.getZoomLevel();
    self._zoomLevelAuto = false;
    self._zoomLevelSeconds = null;
    self._resizeTimeoutId = null;

    self._resampleData({
      scale: initialZoomLevel
    });

    self._width = container.clientWidth;
    self._height = container.clientHeight; // The pixel offset of the current frame being displayed

    self._frameOffset = 0;
    self._stage = new Konva.Stage({
      container: container,
      width: self._width,
      height: self._height
    });
    self._waveformColor = self._viewOptions.waveformColor;
    self._playedWaveformColor = self._viewOptions.playedWaveformColor;

    self._createWaveform();

    self._segmentsLayer = new SegmentsLayer(peaks, self, true);

    self._segmentsLayer.addToStage(self._stage);

    self._pointsLayer = new PointsLayer(peaks, self, true);

    self._pointsLayer.addToStage(self._stage);

    self._createAxisLabels();

    self._playheadLayer = new PlayheadLayer({
      player: self._peaks.player,
      view: self,
      showPlayheadTime: self._viewOptions.showPlayheadTime,
      playheadColor: self._viewOptions.playheadColor,
      playheadTextColor: self._viewOptions.playheadTextColor,
      playheadFontFamily: self._viewOptions.fontFamily,
      playheadFontSize: self._viewOptions.fontSize,
      playheadFontStyle: self._viewOptions.fontStyle
    });

    self._playheadLayer.addToStage(self._stage);

    var time = self._peaks.player.getCurrentTime();

    self._syncPlayhead(time);

    self._createMouseDragHandler();

    self._onWheel = self._onWheel.bind(self);
    self._onWheelCaptureVerticalScroll = self._onWheelCaptureVerticalScroll.bind(self);
    self.setWheelMode(self._viewOptions.wheelMode);
    self._onClick = self._onClick.bind(this);
    self._onDblClick = self._onDblClick.bind(this);
    self._onContextMenu = self._onContextMenu.bind(this);

    self._stage.on('click', self._onClick);

    self._stage.on('dblclick', self._onDblClick);

    self._stage.on('contextmenu', self._onContextMenu);
  }

  WaveformZoomView.prototype._initWaveformCache = function () {
    if (this._enableWaveformCache) {
      this._waveformData = new Map();

      this._waveformData.set(this._originalWaveformData.scale, this._originalWaveformData);

      this._waveformScales = [this._originalWaveformData.scale];
    }
  };

  WaveformZoomView.prototype._createMouseDragHandler = function () {
    var self = this;
    self._mouseDragHandler = new MouseDragHandler(self._stage, {
      onMouseDown: function onMouseDown(mousePosX) {
        this._seeking = false;

        var playheadOffset = self._playheadLayer.getPlayheadOffset();

        if (self._enableSeek && Math.abs(mousePosX - playheadOffset) <= self._playheadClickTolerance) {
          this._seeking = true;
        }

        if (this._seeking) {
          this._seek(mousePosX);
        } else {
          this.initialFrameOffset = self._frameOffset;
          this.mouseDownX = mousePosX;
        }
      },
      onMouseMove: function onMouseMove(mousePosX) {
        if (this._seeking) {
          this._seek(mousePosX);
        } else {
          // Moving the mouse to the left increases the time position of the
          // left-hand edge of the visible waveform.
          var diff = this.mouseDownX - mousePosX;
          var newFrameOffset = this.initialFrameOffset + diff;

          if (newFrameOffset !== this.initialFrameOffset) {
            self._updateWaveform(newFrameOffset);
          }
        }
      },
      onMouseUp: function
        /* mousePosX */
      onMouseUp() {
        if (!this._seeking) {
          // Set playhead position only on click release, when not dragging.
          if (self._enableSeek && !self._mouseDragHandler.isDragging()) {
            var time = self.pixelOffsetToTime(this.mouseDownX);

            var duration = self._getDuration(); // Prevent the playhead position from jumping by limiting click
            // handling to the waveform duration.


            if (time > duration) {
              time = duration;
            }

            self._playheadLayer.updatePlayheadTime(time);

            self._peaks.player.seek(time);
          }
        }
      },
      _seek: function _seek(mousePosX) {
        mousePosX = clamp(mousePosX, 0, self._width);
        var time = self.pixelsToTime(mousePosX + self._frameOffset);

        var duration = self._getDuration(); // Prevent the playhead position from jumping by limiting click
        // handling to the waveform duration.


        if (time > duration) {
          time = duration;
        } // Update the playhead position. This gives a smoother visual update
        // than if we only use the player.timeupdate event.


        self._playheadLayer.updatePlayheadTime(time);

        self._peaks.player.seek(time);
      }
    });
  };

  WaveformZoomView.prototype.enableSeek = function (enable) {
    this._enableSeek = enable;
  };

  WaveformZoomView.prototype._onClick = function (event) {
    this._clickHandler(event, 'zoomview.click');
  };

  WaveformZoomView.prototype._onDblClick = function (event) {
    this._clickHandler(event, 'zoomview.dblclick');
  };

  WaveformZoomView.prototype._onContextMenu = function (event) {
    this._clickHandler(event, 'zoomview.contextmenu');
  };

  WaveformZoomView.prototype._clickHandler = function (event, eventName) {
    var mousePosX = event.evt.layerX;
    var time = this.pixelOffsetToTime(mousePosX);

    this._peaks.emit(eventName, {
      time: time,
      evt: event.evt
    });
  };

  WaveformZoomView.prototype.setWheelMode = function (mode, options) {
    if (!options) {
      options = {};
    }

    if (mode !== this._wheelMode || options.captureVerticalScroll !== this._captureVerticalScroll) {
      this._stage.off('wheel');

      this._wheelMode = mode;
      this._captureVerticalScroll = options.captureVerticalScroll;

      switch (mode) {
        case 'scroll':
          if (options.captureVerticalScroll) {
            this._stage.on('wheel', this._onWheelCaptureVerticalScroll);
          } else {
            this._stage.on('wheel', this._onWheel);
          }

          break;
      }
    }
  };

  WaveformZoomView.prototype._onWheel = function (event) {
    var wheelEvent = event.evt;
    var delta;

    if (wheelEvent.shiftKey) {
      if (wheelEvent.deltaY !== 0) {
        delta = wheelEvent.deltaY;
      } else if (wheelEvent.deltaX !== 0) {
        delta = wheelEvent.deltaX;
      } else {
        return;
      }
    } else {
      // Ignore the event if it looks like the user is scrolling vertically
      // down the page
      if (Math.abs(wheelEvent.deltaX) < Math.abs(wheelEvent.deltaY)) {
        return;
      }

      delta = wheelEvent.deltaX;
    }

    if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      delta *= this._width;
    }

    wheelEvent.preventDefault();
    var newFrameOffset = clamp(this._frameOffset + Math.floor(delta), 0, this._pixelLength - this._width);

    this._updateWaveform(newFrameOffset);
  };

  WaveformZoomView.prototype._onWheelCaptureVerticalScroll = function (event) {
    var wheelEvent = event.evt;
    var delta = Math.abs(wheelEvent.deltaX) < Math.abs(wheelEvent.deltaY) ? wheelEvent.deltaY : wheelEvent.deltaX;
    wheelEvent.preventDefault();
    var newFrameOffset = clamp(this._frameOffset + Math.floor(delta), 0, this._pixelLength - this._width);

    this._updateWaveform(newFrameOffset);
  };

  WaveformZoomView.prototype.getName = function () {
    return 'zoomview';
  };

  WaveformZoomView.prototype._onTimeUpdate = function (time) {
    if (this._mouseDragHandler.isDragging()) {
      return;
    }

    this._syncPlayhead(time);
  };

  WaveformZoomView.prototype._onPlaying = function (time) {
    this._playheadLayer.updatePlayheadTime(time);
  };

  WaveformZoomView.prototype._onPause = function (time) {
    this._playheadLayer.stop(time);
  };

  WaveformZoomView.prototype._onWindowResize = function () {
    var self = this;
    var width = self._container.clientWidth;

    if (!self._zoomLevelAuto) {
      self._width = width;

      self._stage.width(width);

      self._updateWaveform(self._frameOffset);
    } else {
      if (self._resizeTimeoutId) {
        clearTimeout(self._resizeTimeoutId);
        self._resizeTimeoutId = null;
      } // Avoid resampling waveform data to zero width


      if (width !== 0) {
        self._width = width;

        self._stage.width(width);

        self._resizeTimeoutId = setTimeout(function () {
          self._width = width;
          self._data = self._originalWaveformData.resample(width);

          self._stage.width(width);

          self._updateWaveform(self._frameOffset);
        }, 500);
      }
    }
  };

  WaveformZoomView.prototype._onKeyboardLeft = function () {
    this._keyboardScroll(-1, false);
  };

  WaveformZoomView.prototype._onKeyboardRight = function () {
    this._keyboardScroll(1, false);
  };

  WaveformZoomView.prototype._onKeyboardShiftLeft = function () {
    this._keyboardScroll(-1, true);
  };

  WaveformZoomView.prototype._onKeyboardShiftRight = function () {
    this._keyboardScroll(1, true);
  };

  WaveformZoomView.prototype._keyboardScroll = function (direction, large) {
    var increment;

    if (large) {
      increment = direction * this._width;
    } else {
      increment = direction * this.timeToPixels(this._options.nudgeIncrement);
    }

    this.scrollWaveform({
      pixels: increment
    });
  };

  WaveformZoomView.prototype.setWaveformData = function (waveformData) {
    this._originalWaveformData = waveformData; // Clear cached waveforms

    this._initWaveformCache(); // Don't update the UI here, call setZoom().

  };

  WaveformZoomView.prototype.playheadPosChanged = function (time) {
    if (this._playedWaveformShape) {
      this._playedSegment.endTime = time;
      this._unplayedSegment.startTime = time;

      this._drawWaveformLayer();
    }
  };

  WaveformZoomView.prototype._syncPlayhead = function (time) {
    this._playheadLayer.updatePlayheadTime(time);

    if (this._enableAutoScroll) {
      // Check for the playhead reaching the right-hand side of the window.
      var pixelIndex = this.timeToPixels(time); // TODO: move this code to animation function?
      // TODO: don't scroll if user has positioned view manually (e.g., using
      // the keyboard)

      var endThreshold = this._frameOffset + this._width - 100;

      if (pixelIndex >= endThreshold || pixelIndex < this._frameOffset) {
        // Put the playhead at 100 pixels from the left edge
        this._frameOffset = pixelIndex - 100;

        if (this._frameOffset < 0) {
          this._frameOffset = 0;
        }

        this._updateWaveform(this._frameOffset);
      }
    }
  };

  WaveformZoomView.prototype._getScale = function (duration) {
    return duration * this._data.sample_rate / this._width;
  };

  function isAutoScale(options) {
    return objectHasProperty(options, 'scale') && options.scale === 'auto' || objectHasProperty(options, 'seconds') && options.seconds === 'auto';
  }
  /**
   * Options for [WaveformZoomView.setZoom]{@link WaveformZoomView#setZoom}.
   *
   * @typedef {Object} SetZoomOptions
   * @global
   * @property {Number|String} scale Zoom level, in samples per pixel, or 'auto'
   *   to fit the entire waveform to the view width
   * @property {Number|String} seconds Number of seconds to fit to the view width,
   *   or 'auto' to fit the entire waveform to the view width
   */

  /**
   * Changes the zoom level.
   *
   * @param {SetZoomOptions} options
   * @returns {Boolean}
   */


  WaveformZoomView.prototype.setZoom = function (options) {
    var scale;

    if (isAutoScale(options)) {
      var seconds = this._peaks.player.getDuration();

      if (!isValidTime(seconds)) {
        return false;
      }

      this._zoomLevelAuto = true;
      this._zoomLevelSeconds = null;
      scale = this._getScale(seconds);
    } else {
      if (objectHasProperty(options, 'scale')) {
        this._zoomLevelSeconds = null;
        scale = options.scale;
      } else if (objectHasProperty(options, 'seconds')) {
        if (!isValidTime(options.seconds)) {
          return false;
        }

        this._zoomLevelSeconds = options.seconds;
        scale = this._getScale(options.seconds);
      }

      this._zoomLevelAuto = false;
    }

    if (scale < this._originalWaveformData.scale) {
      // eslint-disable-next-line max-len
      this._peaks._logger('peaks.zoomview.setZoom(): zoom level must be at least ' + this._originalWaveformData.scale);

      scale = this._originalWaveformData.scale;
    }

    var currentTime = this._peaks.player.getCurrentTime();

    var apexTime;

    var playheadOffsetPixels = this._playheadLayer.getPlayheadOffset();

    if (playheadOffsetPixels >= 0 && playheadOffsetPixels < this._width) {
      // Playhead is visible. Change the zoom level while keeping the
      // playhead at the same position in the window.
      apexTime = currentTime;
    } else {
      // Playhead is not visible. Change the zoom level while keeping the
      // centre of the window at the same position in the waveform.
      playheadOffsetPixels = Math.floor(this._width / 2);
      apexTime = this.pixelOffsetToTime(playheadOffsetPixels);
    }

    var prevScale = this._scale;

    this._resampleData({
      scale: scale
    });

    var apexPixel = this.timeToPixels(apexTime);
    this._frameOffset = apexPixel - playheadOffsetPixels;

    this._updateWaveform(this._frameOffset);

    this._playheadLayer.zoomLevelChanged(); // Update the playhead position after zooming.


    this._playheadLayer.updatePlayheadTime(currentTime); // var adapter = this.createZoomAdapter(currentScale, previousScale);
    // adapter.start(relativePosition);


    this._peaks.emit('zoom.update', scale, prevScale);

    return true;
  };

  WaveformZoomView.prototype._resampleData = function (options) {
    var scale = options.scale;

    if (this._enableWaveformCache) {
      if (!this._waveformData.has(scale)) {
        var sourceWaveform = this._originalWaveformData; // Resample from the next lowest available zoom level

        for (var i = 0; i < this._waveformScales.length; i++) {
          if (this._waveformScales[i] < scale) {
            sourceWaveform = this._waveformData.get(this._waveformScales[i]);
          } else {
            break;
          }
        }

        this._waveformData.set(scale, sourceWaveform.resample(options));

        this._waveformScales.push(scale);

        this._waveformScales.sort(function (a, b) {
          return a - b; // Ascending order
        });
      }

      this._data = this._waveformData.get(scale);
    } else {
      this._data = this._originalWaveformData.resample(options);
    }

    this._scale = this._data.scale;
    this._pixelLength = this._data.length;
  };

  WaveformZoomView.prototype.getStartTime = function () {
    return this.pixelOffsetToTime(0);
  };

  WaveformZoomView.prototype.getEndTime = function () {
    return this.pixelOffsetToTime(this._width);
  };

  WaveformZoomView.prototype.setStartTime = function (time) {
    if (time < 0) {
      time = 0;
    }

    if (this._zoomLevelAuto) {
      time = 0;
    }

    this._updateWaveform(this.timeToPixels(time));
  };
  /**
   * Returns the pixel index for a given time, for the current zoom level.
   *
   * @param {Number} time Time, in seconds.
   * @returns {Number} Pixel index.
   */


  WaveformZoomView.prototype.timeToPixels = function (time) {
    return Math.floor(time * this._data.sample_rate / this._data.scale);
  };
  /**
   * Returns the time for a given pixel index, for the current zoom level.
   *
   * @param {Number} pixels Pixel index.
   * @returns {Number} Time, in seconds.
   */


  WaveformZoomView.prototype.pixelsToTime = function (pixels) {
    return pixels * this._data.scale / this._data.sample_rate;
  };
  /**
   * Returns the time for a given pixel offset (relative to the
   * current scroll position), for the current zoom level.
   *
   * @param {Number} offset Offset from left-visible-edge of view
   * @returns {Number} Time, in seconds.
   */


  WaveformZoomView.prototype.pixelOffsetToTime = function (offset) {
    var pixels = this._frameOffset + offset;
    return pixels * this._data.scale / this._data.sample_rate;
  };
  /* var zoomAdapterMap = {
    'animated': AnimatedZoomAdapter,
    'static': StaticZoomAdapter
  };

  WaveformZoomView.prototype.createZoomAdapter = function(currentScale, previousScale) {
    var ZoomAdapter = zoomAdapterMap[this._viewOptions.zoomAdapter];

    if (!ZoomAdapter) {
      throw new Error('Invalid zoomAdapter: ' + this._viewOptions.zoomAdapter);
    }

    return ZoomAdapter.create(this, currentScale, previousScale);
  }; */

  /**
   * @returns {Number} The start position of the waveform shown in the view,
   *   in pixels.
   */


  WaveformZoomView.prototype.getFrameOffset = function () {
    return this._frameOffset;
  };
  /**
   * @returns {Number} The width of the view, in pixels.
   */


  WaveformZoomView.prototype.getWidth = function () {
    return this._width;
  };
  /**
   * @returns {Number} The height of the view, in pixels.
   */


  WaveformZoomView.prototype.getHeight = function () {
    return this._height;
  };
  /**
   * @returns {Number} The media duration, in seconds.
   */


  WaveformZoomView.prototype._getDuration = function () {
    return this._peaks.player.getDuration();
  };
  /**
   * Adjusts the amplitude scale of waveform shown in the view, which allows
   * users to zoom the waveform vertically.
   *
   * @param {Number} scale The new amplitude scale factor
   */


  WaveformZoomView.prototype.setAmplitudeScale = function (scale) {
    if (!isNumber(scale) || !isFinite$1(scale)) {
      throw new Error('view.setAmplitudeScale(): Scale must be a valid number');
    }

    this._amplitudeScale = scale;

    this._drawWaveformLayer();

    this._segmentsLayer.draw();
  };

  WaveformZoomView.prototype.getAmplitudeScale = function () {
    return this._amplitudeScale;
  };
  /**
   * @returns {WaveformData} The view's waveform data.
   */


  WaveformZoomView.prototype.getWaveformData = function () {
    return this._data;
  };

  WaveformZoomView.prototype._createWaveformShapes = function () {
    if (!this._waveformShape) {
      this._waveformShape = new WaveformShape({
        color: this._waveformColor,
        view: this
      });

      this._waveformShape.addToLayer(this._waveformLayer);
    }

    if (this._playedWaveformColor && !this._playedWaveformShape) {
      var time = this._peaks.player.getCurrentTime();

      this._playedSegment = {
        startTime: 0,
        endTime: time
      };
      this._unplayedSegment = {
        startTime: time,
        endTime: this._getDuration()
      };

      this._waveformShape.setSegment(this._unplayedSegment);

      this._playedWaveformShape = new WaveformShape({
        color: this._playedWaveformColor,
        view: this,
        segment: this._playedSegment
      });

      this._playedWaveformShape.addToLayer(this._waveformLayer);
    }
  };

  WaveformZoomView.prototype._destroyPlayedWaveformShape = function () {
    this._waveformShape.setSegment(null);

    this._playedWaveformShape.destroy();

    this._playedWaveformShape = null;
    this._playedSegment = null;
    this._unplayedSegment = null;
  };

  WaveformZoomView.prototype._createWaveform = function () {
    this._waveformLayer = new Konva.Layer({
      listening: false
    });

    this._createWaveformShapes();

    this._stage.add(this._waveformLayer);

    this._peaks.emit('zoomview.displaying', 0, this.getEndTime());
  };

  WaveformZoomView.prototype._createAxisLabels = function () {
    this._axisLayer = new Konva.Layer({
      listening: false
    });
    this._axis = new WaveformAxis(this, this._viewOptions);

    this._axis.addToLayer(this._axisLayer);

    this._stage.add(this._axisLayer);
  };
  /**
   * Scrolls the region of waveform shown in the view.
   *
   * @param {Number} scrollAmount How far to scroll, in pixels
   */


  WaveformZoomView.prototype.scrollWaveform = function (options) {
    var scrollAmount;

    if (objectHasProperty(options, 'pixels')) {
      scrollAmount = Math.floor(options.pixels);
    } else if (objectHasProperty(options, 'seconds')) {
      scrollAmount = this.timeToPixels(options.seconds);
    } else {
      throw new TypeError('view.scrollWaveform(): Missing umber of pixels or seconds');
    }

    this._updateWaveform(this._frameOffset + scrollAmount);
  };
  /**
   * Updates the region of waveform shown in the view.
   *
   * @param {Number} frameOffset The new frame offset, in pixels.
   */


  WaveformZoomView.prototype._updateWaveform = function (frameOffset) {
    var upperLimit;

    if (this._pixelLength < this._width) {
      // Total waveform is shorter than viewport, so reset the offset to 0.
      frameOffset = 0;
      upperLimit = this._width;
    } else {
      // Calculate the very last possible position.
      upperLimit = this._pixelLength - this._width;
    }

    frameOffset = clamp(frameOffset, 0, upperLimit);
    this._frameOffset = frameOffset; // Display playhead if it is within the zoom frame width.

    var playheadPixel = this._playheadLayer.getPlayheadPixel();

    this._playheadLayer.updatePlayheadTime(this.pixelsToTime(playheadPixel));

    this._drawWaveformLayer();

    this._axisLayer.draw();

    var frameStartTime = this.getStartTime();
    var frameEndTime = this.getEndTime();

    this._pointsLayer.updatePoints(frameStartTime, frameEndTime);

    this._segmentsLayer.updateSegments(frameStartTime, frameEndTime);

    this._peaks.emit('zoomview.displaying', frameStartTime, frameEndTime);
  };

  WaveformZoomView.prototype._drawWaveformLayer = function () {
    this._waveformLayer.draw();
  };

  WaveformZoomView.prototype.setWaveformColor = function (color) {
    this._waveformColor = color;

    this._waveformShape.setWaveformColor(color);
  };

  WaveformZoomView.prototype.setPlayedWaveformColor = function (color) {
    this._playedWaveformColor = color;

    if (color) {
      if (!this._playedWaveformShape) {
        this._createWaveformShapes();
      }

      this._playedWaveformShape.setWaveformColor(color);
    } else {
      if (this._playedWaveformShape) {
        this._destroyPlayedWaveformShape();
      }
    }
  };

  WaveformZoomView.prototype.showPlayheadTime = function (show) {
    this._playheadLayer.showPlayheadTime(show);
  };

  WaveformZoomView.prototype.setTimeLabelPrecision = function (precision) {
    this._timeLabelPrecision = precision;

    this._playheadLayer.updatePlayheadText();
  };

  WaveformZoomView.prototype.formatTime = function (time) {
    return this._formatPlayheadTime(time);
  };

  WaveformZoomView.prototype.showAxisLabels = function (show) {
    this._axis.showAxisLabels(show);

    this._axisLayer.draw();
  };

  WaveformZoomView.prototype.enableAutoScroll = function (enable) {
    this._enableAutoScroll = enable;
  };

  WaveformZoomView.prototype.enableMarkerEditing = function (enable) {
    this._segmentsLayer.enableEditing(enable);

    this._pointsLayer.enableEditing(enable);
  };

  WaveformZoomView.prototype.fitToContainer = function () {
    if (this._container.clientWidth === 0 && this._container.clientHeight === 0) {
      return;
    }

    var updateWaveform = false;

    if (this._container.clientWidth !== this._width) {
      this._width = this._container.clientWidth;

      this._stage.width(this._width);

      var resample = false;
      var resampleOptions;

      if (this._zoomLevelAuto) {
        resample = true;
        resampleOptions = {
          width: this._width
        };
      } else if (this._zoomLevelSeconds !== null) {
        resample = true;
        resampleOptions = {
          scale: this._getScale(this._zoomLevelSeconds)
        };
      }

      if (resample) {
        try {
          this._resampleData(resampleOptions);

          updateWaveform = true;
        } catch (error) {// Ignore, and leave this._data as it was
        }
      }
    }

    this._height = this._container.clientHeight;

    this._stage.height(this._height);

    this._waveformShape.fitToView();

    this._playheadLayer.fitToView();

    this._segmentsLayer.fitToView();

    this._pointsLayer.fitToView();

    if (updateWaveform) {
      this._updateWaveform(this._frameOffset);
    }

    this._stage.draw();
  };
  /* WaveformZoomView.prototype.beginZoom = function() {
    // Fade out the time axis and the segments
    // this._axis.axisShape.setAttr('opacity', 0);

    if (this._pointsLayer) {
      this._pointsLayer.setVisible(false);
    }

    if (this._segmentsLayer) {
      this._segmentsLayer.setVisible(false);
    }
  };

  WaveformZoomView.prototype.endZoom = function() {
    if (this._pointsLayer) {
      this._pointsLayer.setVisible(true);
    }

    if (this._segmentsLayer) {
      this._segmentsLayer.setVisible(true);
    }

    var time = this._peaks.player.getCurrentTime();

    this.seekFrame(this.timeToPixels(time));
  }; */


  WaveformZoomView.prototype.destroy = function () {
    if (this._resizeTimeoutId) {
      clearTimeout(this._resizeTimeoutId);
      this._resizeTimeoutId = null;
    } // Unregister event handlers


    this._peaks.off('player.timeupdate', this._onTimeUpdate);

    this._peaks.off('player.playing', this._onPlaying);

    this._peaks.off('player.pause', this._onPause);

    this._peaks.off('window_resize', this._onWindowResize);

    this._peaks.off('keyboard.left', this._onKeyboardLeft);

    this._peaks.off('keyboard.right', this._onKeyboardRight);

    this._peaks.off('keyboard.shift_left', this._onKeyboardShiftLeft);

    this._peaks.off('keyboard.shift_right', this._onKeyboardShiftRight);

    this._playheadLayer.destroy();

    this._segmentsLayer.destroy();

    this._pointsLayer.destroy();

    if (this._stage) {
      this._stage.destroy();

      this._stage = null;
    }
  };

  /**
   * @file
   *
   * Defines the {@link ViewController} class.
   *
   * @module view-controller
   */
  /**
   * Creates an object that allows users to create and manage waveform views.
   *
   * @class
   * @alias ViewController
   *
   * @param {Peaks} peaks
   */

  function ViewController(peaks) {
    this._peaks = peaks;
    this._overview = null;
    this._zoomview = null;
  }

  ViewController.prototype.createOverview = function (container) {
    if (this._overview) {
      return this._overview;
    }

    var waveformData = this._peaks.getWaveformData();

    this._overview = new WaveformOverview(waveformData, container, this._peaks);

    if (this._zoomview) {
      this._overview.showHighlight(this._zoomview.getStartTime(), this._zoomview.getEndTime());
    }

    return this._overview;
  };

  ViewController.prototype.createZoomview = function (container) {
    if (this._zoomview) {
      return this._zoomview;
    }

    var waveformData = this._peaks.getWaveformData();

    this._zoomview = new WaveformZoomView(waveformData, container, this._peaks);
    return this._zoomview;
  };

  ViewController.prototype.destroyOverview = function () {
    if (!this._overview) {
      return;
    }

    if (!this._zoomview) {
      return;
    }

    this._overview.destroy();

    this._overview = null;
  };

  ViewController.prototype.destroyZoomview = function () {
    if (!this._zoomview) {
      return;
    }

    if (!this._overview) {
      return;
    }

    this._zoomview.destroy();

    this._zoomview = null;

    this._overview.removeHighlightRect();
  };

  ViewController.prototype.destroy = function () {
    if (this._overview) {
      this._overview.destroy();

      this._overview = null;
    }

    if (this._zoomview) {
      this._zoomview.destroy();

      this._zoomview = null;
    }
  };

  ViewController.prototype.getView = function (name) {
    if (isNullOrUndefined(name)) {
      if (this._overview && this._zoomview) {
        return null;
      } else if (this._overview) {
        return this._overview;
      } else if (this._zoomview) {
        return this._zoomview;
      } else {
        return null;
      }
    } else {
      switch (name) {
        case 'overview':
          return this._overview;

        case 'zoomview':
          return this._zoomview;

        default:
          return null;
      }
    }
  };

  /**
   * @file
   *
   * Defines the {@link ZoomController} class.
   *
   * @module zoom-controller
   */

  /**
   * Creates an object to control zoom levels in a {@link WaveformZoomView}.
   *
   * @class
   * @alias ZoomController
   *
   * @param {Peaks} peaks
   * @param {Array<Integer>} zoomLevels
   */
  function ZoomController(peaks, zoomLevels) {
    this._peaks = peaks;
    this._zoomLevels = zoomLevels;
    this._zoomLevelIndex = 0;
  }

  ZoomController.prototype.setZoomLevels = function (zoomLevels) {
    this._zoomLevels = zoomLevels;
    this.setZoom(0, true);
  };
  /**
   * Zoom in one level.
   */


  ZoomController.prototype.zoomIn = function () {
    this.setZoom(this._zoomLevelIndex - 1);
  };
  /**
   * Zoom out one level.
   */


  ZoomController.prototype.zoomOut = function () {
    this.setZoom(this._zoomLevelIndex + 1);
  };
  /**
   * Given a particular zoom level, triggers a resampling of the data in the
   * zoomed view.
   *
   * @param {number} zoomLevelIndex An index into the options.zoomLevels array.
   */


  ZoomController.prototype.setZoom = function (zoomLevelIndex, forceUpdate) {
    if (zoomLevelIndex >= this._zoomLevels.length) {
      zoomLevelIndex = this._zoomLevels.length - 1;
    }

    if (zoomLevelIndex < 0) {
      zoomLevelIndex = 0;
    }

    if (!forceUpdate && zoomLevelIndex === this._zoomLevelIndex) {
      // Nothing to do.
      return;
    }

    this._zoomLevelIndex = zoomLevelIndex;

    var zoomview = this._peaks.views.getView('zoomview');

    if (!zoomview) {
      return;
    }

    zoomview.setZoom({
      scale: this._zoomLevels[zoomLevelIndex]
    });
  };
  /**
   * Returns the current zoom level index.
   *
   * @returns {Number}
   */


  ZoomController.prototype.getZoom = function () {
    return this._zoomLevelIndex;
  };
  /**
   * Returns the current zoom level, in samples per pixel.
   *
   * @returns {Number}
   */


  ZoomController.prototype.getZoomLevel = function () {
    return this._zoomLevels[this._zoomLevelIndex];
  };

  /**
   * Provides access to the waveform data for a single audio channel.
   */
  function WaveformDataChannel(waveformData, channelIndex) {
    this._waveformData = waveformData;
    this._channelIndex = channelIndex;
  }
  /**
   * Returns the waveform minimum at the given index position.
   */


  WaveformDataChannel.prototype.min_sample = function (index) {
    var offset = (index * this._waveformData.channels + this._channelIndex) * 2;
    return this._waveformData._at(offset);
  };
  /**
   * Returns the waveform maximum at the given index position.
   */


  WaveformDataChannel.prototype.max_sample = function (index) {
    var offset = (index * this._waveformData.channels + this._channelIndex) * 2 + 1;
    return this._waveformData._at(offset);
  };
  /**
   * Sets the waveform minimum at the given index position.
   */


  WaveformDataChannel.prototype.set_min_sample = function (index, sample) {
    var offset = (index * this._waveformData.channels + this._channelIndex) * 2;
    return this._waveformData._set_at(offset, sample);
  };
  /**
   * Sets the waveform maximum at the given index position.
   */


  WaveformDataChannel.prototype.set_max_sample = function (index, sample) {
    var offset = (index * this._waveformData.channels + this._channelIndex) * 2 + 1;
    return this._waveformData._set_at(offset, sample);
  };
  /**
   * Returns all the waveform minimum values as an array.
   */


  WaveformDataChannel.prototype.min_array = function () {
    return this._waveformData._offsetValues(0, this._waveformData.length, this._channelIndex * 2);
  };
  /**
   * Returns all the waveform maximum values as an array.
   */


  WaveformDataChannel.prototype.max_array = function () {
    return this._waveformData._offsetValues(0, this._waveformData.length, this._channelIndex * 2 + 1);
  };
  /**
   * AudioBuffer-based WaveformData generator
   *
   * Adapted from BlockFile::CalcSummary in Audacity, with permission.
   * See https://code.google.com/p/audacity/source/browse/audacity-src/trunk/src/BlockFile.cpp
   */


  var INT8_MAX = 127;
  var INT8_MIN = -128;

  function calculateWaveformDataLength(audio_sample_count, scale) {
    var data_length = Math.floor(audio_sample_count / scale);
    var samples_remaining = audio_sample_count - data_length * scale;

    if (samples_remaining > 0) {
      data_length++;
    }

    return data_length;
  }

  function generateWaveformData(options) {
    var scale = options.scale;
    var amplitude_scale = options.amplitude_scale;
    var split_channels = options.split_channels;
    var length = options.length;
    var sample_rate = options.sample_rate;
    var channels = options.channels.map(function (channel) {
      return new Float32Array(channel);
    });
    var output_channels = split_channels ? channels.length : 1;
    var version = output_channels === 1 ? 1 : 2;
    var header_size = version === 1 ? 20 : 24;
    var data_length = calculateWaveformDataLength(length, scale);
    var total_size = header_size + data_length * 2 * output_channels;
    var buffer = new ArrayBuffer(total_size);
    var data_view = new DataView(buffer);
    var scale_counter = 0;
    var offset = header_size;
    var channel, i;
    var min_value = new Array(output_channels);
    var max_value = new Array(output_channels);

    for (channel = 0; channel < output_channels; channel++) {
      min_value[channel] = Infinity;
      max_value[channel] = -Infinity;
    }

    data_view.setInt32(0, version, true); // Version

    data_view.setUint32(4, 1, true); // Is 8 bit?

    data_view.setInt32(8, sample_rate, true); // Sample rate

    data_view.setInt32(12, scale, true); // Scale

    data_view.setInt32(16, data_length, true); // Length

    if (version === 2) {
      data_view.setInt32(20, output_channels, true);
    }

    for (i = 0; i < length; i++) {
      var sample = 0;

      if (output_channels === 1) {
        for (channel = 0; channel < channels.length; ++channel) {
          sample += channels[channel][i];
        }

        sample = Math.floor(INT8_MAX * sample * amplitude_scale / channels.length);

        if (sample < min_value[0]) {
          min_value[0] = sample;

          if (min_value[0] < INT8_MIN) {
            min_value[0] = INT8_MIN;
          }
        }

        if (sample > max_value[0]) {
          max_value[0] = sample;

          if (max_value[0] > INT8_MAX) {
            max_value[0] = INT8_MAX;
          }
        }
      } else {
        for (channel = 0; channel < output_channels; ++channel) {
          sample = Math.floor(INT8_MAX * channels[channel][i] * amplitude_scale);

          if (sample < min_value[channel]) {
            min_value[channel] = sample;

            if (min_value[channel] < INT8_MIN) {
              min_value[channel] = INT8_MIN;
            }
          }

          if (sample > max_value[channel]) {
            max_value[channel] = sample;

            if (max_value[channel] > INT8_MAX) {
              max_value[channel] = INT8_MAX;
            }
          }
        }
      }

      if (++scale_counter === scale) {
        for (channel = 0; channel < output_channels; channel++) {
          data_view.setInt8(offset++, min_value[channel]);
          data_view.setInt8(offset++, max_value[channel]);
          min_value[channel] = Infinity;
          max_value[channel] = -Infinity;
        }

        scale_counter = 0;
      }
    }

    if (scale_counter > 0) {
      for (channel = 0; channel < output_channels; channel++) {
        data_view.setInt8(offset++, min_value[channel]);
        data_view.setInt8(offset++, max_value[channel]);
      }
    }

    return buffer;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function isJsonWaveformData(data) {
    return data && _typeof(data) === "object" && "sample_rate" in data && "samples_per_pixel" in data && "bits" in data && "length" in data && "data" in data;
  }

  function isBinaryWaveformData(data) {
    var isCompatible = data && _typeof(data) === "object" && "byteLength" in data;

    if (isCompatible) {
      var view = new DataView(data);
      var version = view.getInt32(0, true);

      if (version !== 1 && version !== 2) {
        throw new TypeError("WaveformData.create(): This waveform data version not supported");
      }
    }

    return isCompatible;
  }

  function convertJsonToBinary(data) {
    var waveformData = data.data;
    var channels = data.channels || 1;
    var header_size = 24; // version 2

    var bytes_per_sample = data.bits === 8 ? 1 : 2;
    var expected_length = data.length * 2 * channels;

    if (waveformData.length !== expected_length) {
      throw new Error("WaveformData.create(): Length mismatch in JSON waveform data");
    }

    var total_size = header_size + waveformData.length * bytes_per_sample;
    var array_buffer = new ArrayBuffer(total_size);
    var data_object = new DataView(array_buffer);
    data_object.setInt32(0, 2, true); // Version

    data_object.setUint32(4, data.bits === 8, true);
    data_object.setInt32(8, data.sample_rate, true);
    data_object.setInt32(12, data.samples_per_pixel, true);
    data_object.setInt32(16, data.length, true);
    data_object.setInt32(20, channels, true);
    var index = header_size;
    var i;

    if (data.bits === 8) {
      for (i = 0; i < waveformData.length; i++) {
        data_object.setInt8(index++, waveformData[i], true);
      }
    } else {
      for (i = 0; i < waveformData.length; i++) {
        data_object.setInt16(index, waveformData[i], true);
        index += 2;
      }
    }

    return array_buffer;
  }

  function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);

    if (enableUnicode) {
      var binaryView = new Uint8Array(binaryString.length);

      for (var i = 0, n = binaryString.length; i < n; ++i) {
        binaryView[i] = binaryString.charCodeAt(i);
      }

      return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }

    return binaryString;
  }

  function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], {
      type: 'application/javascript'
    });
    return URL.createObjectURL(blob);
  }

  function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return function WorkerFactory(options) {
      url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
      return new Worker(url, options);
    };
  }

  var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgLyoqCiAgICogQXVkaW9CdWZmZXItYmFzZWQgV2F2ZWZvcm1EYXRhIGdlbmVyYXRvcgogICAqCiAgICogQWRhcHRlZCBmcm9tIEJsb2NrRmlsZTo6Q2FsY1N1bW1hcnkgaW4gQXVkYWNpdHksIHdpdGggcGVybWlzc2lvbi4KICAgKiBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9hdWRhY2l0eS9zb3VyY2UvYnJvd3NlL2F1ZGFjaXR5LXNyYy90cnVuay9zcmMvQmxvY2tGaWxlLmNwcAogICAqLwogIHZhciBJTlQ4X01BWCA9IDEyNzsKICB2YXIgSU5UOF9NSU4gPSAtMTI4OwoKICBmdW5jdGlvbiBjYWxjdWxhdGVXYXZlZm9ybURhdGFMZW5ndGgoYXVkaW9fc2FtcGxlX2NvdW50LCBzY2FsZSkgewogICAgdmFyIGRhdGFfbGVuZ3RoID0gTWF0aC5mbG9vcihhdWRpb19zYW1wbGVfY291bnQgLyBzY2FsZSk7CiAgICB2YXIgc2FtcGxlc19yZW1haW5pbmcgPSBhdWRpb19zYW1wbGVfY291bnQgLSBkYXRhX2xlbmd0aCAqIHNjYWxlOwoKICAgIGlmIChzYW1wbGVzX3JlbWFpbmluZyA+IDApIHsKICAgICAgZGF0YV9sZW5ndGgrKzsKICAgIH0KCiAgICByZXR1cm4gZGF0YV9sZW5ndGg7CiAgfQoKICBmdW5jdGlvbiBnZW5lcmF0ZVdhdmVmb3JtRGF0YShvcHRpb25zKSB7CiAgICB2YXIgc2NhbGUgPSBvcHRpb25zLnNjYWxlOwogICAgdmFyIGFtcGxpdHVkZV9zY2FsZSA9IG9wdGlvbnMuYW1wbGl0dWRlX3NjYWxlOwogICAgdmFyIHNwbGl0X2NoYW5uZWxzID0gb3B0aW9ucy5zcGxpdF9jaGFubmVsczsKICAgIHZhciBsZW5ndGggPSBvcHRpb25zLmxlbmd0aDsKICAgIHZhciBzYW1wbGVfcmF0ZSA9IG9wdGlvbnMuc2FtcGxlX3JhdGU7CiAgICB2YXIgY2hhbm5lbHMgPSBvcHRpb25zLmNoYW5uZWxzLm1hcChmdW5jdGlvbiAoY2hhbm5lbCkgewogICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShjaGFubmVsKTsKICAgIH0pOwogICAgdmFyIG91dHB1dF9jaGFubmVscyA9IHNwbGl0X2NoYW5uZWxzID8gY2hhbm5lbHMubGVuZ3RoIDogMTsKICAgIHZhciB2ZXJzaW9uID0gb3V0cHV0X2NoYW5uZWxzID09PSAxID8gMSA6IDI7CiAgICB2YXIgaGVhZGVyX3NpemUgPSB2ZXJzaW9uID09PSAxID8gMjAgOiAyNDsKICAgIHZhciBkYXRhX2xlbmd0aCA9IGNhbGN1bGF0ZVdhdmVmb3JtRGF0YUxlbmd0aChsZW5ndGgsIHNjYWxlKTsKICAgIHZhciB0b3RhbF9zaXplID0gaGVhZGVyX3NpemUgKyBkYXRhX2xlbmd0aCAqIDIgKiBvdXRwdXRfY2hhbm5lbHM7CiAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHRvdGFsX3NpemUpOwogICAgdmFyIGRhdGFfdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpOwogICAgdmFyIHNjYWxlX2NvdW50ZXIgPSAwOwogICAgdmFyIG9mZnNldCA9IGhlYWRlcl9zaXplOwogICAgdmFyIGNoYW5uZWwsIGk7CiAgICB2YXIgbWluX3ZhbHVlID0gbmV3IEFycmF5KG91dHB1dF9jaGFubmVscyk7CiAgICB2YXIgbWF4X3ZhbHVlID0gbmV3IEFycmF5KG91dHB1dF9jaGFubmVscyk7CgogICAgZm9yIChjaGFubmVsID0gMDsgY2hhbm5lbCA8IG91dHB1dF9jaGFubmVsczsgY2hhbm5lbCsrKSB7CiAgICAgIG1pbl92YWx1ZVtjaGFubmVsXSA9IEluZmluaXR5OwogICAgICBtYXhfdmFsdWVbY2hhbm5lbF0gPSAtSW5maW5pdHk7CiAgICB9CgogICAgZGF0YV92aWV3LnNldEludDMyKDAsIHZlcnNpb24sIHRydWUpOyAvLyBWZXJzaW9uCgogICAgZGF0YV92aWV3LnNldFVpbnQzMig0LCAxLCB0cnVlKTsgLy8gSXMgOCBiaXQ/CgogICAgZGF0YV92aWV3LnNldEludDMyKDgsIHNhbXBsZV9yYXRlLCB0cnVlKTsgLy8gU2FtcGxlIHJhdGUKCiAgICBkYXRhX3ZpZXcuc2V0SW50MzIoMTIsIHNjYWxlLCB0cnVlKTsgLy8gU2NhbGUKCiAgICBkYXRhX3ZpZXcuc2V0SW50MzIoMTYsIGRhdGFfbGVuZ3RoLCB0cnVlKTsgLy8gTGVuZ3RoCgogICAgaWYgKHZlcnNpb24gPT09IDIpIHsKICAgICAgZGF0YV92aWV3LnNldEludDMyKDIwLCBvdXRwdXRfY2hhbm5lbHMsIHRydWUpOwogICAgfQoKICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgewogICAgICB2YXIgc2FtcGxlID0gMDsKCiAgICAgIGlmIChvdXRwdXRfY2hhbm5lbHMgPT09IDEpIHsKICAgICAgICBmb3IgKGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgY2hhbm5lbHMubGVuZ3RoOyArK2NoYW5uZWwpIHsKICAgICAgICAgIHNhbXBsZSArPSBjaGFubmVsc1tjaGFubmVsXVtpXTsKICAgICAgICB9CgogICAgICAgIHNhbXBsZSA9IE1hdGguZmxvb3IoSU5UOF9NQVggKiBzYW1wbGUgKiBhbXBsaXR1ZGVfc2NhbGUgLyBjaGFubmVscy5sZW5ndGgpOwoKICAgICAgICBpZiAoc2FtcGxlIDwgbWluX3ZhbHVlWzBdKSB7CiAgICAgICAgICBtaW5fdmFsdWVbMF0gPSBzYW1wbGU7CgogICAgICAgICAgaWYgKG1pbl92YWx1ZVswXSA8IElOVDhfTUlOKSB7CiAgICAgICAgICAgIG1pbl92YWx1ZVswXSA9IElOVDhfTUlOOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgaWYgKHNhbXBsZSA+IG1heF92YWx1ZVswXSkgewogICAgICAgICAgbWF4X3ZhbHVlWzBdID0gc2FtcGxlOwoKICAgICAgICAgIGlmIChtYXhfdmFsdWVbMF0gPiBJTlQ4X01BWCkgewogICAgICAgICAgICBtYXhfdmFsdWVbMF0gPSBJTlQ4X01BWDsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0gZWxzZSB7CiAgICAgICAgZm9yIChjaGFubmVsID0gMDsgY2hhbm5lbCA8IG91dHB1dF9jaGFubmVsczsgKytjaGFubmVsKSB7CiAgICAgICAgICBzYW1wbGUgPSBNYXRoLmZsb29yKElOVDhfTUFYICogY2hhbm5lbHNbY2hhbm5lbF1baV0gKiBhbXBsaXR1ZGVfc2NhbGUpOwoKICAgICAgICAgIGlmIChzYW1wbGUgPCBtaW5fdmFsdWVbY2hhbm5lbF0pIHsKICAgICAgICAgICAgbWluX3ZhbHVlW2NoYW5uZWxdID0gc2FtcGxlOwoKICAgICAgICAgICAgaWYgKG1pbl92YWx1ZVtjaGFubmVsXSA8IElOVDhfTUlOKSB7CiAgICAgICAgICAgICAgbWluX3ZhbHVlW2NoYW5uZWxdID0gSU5UOF9NSU47CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KCiAgICAgICAgICBpZiAoc2FtcGxlID4gbWF4X3ZhbHVlW2NoYW5uZWxdKSB7CiAgICAgICAgICAgIG1heF92YWx1ZVtjaGFubmVsXSA9IHNhbXBsZTsKCiAgICAgICAgICAgIGlmIChtYXhfdmFsdWVbY2hhbm5lbF0gPiBJTlQ4X01BWCkgewogICAgICAgICAgICAgIG1heF92YWx1ZVtjaGFubmVsXSA9IElOVDhfTUFYOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICB9CgogICAgICBpZiAoKytzY2FsZV9jb3VudGVyID09PSBzY2FsZSkgewogICAgICAgIGZvciAoY2hhbm5lbCA9IDA7IGNoYW5uZWwgPCBvdXRwdXRfY2hhbm5lbHM7IGNoYW5uZWwrKykgewogICAgICAgICAgZGF0YV92aWV3LnNldEludDgob2Zmc2V0KyssIG1pbl92YWx1ZVtjaGFubmVsXSk7CiAgICAgICAgICBkYXRhX3ZpZXcuc2V0SW50OChvZmZzZXQrKywgbWF4X3ZhbHVlW2NoYW5uZWxdKTsKICAgICAgICAgIG1pbl92YWx1ZVtjaGFubmVsXSA9IEluZmluaXR5OwogICAgICAgICAgbWF4X3ZhbHVlW2NoYW5uZWxdID0gLUluZmluaXR5OwogICAgICAgIH0KCiAgICAgICAgc2NhbGVfY291bnRlciA9IDA7CiAgICAgIH0KICAgIH0KCiAgICBpZiAoc2NhbGVfY291bnRlciA+IDApIHsKICAgICAgZm9yIChjaGFubmVsID0gMDsgY2hhbm5lbCA8IG91dHB1dF9jaGFubmVsczsgY2hhbm5lbCsrKSB7CiAgICAgICAgZGF0YV92aWV3LnNldEludDgob2Zmc2V0KyssIG1pbl92YWx1ZVtjaGFubmVsXSk7CiAgICAgICAgZGF0YV92aWV3LnNldEludDgob2Zmc2V0KyssIG1heF92YWx1ZVtjaGFubmVsXSk7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gYnVmZmVyOwogIH0KCiAgb25tZXNzYWdlID0gZnVuY3Rpb24gb25tZXNzYWdlKGV2dCkgewogICAgdmFyIGJ1ZmZlciA9IGdlbmVyYXRlV2F2ZWZvcm1EYXRhKGV2dC5kYXRhKTsgLy8gVHJhbnNmZXIgYnVmZmVyIHRvIHRoZSBjYWxsaW5nIHRocmVhZAoKICAgIHRoaXMucG9zdE1lc3NhZ2UoYnVmZmVyLCBbYnVmZmVyXSk7CiAgICB0aGlzLmNsb3NlKCk7CiAgfTsKCn0pKCk7Cgo=', null, false);
  /* eslint-enable */

  /**
   * Provides access to waveform data.
   */

  function WaveformData(data) {
    if (isJsonWaveformData(data)) {
      data = convertJsonToBinary(data);
    }

    if (isBinaryWaveformData(data)) {
      this._data = new DataView(data);
      this._offset = this._version() === 2 ? 24 : 20;
      this._channels = [];

      for (var channel = 0; channel < this.channels; channel++) {
        this._channels[channel] = new WaveformDataChannel(this, channel);
      }
    } else {
      throw new TypeError("WaveformData.create(): Unknown data format");
    }
  }

  var defaultOptions = {
    scale: 512,
    amplitude_scale: 1.0,
    split_channels: false,
    disable_worker: false
  };

  function getOptions(options) {
    var opts = {
      scale: options.scale || defaultOptions.scale,
      amplitude_scale: options.amplitude_scale || defaultOptions.amplitude_scale,
      split_channels: options.split_channels || defaultOptions.split_channels,
      disable_worker: options.disable_worker || defaultOptions.disable_worker
    };
    return opts;
  }

  function getChannelData(audio_buffer) {
    var channels = [];

    for (var i = 0; i < audio_buffer.numberOfChannels; ++i) {
      channels.push(audio_buffer.getChannelData(i).buffer);
    }

    return channels;
  }

  function createFromAudioBuffer(audio_buffer, options, callback) {
    var channels = getChannelData(audio_buffer);

    if (options.disable_worker) {
      var buffer = generateWaveformData({
        scale: options.scale,
        amplitude_scale: options.amplitude_scale,
        split_channels: options.split_channels,
        length: audio_buffer.length,
        sample_rate: audio_buffer.sampleRate,
        channels: channels
      });
      callback(null, new WaveformData(buffer), audio_buffer);
    } else {
      var worker = new WorkerFactory();

      worker.onmessage = function (evt) {
        callback(null, new WaveformData(evt.data), audio_buffer);
      };

      worker.postMessage({
        scale: options.scale,
        amplitude_scale: options.amplitude_scale,
        split_channels: options.split_channels,
        length: audio_buffer.length,
        sample_rate: audio_buffer.sampleRate,
        channels: channels
      }, channels);
    }
  }

  function createFromArrayBuffer(audioContext, audioData, options, callback) {
    // The following function is a workaround for a Webkit bug where decodeAudioData
    // invokes the errorCallback with null instead of a DOMException.
    // See https://webaudio.github.io/web-audio-api/#dom-baseaudiocontext-decodeaudiodata
    // and http://stackoverflow.com/q/10365335/103396
    function errorCallback(error) {
      if (!error) {
        error = new DOMException("EncodingError");
      }

      callback(error);
    }

    audioContext.decodeAudioData(audioData, function (audio_buffer) {
      createFromAudioBuffer(audio_buffer, options, callback);
    }, errorCallback);
  }
  /**
   * Creates and returns a WaveformData instance from the given waveform data.
   */


  WaveformData.create = function create(data) {
    return new WaveformData(data);
  };
  /**
   * Creates a WaveformData instance from audio.
   */


  WaveformData.createFromAudio = function (options, callback) {
    var opts = getOptions(options);

    if (options.audio_context && options.array_buffer) {
      return createFromArrayBuffer(options.audio_context, options.array_buffer, opts, callback);
    } else if (options.audio_buffer) {
      return createFromAudioBuffer(options.audio_buffer, opts, callback);
    } else {
      throw new TypeError( // eslint-disable-next-line
      "WaveformData.createFromAudio(): Pass either an AudioContext and ArrayBuffer, or an AudioBuffer object");
    }
  };

  WaveformData.prototype = {
    /**
     * Creates and returns a new WaveformData object with resampled data.
     * Use this method to create waveform data at different zoom levels.
     *
     * Adapted from Sequence::GetWaveDisplay in Audacity, with permission.
     * https://code.google.com/p/audacity/source/browse/audacity-src/trunk/src/Sequence.cpp
     */
    resample: function resample(options) {
      options.scale = typeof options.scale === "number" ? options.scale : null;
      options.width = typeof options.width === "number" ? options.width : null;

      if (options.width != null && options.width <= 0) {
        throw new RangeError("WaveformData.resample(): width should be a positive integer value");
      }

      if (options.scale != null && options.scale <= 0) {
        throw new RangeError("WaveformData.resample(): scale should be a positive integer value");
      }

      if (!options.scale && !options.width) {
        throw new Error("WaveformData.resample(): Missing scale or width option");
      } // Scale we want to reach


      var output_samples_per_pixel = options.scale || Math.floor(this.duration * this.sample_rate / options.width);
      var scale = this.scale; // scale we are coming from
      // The amount of data we want to resample i.e. final zoom want to resample
      // all data but for intermediate zoom we want to resample subset

      var input_buffer_size = this.length;
      var input_buffer_length_samples = input_buffer_size * this.scale;
      var output_buffer_length_samples = Math.ceil(input_buffer_length_samples / output_samples_per_pixel);
      var output_header_size = 24; // version 2

      var bytes_per_sample = this.bits === 8 ? 1 : 2;
      var total_size = output_header_size + output_buffer_length_samples * 2 * this.channels * bytes_per_sample;
      var output_data = new ArrayBuffer(total_size);
      var output_dataview = new DataView(output_data);
      output_dataview.setInt32(0, 2, true); // Version

      output_dataview.setUint32(4, this.bits === 8, true); // Is 8 bit?

      output_dataview.setInt32(8, this.sample_rate, true);
      output_dataview.setInt32(12, output_samples_per_pixel, true);
      output_dataview.setInt32(16, output_buffer_length_samples, true);
      output_dataview.setInt32(20, this.channels, true);
      var waveform_data = new WaveformData(output_data);
      var input_index = 0;
      var output_index = 0;
      var channels = this.channels;
      var min = new Array(channels);
      var max = new Array(channels);
      var channel;

      for (channel = 0; channel < channels; ++channel) {
        if (input_buffer_size > 0) {
          min[channel] = this.channel(channel).min_sample(input_index);
          max[channel] = this.channel(channel).max_sample(input_index);
        } else {
          min[channel] = 0;
          max[channel] = 0;
        }
      }

      var min_value = this.bits === 8 ? -128 : -32768;
      var max_value = this.bits === 8 ? 127 : 32767;

      if (output_samples_per_pixel < scale) {
        throw new Error("WaveformData.resample(): Zoom level " + output_samples_per_pixel + " too low, minimum: " + scale);
      }

      var where, prev_where, stop, value, last_input_index;

      function sample_at_pixel(x) {
        return Math.floor(x * output_samples_per_pixel);
      }

      while (input_index < input_buffer_size) {
        while (Math.floor(sample_at_pixel(output_index) / scale) === input_index) {
          if (output_index > 0) {
            for (channel = 0; channel < channels; ++channel) {
              waveform_data.channel(channel).set_min_sample(output_index - 1, min[channel]);
              waveform_data.channel(channel).set_max_sample(output_index - 1, max[channel]);
            }
          }

          last_input_index = input_index;
          output_index++;
          where = sample_at_pixel(output_index);
          prev_where = sample_at_pixel(output_index - 1);

          if (where !== prev_where) {
            for (channel = 0; channel < channels; ++channel) {
              min[channel] = max_value;
              max[channel] = min_value;
            }
          }
        }

        where = sample_at_pixel(output_index);
        stop = Math.floor(where / scale);

        if (stop > input_buffer_size) {
          stop = input_buffer_size;
        }

        while (input_index < stop) {
          for (channel = 0; channel < channels; ++channel) {
            value = this.channel(channel).min_sample(input_index);

            if (value < min[channel]) {
              min[channel] = value;
            }

            value = this.channel(channel).max_sample(input_index);

            if (value > max[channel]) {
              max[channel] = value;
            }
          }

          input_index++;
        }
      }

      if (input_index !== last_input_index) {
        for (channel = 0; channel < channels; ++channel) {
          waveform_data.channel(channel).set_min_sample(output_index - 1, min[channel]);
          waveform_data.channel(channel).set_max_sample(output_index - 1, max[channel]);
        }
      }

      return waveform_data;
    },

    /**
     * Concatenates with one or more other waveforms, returning a new WaveformData object.
     */
    concat: function concat() {
      var self = this;
      var otherWaveforms = Array.prototype.slice.call(arguments); // Check that all the supplied waveforms are compatible

      otherWaveforms.forEach(function (otherWaveform) {
        if (self.channels !== otherWaveform.channels || self.sample_rate !== otherWaveform.sample_rate || self.bits !== otherWaveform.bits || self.scale !== otherWaveform.scale) {
          throw new Error("WaveformData.concat(): Waveforms are incompatible");
        }
      });

      var combinedBuffer = this._concatBuffers.apply(this, otherWaveforms);

      return WaveformData.create(combinedBuffer);
    },

    /**
     * Returns a new ArrayBuffer with the concatenated waveform.
     * All waveforms must have identical metadata (version, channels, etc)
     */
    _concatBuffers: function _concatBuffers() {
      var otherWaveforms = Array.prototype.slice.call(arguments);
      var headerSize = this._offset;
      var totalSize = headerSize;
      var totalDataLength = 0;
      var bufferCollection = [this].concat(otherWaveforms).map(function (w) {
        return w._data.buffer;
      });
      var i, buffer;

      for (i = 0; i < bufferCollection.length; i++) {
        buffer = bufferCollection[i];
        var dataSize = new DataView(buffer).getInt32(16, true);
        totalSize += buffer.byteLength - headerSize;
        totalDataLength += dataSize;
      }

      var totalBuffer = new ArrayBuffer(totalSize);
      var sourceHeader = new DataView(bufferCollection[0]);
      var totalBufferView = new DataView(totalBuffer); // Copy the header from the first chunk

      for (i = 0; i < headerSize; i++) {
        totalBufferView.setUint8(i, sourceHeader.getUint8(i));
      } // Rewrite the data-length header item to reflect all of the samples concatenated together


      totalBufferView.setInt32(16, totalDataLength, true);
      var offset = 0;
      var dataOfTotalBuffer = new Uint8Array(totalBuffer, headerSize);

      for (i = 0; i < bufferCollection.length; i++) {
        buffer = bufferCollection[i];
        dataOfTotalBuffer.set(new Uint8Array(buffer, headerSize), offset);
        offset += buffer.byteLength - headerSize;
      }

      return totalBuffer;
    },

    /**
     * Return the unpacked values for a particular offset.
     */
    _offsetValues: function getOffsetValues(start, length, correction) {
      var values = [];
      var channels = this.channels;
      correction += start * channels * 2; // offset the positioning query

      for (var i = 0; i < length; i++) {
        values.push(this._at(i * channels * 2 + correction));
      }

      return values;
    },

    /**
     * Returns the data format version number.
     */
    _version: function _version() {
      return this._data.getInt32(0, true);
    },

    /**
     * Returns the length of the waveform, in pixels.
     */
    get length() {
      return this._data.getUint32(16, true);
    },

    /**
     * Returns the number of bits per sample, either 8 or 16.
     */
    get bits() {
      var bits = Boolean(this._data.getUint32(4, true));
      return bits ? 8 : 16;
    },

    /**
     * Returns the (approximate) duration of the audio file, in seconds.
     */
    get duration() {
      return this.length * this.scale / this.sample_rate;
    },

    /**
     * Returns the number of pixels per second.
     */
    get pixels_per_second() {
      return this.sample_rate / this.scale;
    },

    /**
     * Returns the amount of time represented by a single pixel, in seconds.
     */
    get seconds_per_pixel() {
      return this.scale / this.sample_rate;
    },

    /**
     * Returns the number of waveform channels.
     */
    get channels() {
      if (this._version() === 2) {
        return this._data.getInt32(20, true);
      } else {
        return 1;
      }
    },

    /**
     * Returns a waveform channel.
     */
    channel: function channel(index) {
      if (index >= 0 && index < this._channels.length) {
        return this._channels[index];
      } else {
        throw new RangeError("Invalid channel: " + index);
      }
    },

    /**
     * Returns the number of audio samples per second.
     */
    get sample_rate() {
      return this._data.getInt32(8, true);
    },

    /**
     * Returns the number of audio samples per pixel.
     */
    get scale() {
      return this._data.getInt32(12, true);
    },

    /**
     * Returns a waveform data value at a specific offset.
     */
    _at: function at_sample(index) {
      if (this.bits === 8) {
        return this._data.getInt8(this._offset + index);
      } else {
        return this._data.getInt16(this._offset + index * 2, true);
      }
    },

    /**
     * Sets a waveform data value at a specific offset.
     */
    _set_at: function set_at(index, sample) {
      if (this.bits === 8) {
        return this._data.setInt8(this._offset + index, sample);
      } else {
        return this._data.setInt16(this._offset + index * 2, sample, true);
      }
    },

    /**
     * Returns the waveform data index position for a given time.
     */
    at_time: function at_time(time) {
      return Math.floor(time * this.sample_rate / this.scale);
    },

    /**
     * Returns the time in seconds for a given index.
     */
    time: function time(index) {
      return index * this.scale / this.sample_rate;
    },

    /**
     * Returns an object containing the waveform data.
     */
    toJSON: function toJSON() {
      var waveform = {
        version: 2,
        channels: this.channels,
        sample_rate: this.sample_rate,
        samples_per_pixel: this.scale,
        bits: this.bits,
        length: this.length,
        data: []
      };

      for (var i = 0; i < this.length; i++) {
        for (var channel = 0; channel < this.channels; channel++) {
          waveform.data.push(this.channel(channel).min_sample(i));
          waveform.data.push(this.channel(channel).max_sample(i));
        }
      }

      return waveform;
    },

    /**
     * Returns the waveform data in binary format as an ArrayBuffer.
     */
    toArrayBuffer: function toArrayBuffer() {
      return this._data.buffer;
    }
  };

  /**
   * @file
   *
   * Defines the {@link WaveformBuilder} class.
   *
   * @module waveform-builder
   */
  var isXhr2 = ('withCredentials' in new XMLHttpRequest());
  /**
   * Creates and returns a WaveformData object, either by requesting the
   * waveform data from the server, or by creating the waveform data using the
   * Web Audio API.
   *
   * @class
   * @alias WaveformBuilder
   *
   * @param {Peaks} peaks
   */

  function WaveformBuilder(peaks) {
    this._peaks = peaks;
  }
  /**
   * Options for requesting remote waveform data.
   *
   * @typedef {Object} RemoteWaveformDataOptions
   * @global
   * @property {String=} arraybuffer
   * @property {String=} json
   */

  /**
   * Options for supplying local waveform data.
   *
   * @typedef {Object} LocalWaveformDataOptions
   * @global
   * @property {ArrayBuffer=} arraybuffer
   * @property {Object=} json
   */

  /**
   * Options for the Web Audio waveform builder.
   *
   * @typedef {Object} WaveformBuilderWebAudioOptions
   * @global
   * @property {AudioContext} audioContext
   * @property {AudioBuffer=} audioBuffer
   * @property {Number=} scale
   * @property {Boolean=} multiChannel
   */

  /**
   * Options for [WaveformBuilder.init]{@link WaveformBuilder#init}.
   *
   * @typedef {Object} WaveformBuilderInitOptions
   * @global
   * @property {RemoteWaveformDataOptions=} dataUri
   * @property {LocalWaveformDataOptions=} waveformData
   * @property {WaveformBuilderWebAudioOptions=} webAudio
   * @property {Boolean=} withCredentials
   * @property {Array<Number>=} zoomLevels
   */

  /**
   * Callback for receiving the waveform data.
   *
   * @callback WaveformBuilderInitCallback
   * @global
   * @param {Error} error
   * @param {WaveformData} waveformData
   */

  /**
   * Loads or creates the waveform data.
   *
   * @private
   * @param {WaveformBuilderInitOptions} options
   * @param {WaveformBuilderInitCallback} callback
   */


  WaveformBuilder.prototype.init = function (options, callback) {
    if (options.dataUri && (options.webAudio || options.audioContext) || options.waveformData && (options.webAudio || options.audioContext) || options.dataUri && options.waveformData) {
      // eslint-disable-next-line max-len
      callback(new TypeError('Peaks.init(): You may only pass one source (webAudio, dataUri, or waveformData) to render waveform data.'));
      return;
    }

    if (options.audioContext) {
      // eslint-disable-next-line max-len
      this._peaks._logger('Peaks.init(): The audioContext option is deprecated, please pass a webAudio object instead');

      options.webAudio = {
        audioContext: options.audioContext
      };
    }

    if (options.dataUri) {
      return this._getRemoteWaveformData(options, callback);
    } else if (options.waveformData) {
      return this._buildWaveformFromLocalData(options, callback);
    } else if (options.webAudio) {
      if (options.webAudio.audioBuffer) {
        return this._buildWaveformDataFromAudioBuffer(options, callback);
      } else {
        return this._buildWaveformDataUsingWebAudio(options, callback);
      }
    } else {
      // eslint-disable-next-line max-len
      callback(new Error('Peaks.init(): You must pass an audioContext, or dataUri, or waveformData to render waveform data'));
    }
  };
  /* eslint-disable max-len */

  /**
   * Fetches waveform data, based on the given options.
   *
   * @private
   * @param {Object} options
   * @param {String|Object} options.dataUri
   * @param {String} options.dataUri.arraybuffer Waveform data URL
   *   (binary format)
   * @param {String} options.dataUri.json Waveform data URL (JSON format)
   * @param {String} options.defaultUriFormat Either 'arraybuffer' (for binary
   *   data) or 'json'
   * @param {WaveformBuilderInitCallback} callback
   *
   * @see Refer to the <a href="https://github.com/bbc/audiowaveform/blob/master/doc/DataFormat.md">data format documentation</a>
   *   for details of the binary and JSON waveform data formats.
   */

  /* eslint-enable max-len */


  WaveformBuilder.prototype._getRemoteWaveformData = function (options, callback) {
    var self = this;
    var dataUri = null;
    var requestType = null;
    var url;

    if (isObject(options.dataUri)) {
      dataUri = options.dataUri;
    } else if (isString(options.dataUri)) {
      // Backward compatibility
      dataUri = {};
      dataUri[options.dataUriDefaultFormat || 'json'] = options.dataUri;
    } else {
      callback(new TypeError('Peaks.init(): The dataUri option must be an object'));
      return;
    }

    ['ArrayBuffer', 'JSON'].some(function (connector) {
      if (window[connector]) {
        requestType = connector.toLowerCase();
        url = dataUri[requestType];
        return Boolean(url);
      }
    });

    if (!url) {
      // eslint-disable-next-line max-len
      callback(new Error('Peaks.init(): Unable to determine a compatible dataUri format for this browser'));
      return;
    }

    var xhr = self._createXHR(url, requestType, options.withCredentials, function (event) {
      if (this.readyState !== 4) {
        return;
      }

      if (this.status !== 200) {
        callback(new Error('Unable to fetch remote data. HTTP status ' + this.status));
        return;
      }

      var waveformData = WaveformData.create(event.target.response);

      if (waveformData.channels !== 1 && waveformData.channels !== 2) {
        callback(new Error('Peaks.init(): Only mono or stereo waveforms are currently supported'));
        return;
      } else if (waveformData.bits !== 8) {
        callback(new Error('Peaks.init(): 16-bit waveform data is not supported'));
        return;
      }

      callback(null, waveformData);
    }, function () {
      callback(new Error('XHR Failed'));
    });

    xhr.send();
  };
  /* eslint-disable max-len */

  /**
   * Creates a waveform from given data, based on the given options.
   *
   * @private
   * @param {Object} options
   * @param {Object} options.waveformData
   * @param {ArrayBuffer} options.waveformData.arraybuffer Waveform data (binary format)
   * @param {Object} options.waveformData.json Waveform data (JSON format)
   * @param {WaveformBuilderInitCallback} callback
   *
   * @see Refer to the <a href="https://github.com/bbc/audiowaveform/blob/master/doc/DataFormat.md">data format documentation</a>
   *   for details of the binary and JSON waveform data formats.
   */

  /* eslint-enable max-len */


  WaveformBuilder.prototype._buildWaveformFromLocalData = function (options, callback) {
    var waveformData = null;
    var data = null;

    if (isObject(options.waveformData)) {
      waveformData = options.waveformData;
    } else {
      callback(new Error('Peaks.init(): The waveformData option must be an object'));
      return;
    }

    if (isObject(waveformData.json)) {
      data = waveformData.json;
    } else if (isArrayBuffer(waveformData.arraybuffer)) {
      data = waveformData.arraybuffer;
    }

    if (!data) {
      // eslint-disable-next-line max-len
      callback(new Error('Peaks.init(): Unable to determine a compatible waveformData format'));
      return;
    }

    try {
      var createdWaveformData = WaveformData.create(data);

      if (createdWaveformData.channels !== 1 && createdWaveformData.channels !== 2) {
        callback(new Error('Peaks.init(): Only mono or stereo waveforms are currently supported'));
        return;
      } else if (createdWaveformData.bits !== 8) {
        callback(new Error('Peaks.init(): 16-bit waveform data is not supported'));
        return;
      }

      callback(null, createdWaveformData);
    } catch (err) {
      callback(err);
    }
  };
  /**
   * Creates waveform data using the Web Audio API.
   *
   * @private
   * @param {Object} options
   * @param {AudioContext} options.audioContext
   * @param {HTMLMediaElement} options.mediaElement
   * @param {WaveformBuilderInitCallback} callback
   */


  WaveformBuilder.prototype._buildWaveformDataUsingWebAudio = function (options, callback) {
    var self = this;
    var audioContext = window.AudioContext || window.webkitAudioContext;

    if (!(options.webAudio.audioContext instanceof audioContext)) {
      // eslint-disable-next-line max-len
      callback(new TypeError('Peaks.init(): The webAudio.audioContext option must be a valid AudioContext'));
      return;
    }

    var webAudioOptions = options.webAudio;

    if (webAudioOptions.scale !== options.zoomLevels[0]) {
      webAudioOptions.scale = options.zoomLevels[0];
    } // If the media element has already selected which source to play, its
    // currentSrc attribute will contain the source media URL. Otherwise,
    // we wait for a canplay event to tell us when the media is ready.


    var mediaSourceUrl = self._peaks.options.mediaElement.currentSrc;

    if (mediaSourceUrl) {
      self._requestAudioAndBuildWaveformData(mediaSourceUrl, webAudioOptions, options.withCredentials, callback);
    } else {
      self._peaks.once('player.canplay', function () {
        self._requestAudioAndBuildWaveformData(self._peaks.options.mediaElement.currentSrc, webAudioOptions, options.withCredentials, callback);
      });
    }
  };

  WaveformBuilder.prototype._buildWaveformDataFromAudioBuffer = function (options, callback) {
    var webAudioOptions = options.webAudio;

    if (webAudioOptions.scale !== options.zoomLevels[0]) {
      webAudioOptions.scale = options.zoomLevels[0];
    }

    var webAudioBuilderOptions = {
      audio_buffer: webAudioOptions.audioBuffer,
      split_channels: webAudioOptions.multiChannel,
      scale: webAudioOptions.scale
    };
    WaveformData.createFromAudio(webAudioBuilderOptions, callback);
  };
  /**
   * Fetches the audio content, based on the given options, and creates waveform
   * data using the Web Audio API.
   *
   * @private
   * @param {url} The media source URL
   * @param {WaveformBuilderWebAudioOptions} webAudio
   * @param {Boolean} withCredentials
   * @param {WaveformBuilderInitCallback} callback
   */


  WaveformBuilder.prototype._requestAudioAndBuildWaveformData = function (url, webAudio, withCredentials, callback) {
    var self = this;

    if (!url) {
      self._peaks._logger('Peaks.init(): The mediaElement src is invalid');

      return;
    }

    var xhr = self._createXHR(url, 'arraybuffer', withCredentials, function (event) {
      if (this.readyState !== 4) {
        return;
      }

      if (this.status !== 200) {
        callback(new Error('Unable to fetch remote data. HTTP status ' + this.status));
        return;
      }

      var webAudioBuilderOptions = {
        audio_context: webAudio.audioContext,
        array_buffer: event.target.response,
        split_channels: webAudio.multiChannel,
        scale: webAudio.scale
      };
      WaveformData.createFromAudio(webAudioBuilderOptions, callback);
    }, function () {
      callback(new Error('XHR Failed'));
    });

    xhr.send();
  };
  /**
   * @private
   * @param {String} url
   * @param {String} requestType
   * @param {Boolean} withCredentials
   * @param {Function} onLoad
   * @param {Function} onError
   *
   * @returns {XMLHttpRequest}
   */


  WaveformBuilder.prototype._createXHR = function (url, requestType, withCredentials, onLoad, onError) {
    var xhr = new XMLHttpRequest(); // open an XHR request to the data source file

    xhr.open('GET', url, true);

    if (isXhr2) {
      try {
        xhr.responseType = requestType;
      } catch (e) {// Some browsers like Safari 6 do handle XHR2 but not the json
        // response type, doing only a try/catch fails in IE9
      }
    }

    xhr.onload = onLoad;
    xhr.onerror = onError;

    if (isXhr2 && withCredentials) {
      xhr.withCredentials = true;
    }

    return xhr;
  };

  /**
   * @file
   *
   * Defines the {@link Peaks} class.
   *
   * @module main
   */
  /**
   * Initialises a new Peaks instance with default option settings.
   *
   * @class
   * @alias Peaks
   *
   * @param {Object} opts Configuration options
   */

  function Peaks() {
    EventEmitter.call(this); // Set default options

    this.options = {
      zoomLevels: [512, 1024, 2048, 4096],
      waveformCache: true,
      mediaElement: null,
      mediaUrl: null,
      dataUri: null,
      dataUriDefaultFormat: 'json',
      withCredentials: false,
      waveformData: null,
      webAudio: null,
      nudgeIncrement: 1.0,
      segmentStartMarkerColor: '#aaaaaa',
      segmentEndMarkerColor: '#aaaaaa',
      randomizeSegmentColor: true,
      segmentColor: '#ff851b',
      pointMarkerColor: '#39cccc',
      createSegmentMarker: createSegmentMarker,
      createSegmentLabel: createSegmentLabel,
      createPointMarker: createPointMarker,
      // eslint-disable-next-line no-console
      logger: console.error.bind(console)
    };
    return this;
  }

  Peaks.prototype = Object.create(EventEmitter.prototype);
  var defaultViewOptions = {
    playheadColor: '#111111',
    playheadTextColor: '#aaaaaa',
    axisGridlineColor: '#cccccc',
    showAxisLabels: true,
    axisLabelColor: '#aaaaaa',
    fontFamily: 'sans-serif',
    fontSize: 11,
    fontStyle: 'normal',
    timeLabelPrecision: 2
  };
  var defaultZoomviewOptions = {
    // showPlayheadTime:    true,
    playheadClickTolerance: 3,
    waveformColor: 'rgba(0, 225, 128, 1)',
    wheelMode: 'none' // zoomAdapter:         'static'

  };
  var defaultOverviewOptions = {
    // showPlayheadTime:    false,
    waveformColor: 'rgba(0, 0, 0, 0.2)',
    highlightColor: '#aaaaaa',
    highlightStrokeColor: 'transparent',
    highlightOpacity: 0.3,
    highlightOffset: 11,
    highlightCornerRadius: 2
  };

  function getOverviewOptions(opts) {
    var overviewOptions = {};

    if (opts.containers && opts.containers.overview) {
      overviewOptions.container = opts.containers.overview;
    }

    if (opts.overviewWaveformColor) {
      overviewOptions.waveformColor = opts.overviewWaveformColor;
    }

    if (opts.overviewHighlightOffset) {
      overviewOptions.highlightOffset = opts.overviewHighlightOffset;
    }

    if (opts.overviewHighlightColor) {
      overviewOptions.highlightColor = opts.overviewHighlightColor;
    }

    if (opts.overview && opts.overview.showPlayheadTime) {
      overviewOptions.showPlayheadTime = opts.overview.showPlayheadTime;
    }

    var optNames = ['container', 'waveformColor', 'playedWaveformColor', 'playheadColor', 'playheadTextColor', 'formatPlayheadTime', 'timeLabelPrecision', 'axisGridlineColor', 'showAxisLabels', 'axisLabelColor', 'formatAxisTime', 'fontFamily', 'fontSize', 'fontStyle', 'highlightColor', 'highlightStrokeColor', 'highlightOpacity', 'highlightCornerRadius', 'highlightOffset'];
    optNames.forEach(function (optName) {
      if (opts.overview && objectHasProperty(opts.overview, optName)) {
        overviewOptions[optName] = opts.overview[optName];
      } else if (objectHasProperty(opts, optName)) {
        overviewOptions[optName] = opts[optName];
      } else if (!objectHasProperty(overviewOptions, optName)) {
        if (objectHasProperty(defaultOverviewOptions, optName)) {
          overviewOptions[optName] = defaultOverviewOptions[optName];
        } else if (objectHasProperty(defaultViewOptions, optName)) {
          overviewOptions[optName] = defaultViewOptions[optName];
        }
      }
    });
    return overviewOptions;
  }

  function getZoomviewOptions(opts) {
    var zoomviewOptions = {};

    if (opts.containers && opts.containers.zoomview) {
      zoomviewOptions.container = opts.containers.zoomview;
    }

    if (opts.zoomWaveformColor) {
      zoomviewOptions.waveformColor = opts.zoomWaveformColor;
    }

    if (opts.showPlayheadTime) {
      zoomviewOptions.showPlayheadTime = opts.showPlayheadTime;
    } else if (opts.zoomview && opts.zoomview.showPlayheadTime) {
      zoomviewOptions.showPlayheadTime = opts.zoomview.showPlayheadTime;
    }

    var optNames = ['container', 'waveformColor', 'playedWaveformColor', 'playheadColor', 'playheadTextColor', 'formatPlayheadTime', 'playheadClickTolerance', 'timeLabelPrecision', 'axisGridlineColor', 'showAxisLabels', 'axisLabelColor', 'formatAxisTime', 'fontFamily', 'fontSize', 'fontStyle', 'wheelMode'];
    optNames.forEach(function (optName) {
      if (opts.zoomview && objectHasProperty(opts.zoomview, optName)) {
        zoomviewOptions[optName] = opts.zoomview[optName];
      } else if (objectHasProperty(opts, optName)) {
        zoomviewOptions[optName] = opts[optName];
      } else if (!objectHasProperty(zoomviewOptions, optName)) {
        if (objectHasProperty(defaultZoomviewOptions, optName)) {
          zoomviewOptions[optName] = defaultZoomviewOptions[optName];
        } else if (objectHasProperty(defaultViewOptions, optName)) {
          zoomviewOptions[optName] = defaultViewOptions[optName];
        }
      }
    });
    return zoomviewOptions;
  }

  function extendOptions(to, from) {
    for (var key in from) {
      if (objectHasProperty(from, key) && objectHasProperty(to, key)) {
        to[key] = from[key];
      }
    }

    return to;
  }
  /**
   * Creates and initialises a new Peaks instance with the given options.
   *
   * @param {Object} opts Configuration options
   *
   * @return {Peaks}
   */


  Peaks.init = function (opts, callback) {
    var instance = new Peaks();

    var err = instance._setOptions(opts);

    if (err) {
      callback(err);
      return;
    }

    var zoomviewContainer = instance.options.zoomview.container;
    var overviewContainer = instance.options.overview.container;

    if (!isHTMLElement(zoomviewContainer) && !isHTMLElement(overviewContainer)) {
      // eslint-disable-next-line max-len
      callback(new TypeError('Peaks.init(): The zoomview and/or overview container options must be valid HTML elements'));
      return;
    }

    if (zoomviewContainer && (zoomviewContainer.clientWidth <= 0 || zoomviewContainer.clientHeight <= 0)) {
      // eslint-disable-next-line max-len
      callback(new Error('Peaks.init(): Please ensure that the zoomview container is visible and has non-zero width and height'));
      return;
    }

    if (overviewContainer && (overviewContainer.clientWidth <= 0 || overviewContainer.clientHeight <= 0)) {
      // eslint-disable-next-line max-len
      callback(new Error('Peaks.init(): Please ensure that the overview container is visible and has non-zero width and height'));
      return;
    }

    if (opts.keyboard) {
      instance._keyboardHandler = new KeyboardHandler(instance);
    }

    var player = opts.player ? opts.player : new MediaElementPlayer(instance.options.mediaElement);
    instance.player = new Player(instance, player);
    instance.segments = new WaveformSegments(instance);
    instance.points = new WaveformPoints(instance);
    instance.zoom = new ZoomController(instance, instance.options.zoomLevels);
    instance.views = new ViewController(instance); // Setup the UI components

    var waveformBuilder = new WaveformBuilder(instance);
    player.init(instance).then(function () {
      waveformBuilder.init(instance.options, function (err, waveformData) {
        if (err) {
          if (callback) {
            callback(err);
          }

          return;
        }

        instance._waveformData = waveformData;

        if (overviewContainer) {
          instance.views.createOverview(overviewContainer);
        }

        if (zoomviewContainer) {
          instance.views.createZoomview(zoomviewContainer);
        }

        instance._addWindowResizeHandler();

        if (opts.segments) {
          instance.segments.add(opts.segments);
        }

        if (opts.points) {
          instance.points.add(opts.points);
        }

        if (opts.emitCueEvents) {
          instance._cueEmitter = new CueEmitter(instance);
        } // Allow applications to attach event handlers before emitting events,
        // when initialising with local waveform data.


        setTimeout(function () {
          instance.emit('peaks.ready');
        }, 0);
        callback(null, instance);
      });
    }).catch(function (err) {
      if (callback) {
        callback(err);
      }
    });
  };

  Peaks.prototype._setOptions = function (opts) {
    if (!isObject(opts)) {
      return new TypeError('Peaks.init(): The options parameter should be an object');
    }

    if (!opts.player) {
      if (!opts.mediaElement) {
        return new Error('Peaks.init(): Missing mediaElement option');
      }

      if (!(opts.mediaElement instanceof HTMLMediaElement)) {
        // eslint-disable-next-line max-len
        return new TypeError('Peaks.init(): The mediaElement option should be an HTMLMediaElement');
      }
    }

    if (opts.container) {
      // eslint-disable-next-line max-len
      return new Error('Peaks.init(): The container option has been removed, please use containers instead');
    }

    if (opts.logger && !isFunction(opts.logger)) {
      // eslint-disable-next-line max-len
      return new TypeError('Peaks.init(): The logger option should be a function');
    }

    if (opts.segments && !Array.isArray(opts.segments)) {
      // eslint-disable-next-line max-len
      return new TypeError('Peaks.init(): options.segments must be an array of segment objects');
    }

    if (opts.points && !Array.isArray(opts.points)) {
      // eslint-disable-next-line max-len
      return new TypeError('Peaks.init(): options.points must be an array of point objects');
    }

    extendOptions(this.options, opts);
    this.options.overview = getOverviewOptions(opts);
    this.options.zoomview = getZoomviewOptions(opts);

    if (!Array.isArray(this.options.zoomLevels)) {
      return new TypeError('Peaks.init(): The zoomLevels option should be an array');
    } else if (this.options.zoomLevels.length === 0) {
      return new Error('Peaks.init(): The zoomLevels array must not be empty');
    } else {
      if (!isInAscendingOrder(this.options.zoomLevels)) {
        return new Error('Peaks.init(): The zoomLevels array must be sorted in ascending order');
      }
    }

    this._logger = this.options.logger;
  };
  /**
   * Remote waveform data options for [Peaks.setSource]{@link Peaks#setSource}.
   *
   * @typedef {Object} RemoteWaveformDataOptions
   * @global
   * @property {String=} arraybuffer
   * @property {String=} json
   */

  /**
   * Local waveform data options for [Peaks.setSource]{@link Peaks#setSource}.
   *
   * @typedef {Object} LocalWaveformDataOptions
   * @global
   * @property {ArrayBuffer=} arraybuffer
   * @property {Object=} json
   */

  /**
   * Web Audio options for [Peaks.setSource]{@link Peaks#setSource}.
   *
   * @typedef {Object} WebAudioOptions
   * @global
   * @property {AudioContext=} audioContext
   * @property {AudioBuffer=} audioBuffer
   * @property {Number=} scale
   * @property {Boolean=} multiChannel
   */

  /**
   * Options for [Peaks.setSource]{@link Peaks#setSource}.
   *
   * @typedef {Object} PeaksSetSourceOptions
   * @global
   * @property {String=} mediaUrl
   * @property {RemoteWaveformDataOptions=} dataUri
   * @property {LocalWaveformDataOptions=} waveformData
   * @property {WebAudioOptions=} webAudio
   * @property {Boolean=} withCredentials
   * @property {Array<Number>=} zoomLevels
   */

  /**
   * Changes the audio or video media source associated with the {@link Peaks}
   * instance.
   *
   * @see SetSourceHandler
   *
   * @param {PeaksSetSourceOptions} options
   * @param {Function} callback
   */


  Peaks.prototype.setSource = function (options, callback) {
    var self = this;

    this.player._setSource(options).then(function () {
      if (!options.zoomLevels) {
        options.zoomLevels = self.options.zoomLevels;
      }

      var waveformBuilder = new WaveformBuilder(self);
      waveformBuilder.init(options, function (err, waveformData) {
        if (err) {
          callback(err);
          return;
        }

        self._waveformData = waveformData;
        ['overview', 'zoomview'].forEach(function (viewName) {
          var view = self.views.getView(viewName);

          if (view) {
            view.setWaveformData(waveformData);
          }
        });
        self.zoom.setZoomLevels(options.zoomLevels);
        callback();
      });
    }).catch(function (err) {
      callback(err);
    });
  };

  Peaks.prototype.getWaveformData = function () {
    return this._waveformData;
  };

  Peaks.prototype._addWindowResizeHandler = function () {
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
  };

  Peaks.prototype._onResize = function () {
    this.emit('window_resize');
  };

  Peaks.prototype._removeWindowResizeHandler = function () {
    window.removeEventListener('resize', this._onResize);
  };
  /**
   * Cleans up a Peaks instance after use.
   */


  Peaks.prototype.destroy = function () {
    this._removeWindowResizeHandler();

    if (this._keyboardHandler) {
      this._keyboardHandler.destroy();
    }

    if (this.views) {
      this.views.destroy();
    }

    if (this.player) {
      this.player.destroy();
    }

    if (this._cueEmitter) {
      this._cueEmitter.destroy();
    }
  };

  return Peaks;

}));
//# sourceMappingURL=peaks.js.map
