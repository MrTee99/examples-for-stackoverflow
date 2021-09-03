import * as React$1 from 'react';
import React__default, { Fragment, isValidElement, cloneElement, createElement, forwardRef, useLayoutEffect, useEffect, useState, createContext, useContext, useCallback, useRef, useMemo, useReducer } from 'react';
import { createPortal } from 'react-dom';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
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

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function match(value, lookup) {
  if (value in lookup) {
    var returnValue = lookup[value];

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return typeof returnValue === 'function' ? returnValue.apply(void 0, args) : returnValue;
  }

  var error = new Error("Tried to handle \"" + value + "\" but there is no handler defined. Only defined handlers are: " + Object.keys(lookup).map(function (key) {
    return "\"" + key + "\"";
  }).join(', ') + ".");
  if (Error.captureStackTrace) Error.captureStackTrace(error, match);
  throw error;
}

var Features$1;

(function (Features) {
  /** No features at all */
  Features[Features["None"] = 0] = "None";
  /**
   * When used, this will allow us to use one of the render strategies.
   *
   * **The render strategies are:**
   *    - **Unmount**   _(Will unmount the component.)_
   *    - **Hidden**    _(Will hide the component using the [hidden] attribute.)_
   */

  Features[Features["RenderStrategy"] = 1] = "RenderStrategy";
  /**
   * When used, this will allow the user of our component to be in control. This can be used when
   * you want to transition based on some state.
   */

  Features[Features["Static"] = 2] = "Static";
})(Features$1 || (Features$1 = {}));

var RenderStrategy;

(function (RenderStrategy) {
  RenderStrategy[RenderStrategy["Unmount"] = 0] = "Unmount";
  RenderStrategy[RenderStrategy["Hidden"] = 1] = "Hidden";
})(RenderStrategy || (RenderStrategy = {}));

function render(_ref) {
  var props = _ref.props,
      slot = _ref.slot,
      defaultTag = _ref.defaultTag,
      features = _ref.features,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? true : _ref$visible,
      name = _ref.name; // Visible always render

  if (visible) return _render(props, slot, defaultTag, name);
  var featureFlags = features != null ? features : Features$1.None;

  if (featureFlags & Features$1.Static) {
    var _props$static = props["static"],
        isStatic = _props$static === void 0 ? false : _props$static,
        rest = _objectWithoutPropertiesLoose(props, ["static"]); // When the `static` prop is passed as `true`, then the user is in control, thus we don't care about anything else


    if (isStatic) return _render(rest, slot, defaultTag, name);
  }

  if (featureFlags & Features$1.RenderStrategy) {
    var _match;

    var _props$unmount = props.unmount,
        unmount = _props$unmount === void 0 ? true : _props$unmount,
        _rest = _objectWithoutPropertiesLoose(props, ["unmount"]);

    var strategy = unmount ? RenderStrategy.Unmount : RenderStrategy.Hidden;
    return match(strategy, (_match = {}, _match[RenderStrategy.Unmount] = function () {
      return null;
    }, _match[RenderStrategy.Hidden] = function () {
      return _render(_extends({}, _rest, {
        hidden: true,
        style: {
          display: 'none'
        }
      }), slot, defaultTag, name);
    }, _match));
  } // No features enabled, just render


  return _render(props, slot, defaultTag, name);
}

function _render(props, slot, tag, name) {
  var _ref2;

  if (slot === void 0) {
    slot = {};
  }

  var _omit = omit(props, ['unmount', 'static']),
      _omit$as = _omit.as,
      Component = _omit$as === void 0 ? tag : _omit$as,
      children = _omit.children,
      _omit$refName = _omit.refName,
      refName = _omit$refName === void 0 ? 'ref' : _omit$refName,
      passThroughProps = _objectWithoutPropertiesLoose(_omit, ["as", "children", "refName"]); // This allows us to use `<HeadlessUIComponent as={MyComponent} refName="innerRef" />`


  var refRelatedProps = props.ref !== undefined ? (_ref2 = {}, _ref2[refName] = props.ref, _ref2) : {};
  var resolvedChildren = typeof children === 'function' ? children(slot) : children; // Allow for className to be a function with the slot as the contents

  if (passThroughProps.className && typeof passThroughProps.className === 'function') {
    passThroughProps.className = passThroughProps.className(slot);
  }

  if (Component === Fragment) {
    if (Object.keys(passThroughProps).length > 0) {
      if (! /*#__PURE__*/isValidElement(resolvedChildren) || Array.isArray(resolvedChildren) && resolvedChildren.length > 1) {
        throw new Error(['Passing props on "Fragment"!', '', "The current component <" + name + " /> is rendering a \"Fragment\".", "However we need to passthrough the following props:", Object.keys(passThroughProps).map(function (line) {
          return "  - " + line;
        }).join('\n'), '', 'You can apply a few solutions:', ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', 'Render a single element as the child so that we can forward the props onto that element.'].map(function (line) {
          return "  - " + line;
        }).join('\n')].join('\n'));
      }

      return /*#__PURE__*/cloneElement(resolvedChildren, Object.assign({}, // Filter out undefined values so that they don't override the existing values
      mergeEventFunctions(compact(omit(passThroughProps, ['ref'])), resolvedChildren.props, ['onClick']), refRelatedProps));
    }
  }

  return /*#__PURE__*/createElement(Component, Object.assign({}, omit(passThroughProps, ['ref']), Component !== Fragment && refRelatedProps), resolvedChildren);
}
/**
 * We can use this function for the following useCase:
 *
 * <Menu.Item> <button onClick={console.log} /> </Menu.Item>
 *
 * Our `Menu.Item` will have an internal `onClick`, if you passthrough an `onClick` to the actual
 * `Menu.Item` component we will call it correctly. However, when we have an `onClick` on the actual
 * first child, that one should _also_ be called (but before this implementation, it was just
 * overriding the `onClick`). But it is only when we *render* that we have access to the existing
 * props of this component.
 *
 * It's a bit hacky, and not that clean, but it is something internal and we have tests to rely on
 * so that we can refactor this later (if needed).
 */


function mergeEventFunctions(passThroughProps, existingProps, functionsToMerge) {
  var clone = Object.assign({}, passThroughProps);

  var _loop = function _loop() {
    var func = _step.value;

    if (passThroughProps[func] !== undefined && existingProps[func] !== undefined) {
      var _Object$assign;

      Object.assign(clone, (_Object$assign = {}, _Object$assign[func] = function (event) {
        // Props we control
        if (!event.defaultPrevented) passThroughProps[func](event); // Existing props on the component

        if (!event.defaultPrevented) existingProps[func](event);
      }, _Object$assign));
    }
  };

  for (var _iterator = _createForOfIteratorHelperLoose(functionsToMerge), _step; !(_step = _iterator()).done;) {
    _loop();
  }

  return clone;
}
/**
 * This is a hack, but basically we want to keep the full 'API' of the component, but we do want to
 * wrap it in a forwardRef so that we _can_ passthrough the ref
 */


function forwardRefWithAs(component) {
  var _component$displayNam;

  return Object.assign( /*#__PURE__*/forwardRef(component), {
    displayName: (_component$displayNam = component.displayName) != null ? _component$displayNam : component.name
  });
}

function compact(object) {
  var clone = Object.assign({}, object);

  for (var key in clone) {
    if (clone[key] === undefined) delete clone[key];
  }

  return clone;
}

function omit(object, keysToOmit) {
  if (keysToOmit === void 0) {
    keysToOmit = [];
  }

  var clone = Object.assign({}, object);

  for (var _iterator2 = _createForOfIteratorHelperLoose(keysToOmit), _step2; !(_step2 = _iterator2()).done;) {
    var key = _step2.value;
    if (key in clone) delete clone[key];
  }

  return clone;
}

var useIsoMorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

var state = {
  serverHandoffComplete: false
};

function useServerHandoffComplete() {
  var _useState = useState(state.serverHandoffComplete),
      serverHandoffComplete = _useState[0],
      setServerHandoffComplete = _useState[1];

  useEffect(function () {
    if (serverHandoffComplete === true) return;
    setServerHandoffComplete(true);
  }, [serverHandoffComplete]);
  useEffect(function () {
    if (state.serverHandoffComplete === false) state.serverHandoffComplete = true;
  }, []);
  return serverHandoffComplete;
}

var ForcePortalRootContext = /*#__PURE__*/createContext(false);

function usePortalRoot() {
  return useContext(ForcePortalRootContext);
}

function ForcePortalRoot(props) {
  return /*#__PURE__*/React__default.createElement(ForcePortalRootContext.Provider, {
    value: props.force
  }, props.children);
}

function usePortalTarget() {
  var forceInRoot = usePortalRoot();
  var groupTarget = useContext(PortalGroupContext);

  var _useState = useState(function () {
    // Group context is used, but still null
    if (!forceInRoot && groupTarget !== null) return null; // No group context is used, let's create a default portal root

    if (typeof window === 'undefined') return null;
    var existingRoot = document.getElementById('headlessui-portal-root');
    if (existingRoot) return existingRoot;
    var root = document.createElement('div');
    root.setAttribute('id', 'headlessui-portal-root');
    return document.body.appendChild(root);
  }),
      target = _useState[0],
      setTarget = _useState[1];

  useEffect(function () {
    if (forceInRoot) return;
    if (groupTarget === null) return;
    setTarget(groupTarget.current);
  }, [groupTarget, setTarget, forceInRoot]);
  return target;
} // ---


var DEFAULT_PORTAL_TAG = Fragment;

function Portal(props) {
  var passthroughProps = props;
  var target = usePortalTarget();

  var _useState2 = useState(function () {
    return typeof window === 'undefined' ? null : document.createElement('div');
  }),
      element = _useState2[0];

  var ready = useServerHandoffComplete();
  useIsoMorphicEffect(function () {
    if (!target) return;
    if (!element) return;
    target.appendChild(element);
    return function () {
      if (!target) return;
      if (!element) return;
      target.removeChild(element);

      if (target.childNodes.length <= 0) {
        var _target$parentElement;

        (_target$parentElement = target.parentElement) == null ? void 0 : _target$parentElement.removeChild(target);
      }
    };
  }, [target, element]);
  if (!ready) return null;
  return !target || !element ? null : /*#__PURE__*/createPortal(render({
    props: passthroughProps,
    defaultTag: DEFAULT_PORTAL_TAG,
    name: 'Portal'
  }), element);
} // ---


var DEFAULT_GROUP_TAG$1 = Fragment;
var PortalGroupContext = /*#__PURE__*/createContext(null);

function Group$1(props) {
  var target = props.target,
      passthroughProps = _objectWithoutPropertiesLoose(props, ["target"]);

  return /*#__PURE__*/React__default.createElement(PortalGroupContext.Provider, {
    value: target
  }, render({
    props: passthroughProps,
    defaultTag: DEFAULT_GROUP_TAG$1,
    name: 'Popover.Group'
  }));
} // ---


Portal.Group = Group$1;

function useSyncRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  var cache = useRef(refs);
  useEffect(function () {
    cache.current = refs;
  }, [refs]);
  return useCallback(function (value) {
    for (var _iterator = _createForOfIteratorHelperLoose(cache.current), _step; !(_step = _iterator()).done;) {
      var ref = _step.value;
      if (ref == null) continue;
      if (typeof ref === 'function') ref(value);else ref.current = value;
    }
  }, [cache]);
}

// TODO: This must already exist somewhere, right? 🤔
// Ref: https://www.w3.org/TR/uievents-key/#named-key-attribute-values
var Keys;

(function (Keys) {
  Keys["Space"] = " ";
  Keys["Enter"] = "Enter";
  Keys["Escape"] = "Escape";
  Keys["Backspace"] = "Backspace";
  Keys["ArrowLeft"] = "ArrowLeft";
  Keys["ArrowUp"] = "ArrowUp";
  Keys["ArrowRight"] = "ArrowRight";
  Keys["ArrowDown"] = "ArrowDown";
  Keys["Home"] = "Home";
  Keys["End"] = "End";
  Keys["PageUp"] = "PageUp";
  Keys["PageDown"] = "PageDown";
  Keys["Tab"] = "Tab";
})(Keys || (Keys = {}));

// See: https://github.com/facebook/react/issues/7711
// See: https://github.com/facebook/react/pull/20612
// See: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#concept-fe-disabled (2.)
function isDisabledReactIssue7711(element) {
  var _ref, _parent;

  var parent = element.parentElement;
  var legend = null;

  while (parent && !(parent instanceof HTMLFieldSetElement)) {
    if (parent instanceof HTMLLegendElement) legend = parent;
    parent = parent.parentElement;
  }

  var isParentDisabled = (_ref = ((_parent = parent) == null ? void 0 : _parent.getAttribute('disabled')) === '') != null ? _ref : false;
  if (isParentDisabled && isFirstLegend(legend)) return false;
  return isParentDisabled;
}

function isFirstLegend(element) {
  if (!element) return false;
  var previous = element.previousElementSibling;

  while (previous !== null) {
    if (previous instanceof HTMLLegendElement) return false;
    previous = previous.previousElementSibling;
  }

  return true;
}

// uses.
//
// Credits: https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx

var id = 0;

function generateId() {
  return ++id;
}

function useId() {
  var ready = useServerHandoffComplete();

  var _useState = useState(ready ? generateId : null),
      id = _useState[0],
      setId = _useState[1];

  useIsoMorphicEffect(function () {
    if (id === null) setId(generateId());
  }, [id]);
  return id != null ? '' + id : undefined;
}

