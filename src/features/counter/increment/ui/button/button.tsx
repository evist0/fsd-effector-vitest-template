import { forwardRef, type MouseEvent, useCallback } from 'react';
import { useUnit } from 'effector-react';

import { Button, type ButtonProps } from '~/shared/ui/button';

import { type IncrementModel } from '../../model.ts';

import { selectors } from './selectors.ts';

export type IncrementButtonProps = { model: IncrementModel } & ButtonProps;

export const DEFAULT_TEXT = '+1';

export const IncrementButton = forwardRef<HTMLButtonElement, IncrementButtonProps>(
  ({ children = DEFAULT_TEXT, model, onClick, ...props }, ref) => {
    const onIncrement = useUnit(model.increment);

    const _onClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        onIncrement();

        if (onClick) onClick(e);
      },
      [onIncrement, onClick]
    );

    return (
      <Button ref={ref} onClick={_onClick} {...props} data-testid={selectors.button}>
        {children}
      </Button>
    );
  }
);

IncrementButton.displayName = 'IncrementButton';
