import React from 'react';
import PropTypes from 'prop-types';
import {
  useFlaggableState,
  defaultFlaggerCallback,
  useFlaggable,
} from '../context/flaggable';

const isFlagged = (id, namespace) => {
  const { flagged } = useFlaggableState();
  const ids = (flagged && flagged[namespace]) || [];
  return ids.indexOf(id) !== -1;
};

const Flag = ({
  id, namespace, className, flagger, children,
}) => {
  const [flaggableState, flaggableDispatch] = useFlaggable();
  const classes = `${namespace} ${isFlagged(id, namespace) ? 'flagged' : ''}`;
  return (
    <button
      type="button"
      onClick={() => {
        flagger(id, namespace, flaggableState, flaggableDispatch);
      }}
      className={`${classes} ${className}`}
    >
      {children}
    </button>
  );
};

Flag.propTypes = {
  id: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
  className: PropTypes.string,
  flagger: PropTypes.func,
  children: PropTypes.node,
};

Flag.defaultProps = {
  className: '',
  flagger: defaultFlaggerCallback,
  children: null,
};

export {
  Flag as default,
};
