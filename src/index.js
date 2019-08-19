import FlaggableProvider, { useFlaggableState, useFlaggable, useFlaggableDispatch } from './context/flaggable';
import Flag from './components/flag';
import FlagCounter from './components/counter';
import { getItems } from './handlers/localStorage';

export {
  Flag,
  FlaggableProvider,
  FlagCounter,
  getItems,
  useFlaggableState,
  useFlaggable,
  useFlaggableDispatch,
};
