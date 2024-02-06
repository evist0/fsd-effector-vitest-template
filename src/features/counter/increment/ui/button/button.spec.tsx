import { createEvent, fork, sample } from 'effector';
import { expect, it, vi } from 'vitest';

import { type IncrementModel } from '../../model.ts';

import { DEFAULT_TEXT, IncrementButton, type IncrementButtonProps } from './button.tsx';
import { selectors } from './selectors.ts';

import { render, waitFor } from '@testing-library/react';

const MOCK_MODEL: IncrementModel = {
  increment: createEvent<void>(),
};

async function queryIncrementButton({
  model = MOCK_MODEL,
  ...props
}: Partial<IncrementButtonProps>) {
  const { queryByTestId } = render(<IncrementButton model={model} {...props} />);
  const button = queryByTestId(selectors.button);

  await waitFor(() => expect(button).toBeVisible());

  if (!button) throw 'Не удалось найти кнопку';

  return button;
}

it('Вызывает "increment" при клике', async () => {
  fork();

  const fn = vi.fn();
  sample({
    clock: MOCK_MODEL.increment,
    fn,
  });

  const button = await queryIncrementButton({});
  button.click();

  expect(fn).toHaveBeenCalledOnce();
});

it(`Отображает переданный "children"`, async () => {
  fork();

  const children = 'Увеличить';

  const button = await queryIncrementButton({ children });

  expect(button).toHaveTextContent(children);
});

it(`Отображает "${DEFAULT_TEXT}", если "children" не передан`, async () => {
  fork();

  const button = await queryIncrementButton({});

  expect(button).toHaveTextContent(DEFAULT_TEXT);
});
