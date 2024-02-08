import { forwardRef, type MouseEvent, useCallback } from 'react';
import { useUnit } from 'effector-react';

import { Button, type ButtonProps } from '~/shared/ui/button';

import { type DecrementModel } from '../../model';

import { selectors } from './selectors';

export type DecrementButtonProps = { model: DecrementModel } & ButtonProps;

export const DEFAULT_TEXT = '-1';

export const DecrementButton = forwardRef<HTMLButtonElement, DecrementButtonProps>(
  ({ children = DEFAULT_TEXT, model, onClick, ...props }, ref) => {
    const onDecrement = useUnit(model.decrement);

    const _onClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        onDecrement();

        if (onClick) onClick(e);
      },
      [onDecrement, onClick]
    );

    return (
      <Button ref={ref} onClick={_onClick} {...props} data-testid={selectors.button}>
        {children}
      </Button>
    );
  }
);

DecrementButton.displayName = 'DecrementButton';
