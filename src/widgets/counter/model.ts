import { type EventCallable, type StoreWritable } from 'effector';
import { createFactory, invoke } from '@withease/factories';

import { createDecrement } from '~/features/counter/decrement';
import { createIncrement } from '~/features/counter/increment';

import { createCounter } from '~/entities/counter';

export const DEFAULT_LABEL = 'Counter';
export const DEFAULT_COUNTER = 0;

export type CreateCounterWidgetParams = {
  initialLabel?: string;
  initialValue?: number;
};

export type CounterWidgetModel = {
  label: string;

  $counter: StoreWritable<number>;
  increment: EventCallable<void>;
  decrement: EventCallable<void>;
};

type Factory = (args: CreateCounterWidgetParams) => CounterWidgetModel;

export const createCounterWidget = createFactory<Factory>(
  ({ initialLabel = DEFAULT_LABEL, initialValue = DEFAULT_COUNTER }) => {
    const counterModel = invoke(createCounter, { initialValue, initialLabel });

    const { increment } = invoke(createIncrement, counterModel);
    const { decrement } = invoke(createDecrement, counterModel);

    return { ...counterModel, increment, decrement };
  }
);
