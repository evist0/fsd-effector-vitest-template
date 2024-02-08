import { fork } from 'effector';
import { invoke } from '@withease/factories';

import { createCounter } from './model';

it('возвращает "$counter", который принимает значение из "initialValue"', () => {
  const scope = fork();

  const initialValue = 10;
  const { $counter } = invoke(createCounter, { initialValue, initialLabel: '' });

  expect(scope.getState($counter)).toBe(initialValue);
});

it('возвращает "label", который принимает значение из "initialLabel"', () => {
  fork();

  const initialLabel = 'Counter';
  const { label } = invoke(createCounter, { initialLabel, initialValue: 10 });

  expect(label).toBe(initialLabel);
});
