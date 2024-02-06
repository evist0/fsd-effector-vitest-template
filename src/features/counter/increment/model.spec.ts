import { allSettled, fork } from 'effector';
import { expect, it } from 'vitest';

import { createCounter } from '~/entities/counter';

import { createIncrement } from './model.ts';

import { invoke } from '@withease/factories';

it('Возвращает "increment", который увеличивает значение переданного "$counter" на 1', async () => {
  const scope = fork();

  const initialValue = 10;
  const { $counter } = invoke(createCounter, { initialValue, initialLabel: '' });
  const { increment } = invoke(createIncrement, { $counter });

  await allSettled(increment, { scope });

  expect(scope.getState($counter)).toBe(initialValue + 1);
});
