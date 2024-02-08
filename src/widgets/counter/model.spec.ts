import { allSettled, fork } from 'effector';
import { invoke } from '@withease/factories';

import { createCounterWidget, DEFAULT_COUNTER, DEFAULT_LABEL } from './model';

it(`возвращает "label", который по умолчанию равен "`, async () => {
  fork();

  const { label } = invoke(createCounterWidget, {});

  expect(label).toBe(DEFAULT_LABEL);
});

it(`возвращает "label", который принимает значение из "initialLabel"`, async () => {
  fork();

  const initialLabel = 'Label';
  const { label } = invoke(createCounterWidget, { initialLabel });

  expect(label).toBe(initialLabel);
});

it(`возвращает "$counter", который по умолчанию равен "`, async () => {
  const scope = fork();

  const { $counter } = invoke(createCounterWidget, {});

  expect(scope.getState($counter)).toBe(DEFAULT_COUNTER);
});

it('возвращает "$counter", который принимает значение из "initialValue"', async () => {
  const scope = fork();

  const initialValue = 10;
  const { $counter } = invoke(createCounterWidget, { initialValue });

  expect(scope.getState($counter)).toBe(initialValue);
});

it('возвращает событие "increment", которое увеличивает значение связанного "$counter" на 1', async () => {
  const scope = fork();
  const { increment, $counter } = invoke(createCounterWidget, {});

  await allSettled(increment, { scope });

  expect(scope.getState($counter)).toBe(DEFAULT_COUNTER + 1);
});

it('возвращает событие "decrement", которое уменьшает значение связанного "$counter" на 1', async () => {
  const scope = fork();
  const { decrement, $counter } = invoke(createCounterWidget, {});

  await allSettled(decrement, { scope });

  expect(scope.getState($counter)).toBe(DEFAULT_COUNTER - 1);
});
