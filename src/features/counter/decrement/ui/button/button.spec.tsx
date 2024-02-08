import { createEvent, fork, sample } from 'effector';
import { render, waitFor } from '@testing-library/react';

import { type DecrementModel } from '../../model';

import { DecrementButton, type DecrementButtonProps, DEFAULT_TEXT } from './button';
import { selectors } from './selectors';

const MOCK_MODEL: DecrementModel = {
  decrement: createEvent<void>(),
};

async function queryDecrementButton({
  model = MOCK_MODEL,
  ...props
}: Partial<DecrementButtonProps>) {
  const { queryByTestId } = render(<DecrementButton model={model} {...props} />);
  const button = queryByTestId(selectors.button);

  await waitFor(() => expect(button).toBeVisible());

  if (!button) throw 'Не удалось найти кнопку';

  return button;
}

it('вызывает "decrement" при клике', async () => {
  fork();

  const fn = vi.fn();
  sample({
    clock: MOCK_MODEL.decrement,
    fn,
  });

  const button = await queryDecrementButton({});
  button.click();

  expect(fn).toHaveBeenCalledOnce();
});

it('вызывает переданный "onClick"', async () => {
  fork();

  const onClick = vi.fn();

  const button = await queryDecrementButton({ onClick });
  button.click();

  expect(onClick).toHaveBeenCalledOnce();
});

it(`отображает переданный "children"`, async () => {
  fork();

  const children = 'Уменьшить';

  const button = await queryDecrementButton({ children });

  expect(button).toHaveTextContent(children);
});

it(`Отображает "${DEFAULT_TEXT}", если "children" не передан`, async () => {
  fork();

  const button = await queryDecrementButton({});

  expect(button).toHaveTextContent(DEFAULT_TEXT);
});
