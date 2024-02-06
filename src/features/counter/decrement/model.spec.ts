import { allSettled, fork } from 'effector';
import { expect, it } from 'vitest';

import { createCounter } from '~/entities/counter';

import { createDecrement } from './model.ts';

import { invoke } from '@withease/factories';

it('Возвращает "decrement", который уменьшает значение переданного "$counter" на 1', async () => {
  const scope = fork();

  const initialValue = 10;
  const { $counter } = invoke(createCounter, { initialValue, initialLabel: '' });
  const { decrement } = invoke(createDecrement, { $counter });

  await allSettled(decrement, { scope });

  expect(scope.getState($counter)).toBe(initialValue - 1);
});
