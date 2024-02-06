import { createStore, fork } from 'effector';
import { expect, it } from 'vitest';

import { type CounterModel } from '../../model.ts';

import { selectors } from './selectors.ts';
import { CounterText } from './text.tsx';

import { render } from '@testing-library/react';

const MOCK_MODEL: CounterModel = {
  label: 'Counter',
  $counter: createStore<number>(0),
};

it('Корректно отображает "label"', () => {
  fork();

  const { queryByTestId } = render(<CounterText model={MOCK_MODEL} />);
  const label = queryByTestId(selectors.label);

  expect(label).toHaveTextContent(MOCK_MODEL.label);
});

it('Корректно отображает "$counter"', () => {
  const scope = fork();

  const { queryByTestId } = render(<CounterText model={MOCK_MODEL} />);
  const counter = queryByTestId(selectors.counter);

  const actualCounter = scope.getState(MOCK_MODEL.$counter);
  expect(counter).toHaveTextContent(actualCounter.toString());
});
