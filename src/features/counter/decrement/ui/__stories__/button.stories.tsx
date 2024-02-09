import type { Meta, StoryObj } from '@storybook/react';

import { DecrementButton } from '../button';

const meta: Meta<typeof DecrementButton> = {
  component: DecrementButton,
};

export default meta;
type Story = StoryObj<typeof DecrementButton>;

export const Button: Story = {};
