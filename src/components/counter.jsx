import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  useFlaggableState,
} from '../context/flaggable';

const DefaultCounterBody = ({ namespace, label, count }) => (
  <Fragment className={namespace}>
    <span>{`(${count})`}</span>
    <span>{`${label}`}</span>
  </Fragment>
);

DefaultCounterBody.propTypes = {
  namespace: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

const FlaggableCounter = ({ namespace, label, CounterBody }) => {
  const { flagged } = useFlaggableState();
  const count = (flagged && flagged[namespace]) ? flagged[namespace].length : 0;
  return (
    <div className={`flaggable-counter--${namespace}`}>
      {<CounterBody namespace={namespace} count={count} label={label} />}
    </div>
  );
};

FlaggableCounter.propTypes = {
  namespace: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  CounterBody: PropTypes.node,
};

FlaggableCounter.defaultProps = {
  CounterBody: DefaultCounterBody,
};

export {
  FlaggableCounter as default,
};
