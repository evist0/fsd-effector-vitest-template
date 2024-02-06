import { fork } from 'effector';
import { expect, it } from 'vitest';

import { createCounter } from './model.ts';

import { invoke } from '@withease/factories';

it('Возвращает "$counter", который принимает значение из "initialValue"', () => {
  const scope = fork();

  const initialValue = 10;
  const { $counter } = invoke(createCounter, { initialValue, initialLabel: '' });

  expect(scope.getState($counter)).toBe(initialValue);
});

it('Возвращает "label", который принимает значение из "initialLabel"', () => {
  fork();

  const initialLabel = 'Counter';
  const { label } = invoke(createCounter, { initialLabel, initialValue: 10 });

  expect(label).toBe(initialLabel);
});
