import { createStore, fork } from 'effector';
import { render } from '@testing-library/react';

import { type CounterModel } from '../../model';

import { selectors } from './selectors';
import { CounterText } from './text';

const MOCK_MODEL: CounterModel = {
  label: 'Counter',
  $counter: createStore<number>(0),
};

it('корректно отображает "label"', () => {
  fork();

  const { queryByTestId } = render(<CounterText model={MOCK_MODEL} />);
  const label = queryByTestId(selectors.label);

  expect(label).toHaveTextContent(MOCK_MODEL.label);
});

it('корректно отображает "$counter"', () => {
  const scope = fork();

  const { queryByTestId } = render(<CounterText model={MOCK_MODEL} />);
  const counter = queryByTestId(selectors.counter);

  const actualCounter = scope.getState(MOCK_MODEL.$counter);
  expect(counter).toHaveTextContent(actualCounter.toString());
});
