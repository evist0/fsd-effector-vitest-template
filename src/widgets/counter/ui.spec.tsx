import { act } from 'react-dom/test-utils';
import { fork } from 'effector';
import { render } from '@testing-library/react';
import { invoke } from '@withease/factories';

import { decrementButtonSelectors } from '~/features/counter/decrement';
import { incrementButtonSelectors } from '~/features/counter/increment';

import { counterTextSelectors } from '~/entities/counter';

import { createCounterWidget } from './model';
import { CounterWidget } from './ui';

it('отображает counter+1 при клике на инкремент', () => {
  fork();

  const initialValue = 1;
  const model = invoke(createCounterWidget, { initialValue });

  const { queryByTestId } = render(<CounterWidget model={model} />);

  const counter = queryByTestId(counterTextSelectors.counter);
  const incrementButton = queryByTestId(incrementButtonSelectors.button);

  act(() => {
    incrementButton?.click();
  });

  const expectedValue = initialValue + 1;
  expect(counter).toHaveTextContent(expectedValue.toString());
});

it('отображает counter-1 при клике на декремент', () => {
  fork();

  const initialValue = 1;
  const model = invoke(createCounterWidget, { initialValue });

  const { queryByTestId } = render(<CounterWidget model={model} />);

  const counter = queryByTestId(counterTextSelectors.counter);
  const decrementButton = queryByTestId(decrementButtonSelectors.button);

  act(() => {
    decrementButton?.click();
  });

  const expectedValue = initialValue - 1;
  expect(counter).toHaveTextContent(expectedValue.toString());
});
