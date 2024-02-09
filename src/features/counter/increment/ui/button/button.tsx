import { forwardRef } from 'react';

import { Button, type ButtonProps } from '~/shared/ui/button';

import { selectors } from './selectors';

export type IncrementButtonProps = ButtonProps;

export const DEFAULT_TEXT = '+1';

export const IncrementButton = forwardRef<HTMLButtonElement, IncrementButtonProps>(
  ({ children = DEFAULT_TEXT, ...props }, ref) => (
    <Button ref={ref} {...props} data-testid={selectors.button}>
      {children}
    </Button>
  )
);

IncrementButton.displayName = 'IncrementButton';