function useWindowEvent(type, listener, options) {
  var listenerRef = useRef(listener);
  listenerRef.current = listener;
  useEffect(function () {
    function handler(event) {
      listenerRef.current.call(window, event);
    }

    window.addEventListener(type, handler, options);
    return function () {
      return window.removeEventListener(type, handler, options);
    };
  }, [type, options]);
}

var focusableSelector = /*#__PURE__*/['[contentEditable=true]', '[tabindex]', 'a[href]', 'area[href]', 'button:not([disabled])', 'iframe', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])'].map(function (selector) {
  return selector + ":not([tabindex='-1'])";
}).join(',');
var Focus;

(function (Focus) {
  /** Focus the first non-disabled element */
  Focus[Focus["First"] = 1] = "First";
  /** Focus the previous non-disabled element */

  Focus[Focus["Previous"] = 2] = "Previous";
  /** Focus the next non-disabled element */

  Focus[Focus["Next"] = 4] = "Next";
  /** Focus the last non-disabled element */

  Focus[Focus["Last"] = 8] = "Last";
  /** Wrap tab around */

  Focus[Focus["WrapAround"] = 16] = "WrapAround";
  /** Prevent scrolling the focusable elements into view */

  Focus[Focus["NoScroll"] = 32] = "NoScroll";
})(Focus || (Focus = {}));

var FocusResult;

(function (FocusResult) {
  /** Something went wrong while trying to focus. */
  FocusResult[FocusResult["Error"] = 0] = "Error";
  /** When `Focus.WrapAround` is enabled, going from position `N` to `N+1` where `N` is the last index in the array, then we overflow. */

  FocusResult[FocusResult["Overflow"] = 1] = "Overflow";
  /** Focus was successful. */

  FocusResult[FocusResult["Success"] = 2] = "Success";
  /** When `Focus.WrapAround` is enabled, going from position `N` to `N-1` where `N` is the first index in the array, then we underflow. */

  FocusResult[FocusResult["Underflow"] = 3] = "Underflow";
})(FocusResult || (FocusResult = {}));

var Direction;

(function (Direction) {
  Direction[Direction["Previous"] = -1] = "Previous";
  Direction[Direction["Next"] = 1] = "Next";
})(Direction || (Direction = {}));

function getFocusableElements(container) {
  if (container === void 0) {
    container = document.body;
  }

  if (container == null) return [];
  return Array.from(container.querySelectorAll(focusableSelector));
}

var FocusableMode;

(function (FocusableMode) {
  /** The element itself must be focusable. */
  FocusableMode[FocusableMode["Strict"] = 0] = "Strict";
  /** The element should be inside of a focusable element. */

  FocusableMode[FocusableMode["Loose"] = 1] = "Loose";
})(FocusableMode || (FocusableMode = {}));

function isFocusableElement(element, mode) {
  var _match;

  if (mode === void 0) {
    mode = FocusableMode.Strict;
  }

  if (element === document.body) return false;
  return match(mode, (_match = {}, _match[FocusableMode.Strict] = function () {
    return element.matches(focusableSelector);
  }, _match[FocusableMode.Loose] = function () {
    var next = element;

    while (next !== null) {
      if (next.matches(focusableSelector)) return true;
      next = next.parentElement;
    }

    return false;
  }, _match));
}

function focusElement(element) {
  element == null ? void 0 : element.focus({
    preventScroll: true
  });
}

function focusIn(container, focus) {
  var elements = Array.isArray(container) ? container : getFocusableElements(container);
  var active = document.activeElement;

  var direction = function () {
    if (focus & (Focus.First | Focus.Next)) return Direction.Next;
    if (focus & (Focus.Previous | Focus.Last)) return Direction.Previous;
    throw new Error('Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last');
  }();

  var startIndex = function () {
    if (focus & Focus.First) return 0;
    if (focus & Focus.Previous) return Math.max(0, elements.indexOf(active)) - 1;
    if (focus & Focus.Next) return Math.max(0, elements.indexOf(active)) + 1;
    if (focus & Focus.Last) return elements.length - 1;
    throw new Error('Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last');
  }();

  var focusOptions = focus & Focus.NoScroll ? {
    preventScroll: true
  } : {};
  var offset = 0;
  var total = elements.length;
  var next = undefined;

  do {
    var _next; // Guard against infinite loops


    if (offset >= total || offset + total <= 0) return FocusResult.Error;
    var nextIdx = startIndex + offset;

    if (focus & Focus.WrapAround) {
      nextIdx = (nextIdx + total) % total;
    } else {
      if (nextIdx < 0) return FocusResult.Underflow;
      if (nextIdx >= total) return FocusResult.Overflow;
    }

    next = elements[nextIdx]; // Try the focus the next element, might not work if it is "hidden" to the user.

    (_next = next) == null ? void 0 : _next.focus(focusOptions); // Try the next one in line

    offset += direction;
  } while (next !== document.activeElement); // This is a little weird, but let me try and explain: There are a few scenario's
  // in chrome for example where a focused `<a>` tag does not get the default focus
  // styles and sometimes they do. This highly depends on whether you started by
  // clicking or by using your keyboard. When you programmatically add focus `anchor.focus()`
  // then the active element (document.activeElement) is this anchor, which is expected.
  // However in that case the default focus styles are not applied *unless* you
  // also add this tabindex.


  if (!next.hasAttribute('tabindex')) next.setAttribute('tabindex', '0');
  return FocusResult.Success;
}

function useIsMounted() {
  var mounted = useRef(false);
  useEffect(function () {
    mounted.current = true;
    return function () {
      mounted.current = false;
    };
  }, []);
  return mounted;
}

var Features;

(function (Features) {
  /** No features enabled for the `useFocusTrap` hook. */
  Features[Features["None"] = 1] = "None";
  /** Ensure that we move focus initially into the container. */

  Features[Features["InitialFocus"] = 2] = "InitialFocus";
  /** Ensure that pressing `Tab` and `Shift+Tab` is trapped within the container. */

  Features[Features["TabLock"] = 4] = "TabLock";
  /** Ensure that programmatically moving focus outside of the container is disallowed. */

  Features[Features["FocusLock"] = 8] = "FocusLock";
  /** Ensure that we restore the focus when unmounting the component that uses this `useFocusTrap` hook. */

  Features[Features["RestoreFocus"] = 16] = "RestoreFocus";
  /** Enable all features. */

  Features[Features["All"] = 30] = "All";
})(Features || (Features = {}));

function useFocusTrap(container, features, _temp) {
  if (features === void 0) {
    features = Features.All;
  }

  var _ref = _temp === void 0 ? {} : _temp,
      initialFocus = _ref.initialFocus,
      containers = _ref.containers;

  var restoreElement = useRef(typeof window !== 'undefined' ? document.activeElement : null);
  var previousActiveElement = useRef(null);
  var mounted = useIsMounted();
  var featuresRestoreFocus = Boolean(features & Features.RestoreFocus);
  var featuresInitialFocus = Boolean(features & Features.InitialFocus); // Capture the currently focused element, before we enable the focus trap.

  useEffect(function () {
    if (!featuresRestoreFocus) return;
    restoreElement.current = document.activeElement;
  }, [featuresRestoreFocus]); // Restore the focus when we unmount the component.

  useEffect(function () {
    if (!featuresRestoreFocus) return;
    return function () {
      focusElement(restoreElement.current);
      restoreElement.current = null;
    };
  }, [featuresRestoreFocus]); // Handle initial focus

  useEffect(function () {
    if (!featuresInitialFocus) return;
    if (!container.current) return;
    var activeElement = document.activeElement;

    if (initialFocus == null ? void 0 : initialFocus.current) {
      if ((initialFocus == null ? void 0 : initialFocus.current) === activeElement) {
        previousActiveElement.current = activeElement;
        return; // Initial focus ref is already the active element
      }
    } else if (container.current.contains(activeElement)) {
      previousActiveElement.current = activeElement;
      return; // Already focused within Dialog
    } // Try to focus the initialFocus ref


    if (initialFocus == null ? void 0 : initialFocus.current) {
      focusElement(initialFocus.current);
    } else {
      if (focusIn(container.current, Focus.First) === FocusResult.Error) {
        console.warn('There are no focusable elements inside the <FocusTrap />');
      }
    }

    previousActiveElement.current = document.activeElement;
  }, [container, initialFocus, featuresInitialFocus]); // Handle `Tab` & `Shift+Tab` keyboard events

  useWindowEvent('keydown', function (event) {
    if (!(features & Features.TabLock)) return;
    if (!container.current) return;
    if (event.key !== Keys.Tab) return;
    event.preventDefault();

    if (focusIn(container.current, (event.shiftKey ? Focus.Previous : Focus.Next) | Focus.WrapAround) === FocusResult.Success) {
      previousActiveElement.current = document.activeElement;
    }
  }); // Prevent programmatically escaping the container

  useWindowEvent('focus', function (event) {
    if (!(features & Features.FocusLock)) return;
    var allContainers = new Set(containers == null ? void 0 : containers.current);
    allContainers.add(container);
    if (!allContainers.size) return;
    var previous = previousActiveElement.current;
    if (!previous) return;
    if (!mounted.current) return;
    var toElement = event.target;

    if (toElement && toElement instanceof HTMLElement) {
      if (!contains(allContainers, toElement)) {
        event.preventDefault();
        event.stopPropagation();
        focusElement(previous);
      } else {
        previousActiveElement.current = toElement;
        focusElement(toElement);
      }
    } else {
      focusElement(previousActiveElement.current);
    }
  }, true);
}

function contains(containers, element) {
  for (var _iterator = _createForOfIteratorHelperLoose(containers), _step; !(_step = _iterator()).done;) {
    var _container$current;

    var container = _step.value;
    if ((_container$current = container.current) == null ? void 0 : _container$current.contains(element)) return true;
  }

  return false;
}

var interactables = /*#__PURE__*/new Set();
var originals = /*#__PURE__*/new Map();

function inert(element) {
  element.setAttribute('aria-hidden', 'true'); // @ts-expect-error `inert` does not exist on HTMLElement (yet!)

  element.inert = true;
}

function restore(element) {
  var original = originals.get(element);
  if (!original) return;
  if (original['aria-hidden'] === null) element.removeAttribute('aria-hidden');else element.setAttribute('aria-hidden', original['aria-hidden']); // @ts-expect-error `inert` does not exist on HTMLElement (yet!)

  element.inert = original.inert;
}

function useInertOthers(container, enabled) {
  if (enabled === void 0) {
    enabled = true;
  }

  useIsoMorphicEffect(function () {
    if (!enabled) return;
    if (!container.current) return;
    var element = container.current; // Mark myself as an interactable element

    interactables.add(element); // Restore elements that now contain an interactable child

    for (var _iterator = _createForOfIteratorHelperLoose(originals.keys()), _step; !(_step = _iterator()).done;) {
      var original = _step.value;

      if (original.contains(element)) {
        restore(original);
        originals["delete"](original);
      }
    } // Collect direct children of the body


    document.querySelectorAll('body > *').forEach(function (child) {
      if (!(child instanceof HTMLElement)) return; // Skip non-HTMLElements
      // Skip the interactables, and the parents of the interactables

      for (var _iterator2 = _createForOfIteratorHelperLoose(interactables), _step2; !(_step2 = _iterator2()).done;) {
        var interactable = _step2.value;
        if (child.contains(interactable)) return;
      } // Keep track of the elements


      if (interactables.size === 1) {
        originals.set(child, {
          'aria-hidden': child.getAttribute('aria-hidden'),
          // @ts-expect-error `inert` does not exist on HTMLElement (yet!)
          inert: child.inert
        }); // Mutate the element

        inert(child);
      }
    });
    return function () {
      // Inert is disabled on the current element
      interactables["delete"](element); // We still have interactable elements, therefore this one and its parent
      // will become inert as well.

      if (interactables.size > 0) {
        // Collect direct children of the body
        document.querySelectorAll('body > *').forEach(function (child) {
          if (!(child instanceof HTMLElement)) return; // Skip non-HTMLElements
          // Skip already inert parents

          if (originals.has(child)) return; // Skip the interactables, and the parents of the interactables

          for (var _iterator3 = _createForOfIteratorHelperLoose(interactables), _step3; !(_step3 = _iterator3()).done;) {
            var interactable = _step3.value;
            if (child.contains(interactable)) return;
          }

          originals.set(child, {
            'aria-hidden': child.getAttribute('aria-hidden'),
            // @ts-expect-error `inert` does not exist on HTMLElement (yet!)
            inert: child.inert
          }); // Mutate the element

          inert(child);
        });
      } else {
        for (var _iterator4 = _createForOfIteratorHelperLoose(originals.keys()), _step4; !(_step4 = _iterator4()).done;) {
          var _element = _step4.value; // Restore

          restore(_element); // Cleanup

          originals["delete"](_element);
        }
      }
    };
  }, [enabled]);
}

var DescriptionContext = /*#__PURE__*/createContext(null);

function useDescriptionContext() {
  var context = useContext(DescriptionContext);

  if (context === null) {
    var err = new Error('You used a <Description /> component, but it is not inside a relevant parent.');
    if (Error.captureStackTrace) Error.captureStackTrace(err, useDescriptionContext);
    throw err;
  }

  return context;
}

function useDescriptions() {
  var _useState = useState([]),
      descriptionIds = _useState[0],
      setDescriptionIds = _useState[1];

  return [// The actual id's as string or undefined
  descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined, // The provider component
  useMemo(function () {
    return function DescriptionProvider(props) {
      var register = useCallback(function (value) {
        setDescriptionIds(function (existing) {
          return [].concat(existing, [value]);
        });
        return function () {
          return setDescriptionIds(function (existing) {
            var clone = existing.slice();
            var idx = clone.indexOf(value);
            if (idx !== -1) clone.splice(idx, 1);
            return clone;
          });
        };
      }, []);
      var contextBag = useMemo(function () {
        return {
          register: register,
          slot: props.slot,
          name: props.name,
          props: props.props
        };
      }, [register, props.slot, props.name, props.props]);
      return /*#__PURE__*/React__default.createElement(DescriptionContext.Provider, {
        value: contextBag
      }, props.children);
    };
  }, [setDescriptionIds])];
} // ---


