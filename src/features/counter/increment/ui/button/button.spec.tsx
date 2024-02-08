import { createEvent, fork, sample } from 'effector';
import { render, waitFor } from '@testing-library/react';

import { type IncrementModel } from '../../model';

import { DEFAULT_TEXT, IncrementButton, type IncrementButtonProps } from './button';
import { selectors } from './selectors';

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

it('вызывает "increment" при клике', async () => {
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

it('вызывает переданный "onClick"', async () => {
  fork();

  const onClick = vi.fn();

  const button = await queryIncrementButton({ onClick });
  button.click();

  expect(onClick).toHaveBeenCalledOnce();
});

it(`отображает переданный "children"`, async () => {
  fork();

  const children = 'Увеличить';

  const button = await queryIncrementButton({ children });

  expect(button).toHaveTextContent(children);
});

it(`отображает "${DEFAULT_TEXT}", если "children" не передан`, async () => {
  fork();

  const button = await queryIncrementButton({});

  expect(button).toHaveTextContent(DEFAULT_TEXT);
});
