import React from 'react';
import PropTypes from 'prop-types';
import {
  useFlaggableState,
} from '../context/flaggable';

const FlaggableCounter = ({ namespace, label }) => {
  const { flagged } = useFlaggableState();
  const count = (flagged && flagged[namespace]) ? flagged[namespace].length : 0;
  return (
    <div className={`flaggable-counter--${namespace}`}>
      {`(${count}) ${label}`}
    </div>
  );
};

FlaggableCounter.propTypes = {
  namespace: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export {
  FlaggableCounter as default,
};