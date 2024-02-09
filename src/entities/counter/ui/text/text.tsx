import { forwardRef } from 'react';

import { selectors } from './selectors';

export type CounterTextProps = {
  label: string;
  counter: number;
};

export const CounterText = forwardRef<HTMLDivElement, CounterTextProps>(
  ({ label, counter }, ref) => {
    return (
      <div ref={ref} className={'text-center space-y-6'}>
        <div>
          <span
            className={'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'}
            data-testid={selectors.label}
          >
            {label}
          </span>
        </div>

        <div>
          <span
            className={'scroll-m-20 text-3xl tracking-tight lg:text-4xl'}
            data-testid={selectors.counter}
          >
            {counter}
          </span>
        </div>
      </div>
    );
  }
);

CounterText.displayName = 'CounterText';
