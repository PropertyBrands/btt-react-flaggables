/* global document */
/**
 * This file is just for demo purposes.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Flag from '../src/components/flag';
import FlagCounter from '../src/components/counter.tsx';
import FlaggableProvider from '../src/context/flaggable.tsx';
import { getItems } from '../src/handlers/localStorage';

const e = document.getElementById('thing');
const namespace = 'ns-2';
const currentItems = getItems(namespace);
ReactDOM.render(
  <FlaggableProvider
    namespace={namespace}
    defaultState={{
      flagged: {
        [namespace]: currentItems,
      },
    }}
  >
    <FlagCounter namespace={namespace} label="Favorites" />
    <Flag id="things" namespace={namespace}>Things</Flag>
    <Flag id="things2" namespace={namespace}>Things2</Flag>
    <Flag id="things3" namespace={namespace}>Things3</Flag>
  </FlaggableProvider>, e,
);

const e2 = document.getElementById('thing2');
const namespace2 = 'ns-3';
const currentItems2 = getItems(namespace2);
ReactDOM.render(
  <FlaggableProvider
    namespace={namespace2}
    defaultState={{
      flagged: {
        [namespace2]: currentItems2,
      },
    }}
  >
    <FlagCounter namespace={namespace2} label="Favorites2" />
    <Flag id="things4" namespace={namespace2}>Things4</Flag>
    <Flag id="things5" namespace={namespace2}>THings5</Flag>
    <Flag id="things6" namespace={namespace2}>Things6</Flag>
  </FlaggableProvider>, e2,
);