var DEFAULT_DESCRIPTION_TAG = 'p';

function Description(props) {
  var context = useDescriptionContext();
  var id = "headlessui-description-" + useId();
  useIsoMorphicEffect(function () {
    return context.register(id);
  }, [id, context.register]);
  var passThroughProps = props;

  var propsWeControl = _extends({}, context.props, {
    id: id
  });

  return render({
    props: _extends({}, passThroughProps, propsWeControl),
    slot: context.slot || {},
    defaultTag: DEFAULT_DESCRIPTION_TAG,
    name: context.name || 'Description'
  });
}

var Context = /*#__PURE__*/createContext(null);
Context.displayName = 'OpenClosedContext';
var State;

(function (State) {
  State[State["Open"] = 0] = "Open";
  State[State["Closed"] = 1] = "Closed";
})(State || (State = {}));

function useOpenClosed() {
  return useContext(Context);
}

function OpenClosedProvider(_ref) {
  var value = _ref.value,
      children = _ref.children;
  return /*#__PURE__*/React__default.createElement(Context.Provider, {
    value: value
  }, children);
}

var StackContext = /*#__PURE__*/createContext(function () {});
StackContext.displayName = 'StackContext';
var StackMessage;

(function (StackMessage) {
  StackMessage[StackMessage["Add"] = 0] = "Add";
  StackMessage[StackMessage["Remove"] = 1] = "Remove";
})(StackMessage || (StackMessage = {}));

function useStackContext() {
  return useContext(StackContext);
}

function StackProvider(_ref) {
  var children = _ref.children,
      onUpdate = _ref.onUpdate,
      type = _ref.type,
      element = _ref.element;
  var parentUpdate = useStackContext();
  var notify = useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    } // Notify our layer


    onUpdate == null ? void 0 : onUpdate.apply(void 0, args); // Notify the parent

    parentUpdate.apply(void 0, args);
  }, [parentUpdate, onUpdate]);
  useIsoMorphicEffect(function () {
    notify(StackMessage.Add, type, element);
    return function () {
      return notify(StackMessage.Remove, type, element);
    };
  }, [notify, type, element]);
  return /*#__PURE__*/React__default.createElement(StackContext.Provider, {
    value: notify
  }, children);
}

var _reducers$2;

var DialogStates;

(function (DialogStates) {
  DialogStates[DialogStates["Open"] = 0] = "Open";
  DialogStates[DialogStates["Closed"] = 1] = "Closed";
})(DialogStates || (DialogStates = {}));

var ActionTypes$2;

(function (ActionTypes) {
  ActionTypes[ActionTypes["SetTitleId"] = 0] = "SetTitleId";
})(ActionTypes$2 || (ActionTypes$2 = {}));

var reducers$2 = (_reducers$2 = {}, _reducers$2[ActionTypes$2.SetTitleId] = function (state, action) {
  if (state.titleId === action.id) return state;
  return _extends({}, state, {
    titleId: action.id
  });
}, _reducers$2);
var DialogContext = /*#__PURE__*/createContext(null);
DialogContext.displayName = 'DialogContext';

function useDialogContext(component) {
  var context = useContext(DialogContext);

  if (context === null) {
    var err = new Error("<" + component + " /> is missing a parent <" + Dialog.displayName + " /> component.");
    if (Error.captureStackTrace) Error.captureStackTrace(err, useDialogContext);
    throw err;
  }

  return context;
}

function stateReducer$2(state, action) {
  return match(action.type, reducers$2, state, action);
} // ---


