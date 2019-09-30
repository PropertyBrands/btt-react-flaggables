/* eslint-disable no-case-declarations */
import React, {
  useReducer, createContext, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { setItems as setLocalStorageItems } from '../handlers/localStorage';

const initialState = { flagged: {} };

const FlaggableDispatchContext = createContext();
const FlaggableStateContext = createContext(initialState);

/**
 * Handle state changes in the flaggable component.
 * @param state
 * @param action
 * @returns {*}
 */
const reducer = (state, action) => {
  const { type, namespace, value } = action;
  const { flagged } = state;
  const namespaceFlags = (flagged && flagged[namespace]) || [];
  switch (type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        flagged: {
          ...flagged,
          [namespace]: namespaceFlags.filter(v => v !== value),
        },
      };
    case 'ADD_ITEM':
      // Create a new Set to ensure uniqueness.
      const withAdded = [...new Set([
        ...namespaceFlags,
        value,
      ])];
      return {
        ...state,
        flagged: {
          ...flagged,
          [namespace]: withAdded,
        },
      };
    case 'SET_ITEMS':
      return {
        ...state,
        flagged: {
          ...flagged,
          [namespace]: value,
        },
      };
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
const FlaggableProvider = ({
  children, defaultState, setItems, namespace,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { flagged } = state;
  const namespaceItems = (flagged && flagged[namespace]) || [];
  useEffect(() => {
    setItems(namespace, namespaceItems);
  });
  return (
    <FlaggableStateContext.Provider value={state}>
      <FlaggableDispatchContext.Provider value={dispatch}>
        {children}
      </FlaggableDispatchContext.Provider>
    </FlaggableStateContext.Provider>
  );
};

FlaggableProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  defaultState: PropTypes.shape({
    flagged: PropTypes.object,
  }),
  namespace: PropTypes.string.isRequired,
  setItems: PropTypes.func,
};

FlaggableProvider.defaultProps = {
  defaultState: initialState,
  setItems: setLocalStorageItems,
};

/**
 * Provide only the current state.
 * @returns {*}
 */
const useFlaggableState = () => {
  const context = useContext(FlaggableStateContext);
  if (context === undefined) {
    throw new Error('useFlaggableState must be used within a FlaggableProvider');
  }
  return context;
};

/**
 * Provide access to the dispatch method for this context.
 * @returns {*}
 */
const useFlaggableDispatch = () => {
  const context = useContext(FlaggableDispatchContext);
  if (context === undefined) {
    throw new Error('useFlaggableDispatch must be used within a FlaggableProvider');
  }
  return context;
};

/**
 * Use dispatch and the state.
 * @returns {*[]}
 */
const useFlaggable = () => [useFlaggableState(), useFlaggableDispatch()];

/**
 * A default handler for adding items to storage.
 * @param value
 * @param namespace.
 * @param state
 * @param dispatch
 * @returns {Function}
 */
const defaultFlaggerCallback = (value, namespace, state, dispatch) => {
  const { flagged: currentFlags } = state;
  const flagged = (currentFlags && currentFlags[namespace]) || [];
  const type = flagged.indexOf(value) !== -1
    ? 'REMOVE_ITEM'
    : 'ADD_ITEM';
  dispatch({
    type,
    namespace,
    value,
  });
};

export {
  FlaggableProvider as default,
  useFlaggableState,
  useFlaggableDispatch,
  useFlaggable,
  defaultFlaggerCallback,
  reducer,
};
