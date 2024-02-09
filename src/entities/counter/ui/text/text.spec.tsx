import { render, waitFor } from '@testing-library/react';

import { selectors } from './selectors';
import { CounterText, type CounterTextProps } from './text';

async function renderComponent(props: Partial<CounterTextProps>) {
  const DEFAULT_PROPS: CounterTextProps = {
    label: 'Counter',
    counter: 0,
  };

  const mergedProps = Object.assign({}, DEFAULT_PROPS, props);

  return render(<CounterText {...mergedProps} />);
}

async function queryLabel(props: Partial<CounterTextProps>) {
  const { queryByTestId } = await renderComponent(props);
  const label = queryByTestId(selectors.label);

  await waitFor(() => expect(label).toBeVisible());

  if (!label) throw 'Не удалось найти заголовок';

  return label;
}

async function queryCounter(props: Partial<CounterTextProps>) {
  const { queryByTestId } = await renderComponent(props);
  const counter = queryByTestId(selectors.counter);

  await waitFor(() => expect(counter).toBeVisible());

  if (!counter) throw 'Не удалось найти счетчик';

  return counter;
}

it('корректно отображает "label"', async () => {
  const label = 'My magic counter';

  const element = await queryLabel({ label });

  expect(element).toHaveTextContent(label);
});

it('корректно отображает "counter"', async () => {
  const counter = 10;

  const element = await queryCounter({ counter });

  expect(element).toHaveTextContent(counter.toString());
});
