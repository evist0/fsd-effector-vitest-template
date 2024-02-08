import { allSettled, fork } from 'effector';
import { invoke } from '@withease/factories';

import { createCounter } from '~/entities/counter';

import { createDecrement } from './model';

it('возвращает "decrement", который уменьшает значение переданного "$counter" на 1', async () => {
  const scope = fork();

  const initialValue = 10;
  const model = invoke(createCounter, { initialValue, initialLabel: '' });
  const { decrement } = invoke(createDecrement, model);

  await allSettled(decrement, { scope });

  expect(scope.getState(model.$counter)).toBe(initialValue - 1);
});
