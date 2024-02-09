import type { Meta, StoryObj } from '@storybook/react';

import { IncrementButton } from '../button';

const meta: Meta<typeof IncrementButton> = {
  component: IncrementButton,
};

export default meta;
type Story = StoryObj<typeof IncrementButton>;

export const Button: Story = {};
