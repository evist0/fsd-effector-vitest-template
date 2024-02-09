import type { Meta, StoryObj } from '@storybook/react';

import { CounterText } from '../text';

const meta: Meta<typeof CounterText> = {
  component: CounterText,
  args: {
    label: 'Counter',
    counter: 0,
  },
};

export default meta;
type Story = StoryObj<typeof CounterText>;

export const Text: Story = {
  args: {},
};
