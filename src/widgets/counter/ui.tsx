import { forwardRef } from 'react';

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
    return (
      <div ref={ref} className={cn('space-y-8', className)}>
        <CounterText model={model} />

        <div className={'flex space-x-2'}>
          <DecrementButton model={model} className={'w-full'} />
          <IncrementButton model={model} className={'w-full'} />
        </div>
      </div>
    );
  }
);

CounterWidget.displayName = 'Counter';
