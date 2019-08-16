"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _flaggable = require("../context/flaggable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FlaggableCounter = function FlaggableCounter(_ref) {
  var namespace = _ref.namespace,
      label = _ref.label;

  var _useFlaggableState = (0, _flaggable.useFlaggableState)(),
      flagged = _useFlaggableState.flagged;

  var count = flagged && flagged[namespace] ? flagged[namespace].length : 0;
  return _react["default"].createElement("div", {
    className: "flaggable-counter--".concat(namespace)
  }, "(".concat(count, ") ").concat(label));
};

exports["default"] = FlaggableCounter;
FlaggableCounter.propTypes = {
  namespace: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string.isRequired
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _flaggable = require("../context/flaggable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isFlagged = function isFlagged(id, namespace) {
  var _useFlaggableState = (0, _flaggable.useFlaggableState)(),
      flagged = _useFlaggableState.flagged;

  var ids = flagged && flagged[namespace] || [];
  return ids.indexOf(id) !== -1;
};

var Flag = function Flag(_ref) {
  var id = _ref.id,
      namespace = _ref.namespace,
      className = _ref.className,
      flagger = _ref.flagger,
      children = _ref.children;

  var _useFlaggable = (0, _flaggable.useFlaggable)(),
      _useFlaggable2 = _slicedToArray(_useFlaggable, 2),
      flaggableState = _useFlaggable2[0],
      flaggableDispatch = _useFlaggable2[1];

  var classes = "".concat(namespace, " ").concat(isFlagged(id, namespace) ? 'flagged' : '');
  return _react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      flagger(id, namespace, flaggableState, flaggableDispatch);
    },
    className: "".concat(classes, " ").concat(className)
  }, children);
};

