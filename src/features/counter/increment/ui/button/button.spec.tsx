import { render, waitFor } from '@testing-library/react';

import { DEFAULT_TEXT, IncrementButton, type IncrementButtonProps } from './button';
import { selectors } from './selectors';

async function queryIncrementButton(props: Partial<IncrementButtonProps>) {
  const { queryByTestId } = render(<IncrementButton {...props} />);
  const button = queryByTestId(selectors.button);

  await waitFor(() => expect(button).toBeVisible());

  if (!button) throw 'Не удалось найти кнопку инкремента';

  return button;
}

it('вызывает переданный "onClick"', async () => {
  const fn = vi.fn();

  const button = await queryIncrementButton({ onClick: fn });
  button.click();

  expect(fn).toHaveBeenCalledOnce();
});

it(`отображает переданный "children"`, async () => {
  const children = 'Увеличить';

  const button = await queryIncrementButton({ children });

  expect(button).toHaveTextContent(children);
});

it(`отображает "${DEFAULT_TEXT}", если "children" не передан`, async () => {
  const button = await queryIncrementButton({});

  expect(button).toHaveTextContent(DEFAULT_TEXT);
});
