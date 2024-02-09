import { createEvent, createStore, sample } from 'effector';
import { renderWithScope } from 'test-utils';
import { expect } from '@storybook/test';

import { decrementButtonSelectors } from '~/features/counter/decrement';
import { incrementButtonSelectors } from '~/features/counter/increment';

import { counterTextSelectors } from '~/entities/counter';

import { type CounterWidgetModel } from './model';
import { CounterWidget } from './ui';

const MOCK_MODEL: CounterWidgetModel = {
  label: 'Counter',
  $counter: createStore<number>(0),
  increment: createEvent<void>(),
  decrement: createEvent<void>(),
};

it('отображает "label" согласно модели', () => {
  const { queryByTestId } = renderWithScope(<CounterWidget model={MOCK_MODEL} />);

  const label = queryByTestId(counterTextSelectors.label);

  expect(label).toHaveTextContent(MOCK_MODEL.label);
});

it('отображает "$counter" согласно модели', () => {
  const value = 5;
  const { queryByTestId } = renderWithScope(<CounterWidget model={MOCK_MODEL} />, {
    values: [[MOCK_MODEL.$counter, value]],
  });

  const counter = queryByTestId(counterTextSelectors.counter);

  expect(counter).toHaveTextContent(value.toString());
});

it('вызывает "increment" при клике на кнопку инкремента', () => {
  const fn = vi.fn();
  sample({
    clock: MOCK_MODEL.increment,
    fn,
  });

  const { queryByTestId } = renderWithScope(<CounterWidget model={MOCK_MODEL} />);

  const incrementButton = queryByTestId(incrementButtonSelectors.button);
  incrementButton?.click();

  expect(fn).toHaveBeenCalledOnce();
});

it('вызывает "decrement" при клике на кнопку декремента', () => {
  const fn = vi.fn();
  sample({
    clock: MOCK_MODEL.decrement,
    fn,
  });

  const { queryByTestId } = renderWithScope(<CounterWidget model={MOCK_MODEL} />);

  const decrementButton = queryByTestId(decrementButtonSelectors.button);
  decrementButton?.click();

  expect(fn).toHaveBeenCalledOnce();
});