exports["default"] = Flag;
Flag.propTypes = {
  id: _propTypes["default"].string.isRequired,
  namespace: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  flagger: _propTypes["default"].func,
  children: _propTypes["default"].node
};
Flag.defaultProps = {
  className: '',
  flagger: _flaggable.defaultFlaggerCallback,
  children: null
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.defaultFlaggerCallback = exports.useFlaggable = exports.useFlaggableDispatch = exports.useFlaggableState = exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _localStorage = require("../handlers/localStorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  flagged: {}
};
var FlaggableDispatchContext = (0, _react.createContext)();
var FlaggableStateContext = (0, _react.createContext)(initialState);
/**
 * Handle state changes in the flaggable component.
 * @param state
 * @param action
 * @returns {*}
 */

var reducer = function reducer(state, action) {
  var type = action.type,
      namespace = action.namespace,
      value = action.value;
  var flagged = state.flagged;
  var namespaceFlags = flagged && flagged[namespace] || [];

  switch (type) {
    case 'REMOVE_ITEM':
      return _objectSpread({}, state, {
        flagged: _objectSpread({}, flagged, _defineProperty({}, namespace, namespaceFlags.filter(function (v) {
          return v !== value;
        })))
      });

    case 'ADD_ITEM':
      // Create a new Set to ensure uniqueness.
      var withAdded = _toConsumableArray(new Set([].concat(_toConsumableArray(namespaceFlags), [value])));

      return _objectSpread({}, state, {
        flagged: _objectSpread({}, flagged, _defineProperty({}, namespace, withAdded))
      });

    case 'SET_ITEMS':
      return _objectSpread({}, state, {
        checkedValues: _objectSpread({}, flagged, _defineProperty({}, namespace, value))
      });

    default:
      return state;
  }
};
/**
 * HOC for providing the wrapping elements.
 * @param children
 * @param defaultState
 * @param setItems
 * @param namespace
 * @returns {*}
 * @constructor
 */


exports.reducer = reducer;

var FlaggableProvider = function FlaggableProvider(_ref) {
  var children = _ref.children,
      defaultState = _ref.defaultState,
      setItems = _ref.setItems,
      namespace = _ref.namespace;

  var _useReducer = (0, _react.useReducer)(reducer, defaultState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var flagged = state.flagged;
  var namespaceItems = flagged && flagged[namespace] || [];
  (0, _react.useEffect)(function () {
    setItems(namespace, namespaceItems);
  });
  return _react["default"].createElement(FlaggableStateContext.Provider, {
    value: state
  }, _react["default"].createElement(FlaggableDispatchContext.Provider, {
    value: dispatch
  }, children));
};

exports["default"] = FlaggableProvider;
FlaggableProvider.propTypes = {
  children: _propTypes["default"].shape({}).isRequired,
  defaultState: _propTypes["default"].shape({
    flagged: _propTypes["default"].array
  }),
  namespace: _propTypes["default"].string.isRequired,
  setItems: _propTypes["default"].func
};
FlaggableProvider.defaultProps = {
  defaultState: initialState,
  setItems: _localStorage.setItems
};
/**
 * Provide only the current state.
 * @returns {*}
 */

var useFlaggableState = function useFlaggableState() {
  var context = (0, _react.useContext)(FlaggableStateContext);

  if (context === undefined) {
    throw new Error('useFlaggableState must be used within a FlaggableProvider');
  }

  return context;
};
/**
 * Provide access to the dispatch method for this context.
 * @returns {*}
 */


exports.useFlaggableState = useFlaggableState;

var useFlaggableDispatch = function useFlaggableDispatch() {
  var context = (0, _react.useContext)(FlaggableDispatchContext);

  if (context === undefined) {
    throw new Error('useFlaggableDispatch must be used within a FlaggableProvider');
  }

  return context;
};
/**
 * Use dispatch and the state.
 * @returns {*[]}
 */


exports.useFlaggableDispatch = useFlaggableDispatch;

var useFlaggable = function useFlaggable() {
  return [useFlaggableState(), useFlaggableDispatch()];
};
/**
 * A default handler for adding items to storage.
 * @param value
 * @param namespace.
 * @param state
 * @param dispatch
 * @returns {Function}
 */


exports.useFlaggable = useFlaggable;

var defaultFlaggerCallback = function defaultFlaggerCallback(value, namespace, state, dispatch) {
  var currentFlags = state.flagged;
  var flagged = currentFlags && currentFlags[namespace] || [];
  var type = flagged.indexOf(value) !== -1 ? 'REMOVE_ITEM' : 'ADD_ITEM';
  dispatch({
    type: type,
    namespace: namespace,
    value: value
  });
};

exports.defaultFlaggerCallback = defaultFlaggerCallback;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItems = exports.setItems = void 0;

var getLocalStorageNameSpace = function getLocalStorageNameSpace(namespace) {
  return "react-flaggables-".concat(namespace);
};
/**
 * Retrieve items from local storage.
 * @param namespace
 * @returns {*}
 */


var getItems = function getItems(namespace) {
  var ns = getLocalStorageNameSpace(namespace);
  var data = localStorage.getItem(ns);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return false;
  }
};
/**
 * Function that sets items in local storage.
 * @param namespace
 * @param ids
 * @returns {*}
 */


exports.getItems = getItems;

var setItems = function setItems(namespace, ids) {
  var ns = getLocalStorageNameSpace(namespace);

  try {
    return localStorage.setItem(ns, JSON.stringify(ids));
  } catch (err) {
    console.error(err);
    return false;
  }
};

exports.setItems = setItems;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FlaggableProvider", {
  enumerable: true,
  get: function get() {
    return _flaggable["default"];
  }
});
Object.defineProperty(exports, "Flag", {
  enumerable: true,
  get: function get() {
    return _flag["default"];
  }
});
Object.defineProperty(exports, "FlagCounter", {
  enumerable: true,
  get: function get() {
    return _counter["default"];
  }
});
Object.defineProperty(exports, "getItems", {
  enumerable: true,
  get: function get() {
    return _localStorage.getItems;
  }
});

var _flaggable = _interopRequireDefault(require("./context/flaggable"));

var _flag = _interopRequireDefault(require("./components/flag"));

var _counter = _interopRequireDefault(require("./components/counter"));

var _localStorage = require("./handlers/localStorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