var DEFAULT_DIALOG_TAG = 'div';
var DialogRenderFeatures = Features$1.RenderStrategy | Features$1.Static;
var DialogRoot = /*#__PURE__*/forwardRefWithAs(function Dialog(props, ref) {
  var open = props.open,
      onClose = props.onClose,
      initialFocus = props.initialFocus,
      rest = _objectWithoutPropertiesLoose(props, ["open", "onClose", "initialFocus"]);

  var _useState = useState(0),
      nestedDialogCount = _useState[0],
      setNestedDialogCount = _useState[1];

  var usesOpenClosedState = useOpenClosed();

  if (open === undefined && usesOpenClosedState !== null) {
    var _match; // Update the `open` prop based on the open closed state


    open = match(usesOpenClosedState, (_match = {}, _match[State.Open] = true, _match[State.Closed] = false, _match));
  }

  var containers = useRef(new Set());
  var internalDialogRef = useRef(null);
  var dialogRef = useSyncRefs(internalDialogRef, ref); // Validations

  var hasOpen = props.hasOwnProperty('open') || usesOpenClosedState !== null;
  var hasOnClose = props.hasOwnProperty('onClose');

  if (!hasOpen && !hasOnClose) {
    throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  }

  if (!hasOpen) {
    throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  }

  if (!hasOnClose) {
    throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  }

  if (typeof open !== 'boolean') {
    throw new Error("You provided an `open` prop to the `Dialog`, but the value is not a boolean. Received: " + open);
  }

  if (typeof onClose !== 'function') {
    throw new Error("You provided an `onClose` prop to the `Dialog`, but the value is not a function. Received: " + onClose);
  }

  var dialogState = open ? DialogStates.Open : DialogStates.Closed;

  var visible = function () {
    if (usesOpenClosedState !== null) {
      return usesOpenClosedState === State.Open;
    }

    return dialogState === DialogStates.Open;
  }();

  var _useReducer = useReducer(stateReducer$2, {
    titleId: null,
    descriptionId: null
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var close = useCallback(function () {
    return onClose(false);
  }, [onClose]);
  var setTitleId = useCallback(function (id) {
    return dispatch({
      type: ActionTypes$2.SetTitleId,
      id: id
    });
  }, [dispatch]);
  var ready = useServerHandoffComplete();
  var enabled = ready && dialogState === DialogStates.Open;
  var hasNestedDialogs = nestedDialogCount > 1; // 1 is the current dialog

  var hasParentDialog = useContext(DialogContext) !== null; // If there are multiple dialogs, then you can be the root, the leaf or one
  // in between. We only care abou whether you are the top most one or not.

  var position = !hasNestedDialogs ? 'leaf' : 'parent';
  useFocusTrap(internalDialogRef, enabled ? match(position, {
    parent: Features.RestoreFocus,
    leaf: Features.All
  }) : Features.None, {
    initialFocus: initialFocus,
    containers: containers
  });
  useInertOthers(internalDialogRef, hasNestedDialogs ? enabled : false); // Handle outside click

  useWindowEvent('mousedown', function (event) {
    var _internalDialogRef$cu;

    var target = event.target;
    if (dialogState !== DialogStates.Open) return;
    if (hasNestedDialogs) return;
    if ((_internalDialogRef$cu = internalDialogRef.current) == null ? void 0 : _internalDialogRef$cu.contains(target)) return;
    close();
  }); // Handle `Escape` to close

  useWindowEvent('keydown', function (event) {
    if (event.key !== Keys.Escape) return;
    if (dialogState !== DialogStates.Open) return;
    if (hasNestedDialogs) return;
    event.preventDefault();
    event.stopPropagation();
    close();
  }); // Scroll lock

  useEffect(function () {
    if (dialogState !== DialogStates.Open) return;
    if (hasParentDialog) return;
    var overflow = document.documentElement.style.overflow;
    var paddingRight = document.documentElement.style.paddingRight;
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = scrollbarWidth + "px";
    return function () {
      document.documentElement.style.overflow = overflow;
      document.documentElement.style.paddingRight = paddingRight;
    };
  }, [dialogState, hasParentDialog]); // Trigger close when the FocusTrap gets hidden

  useEffect(function () {
    if (dialogState !== DialogStates.Open) return;
    if (!internalDialogRef.current) return;
    var observer = new IntersectionObserver(function (entries) {
      for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
        var entry = _step.value;

        if (entry.boundingClientRect.x === 0 && entry.boundingClientRect.y === 0 && entry.boundingClientRect.width === 0 && entry.boundingClientRect.height === 0) {
          close();
        }
      }
    });
    observer.observe(internalDialogRef.current);
    return function () {
      return observer.disconnect();
    };
  }, [dialogState, internalDialogRef, close]);

  var _useDescriptions = useDescriptions(),
      describedby = _useDescriptions[0],
      DescriptionProvider = _useDescriptions[1];

  var id = "headlessui-dialog-" + useId();
  var contextBag = useMemo(function () {
    return [{
      dialogState: dialogState,
      close: close,
      setTitleId: setTitleId
    }, state];
  }, [dialogState, state, close, setTitleId]);
  var slot = useMemo(function () {
    return {
      open: dialogState === DialogStates.Open
    };
  }, [dialogState]);
  var propsWeControl = {
    ref: dialogRef,
    id: id,
    role: 'dialog',
    'aria-modal': dialogState === DialogStates.Open ? true : undefined,
    'aria-labelledby': state.titleId,
    'aria-describedby': describedby,
    onClick: function onClick(event) {
      event.stopPropagation();
    }
  };
  var passthroughProps = rest;
  return /*#__PURE__*/React__default.createElement(StackProvider, {
    type: "Dialog",
    element: internalDialogRef,
    onUpdate: useCallback(function (message, type, element) {
      var _match2;

      if (type !== 'Dialog') return;
      match(message, (_match2 = {}, _match2[StackMessage.Add] = function () {
        containers.current.add(element);
        setNestedDialogCount(function (count) {
          return count + 1;
        });
      }, _match2[StackMessage.Remove] = function () {
        containers.current.add(element);
        setNestedDialogCount(function (count) {
          return count - 1;
        });
      }, _match2));
    }, [])
  }, /*#__PURE__*/React__default.createElement(ForcePortalRoot, {
    force: true
  }, /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement(DialogContext.Provider, {
    value: contextBag
  }, /*#__PURE__*/React__default.createElement(Portal.Group, {
    target: internalDialogRef
  }, /*#__PURE__*/React__default.createElement(ForcePortalRoot, {
    force: false
  }, /*#__PURE__*/React__default.createElement(DescriptionProvider, {
    slot: slot,
    name: "Dialog.Description"
  }, render({
    props: _extends({}, passthroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_DIALOG_TAG,
    features: DialogRenderFeatures,
    visible: visible,
    name: 'Dialog'
  }))))))));
}); // ---

var DEFAULT_OVERLAY_TAG$1 = 'div';
var Overlay$1 = /*#__PURE__*/forwardRefWithAs(function Overlay(props, ref) {
  var _useDialogContext = useDialogContext([Dialog.displayName, Overlay.name].join('.')),
      _useDialogContext$ = _useDialogContext[0],
      dialogState = _useDialogContext$.dialogState,
      close = _useDialogContext$.close;

  var overlayRef = useSyncRefs(ref);
  var id = "headlessui-dialog-overlay-" + useId();
  var handleClick = useCallback(function (event) {
    if (isDisabledReactIssue7711(event.currentTarget)) return event.preventDefault();
    event.preventDefault();
    event.stopPropagation();
    close();
  }, [close]);
  var slot = useMemo(function () {
    return {
      open: dialogState === DialogStates.Open
    };
  }, [dialogState]);
  var propsWeControl = {
    ref: overlayRef,
    id: id,
    'aria-hidden': true,
    onClick: handleClick
  };
  var passthroughProps = props;
  return render({
    props: _extends({}, passthroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_OVERLAY_TAG$1,
    name: 'Dialog.Overlay'
  });
}); // ---

var DEFAULT_TITLE_TAG = 'h2';

function Title(props) {
  var _useDialogContext2 = useDialogContext([Dialog.displayName, Title.name].join('.')),
      _useDialogContext2$ = _useDialogContext2[0],
      dialogState = _useDialogContext2$.dialogState,
      setTitleId = _useDialogContext2$.setTitleId;

  var id = "headlessui-dialog-title-" + useId();
  useEffect(function () {
    setTitleId(id);
    return function () {
      return setTitleId(null);
    };
  }, [id, setTitleId]);
  var slot = useMemo(function () {
    return {
      open: dialogState === DialogStates.Open
    };
  }, [dialogState]);
  var propsWeControl = {
    id: id
  };
  var passthroughProps = props;
  return render({
    props: _extends({}, passthroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_TITLE_TAG,
    name: 'Dialog.Title'
  });
} // ---


var Dialog = /*#__PURE__*/Object.assign(DialogRoot, {
  Overlay: Overlay$1,
  Title: Title,
  Description: Description
});

function resolveType(props) {
  var _props$as;

  if (props.type) return props.type;
  var tag = (_props$as = props.as) != null ? _props$as : 'button';
  if (typeof tag === 'string' && tag.toLowerCase() === 'button') return 'button';
  return undefined;
}

function useResolveButtonType(props, ref) {
  var _useState = useState(function () {
    return resolveType(props);
  }),
      type = _useState[0],
      setType = _useState[1];

  useIsoMorphicEffect(function () {
    setType(resolveType(props));
  }, [props.type, props.as]);
  useIsoMorphicEffect(function () {
    if (type) return;
    if (!ref.current) return;

    if (ref.current instanceof HTMLButtonElement && !ref.current.hasAttribute('type')) {
      setType('button');
    }
  }, [type, ref]);
  return type;
}

function disposables() {
  var disposables = [];
  var api = {
    requestAnimationFrame: function (_requestAnimationFrame) {
      function requestAnimationFrame() {
        return _requestAnimationFrame.apply(this, arguments);
      }

      requestAnimationFrame.toString = function () {
        return _requestAnimationFrame.toString();
      };

      return requestAnimationFrame;
    }(function () {
      var raf = requestAnimationFrame.apply(void 0, arguments);
      api.add(function () {
        return cancelAnimationFrame(raf);
      });
    }),
    nextFrame: function nextFrame() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      api.requestAnimationFrame(function () {
        api.requestAnimationFrame.apply(api, args);
      });
    },
    setTimeout: function (_setTimeout) {
      function setTimeout() {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function () {
      var timer = setTimeout.apply(void 0, arguments);
      api.add(function () {
        return clearTimeout(timer);
      });
    }),
    add: function add(cb) {
      disposables.push(cb);
    },
    dispose: function dispose() {
      for (var _iterator = _createForOfIteratorHelperLoose(disposables.splice(0)), _step; !(_step = _iterator()).done;) {
        var dispose = _step.value;
        dispose();
      }
    }
  };
  return api;
}

var _reducers$1;

var PopoverStates;

(function (PopoverStates) {
  PopoverStates[PopoverStates["Open"] = 0] = "Open";
  PopoverStates[PopoverStates["Closed"] = 1] = "Closed";
})(PopoverStates || (PopoverStates = {}));

var ActionTypes$1;

(function (ActionTypes) {
  ActionTypes[ActionTypes["TogglePopover"] = 0] = "TogglePopover";
  ActionTypes[ActionTypes["ClosePopover"] = 1] = "ClosePopover";
  ActionTypes[ActionTypes["SetButton"] = 2] = "SetButton";
  ActionTypes[ActionTypes["SetButtonId"] = 3] = "SetButtonId";
  ActionTypes[ActionTypes["SetPanel"] = 4] = "SetPanel";
  ActionTypes[ActionTypes["SetPanelId"] = 5] = "SetPanelId";
})(ActionTypes$1 || (ActionTypes$1 = {}));

var reducers$1 = (_reducers$1 = {}, _reducers$1[ActionTypes$1.TogglePopover] = function (state) {
  var _match;

  return _extends({}, state, {
    popoverState: match(state.popoverState, (_match = {}, _match[PopoverStates.Open] = PopoverStates.Closed, _match[PopoverStates.Closed] = PopoverStates.Open, _match))
  });
}, _reducers$1[ActionTypes$1.ClosePopover] = function (state) {
  if (state.popoverState === PopoverStates.Closed) return state;
  return _extends({}, state, {
    popoverState: PopoverStates.Closed
  });
}, _reducers$1[ActionTypes$1.SetButton] = function (state, action) {
  if (state.button === action.button) return state;
  return _extends({}, state, {
    button: action.button
  });
}, _reducers$1[ActionTypes$1.SetButtonId] = function (state, action) {
  if (state.buttonId === action.buttonId) return state;
  return _extends({}, state, {
    buttonId: action.buttonId
  });
}, _reducers$1[ActionTypes$1.SetPanel] = function (state, action) {
  if (state.panel === action.panel) return state;
  return _extends({}, state, {
    panel: action.panel
  });
}, _reducers$1[ActionTypes$1.SetPanelId] = function (state, action) {
  if (state.panelId === action.panelId) return state;
  return _extends({}, state, {
    panelId: action.panelId
  });
}, _reducers$1);
var PopoverContext = /*#__PURE__*/createContext(null);
PopoverContext.displayName = 'PopoverContext';

function usePopoverContext(component) {
  var context = useContext(PopoverContext);

  if (context === null) {
    var err = new Error("<" + component + " /> is missing a parent <" + Popover.name + " /> component.");
    if (Error.captureStackTrace) Error.captureStackTrace(err, usePopoverContext);
    throw err;
  }

  return context;
}

var PopoverAPIContext = /*#__PURE__*/createContext(null);
PopoverAPIContext.displayName = 'PopoverAPIContext';

function usePopoverAPIContext(component) {
  var context = useContext(PopoverAPIContext);

  if (context === null) {
    var err = new Error("<" + component + " /> is missing a parent <" + Popover.name + " /> component.");
    if (Error.captureStackTrace) Error.captureStackTrace(err, usePopoverAPIContext);
    throw err;
  }

  return context;
}

var PopoverGroupContext = /*#__PURE__*/createContext(null);
PopoverGroupContext.displayName = 'PopoverGroupContext';

function usePopoverGroupContext() {
  return useContext(PopoverGroupContext);
}

var PopoverPanelContext = /*#__PURE__*/createContext(null);
PopoverPanelContext.displayName = 'PopoverPanelContext';

function usePopoverPanelContext() {
  return useContext(PopoverPanelContext);
}

function stateReducer$1(state, action) {
  return match(action.type, reducers$1, state, action);
} // ---


var DEFAULT_POPOVER_TAG = 'div';

function Popover(props) {
  var _match2;

  var buttonId = "headlessui-popover-button-" + useId();
  var panelId = "headlessui-popover-panel-" + useId();
  var reducerBag = useReducer(stateReducer$1, {
    popoverState: PopoverStates.Closed,
    button: null,
    buttonId: buttonId,
    panel: null,
    panelId: panelId
  });
  var _reducerBag$ = reducerBag[0],
      popoverState = _reducerBag$.popoverState,
      button = _reducerBag$.button,
      panel = _reducerBag$.panel,
      dispatch = reducerBag[1];
  useEffect(function () {
    return dispatch({
      type: ActionTypes$1.SetButtonId,
      buttonId: buttonId
    });
  }, [buttonId, dispatch]);
  useEffect(function () {
    return dispatch({
      type: ActionTypes$1.SetPanelId,
      panelId: panelId
    });
  }, [panelId, dispatch]);
  var registerBag = useMemo(function () {
    return {
      buttonId: buttonId,
      panelId: panelId,
      close: function close() {
        return dispatch({
          type: ActionTypes$1.ClosePopover
        });
      }
    };
  }, [buttonId, panelId, dispatch]);
  var groupContext = usePopoverGroupContext();
  var registerPopover = groupContext == null ? void 0 : groupContext.registerPopover;
  var isFocusWithinPopoverGroup = useCallback(function () {
    var _groupContext$isFocus;

    return (_groupContext$isFocus = groupContext == null ? void 0 : groupContext.isFocusWithinPopoverGroup()) != null ? _groupContext$isFocus : (button == null ? void 0 : button.contains(document.activeElement)) || (panel == null ? void 0 : panel.contains(document.activeElement));
  }, [groupContext, button, panel]);
  useEffect(function () {
    return registerPopover == null ? void 0 : registerPopover(registerBag);
  }, [registerPopover, registerBag]); // Handle focus out

  useWindowEvent('focus', function () {
    if (popoverState !== PopoverStates.Open) return;
    if (isFocusWithinPopoverGroup()) return;
    if (!button) return;
    if (!panel) return;
    dispatch({
      type: ActionTypes$1.ClosePopover
    });
  }, true); // Handle outside click

  useWindowEvent('mousedown', function (event) {
    var target = event.target;
    if (popoverState !== PopoverStates.Open) return;
    if (button == null ? void 0 : button.contains(target)) return;
    if (panel == null ? void 0 : panel.contains(target)) return;
    dispatch({
      type: ActionTypes$1.ClosePopover
    });

    if (!isFocusableElement(target, FocusableMode.Loose)) {
      event.preventDefault();
      button == null ? void 0 : button.focus();
    }
  });
  var close = useCallback(function (focusableElement) {
    dispatch({
      type: ActionTypes$1.ClosePopover
    });

    var restoreElement = function () {
      if (!focusableElement) return button;
      if (focusableElement instanceof HTMLElement) return focusableElement;
      if (focusableElement.current instanceof HTMLElement) return focusableElement.current;
      return button;
    }();

    restoreElement == null ? void 0 : restoreElement.focus();
  }, [dispatch, button]);
  var api = useMemo(function () {
    return {
      close: close
    };
  }, [close]);
  var slot = useMemo(function () {
    return {
      open: popoverState === PopoverStates.Open,
      close: close
    };
  }, [popoverState, close]);
  return /*#__PURE__*/React__default.createElement(PopoverContext.Provider, {
    value: reducerBag
  }, /*#__PURE__*/React__default.createElement(PopoverAPIContext.Provider, {
    value: api
  }, /*#__PURE__*/React__default.createElement(OpenClosedProvider, {
    value: match(popoverState, (_match2 = {}, _match2[PopoverStates.Open] = State.Open, _match2[PopoverStates.Closed] = State.Closed, _match2))
  }, render({
    props: props,
    slot: slot,
    defaultTag: DEFAULT_POPOVER_TAG,
    name: 'Popover'
  }))));
} // ---


var DEFAULT_BUTTON_TAG = 'button';
var Button = /*#__PURE__*/forwardRefWithAs(function Button(props, ref) {
  var _usePopoverContext = usePopoverContext([Popover.name, Button.name].join('.')),
      state = _usePopoverContext[0],
      dispatch = _usePopoverContext[1];

  var internalButtonRef = useRef(null);
  var groupContext = usePopoverGroupContext();
  var closeOthers = groupContext == null ? void 0 : groupContext.closeOthers;
  var panelContext = usePopoverPanelContext();
  var isWithinPanel = panelContext === null ? false : panelContext === state.panelId;
  var buttonRef = useSyncRefs(internalButtonRef, ref, isWithinPanel ? null : function (button) {
    return dispatch({
      type: ActionTypes$1.SetButton,
      button: button
    });
  });
  var withinPanelButtonRef = useSyncRefs(internalButtonRef, ref); // TODO: Revisit when handling Tab/Shift+Tab when using Portal's

  var activeElementRef = useRef(null);
  var previousActiveElementRef = useRef(typeof window === 'undefined' ? null : document.activeElement);
  useWindowEvent('focus', function () {
    previousActiveElementRef.current = activeElementRef.current;
    activeElementRef.current = document.activeElement;
  }, true);
  var handleKeyDown = useCallback(function (event) {
    var _state$button;

    if (isWithinPanel) {
      if (state.popoverState === PopoverStates.Closed) return;

      switch (event.key) {
        case Keys.Space:
        case Keys.Enter:
          event.preventDefault(); // Prevent triggering a *click* event

          event.stopPropagation();
          dispatch({
            type: ActionTypes$1.ClosePopover
          });
          (_state$button = state.button) == null ? void 0 : _state$button.focus(); // Re-focus the original opening Button

          break;
      }
    } else {
      switch (event.key) {
        case Keys.Space:
        case Keys.Enter:
          event.preventDefault(); // Prevent triggering a *click* event

          event.stopPropagation();
          if (state.popoverState === PopoverStates.Closed) closeOthers == null ? void 0 : closeOthers(state.buttonId);
          dispatch({
            type: ActionTypes$1.TogglePopover
          });
          break;

        case Keys.Escape:
          if (state.popoverState !== PopoverStates.Open) return closeOthers == null ? void 0 : closeOthers(state.buttonId);
          if (!internalButtonRef.current) return;
          if (!internalButtonRef.current.contains(document.activeElement)) return;
          dispatch({
            type: ActionTypes$1.ClosePopover
          });
          break;

        case Keys.Tab:
          if (state.popoverState !== PopoverStates.Open) return;
          if (!state.panel) return;
          if (!state.button) return; // TODO: Revisit when handling Tab/Shift+Tab when using Portal's

          if (event.shiftKey) {
            var _state$button2; // Check if the last focused element exists, and check that it is not inside button or panel itself


            if (!previousActiveElementRef.current) return;
            if ((_state$button2 = state.button) == null ? void 0 : _state$button2.contains(previousActiveElementRef.current)) return;
            if (state.panel.contains(previousActiveElementRef.current)) return; // Check if the last focused element is *after* the button in the DOM

            var focusableElements = getFocusableElements();
            var previousIdx = focusableElements.indexOf(previousActiveElementRef.current);
            var buttonIdx = focusableElements.indexOf(state.button);
            if (buttonIdx > previousIdx) return;
            event.preventDefault();
            event.stopPropagation();
            focusIn(state.panel, Focus.Last);
          } else {
            event.preventDefault();
            event.stopPropagation();
            focusIn(state.panel, Focus.First);
          }

          break;
      }
    }
  }, [dispatch, state.popoverState, state.buttonId, state.button, state.panel, internalButtonRef, closeOthers, isWithinPanel]);
  var handleKeyUp = useCallback(function (event) {
    var _state$button3;

    if (isWithinPanel) return;

    if (event.key === Keys.Space) {
      // Required for firefox, event.preventDefault() in handleKeyDown for
      // the Space key doesn't cancel the handleKeyUp, which in turn
      // triggers a *click*.
      event.preventDefault();
    }

    if (state.popoverState !== PopoverStates.Open) return;
    if (!state.panel) return;
    if (!state.button) return; // TODO: Revisit when handling Tab/Shift+Tab when using Portal's

    switch (event.key) {
      case Keys.Tab:
        // Check if the last focused element exists, and check that it is not inside button or panel itself
        if (!previousActiveElementRef.current) return;
        if ((_state$button3 = state.button) == null ? void 0 : _state$button3.contains(previousActiveElementRef.current)) return;
        if (state.panel.contains(previousActiveElementRef.current)) return; // Check if the last focused element is *after* the button in the DOM

        var focusableElements = getFocusableElements();
        var previousIdx = focusableElements.indexOf(previousActiveElementRef.current);
        var buttonIdx = focusableElements.indexOf(state.button);
        if (buttonIdx > previousIdx) return;
        event.preventDefault();
        event.stopPropagation();
        focusIn(state.panel, Focus.Last);
        break;
    }
  }, [state.popoverState, state.panel, state.button, isWithinPanel]);
  var handleClick = useCallback(function (event) {
    if (isDisabledReactIssue7711(event.currentTarget)) return;
    if (props.disabled) return;

    if (isWithinPanel) {
      var _state$button4;

      dispatch({
        type: ActionTypes$1.ClosePopover
      });
      (_state$button4 = state.button) == null ? void 0 : _state$button4.focus(); // Re-focus the original opening Button
    } else {
      var _state$button5;

      if (state.popoverState === PopoverStates.Closed) closeOthers == null ? void 0 : closeOthers(state.buttonId);
      (_state$button5 = state.button) == null ? void 0 : _state$button5.focus();
      dispatch({
        type: ActionTypes$1.TogglePopover
      });
    }
  }, [dispatch, state.button, state.popoverState, state.buttonId, props.disabled, closeOthers, isWithinPanel]);
  var slot = useMemo(function () {
    return {
      open: state.popoverState === PopoverStates.Open
    };
  }, [state]);
  var type = useResolveButtonType(props, internalButtonRef);
  var passthroughProps = props;
  var propsWeControl = isWithinPanel ? {
    ref: withinPanelButtonRef,
    type: type,
    onKeyDown: handleKeyDown,
    onClick: handleClick
  } : {
    ref: buttonRef,
    id: state.buttonId,
    type: type,
    'aria-expanded': props.disabled ? undefined : state.popoverState === PopoverStates.Open,
    'aria-controls': state.panel ? state.panelId : undefined,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onClick: handleClick
  };
  return render({
    props: _extends({}, passthroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_BUTTON_TAG,
    name: 'Popover.Button'
  });
}); // ---

var DEFAULT_OVERLAY_TAG = 'div';
var OverlayRenderFeatures = Features$1.RenderStrategy | Features$1.Static;
var Overlay = /*#__PURE__*/forwardRefWithAs(function Overlay(props, ref) {
  var _usePopoverContext2 = usePopoverContext([Popover.name, Overlay.name].join('.')),
      popoverState = _usePopoverContext2[0].popoverState,
      dispatch = _usePopoverContext2[1];

  var overlayRef = useSyncRefs(ref);
  var id = "headlessui-popover-overlay-" + useId();
  var usesOpenClosedState = useOpenClosed();

  var visible = function () {
    if (usesOpenClosedState !== null) {
      return usesOpenClosedState === State.Open;
    }

    return popoverState === PopoverStates.Open;
  }();

  var handleClick = useCallback(function (event) {
    if (isDisabledReactIssue7711(event.currentTarget)) return event.preventDefault();
    dispatch({
      type: ActionTypes$1.ClosePopover
    });
  }, [dispatch]);
  var slot = useMemo(function () {
    return {
      open: popoverState === PopoverStates.Open
    };
  }, [popoverState]);
  var propsWeControl = {
    ref: overlayRef,
    id: id,
    'aria-hidden': true,
    onClick: handleClick
  };
  var passthroughProps = props;
  return render({
    props: _extends({}, passthroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_OVERLAY_TAG,
    features: OverlayRenderFeatures,
    visible: visible,
    name: 'Popover.Overlay'
  });
}); // ---

var DEFAULT_PANEL_TAG$1 = 'div';
var PanelRenderFeatures$1 = Features$1.RenderStrategy | Features$1.Static;
var Panel$1 = /*#__PURE__*/forwardRefWithAs(function Panel(props, ref) {
  var _props$focus = props.focus,
      focus = _props$focus === void 0 ? false : _props$focus,
      passthroughProps = _objectWithoutPropertiesLoose(props, ["focus"]);

  var _usePopoverContext3 = usePopoverContext([Popover.name, Panel.name].join('.')),
      state = _usePopoverContext3[0],
      dispatch = _usePopoverContext3[1];

  var _usePopoverAPIContext = usePopoverAPIContext([Popover.name, Panel.name].join('.')),
      close = _usePopoverAPIContext.close;

  var internalPanelRef = useRef(null);
  var panelRef = useSyncRefs(internalPanelRef, ref, function (panel) {
    dispatch({
      type: ActionTypes$1.SetPanel,
      panel: panel
    });
  });
  var usesOpenClosedState = useOpenClosed();

  var visible = function () {
    if (usesOpenClosedState !== null) {
      return usesOpenClosedState === State.Open;
    }

    return state.popoverState === PopoverStates.Open;
  }();

  var handleKeyDown = useCallback(function (event) {
    var _state$button6;

    switch (event.key) {
      case Keys.Escape:
        if (state.popoverState !== PopoverStates.Open) return;
        if (!internalPanelRef.current) return;
        if (!internalPanelRef.current.contains(document.activeElement)) return;
        event.preventDefault();
        dispatch({
          type: ActionTypes$1.ClosePopover
        });
        (_state$button6 = state.button) == null ? void 0 : _state$button6.focus();
        break;
    }
  }, [state, internalPanelRef, dispatch]); // Unlink on "unmount" myself

  useEffect(function () {
    return function () {
      return dispatch({
        type: ActionTypes$1.SetPanel,
        panel: null
      });
    };
  }, [dispatch]); // Unlink on "unmount" children

  useEffect(function () {
    var _props$unmount;

    if (state.popoverState === PopoverStates.Closed && ((_props$unmount = props.unmount) != null ? _props$unmount : true)) {
      dispatch({
        type: ActionTypes$1.SetPanel,
        panel: null
      });
    }
  }, [state.popoverState, props.unmount, dispatch]); // Move focus within panel

  useEffect(function () {
    if (!focus) return;
    if (state.popoverState !== PopoverStates.Open) return;
    if (!internalPanelRef.current) return;
    var activeElement = document.activeElement;
    if (internalPanelRef.current.contains(activeElement)) return; // Already focused within Dialog

    focusIn(internalPanelRef.current, Focus.First);
  }, [focus, internalPanelRef, state.popoverState]); // Handle Tab / Shift+Tab focus positioning

  useWindowEvent('keydown', function (event) {
    if (state.popoverState !== PopoverStates.Open) return;
    if (!internalPanelRef.current) return;
    if (event.key !== Keys.Tab) return;
    if (!document.activeElement) return;
    if (!internalPanelRef.current) return;
    if (!internalPanelRef.current.contains(document.activeElement)) return; // We will take-over the default tab behaviour so that we have a bit
    // control over what is focused next. It will behave exactly the same,
    // but it will also "fix" some issues based on whether you are using a
    // Portal or not.

    event.preventDefault();
    var result = focusIn(internalPanelRef.current, event.shiftKey ? Focus.Previous : Focus.Next);

    if (result === FocusResult.Underflow) {
      var _state$button7;

      return (_state$button7 = state.button) == null ? void 0 : _state$button7.focus();
    } else if (result === FocusResult.Overflow) {
      if (!state.button) return;
      var elements = getFocusableElements();
      var buttonIdx = elements.indexOf(state.button);
      var nextElements = elements.splice(buttonIdx + 1) // Elements after button
      .filter(function (element) {
        var _internalPanelRef$cur;

        return !((_internalPanelRef$cur = internalPanelRef.current) == null ? void 0 : _internalPanelRef$cur.contains(element));
      }); // Ignore items in panel
      // Try to focus the next element, however it could fail if we are in a
      // Portal that happens to be the very last one in the DOM. In that
      // case we would Error (because nothing after the button is
      // focusable). Therefore we will try and focus the very first item in
      // the document.body.

      if (focusIn(nextElements, Focus.First) === FocusResult.Error) {
        focusIn(document.body, Focus.First);
      }
    }
  }); // Handle focus out when we are in special "focus" mode

  useWindowEvent('focus', function () {
    var _internalPanelRef$cur2;

    if (!focus) return;
    if (state.popoverState !== PopoverStates.Open) return;
    if (!internalPanelRef.current) return;
    if ((_internalPanelRef$cur2 = internalPanelRef.current) == null ? void 0 : _internalPanelRef$cur2.contains(document.activeElement)) return;
    dispatch({
      type: ActionTypes$1.ClosePopover
    });
  }, true);
  var slot = useMemo(function () {
    return {
      open: state.popoverState === PopoverStates.Open,
      close: close
    };
  }, [state, close]);
  var propsWeControl = {
    ref: panelRef,
    id: state.panelId,
    onKeyDown: handleKeyDown
  };
  return /*#__PURE__*/React__default.createElement(PopoverPanelContext.Provider, {
    value: state.panelId
  }, render({
    props: _extends({}, passthroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_PANEL_TAG$1,
    features: PanelRenderFeatures$1,
    visible: visible,
    name: 'Popover.Panel'
  }));
}); // ---

var DEFAULT_GROUP_TAG = 'div';

function Group(props) {
  var groupRef = useRef(null);

  var _useState = useState([]),
      popovers = _useState[0],
      setPopovers = _useState[1];

  var unregisterPopover = useCallback(function (registerbag) {
    setPopovers(function (existing) {
      var idx = existing.indexOf(registerbag);

      if (idx !== -1) {
        var clone = existing.slice();
        clone.splice(idx, 1);
        return clone;
      }

      return existing;
    });
  }, [setPopovers]);
  var registerPopover = useCallback(function (registerbag) {
    setPopovers(function (existing) {
      return [].concat(existing, [registerbag]);
    });
    return function () {
      return unregisterPopover(registerbag);
    };
  }, [setPopovers, unregisterPopover]);
  var isFocusWithinPopoverGroup = useCallback(function () {
    var _groupRef$current;

    var element = document.activeElement;
    if ((_groupRef$current = groupRef.current) == null ? void 0 : _groupRef$current.contains(element)) return true; // Check if the focus is in one of the button or panel elements. This is important in case you are rendering inside a Portal.

    return popovers.some(function (bag) {
      var _document$getElementB, _document$getElementB2;

      return ((_document$getElementB = document.getElementById(bag.buttonId)) == null ? void 0 : _document$getElementB.contains(element)) || ((_document$getElementB2 = document.getElementById(bag.panelId)) == null ? void 0 : _document$getElementB2.contains(element));
    });
  }, [groupRef, popovers]);
  var closeOthers = useCallback(function (buttonId) {
    for (var _iterator = _createForOfIteratorHelperLoose(popovers), _step; !(_step = _iterator()).done;) {
      var popover = _step.value;
      if (popover.buttonId !== buttonId) popover.close();
    }
  }, [popovers]);
  var contextBag = useMemo(function () {
    return {
      registerPopover: registerPopover,
      unregisterPopover: unregisterPopover,
      isFocusWithinPopoverGroup: isFocusWithinPopoverGroup,
      closeOthers: closeOthers
    };
  }, [registerPopover, unregisterPopover, isFocusWithinPopoverGroup, closeOthers]);
  var slot = useMemo(function () {
    return {};
  }, []);
  var propsWeControl = {
    ref: groupRef
  };
  var passthroughProps = props;
  return /*#__PURE__*/React__default.createElement(PopoverGroupContext.Provider, {
    value: contextBag
  }, render({
    props: _extends({}, passthroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_GROUP_TAG,
    name: 'Popover.Group'
  }));
} // ---


Popover.Button = Button;
Popover.Overlay = Overlay;
Popover.Panel = Panel$1;
Popover.Group = Group;

var _reducers;

var ActionTypes;

(function (ActionTypes) {
  ActionTypes[ActionTypes["SetSelectedIndex"] = 0] = "SetSelectedIndex";
  ActionTypes[ActionTypes["SetOrientation"] = 1] = "SetOrientation";
  ActionTypes[ActionTypes["SetActivation"] = 2] = "SetActivation";
  ActionTypes[ActionTypes["RegisterTab"] = 3] = "RegisterTab";
  ActionTypes[ActionTypes["UnregisterTab"] = 4] = "UnregisterTab";
  ActionTypes[ActionTypes["RegisterPanel"] = 5] = "RegisterPanel";
  ActionTypes[ActionTypes["UnregisterPanel"] = 6] = "UnregisterPanel";
  ActionTypes[ActionTypes["ForceRerender"] = 7] = "ForceRerender";
})(ActionTypes || (ActionTypes = {}));

var reducers = (_reducers = {}, _reducers[ActionTypes.SetSelectedIndex] = function (state, action) {
  if (state.selectedIndex === action.index) return state;
  return _extends({}, state, {
    selectedIndex: action.index
  });
}, _reducers[ActionTypes.SetOrientation] = function (state, action) {
  if (state.orientation === action.orientation) return state;
  return _extends({}, state, {
    orientation: action.orientation
  });
}, _reducers[ActionTypes.SetActivation] = function (state, action) {
  if (state.activation === action.activation) return state;
  return _extends({}, state, {
    activation: action.activation
  });
}, _reducers[ActionTypes.RegisterTab] = function (state, action) {
  if (state.tabs.includes(action.tab)) return state;
  return _extends({}, state, {
    tabs: [].concat(state.tabs, [action.tab])
  });
}, _reducers[ActionTypes.UnregisterTab] = function (state, action) {
  return _extends({}, state, {
    tabs: state.tabs.filter(function (tab) {
      return tab !== action.tab;
    })
  });
}, _reducers[ActionTypes.RegisterPanel] = function (state, action) {
  if (state.panels.includes(action.panel)) return state;
  return _extends({}, state, {
    panels: [].concat(state.panels, [action.panel])
  });
}, _reducers[ActionTypes.UnregisterPanel] = function (state, action) {
  return _extends({}, state, {
    panels: state.panels.filter(function (panel) {
      return panel !== action.panel;
    })
  });
}, _reducers[ActionTypes.ForceRerender] = function (state) {
  return _extends({}, state);
}, _reducers);
var TabsContext = /*#__PURE__*/createContext(null);
TabsContext.displayName = 'TabsContext';

function useTabsContext(component) {
  var context = useContext(TabsContext);

  if (context === null) {
    var err = new Error("<" + component + " /> is missing a parent <Tab.Group /> component.");
    if (Error.captureStackTrace) Error.captureStackTrace(err, useTabsContext);
    throw err;
  }

  return context;
}

function stateReducer(state, action) {
  return match(action.type, reducers, state, action);
} // ---


var DEFAULT_TABS_TAG = Fragment;

function Tabs(props) {
  var _props$defaultIndex = props.defaultIndex,
      defaultIndex = _props$defaultIndex === void 0 ? 0 : _props$defaultIndex,
      _props$vertical = props.vertical,
      vertical = _props$vertical === void 0 ? false : _props$vertical,
      _props$manual = props.manual,
      manual = _props$manual === void 0 ? false : _props$manual,
      onChange = props.onChange,
      passThroughProps = _objectWithoutPropertiesLoose(props, ["defaultIndex", "vertical", "manual", "onChange"]);

  var orientation = vertical ? 'vertical' : 'horizontal';
  var activation = manual ? 'manual' : 'auto';

  var _useReducer = useReducer(stateReducer, {
    selectedIndex: null,
    tabs: [],
    panels: [],
    orientation: orientation,
    activation: activation
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var slot = useMemo(function () {
    return {
      selectedIndex: state.selectedIndex
    };
  }, [state.selectedIndex]);
  var onChangeRef = useRef(function () {});
  useEffect(function () {
    dispatch({
      type: ActionTypes.SetOrientation,
      orientation: orientation
    });
  }, [orientation]);
  useEffect(function () {
    dispatch({
      type: ActionTypes.SetActivation,
      activation: activation
    });
  }, [activation]);
  useEffect(function () {
    if (typeof onChange === 'function') {
      onChangeRef.current = onChange;
    }
  }, [onChange]);
  useEffect(function () {
    if (state.tabs.length <= 0) return;
    if (state.selectedIndex !== null) return;
    var tabs = state.tabs.map(function (tab) {
      return tab.current;
    }).filter(Boolean);
    var focusableTabs = tabs.filter(function (tab) {
      return !tab.hasAttribute('disabled');
    }); // Underflow

    if (defaultIndex < 0) {
      dispatch({
        type: ActionTypes.SetSelectedIndex,
        index: tabs.indexOf(focusableTabs[0])
      });
    } // Overflow
    else if (defaultIndex > state.tabs.length) {
      dispatch({
        type: ActionTypes.SetSelectedIndex,
        index: tabs.indexOf(focusableTabs[focusableTabs.length - 1])
      });
    } // Middle
    else {
      var before = tabs.slice(0, defaultIndex);
      var after = tabs.slice(defaultIndex);
      var next = [].concat(after, before).find(function (tab) {
        return focusableTabs.includes(tab);
      });
      if (!next) return;
      dispatch({
        type: ActionTypes.SetSelectedIndex,
        index: tabs.indexOf(next)
      });
    }
  }, [defaultIndex, state.tabs, state.selectedIndex]);
  var lastChangedIndex = useRef(state.selectedIndex);
  var providerBag = useMemo(function () {
    return [state, {
      dispatch: dispatch,
      change: function change(index) {
        if (lastChangedIndex.current !== index) onChangeRef.current(index);
        lastChangedIndex.current = index;
        dispatch({
          type: ActionTypes.SetSelectedIndex,
          index: index
        });
      }
    }];
  }, [state, dispatch]);
  return /*#__PURE__*/React__default.createElement(TabsContext.Provider, {
    value: providerBag
  }, render({
    props: _extends({}, passThroughProps),
    slot: slot,
    defaultTag: DEFAULT_TABS_TAG,
    name: 'Tabs'
  }));
} // ---


var DEFAULT_LIST_TAG = 'div';

function List(props) {
  var _useTabsContext = useTabsContext([Tab.name, List.name].join('.')),
      _useTabsContext$ = _useTabsContext[0],
      selectedIndex = _useTabsContext$.selectedIndex,
      orientation = _useTabsContext$.orientation;

  var slot = {
    selectedIndex: selectedIndex
  };
  var propsWeControl = {
    role: 'tablist',
    'aria-orientation': orientation
  };
  var passThroughProps = props;
  return render({
    props: _extends({}, passThroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_LIST_TAG,
    name: 'Tabs.List'
  });
} // ---


var DEFAULT_TAB_TAG = 'button';

function Tab(props) {
  var _panels$myIndex, _panels$myIndex$curre;

  var id = "headlessui-tabs-tab-" + useId();

  var _useTabsContext2 = useTabsContext(Tab.name),
      _useTabsContext2$ = _useTabsContext2[0],
      selectedIndex = _useTabsContext2$.selectedIndex,
      tabs = _useTabsContext2$.tabs,
      panels = _useTabsContext2$.panels,
      orientation = _useTabsContext2$.orientation,
      activation = _useTabsContext2$.activation,
      _useTabsContext2$2 = _useTabsContext2[1],
      dispatch = _useTabsContext2$2.dispatch,
      change = _useTabsContext2$2.change;

  var internalTabRef = useRef(null);
  var tabRef = useSyncRefs(internalTabRef, function (element) {
    if (!element) return;
    dispatch({
      type: ActionTypes.ForceRerender
    });
  });
  useIsoMorphicEffect(function () {
    dispatch({
      type: ActionTypes.RegisterTab,
      tab: internalTabRef
    });
    return function () {
      return dispatch({
        type: ActionTypes.UnregisterTab,
        tab: internalTabRef
      });
    };
  }, [dispatch, internalTabRef]);
  var myIndex = tabs.indexOf(internalTabRef);
  var selected = myIndex === selectedIndex;
  var handleKeyDown = useCallback(function (event) {
    var list = tabs.map(function (tab) {
      return tab.current;
    }).filter(Boolean);

    if (event.key === Keys.Space || event.key === Keys.Enter) {
      event.preventDefault();
      event.stopPropagation();
      change(myIndex);
      return;
    }

    switch (event.key) {
      case Keys.Home:
      case Keys.PageUp:
        event.preventDefault();
        event.stopPropagation();
        return focusIn(list, Focus.First);

      case Keys.End:
      case Keys.PageDown:
        event.preventDefault();
        event.stopPropagation();
        return focusIn(list, Focus.Last);
    }

    return match(orientation, {
      vertical: function vertical() {
        if (event.key === Keys.ArrowUp) return focusIn(list, Focus.Previous | Focus.WrapAround);
        if (event.key === Keys.ArrowDown) return focusIn(list, Focus.Next | Focus.WrapAround);
        return;
      },
      horizontal: function horizontal() {
        if (event.key === Keys.ArrowLeft) return focusIn(list, Focus.Previous | Focus.WrapAround);
        if (event.key === Keys.ArrowRight) return focusIn(list, Focus.Next | Focus.WrapAround);
        return;
      }
    });
  }, [tabs, orientation, myIndex, change]);
  var handleFocus = useCallback(function () {
    var _internalTabRef$curre;

    (_internalTabRef$curre = internalTabRef.current) == null ? void 0 : _internalTabRef$curre.focus();
  }, [internalTabRef]);
  var handleSelection = useCallback(function () {
    var _internalTabRef$curre2;

    (_internalTabRef$curre2 = internalTabRef.current) == null ? void 0 : _internalTabRef$curre2.focus();
    change(myIndex);
  }, [change, myIndex, internalTabRef]);
  var slot = useMemo(function () {
    return {
      selected: selected
    };
  }, [selected]);
  var propsWeControl = {
    ref: tabRef,
    onKeyDown: handleKeyDown,
    onFocus: activation === 'manual' ? handleFocus : handleSelection,
    onClick: handleSelection,
    id: id,
    role: 'tab',
    type: useResolveButtonType(props, internalTabRef),
    'aria-controls': (_panels$myIndex = panels[myIndex]) == null ? void 0 : (_panels$myIndex$curre = _panels$myIndex.current) == null ? void 0 : _panels$myIndex$curre.id,
    'aria-selected': selected,
    tabIndex: selected ? 0 : -1
  };
  var passThroughProps = props;

  return render({
    props: _extends({}, passThroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_TAB_TAG,
    name: 'Tabs.Tab'
  });
} // ---


var DEFAULT_PANELS_TAG = 'div';

function Panels(props) {
  var _useTabsContext3 = useTabsContext([Tab.name, Panels.name].join('.')),
      selectedIndex = _useTabsContext3[0].selectedIndex;

  var slot = useMemo(function () {
    return {
      selectedIndex: selectedIndex
    };
  }, [selectedIndex]);
  return render({
    props: props,
    slot: slot,
    defaultTag: DEFAULT_PANELS_TAG,
    name: 'Tabs.Panels'
  });
} // ---


var DEFAULT_PANEL_TAG = 'div';
var PanelRenderFeatures = Features$1.RenderStrategy | Features$1.Static;

function Panel(props) {
  var _tabs$myIndex, _tabs$myIndex$current;

  var _useTabsContext4 = useTabsContext([Tab.name, Panel.name].join('.')),
      _useTabsContext4$ = _useTabsContext4[0],
      selectedIndex = _useTabsContext4$.selectedIndex,
      tabs = _useTabsContext4$.tabs,
      panels = _useTabsContext4$.panels,
      dispatch = _useTabsContext4[1].dispatch;

  var id = "headlessui-tabs-panel-" + useId();
  var internalPanelRef = useRef(null);
  var panelRef = useSyncRefs(internalPanelRef, function (element) {
    if (!element) return;
    dispatch({
      type: ActionTypes.ForceRerender
    });
  });
  useIsoMorphicEffect(function () {
    dispatch({
      type: ActionTypes.RegisterPanel,
      panel: internalPanelRef
    });
    return function () {
      return dispatch({
        type: ActionTypes.UnregisterPanel,
        panel: internalPanelRef
      });
    };
  }, [dispatch, internalPanelRef]);
  var myIndex = panels.indexOf(internalPanelRef);
  var selected = myIndex === selectedIndex;
  var slot = useMemo(function () {
    return {
      selected: selected
    };
  }, [selected]);
  var propsWeControl = {
    ref: panelRef,
    id: id,
    role: 'tabpanel',
    'aria-labelledby': (_tabs$myIndex = tabs[myIndex]) == null ? void 0 : (_tabs$myIndex$current = _tabs$myIndex.current) == null ? void 0 : _tabs$myIndex$current.id,
    tabIndex: selected ? 0 : -1
  };

  var passThroughProps = props;
  return render({
    props: _extends({}, passThroughProps, propsWeControl),
    slot: slot,
    defaultTag: DEFAULT_PANEL_TAG,
    features: PanelRenderFeatures,
    visible: selected,
    name: 'Tabs.Panel'
  });
} // ---


Tab.Group = Tabs;
Tab.List = List;
Tab.Panels = Panels;
Tab.Panel = Panel;

function useIsInitialRender() {
  var initial = useRef(true);
  useEffect(function () {
    initial.current = false;
  }, []);
  return initial.current;
}

function once(cb) {
  var state = {
    called: false
  };
  return function () {
    if (state.called) return;
    state.called = true;
    return cb.apply(void 0, arguments);
  };
}

function addClasses(node) {
  var _node$classList;

  for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }

  node && classes.length > 0 && (_node$classList = node.classList).add.apply(_node$classList, classes);
}

function removeClasses(node) {
  var _node$classList2;

  for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    classes[_key2 - 1] = arguments[_key2];
  }

  node && classes.length > 0 && (_node$classList2 = node.classList).remove.apply(_node$classList2, classes);
}

var Reason;

(function (Reason) {
  Reason["Finished"] = "finished";
  Reason["Cancelled"] = "cancelled";
})(Reason || (Reason = {}));

function waitForTransition(node, done) {
  var d = disposables();
  if (!node) return d.dispose; // Safari returns a comma separated list of values, so let's sort them and take the highest value.

  var _getComputedStyle = getComputedStyle(node),
      transitionDuration = _getComputedStyle.transitionDuration,
      transitionDelay = _getComputedStyle.transitionDelay;

  var _map = [transitionDuration, transitionDelay].map(function (value) {
    var _value$split$filter$m = value.split(',') // Remove falsy we can't work with
    .filter(Boolean) // Values are returned as `0.3s` or `75ms`
    .map(function (v) {
      return v.includes('ms') ? parseFloat(v) : parseFloat(v) * 1000;
    }).sort(function (a, z) {
      return z - a;
    }),
        _value$split$filter$m2 = _value$split$filter$m[0],
        resolvedValue = _value$split$filter$m2 === void 0 ? 0 : _value$split$filter$m2;

    return resolvedValue;
  }),
      durationMs = _map[0],
      delaysMs = _map[1]; // Waiting for the transition to end. We could use the `transitionend` event, however when no
  // actual transition/duration is defined then the `transitionend` event is not fired.
  //
  // TODO: Downside is, when you slow down transitions via devtools this timeout is still using the
  // full 100% speed instead of the 25% or 10%.


  if (durationMs !== 0) {
    d.setTimeout(function () {
      done(Reason.Finished);
    }, durationMs + delaysMs);
  } else {
    // No transition is happening, so we should cleanup already. Otherwise we have to wait until we
    // get disposed.
    done(Reason.Finished);
  } // If we get disposed before the timeout runs we should cleanup anyway


  d.add(function () {
    return done(Reason.Cancelled);
  });
  return d.dispose;
}

function transition(node, base, from, to, entered, done) {
  var d = disposables();

  var _done = done !== undefined ? once(done) : function () {};

  removeClasses.apply(void 0, [node].concat(entered));
  addClasses.apply(void 0, [node].concat(base, from));
  d.nextFrame(function () {
    removeClasses.apply(void 0, [node].concat(from));
    addClasses.apply(void 0, [node].concat(to));
    d.add(waitForTransition(node, function (reason) {
      removeClasses.apply(void 0, [node].concat(to, base));
      addClasses.apply(void 0, [node].concat(entered));
      return _done(reason);
    }));
  }); // Once we get disposed, we should ensure that we cleanup after ourselves. In case of an unmount,
  // the node itself will be nullified and will be a no-op. In case of a full transition the classes
  // are already removed which is also a no-op. However if you go from enter -> leave mid-transition
  // then we have some leftovers that should be cleaned.

  d.add(function () {
    return removeClasses.apply(void 0, [node].concat(base, from, to, entered));
  }); // When we get disposed early, than we should also call the done method but switch the reason.

  d.add(function () {
    return _done(Reason.Cancelled);
  });
  return d.dispose;
}

function useSplitClasses(classes) {
  if (classes === void 0) {
    classes = '';
  }

  return useMemo(function () {
    return classes.split(' ').filter(function (className) {
      return className.trim().length > 1;
    });
  }, [classes]);
}

var TransitionContext = /*#__PURE__*/createContext(null);
TransitionContext.displayName = 'TransitionContext';
var TreeStates;

(function (TreeStates) {
  TreeStates["Visible"] = "visible";
  TreeStates["Hidden"] = "hidden";
})(TreeStates || (TreeStates = {}));

function useTransitionContext() {
  var context = useContext(TransitionContext);

  if (context === null) {
    throw new Error('A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.');
  }

  return context;
}

function useParentNesting() {
  var context = useContext(NestingContext);

  if (context === null) {
    throw new Error('A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.');
  }

  return context;
}

var NestingContext = /*#__PURE__*/createContext(null);
NestingContext.displayName = 'NestingContext';

function hasChildren(bag) {
  if ('children' in bag) return hasChildren(bag.children);
  return bag.current.filter(function (_ref) {
    var state = _ref.state;
    return state === TreeStates.Visible;
  }).length > 0;
}

function useNesting(done) {
  var doneRef = useRef(done);
  var transitionableChildren = useRef([]);
  var mounted = useIsMounted();
  useEffect(function () {
    doneRef.current = done;
  }, [done]);
  var unregister = useCallback(function (childId, strategy) {
    var _match;

    if (strategy === void 0) {
      strategy = RenderStrategy.Hidden;
    }

    var idx = transitionableChildren.current.findIndex(function (_ref2) {
      var id = _ref2.id;
      return id === childId;
    });
    if (idx === -1) return;
    match(strategy, (_match = {}, _match[RenderStrategy.Unmount] = function () {
      transitionableChildren.current.splice(idx, 1);
    }, _match[RenderStrategy.Hidden] = function () {
      transitionableChildren.current[idx].state = TreeStates.Hidden;
    }, _match));

    if (!hasChildren(transitionableChildren) && mounted.current) {
      doneRef.current == null ? void 0 : doneRef.current();
    }
  }, [doneRef, mounted, transitionableChildren]);
  var register = useCallback(function (childId) {
    var child = transitionableChildren.current.find(function (_ref3) {
      var id = _ref3.id;
      return id === childId;
    });

    if (!child) {
      transitionableChildren.current.push({
        id: childId,
        state: TreeStates.Visible
      });
    } else if (child.state !== TreeStates.Visible) {
      child.state = TreeStates.Visible;
    }

    return function () {
      return unregister(childId, RenderStrategy.Unmount);
    };
  }, [transitionableChildren, unregister]);
  return useMemo(function () {
    return {
      children: transitionableChildren,
      register: register,
      unregister: unregister
    };
  }, [register, unregister, transitionableChildren]);
}

function noop() {}

var eventNames = ['beforeEnter', 'afterEnter', 'beforeLeave', 'afterLeave'];

function ensureEventHooksExist(events) {
  var result = {};

  for (var _iterator = _createForOfIteratorHelperLoose(eventNames), _step; !(_step = _iterator()).done;) {
    var _events$name;

    var name = _step.value;
    result[name] = (_events$name = events[name]) != null ? _events$name : noop;
  }

  return result;
}

function useEvents(events) {
  var eventsRef = useRef(ensureEventHooksExist(events));
  useEffect(function () {
    eventsRef.current = ensureEventHooksExist(events);
  }, [events]);
  return eventsRef;
} // ---


var DEFAULT_TRANSITION_CHILD_TAG = 'div';
var TransitionChildRenderFeatures = Features$1.RenderStrategy;

function TransitionChild(props) {
  var _match3;

  var beforeEnter = props.beforeEnter,
      afterEnter = props.afterEnter,
      beforeLeave = props.beforeLeave,
      afterLeave = props.afterLeave,
      enter = props.enter,
      enterFrom = props.enterFrom,
      enterTo = props.enterTo,
      entered = props.entered,
      leave = props.leave,
      leaveFrom = props.leaveFrom,
      leaveTo = props.leaveTo,
      rest = _objectWithoutPropertiesLoose(props, ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave", "enter", "enterFrom", "enterTo", "entered", "leave", "leaveFrom", "leaveTo"]);

  var container = useRef(null);

  var _useState = useState(TreeStates.Visible),
      state = _useState[0],
      setState = _useState[1];

  var strategy = rest.unmount ? RenderStrategy.Unmount : RenderStrategy.Hidden;

  var _useTransitionContext = useTransitionContext(),
      show = _useTransitionContext.show,
      appear = _useTransitionContext.appear;

  var _useParentNesting = useParentNesting(),
      register = _useParentNesting.register,
      unregister = _useParentNesting.unregister;

  var initial = useIsInitialRender();
  var id = useId();
  var isTransitioning = useRef(false);
  var nesting = useNesting(function () {
    // When all children have been unmounted we can only hide ourselves if and only if we are not
    // transitioning ourselves. Otherwise we would unmount before the transitions are finished.
    if (!isTransitioning.current) {
      setState(TreeStates.Hidden);
      unregister(id);
      events.current.afterLeave();
    }
  });
  useIsoMorphicEffect(function () {
    if (!id) return;
    return register(id);
  }, [register, id]);
  useIsoMorphicEffect(function () {
    var _match2; // If we are in another mode than the Hidden mode then ignore


    if (strategy !== RenderStrategy.Hidden) return;
    if (!id) return; // Make sure that we are visible

    if (show && state !== TreeStates.Visible) {
      setState(TreeStates.Visible);
      return;
    }

    match(state, (_match2 = {}, _match2[TreeStates.Hidden] = function () {
      return unregister(id);
    }, _match2[TreeStates.Visible] = function () {
      return register(id);
    }, _match2));
  }, [state, id, register, unregister, show, strategy]);
  var enterClasses = useSplitClasses(enter);
  var enterFromClasses = useSplitClasses(enterFrom);
  var enterToClasses = useSplitClasses(enterTo);
  var enteredClasses = useSplitClasses(entered);
  var leaveClasses = useSplitClasses(leave);
  var leaveFromClasses = useSplitClasses(leaveFrom);
  var leaveToClasses = useSplitClasses(leaveTo);
  var events = useEvents({
    beforeEnter: beforeEnter,
    afterEnter: afterEnter,
    beforeLeave: beforeLeave,
    afterLeave: afterLeave
  });
  var ready = useServerHandoffComplete();
  useEffect(function () {
    if (ready && state === TreeStates.Visible && container.current === null) {
      throw new Error('Did you forget to passthrough the `ref` to the actual DOM node?');
    }
  }, [container, state, ready]); // Skipping initial transition

  var skip = initial && !appear;
  useIsoMorphicEffect(function () {
    var node = container.current;
    if (!node) return;
    if (skip) return;
    isTransitioning.current = true;
    if (show) events.current.beforeEnter();
    if (!show) events.current.beforeLeave();
    return show ? transition(node, enterClasses, enterFromClasses, enterToClasses, enteredClasses, function (reason) {
      isTransitioning.current = false;
      if (reason === Reason.Finished) events.current.afterEnter();
    }) : transition(node, leaveClasses, leaveFromClasses, leaveToClasses, enteredClasses, function (reason) {
      isTransitioning.current = false;
      if (reason !== Reason.Finished) return; // When we don't have children anymore we can safely unregister from the parent and hide
      // ourselves.

      if (!hasChildren(nesting)) {
        setState(TreeStates.Hidden);
        unregister(id);
        events.current.afterLeave();
      }
    });
  }, [events, id, isTransitioning, unregister, nesting, container, skip, show, enterClasses, enterFromClasses, enterToClasses, leaveClasses, leaveFromClasses, leaveToClasses]);
  var propsWeControl = {
    ref: container
  };
  var passthroughProps = rest;
  return /*#__PURE__*/React__default.createElement(NestingContext.Provider, {
    value: nesting
  }, /*#__PURE__*/React__default.createElement(OpenClosedProvider, {
    value: match(state, (_match3 = {}, _match3[TreeStates.Visible] = State.Open, _match3[TreeStates.Hidden] = State.Closed, _match3))
  }, render({
    props: _extends({}, passthroughProps, propsWeControl),
    defaultTag: DEFAULT_TRANSITION_CHILD_TAG,
    features: TransitionChildRenderFeatures,
    visible: state === TreeStates.Visible,
    name: 'Transition.Child'
  })));
}

function Transition(props) {
  // @ts-expect-error
  var show = props.show,
      _props$appear = props.appear,
      appear = _props$appear === void 0 ? false : _props$appear,
      unmount = props.unmount,
      passthroughProps = _objectWithoutPropertiesLoose(props, ["show", "appear", "unmount"]);

  var usesOpenClosedState = useOpenClosed();

  if (show === undefined && usesOpenClosedState !== null) {
    var _match4;

    show = match(usesOpenClosedState, (_match4 = {}, _match4[State.Open] = true, _match4[State.Closed] = false, _match4));
  }

  if (![true, false].includes(show)) {
    throw new Error('A <Transition /> is used but it is missing a `show={true | false}` prop.');
  }

  var _useState2 = useState(show ? TreeStates.Visible : TreeStates.Hidden),
      state = _useState2[0],
      setState = _useState2[1];

  var nestingBag = useNesting(function () {
    setState(TreeStates.Hidden);
  });
  var initial = useIsInitialRender();
  var transitionBag = useMemo(function () {
    return {
      show: show,
      appear: appear || !initial
    };
  }, [show, appear, initial]);
  useEffect(function () {
    if (show) {
      setState(TreeStates.Visible);
    } else if (!hasChildren(nestingBag)) {
      setState(TreeStates.Hidden);
    }
  }, [show, nestingBag]);
  var sharedProps = {
    unmount: unmount
  };
  return /*#__PURE__*/React__default.createElement(NestingContext.Provider, {
    value: nestingBag
  }, /*#__PURE__*/React__default.createElement(TransitionContext.Provider, {
    value: transitionBag
  }, render({
    props: _extends({}, sharedProps, {
      as: Fragment,
      children: /*#__PURE__*/React__default.createElement(TransitionChild, Object.assign({}, sharedProps, passthroughProps))
    }),
    defaultTag: Fragment,
    features: TransitionChildRenderFeatures,
    visible: state === TreeStates.Visible,
    name: 'Transition'
  })));
}

Transition.Child = function Child(props) {
  var hasTransitionContext = useContext(TransitionContext) !== null;
  var hasOpenClosedContext = useOpenClosed() !== null;
  return !hasTransitionContext && hasOpenClosedContext ? /*#__PURE__*/React__default.createElement(Transition, Object.assign({}, props)) : /*#__PURE__*/React__default.createElement(TransitionChild, Object.assign({}, props));
};

Transition.Root = Transition;

function AnnotationIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
  }));
}

function GlobeAltIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
  }));
}

function LightningBoltIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 10V3L4 14h7v7l9-11h-7z"
  }));
}

function MenuIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }));
}

function ScaleIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
  }));
}

function SearchIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }));
}

function ShoppingBagIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
  }));
}

function XIcon(props) {
  return /*#__PURE__*/React$1.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }));
}

/* This example requires Tailwind CSS v2.0+ */
const navigation$1 = [{
  name: 'Product',
  href: '#'
}, {
  name: 'Features',
  href: '#'
}, {
  name: 'Marketplace',
  href: '#'
}, {
  name: 'Company',
  href: '#'
}];
function Hero() {
  return /*#__PURE__*/React.createElement("div", {
    className: "relative bg-white overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2",
    fill: "currentColor",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "50,0 100,0 50,100 0,100"
  })), /*#__PURE__*/React.createElement(Popover, null, /*#__PURE__*/React.createElement("div", {
    className: "relative pt-6 px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "relative flex items-center justify-between sm:h-10 lg:justify-start",
    "aria-label": "Global"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between w-full md:w-auto"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Workflow"), /*#__PURE__*/React.createElement("img", {
    className: "h-8 w-auto sm:h-10",
    src: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "-mr-2 flex items-center md:hidden"
  }, /*#__PURE__*/React.createElement(Popover.Button, {
    className: "bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Open main menu"), /*#__PURE__*/React.createElement(MenuIcon, {
    className: "h-6 w-6",
    "aria-hidden": "true"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block md:ml-10 md:pr-4 md:space-x-8"
  }, navigation$1.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.name,
    href: item.href,
    className: "font-medium text-gray-500 hover:text-gray-900"
  }, item.name)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "font-medium text-indigo-600 hover:text-indigo-500"
  }, "Log in")))), /*#__PURE__*/React.createElement(Transition, {
    as: Fragment,
    enter: "duration-150 ease-out",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "duration-100 ease-in",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95"
  }, /*#__PURE__*/React.createElement(Popover.Panel, {
    focus: true,
    className: "absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 pt-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    className: "h-8 w-auto",
    src: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "-mr-2"
  }, /*#__PURE__*/React.createElement(Popover.Button, {
    className: "bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Close main menu"), /*#__PURE__*/React.createElement(XIcon, {
    className: "h-6 w-6",
    "aria-hidden": "true"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "px-2 pt-2 pb-3 space-y-1"
  }, navigation$1.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.name,
    href: item.href,
    className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
  }, item.name))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
  }, "Log in"))))), /*#__PURE__*/React.createElement("main", {
    className: "mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sm:text-center lg:text-left"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block xl:inline"
  }, "Data to enrich your"), ' ', /*#__PURE__*/React.createElement("span", {
    className: "block text-indigo-600 xl:inline"
  }, "online business")), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
  }, "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua."), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-md shadow"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
  }, "Get started")), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 sm:mt-0 sm:ml-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
  }, "Live demo"))))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
  }, /*#__PURE__*/React.createElement("img", {
    className: "h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full",
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
    alt: ""
  })));
}

