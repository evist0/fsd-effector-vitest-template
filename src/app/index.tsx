import { type FC } from 'react';

import { CounterWidget, createCounterWidget } from '~/widget/counter';

import './globals.css';

import { invoke } from '@withease/factories';

const counterA = invoke(createCounterWidget, { initialLabel: 'Counter A' });
const counterB = invoke(createCounterWidget, { initialLabel: 'Counter B' });
const counterC = invoke(createCounterWidget, { initialLabel: 'Counter C' });

export const App: FC = () => (
  <div className={'container h-screen flex flex-col justify-center space-y-16 max-w-sm'}>
    <CounterWidget model={counterA} />
    <CounterWidget model={counterB} />
    <CounterWidget model={counterC} />
  </div>
);
