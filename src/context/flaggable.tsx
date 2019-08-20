/* eslint-disable no-case-declarations */
import React, {
  useReducer, createContext, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
const { setItems: setLocalStorageItems } = require('../handlers/localStorage');

const initialState = { flagged: {} } as FlaggableState;

const FlaggableDispatchContext = createContext(undefined);
const FlaggableStateContext = createContext(initialState);

enum ActionType {
    removeItem = 'REMOVE_ITEM',
    addItem = 'ADD_ITEM',
    setItems = 'SET_ITEMS',
}

type Action = {
    type?: ActionType,
    namespace: string,
    value: string,
}

interface CheckedValues {
    [index: string]: string | string[],
}

interface FlaggedType {
    [namespace: string]: string[]
}

type FlaggableState = {
    flagged: FlaggedType,
    checkedValues?: CheckedValues,
}

/**
 * Handle state changes in the flaggable component.
 */
const reducer = (state: FlaggableState, action: Action): FlaggableState => {
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
        checkedValues: {
          ...flagged,
          [namespace]: value,
        },
      };
    default:
      return state;
  }
};

interface FlaggableProviderProps {
    children: React.ElementType,
    defaultState: FlaggableState,
    setItems: (namespace: string, namespaceItems: any[]) => boolean | void
    namespace: string,
}

/**
 * HOC for providing the wrapping elements.
 * @param children
 * @param defaultState
 * @param setItems
 * @param namespace
 * @returns {*}
 * @constructor
 */
const FlaggableProvider: React.FC<FlaggableProviderProps> = ({
  children, defaultState = initialState, setItems = setLocalStorageItems, namespace,
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
const defaultFlaggerCallback = (value: string, namespace: string, state: FlaggableState, dispatch: (action: Action) => any) => {
  const { flagged: currentFlags } = state;
  const flagged = (currentFlags && currentFlags[namespace]) || [];
  const type = flagged.indexOf(value) !== -1
    ? 'REMOVE_ITEM' as ActionType
    : 'ADD_ITEM' as ActionType;
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
