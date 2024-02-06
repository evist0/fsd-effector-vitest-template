import { act } from 'react-dom/test-utils';
import { fork } from 'effector';
import { expect, it } from 'vitest';

import { counterTextSelectors } from '~/entities/counter';
import { decrementButtonSelectors } from '~/features/counter/decrement';
import { incrementButtonSelectors } from '~/features/counter/increment';

import { createCounterWidget } from './model.ts';
import { CounterWidget } from './ui.tsx';

import { render } from '@testing-library/react';
import { invoke } from '@withease/factories';

it('Отображает counter+1 при клике на инкремент', () => {
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

it('Отображает counter-1 при клике на декремент', () => {
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