/* This example requires Tailwind CSS v2.0+ */
const features = [{
  name: 'Competitive exchange rates',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  icon: GlobeAltIcon
}, {
  name: 'No hidden fees',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  icon: ScaleIcon
}, {
  name: 'Transfers are instant',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  icon: LightningBoltIcon
}, {
  name: 'Mobile notifications',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  icon: AnnotationIcon
}];
function Feature() {
  return /*#__PURE__*/React.createElement("div", {
    className: "py-12 bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-base text-indigo-600 font-semibold tracking-wide uppercase"
  }, "Transactions"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
  }, "A better way to send money"), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
  }, "Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-10"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
  }, features.map(feature => /*#__PURE__*/React.createElement("div", {
    key: feature.name,
    className: "relative"
  }, /*#__PURE__*/React.createElement("dt", null, /*#__PURE__*/React.createElement("div", {
    className: "absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
  }, /*#__PURE__*/React.createElement(feature.icon, {
    className: "h-6 w-6",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("p", {
    className: "ml-16 text-lg leading-6 font-medium text-gray-900"
  }, feature.name)), /*#__PURE__*/React.createElement("dd", {
    className: "mt-2 ml-16 text-base text-gray-500"
  }, feature.description)))))));
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const navigation = {
  categories: [{
    id: 'women',
    name: 'Women',
    featured: [{
      name: 'New Arrivals',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
      imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.'
    }, {
      name: 'Basic Tees',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
      imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
    }],
    sections: [{
      id: 'clothing',
      name: 'Clothing',
      items: [{
        name: 'Tops',
        href: '#'
      }, {
        name: 'Dresses',
        href: '#'
      }, {
        name: 'Pants',
        href: '#'
      }, {
        name: 'Denim',
        href: '#'
      }, {
        name: 'Sweaters',
        href: '#'
      }, {
        name: 'T-Shirts',
        href: '#'
      }, {
        name: 'Jackets',
        href: '#'
      }, {
        name: 'Activewear',
        href: '#'
      }, {
        name: 'Browse All',
        href: '#'
      }]
    }, {
      id: 'accessories',
      name: 'Accessories',
      items: [{
        name: 'Watches',
        href: '#'
      }, {
        name: 'Wallets',
        href: '#'
      }, {
        name: 'Bags',
        href: '#'
      }, {
        name: 'Sunglasses',
        href: '#'
      }, {
        name: 'Hats',
        href: '#'
      }, {
        name: 'Belts',
        href: '#'
      }]
    }, {
      id: 'brands',
      name: 'Brands',
      items: [{
        name: 'Full Nelson',
        href: '#'
      }, {
        name: 'My Way',
        href: '#'
      }, {
        name: 'Re-Arranged',
        href: '#'
      }, {
        name: 'Counterfeit',
        href: '#'
      }, {
        name: 'Significant Other',
        href: '#'
      }]
    }]
  }, {
    id: 'men',
    name: 'Men',
    featured: [{
      name: 'New Arrivals',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
      imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.'
    }, {
      name: 'Artwork Tees',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
      imageAlt: 'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
    }],
    sections: [{
      id: 'clothing',
      name: 'Clothing',
      items: [{
        name: 'Tops',
        href: '#'
      }, {
        name: 'Pants',
        href: '#'
      }, {
        name: 'Sweaters',
        href: '#'
      }, {
        name: 'T-Shirts',
        href: '#'
      }, {
        name: 'Jackets',
        href: '#'
      }, {
        name: 'Activewear',
        href: '#'
      }, {
        name: 'Browse All',
        href: '#'
      }]
    }, {
      id: 'accessories',
      name: 'Accessories',
      items: [{
        name: 'Watches',
        href: '#'
      }, {
        name: 'Wallets',
        href: '#'
      }, {
        name: 'Bags',
        href: '#'
      }, {
        name: 'Sunglasses',
        href: '#'
      }, {
        name: 'Hats',
        href: '#'
      }, {
        name: 'Belts',
        href: '#'
      }]
    }, {
      id: 'brands',
      name: 'Brands',
      items: [{
        name: 'Re-Arranged',
        href: '#'
      }, {
        name: 'Counterfeit',
        href: '#'
      }, {
        name: 'Full Nelson',
        href: '#'
      }, {
        name: 'My Way',
        href: '#'
      }]
    }]
  }],
  pages: [{
    name: 'Company',
    href: '#'
  }, {
    name: 'Stores',
    href: '#'
  }]
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white"
  }, /*#__PURE__*/React.createElement(Transition.Root, {
    show: open,
    as: Fragment
  }, /*#__PURE__*/React.createElement(Dialog, {
    as: "div",
    className: "fixed inset-0 flex z-40 lg:hidden",
    onClose: setOpen
  }, /*#__PURE__*/React.createElement(Transition.Child, {
    as: Fragment,
    enter: "transition-opacity ease-linear duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-opacity ease-linear duration-300",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  }, /*#__PURE__*/React.createElement(Dialog.Overlay, {
    className: "fixed inset-0 bg-black bg-opacity-25"
  })), /*#__PURE__*/React.createElement(Transition.Child, {
    as: Fragment,
    enter: "transition ease-in-out duration-300 transform",
    enterFrom: "-translate-x-full",
    enterTo: "translate-x-0",
    leave: "transition ease-in-out duration-300 transform",
    leaveFrom: "translate-x-0",
    leaveTo: "-translate-x-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 pt-5 pb-2 flex"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400",
    onClick: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Close menu"), /*#__PURE__*/React.createElement(XIcon, {
    className: "h-6 w-6",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement(Tab.Group, {
    as: "div",
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-gray-200"
  }, /*#__PURE__*/React.createElement(Tab.List, {
    className: "-mb-px flex px-4 space-x-8"
  }, navigation.categories.map(category => /*#__PURE__*/React.createElement(Tab, {
    key: category.name,
    className: ({
      selected
    }) => classNames(selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent', 'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium')
  }, category.name)))), /*#__PURE__*/React.createElement(Tab.Panels, {
    as: Fragment
  }, navigation.categories.map(category => /*#__PURE__*/React.createElement(Tab.Panel, {
    key: category.name,
    className: "pt-10 pb-8 px-4 space-y-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-x-4"
  }, category.featured.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.name,
    className: "group relative text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.imageSrc,
    alt: item.imageAlt,
    className: "object-center object-cover"
  })), /*#__PURE__*/React.createElement("a", {
    href: item.href,
    className: "mt-6 block font-medium text-gray-900"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute z-10 inset-0",
    "aria-hidden": "true"
  }), item.name), /*#__PURE__*/React.createElement("p", {
    "aria-hidden": "true",
    className: "mt-1"
  }, "Shop now")))), category.sections.map(section => /*#__PURE__*/React.createElement("div", {
    key: section.name
  }, /*#__PURE__*/React.createElement("p", {
    id: `${category.id}-${section.id}-heading-mobile`,
    className: "font-medium text-gray-900"
  }, section.name), /*#__PURE__*/React.createElement("ul", {
    role: "list",
    "aria-labelledby": `${category.id}-${section.id}-heading-mobile`,
    className: "mt-6 flex flex-col space-y-6"
  }, section.items.map(item => /*#__PURE__*/React.createElement("li", {
    key: item.name,
    className: "flow-root"
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href,
    className: "-m-2 p-2 block text-gray-500"
  }, item.name)))))))))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-200 py-6 px-4 space-y-6"
  }, navigation.pages.map(page => /*#__PURE__*/React.createElement("div", {
    key: page.name,
    className: "flow-root"
  }, /*#__PURE__*/React.createElement("a", {
    href: page.href,
    className: "-m-2 p-2 block font-medium text-gray-900"
  }, page.name)))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-200 py-6 px-4 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-root"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "-m-2 p-2 block font-medium text-gray-900"
  }, "Sign in")), /*#__PURE__*/React.createElement("div", {
    className: "flow-root"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "-m-2 p-2 block font-medium text-gray-900"
  }, "Create account"))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-200 py-6 px-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "-m-2 p-2 flex items-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://tailwindui.com/img/flags/flag-canada.svg",
    alt: "",
    className: "w-5 h-auto block flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-3 block text-base font-medium text-gray-900"
  }, "CAD"), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, ", change currency"))))))), /*#__PURE__*/React.createElement("header", {
    className: "relative bg-white"
  }, /*#__PURE__*/React.createElement("p", {
    className: "bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8"
  }, "Get free delivery on orders over $100"), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Top",
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-16 flex items-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "bg-white p-2 rounded-md text-gray-400 lg:hidden",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Open menu"), /*#__PURE__*/React.createElement(MenuIcon, {
    className: "h-6 w-6",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ml-4 flex lg:ml-0"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Workflow"), /*#__PURE__*/React.createElement("img", {
    className: "h-8 w-auto",
    src: "https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600",
    alt: ""
  }))), /*#__PURE__*/React.createElement(Popover.Group, {
    className: "hidden lg:ml-8 lg:block lg:self-stretch"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full flex space-x-8"
  }, navigation.categories.map(category => /*#__PURE__*/React.createElement(Popover, {
    key: category.name,
    className: "flex"
  }, ({
    open
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "relative flex"
  }, /*#__PURE__*/React.createElement(Popover.Button, {
    className: classNames(open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px')
  }, category.name)), /*#__PURE__*/React.createElement(Transition, {
    as: Fragment,
    enter: "transition ease-out duration-200",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition ease-in duration-150",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  }, /*#__PURE__*/React.createElement(Popover.Panel, {
    className: "absolute top-full inset-x-0 text-sm text-gray-500"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 top-1/2 bg-white shadow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-y-10 gap-x-8 py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-start-2 grid grid-cols-2 gap-x-8"
  }, category.featured.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.name,
    className: "group relative text-base sm:text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.imageSrc,
    alt: item.imageAlt,
    className: "object-center object-cover"
  })), /*#__PURE__*/React.createElement("a", {
    href: item.href,
    className: "mt-6 block font-medium text-gray-900"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute z-10 inset-0",
    "aria-hidden": "true"
  }), item.name), /*#__PURE__*/React.createElement("p", {
    "aria-hidden": "true",
    className: "mt-1"
  }, "Shop now")))), /*#__PURE__*/React.createElement("div", {
    className: "row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm"
  }, category.sections.map(section => /*#__PURE__*/React.createElement("div", {
    key: section.name
  }, /*#__PURE__*/React.createElement("p", {
    id: `${section.name}-heading`,
    className: "font-medium text-gray-900"
  }, section.name), /*#__PURE__*/React.createElement("ul", {
    role: "list",
    "aria-labelledby": `${section.name}-heading`,
    className: "mt-6 space-y-6 sm:mt-4 sm:space-y-4"
  }, section.items.map(item => /*#__PURE__*/React.createElement("li", {
    key: item.name,
    className: "flex"
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href,
    className: "hover:text-gray-800"
  }, item.name))))))))))))))), navigation.pages.map(page => /*#__PURE__*/React.createElement("a", {
    key: page.name,
    href: page.href,
    className: "flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
  }, page.name)))), /*#__PURE__*/React.createElement("div", {
    className: "ml-auto flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-sm font-medium text-gray-700 hover:text-gray-800"
  }, "Sign in"), /*#__PURE__*/React.createElement("span", {
    className: "h-6 w-px bg-gray-200",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-sm font-medium text-gray-700 hover:text-gray-800"
  }, "Create account")), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:ml-8 lg:flex"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-gray-700 hover:text-gray-800 flex items-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://tailwindui.com/img/flags/flag-canada.svg",
    alt: "",
    className: "w-5 h-auto block flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-3 block text-sm font-medium"
  }, "CAD"), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, ", change currency"))), /*#__PURE__*/React.createElement("div", {
    className: "flex lg:ml-6"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "p-2 text-gray-400 hover:text-gray-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Search"), /*#__PURE__*/React.createElement(SearchIcon, {
    className: "w-6 h-6",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ml-4 flow-root lg:ml-6"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "group -m-2 p-2 flex items-center"
  }, /*#__PURE__*/React.createElement(ShoppingBagIcon, {
    className: "flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
  }, "0"), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "items in cart, view bag")))))))));
}

export { Feature, Hero, Navbar };
