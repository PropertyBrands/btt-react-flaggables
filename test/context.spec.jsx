/* eslint-env jest */
import { reducer } from '../src/context/flaggable';

const emptyState = {
  flagged: {},
};

describe('State reducer', () => {
  it('Should properly add items', () => {
    const action = {
      type: 'ADD_ITEM',
      value: '123',
      namespace: 'test_ns',
    };
    const newState = reducer(emptyState, action);
    expect(newState).toStrictEqual({
      flagged: {
        test_ns: ['123'],
      },
    });

    // Run it again to make sure it's not added twice.
    const newState2 = reducer(newState, action);
    expect(newState2).toStrictEqual(newState);

    const action2 = {
      type: 'ADD_ITEM',
      value: '456',
      namespace: 'test_ns',
    };
    const newState3 = reducer(newState2, action2);
    expect(newState3).toStrictEqual({
      flagged: {
        test_ns: ['123', '456'],
      },
    });
  });

  it('Should properly remove items', () => {
    const action = {
      type: 'ADD_ITEM',
      value: '123',
      namespace: 'test_ns',
    };
    const newState = reducer(emptyState, action);
    const action2 = {
      type: 'ADD_ITEM',
      value: '456',
      namespace: 'test_ns',
    };
    const newState2 = reducer(newState, action2);
    const action3 = {
      type: 'REMOVE_ITEM',
      value: '456',
      namespace: 'test_ns',
    };
    const newState4 = reducer(newState2, action3);
    expect(newState4).toStrictEqual({
      flagged: {
        test_ns: ['123'],
      },
    });
  });
});
