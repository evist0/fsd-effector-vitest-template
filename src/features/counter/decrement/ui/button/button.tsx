import { forwardRef } from 'react';

import { Button, type ButtonProps } from '~/shared/ui/button';

import { selectors } from './selectors';

export type DecrementButtonProps = ButtonProps;

export const DEFAULT_TEXT = '-1';

export const DecrementButton = forwardRef<HTMLButtonElement, DecrementButtonProps>(
  ({ children = DEFAULT_TEXT, ...props }, ref) => (
    <Button ref={ref} {...props} data-testid={selectors.button}>
      {children}
    </Button>
  )
);

DecrementButton.displayName = 'DecrementButton';
