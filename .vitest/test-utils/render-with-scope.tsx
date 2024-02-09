import { render, type RenderOptions } from '@testing-library/react';
import {
  fork,
  type Handlers,
  type LegacyMap,
  type SerializedState,
  type StorePair,
} from 'effector';
import { Provider } from 'effector-react';
import type { ReactElement } from 'react';

type ForkConfig = {
  values?: StorePair<any>[] | SerializedState | LegacyMap;
  handlers?: Handlers;
};

export const renderWithScope = (
  ui: ReactElement,
  forkConfig?: ForkConfig,
  options?: Omit<RenderOptions, 'queries'>
) => {
  const scope = fork(forkConfig);

  const Element = () => <Provider value={scope}>{ui}</Provider>;

  return render(<Element />, options);
};
