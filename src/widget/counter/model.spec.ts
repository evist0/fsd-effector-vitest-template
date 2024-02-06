import { allSettled, fork } from 'effector';
import { expect, it } from 'vitest';

import { createCounterWidget, DEFAULT_COUNTER, DEFAULT_LABEL } from './model.ts';

import { invoke } from '@withease/factories';

it(`Возвращает "label", который по умолчанию равен "${DEFAULT_LABEL}"`, async () => {
  fork();

  const { label } = invoke(createCounterWidget, {});

  expect(label).toBe(DEFAULT_LABEL);
});

it(`Возвращает "label", который принимает значение из "initialLabel"`, async () => {
  fork();

  const initialLabel = 'Label';
  const { label } = invoke(createCounterWidget, { initialLabel });

  expect(label).toBe(initialLabel);
});

it(`Возвращает "$counter", который по умолчанию равен "${DEFAULT_COUNTER}"`, async () => {
  const scope = fork();

  const { $counter } = invoke(createCounterWidget, {});

  expect(scope.getState($counter)).toBe(DEFAULT_COUNTER);
});

it('Возвращает "$counter", который принимает значение из "initialValue"', async () => {
  const scope = fork();

  const initialValue = 10;
  const { $counter } = invoke(createCounterWidget, { initialValue });

  expect(scope.getState($counter)).toBe(initialValue);
});

it('Возвращает событие "increment", которое увеличивает значение связанного "$counter" на 1', async () => {
  const scope = fork();
  const { increment, $counter } = invoke(createCounterWidget, {});

  await allSettled(increment, { scope });

  expect(scope.getState($counter)).toBe(DEFAULT_COUNTER + 1);
});

it('Возвращает событие "decrement", которое уменьшает значение связанного "$counter" на 1', async () => {
  const scope = fork();
  const { decrement, $counter } = invoke(createCounterWidget, {});

  await allSettled(decrement, { scope });

  expect(scope.getState($counter)).toBe(DEFAULT_COUNTER - 1);
});
