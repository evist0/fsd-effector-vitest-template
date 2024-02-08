import { render } from '@testing-library/react';

import { App } from './index';

const COUNTER_LABELS = ['Counter A', 'Counter B', 'Counter C'];

it.each(COUNTER_LABELS)('отображает "%s"', (counterLabel) => {
  const { queryByText } = render(<App />);

  const counterA = queryByText(counterLabel);

  expect(counterA).toBeVisible();
});
