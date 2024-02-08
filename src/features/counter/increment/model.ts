import { createEvent, type EventCallable, sample } from 'effector';
import { createFactory } from '@withease/factories';

import { type CounterModel } from '~/entities/counter';

export type CreateIncrementParams = CounterModel;

export type IncrementModel = {
  increment: EventCallable<void>;
};

type Factory = (args: CreateIncrementParams) => IncrementModel;

export const createIncrement = createFactory<Factory>(({ $counter }) => {
  const increment = createEvent<void>();

  sample({
    clock: increment,
    source: $counter,
    fn: (counter) => counter + 1,
    target: $counter,
  });

  return { increment };
});
