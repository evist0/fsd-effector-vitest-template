import { allSettled, fork } from 'effector';
import { invoke } from '@withease/factories';

import { createCounter } from '~/entities/counter';

import { createIncrement } from './model';

it('возвращает "increment", который увеличивает значение переданного "$counter" на 1', async () => {
  const scope = fork();

  const initialValue = 10;
  const model = invoke(createCounter, { initialValue, initialLabel: '' });
  const { increment } = invoke(createIncrement, model);

  await allSettled(increment, { scope });

  expect(scope.getState(model.$counter)).toBe(initialValue + 1);
});
