import { createEvent, type EventCallable, sample } from 'effector';

import { type CounterModel } from '~/entities/counter';

import { createFactory } from '@withease/factories';

export type CreateDecrementParams = CounterModel;

export type DecrementModel = {
  decrement: EventCallable<void>;
};

type Factory = (args: CreateDecrementParams) => DecrementModel;

export const createDecrement = createFactory<Factory>(({ $counter }) => {
  const decrement = createEvent<void>();

  sample({
    clock: decrement,
    source: $counter,
    fn: (counter) => counter - 1,
    target: $counter,
  });

  return { decrement };
});
