import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { invoke } from '@withease/factories';

import { decrementButtonSelectors } from '~/features/counter/decrement';
import { incrementButtonSelectors } from '~/features/counter/increment';

import { counterTextSelectors } from '~/entities/counter';

import { createCounterWidget } from '../model';
import { CounterWidget } from '../ui';

const MODEL = invoke(createCounterWidget, {});

const meta: Meta<typeof CounterWidget> = {
  component: CounterWidget,
  render: () => <CounterWidget model={MODEL} />,
};

export default meta;
type Story = StoryObj<typeof CounterWidget>;

export const Counter: Story = {};

export const Incremented: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const counterElement = canvas.getByTestId(counterTextSelectors.counter);
    const oldValue = parseInt(counterElement.textContent ?? '', 10);

    const incrementButton = canvas.getByTestId(incrementButtonSelectors.button);
    await userEvent.click(incrementButton);

    expect(counterElement).toHaveTextContent((oldValue + 1).toString());
  },
};

export const Decremented: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const counterElement = canvas.getByTestId(counterTextSelectors.counter);
    const oldValue = parseInt(counterElement.textContent ?? '', 10);

    const decrementButton = canvas.getByTestId(decrementButtonSelectors.button);
    await userEvent.click(decrementButton);

    expect(counterElement).toHaveTextContent((oldValue - 1).toString());
  },
};
