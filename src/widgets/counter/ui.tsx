import { forwardRef } from 'react';
import { useUnit } from 'effector-react/effector-react.mjs';

import { DecrementButton } from '~/features/counter/decrement';
import { IncrementButton } from '~/features/counter/increment';

import { CounterText } from '~/entities/counter';

import { cn } from '~/shared/lib/utils';

import { type CounterWidgetModel } from './model';

export type CounterWidgetProps = {
  className?: string;
  model: CounterWidgetModel;
};

export const CounterWidget = forwardRef<HTMLDivElement, CounterWidgetProps>(
  ({ className, model }, ref) => {
    const [counter, decrement, increment] = useUnit([
      model.$counter,
      model.decrement,
      model.increment,
    ]);

    return (
      <div ref={ref} className={cn('space-y-8', className)}>
        <CounterText label={model.label} counter={counter} />

        <div className={'flex space-x-2'}>
          <DecrementButton onClick={decrement} className={'w-full'} />
          <IncrementButton onClick={increment} className={'w-full'} />
        </div>
      </div>
    );
  }
);

CounterWidget.displayName = 'Counter';
