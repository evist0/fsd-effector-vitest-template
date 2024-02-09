import { render, waitFor } from '@testing-library/react';

import { DecrementButton, type DecrementButtonProps, DEFAULT_TEXT } from './button';
import { selectors } from './selectors';

async function queryDecrementButton(props: Partial<DecrementButtonProps>) {
  const { queryByTestId } = render(<DecrementButton {...props} />);
  const button = queryByTestId(selectors.button);

  await waitFor(() => expect(button).toBeVisible());

  if (!button) throw 'Не удалось найти кнопку декремента';

  return button;
}

it('вызывает переданный "onClick"', async () => {
  const fn = vi.fn();

  const button = await queryDecrementButton({ onClick: fn });
  button.click();

  expect(fn).toHaveBeenCalledOnce();
});

it(`отображает переданный "children"`, async () => {
  const children = 'Уменьшить';

  const button = await queryDecrementButton({ children });

  expect(button).toHaveTextContent(children);
});

it(`Отображает "${DEFAULT_TEXT}", если "children" не передан`, async () => {
  const button = await queryDecrementButton({});

  expect(button).toHaveTextContent(DEFAULT_TEXT);
});
