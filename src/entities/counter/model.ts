import { createStore, type StoreWritable } from 'effector';

import { createFactory } from '@withease/factories';

export type CreateCounterParams = {
  initialLabel: string;
  initialValue: number;
};

export type CounterModel = {
  label: string;
  $counter: StoreWritable<number>;
};

type Factory = (args: CreateCounterParams) => CounterModel;

export const createCounter = createFactory<Factory>(({ initialLabel, initialValue }) => {
  const $counter = createStore(initialValue);

  return { label: initialLabel, $counter };
});
