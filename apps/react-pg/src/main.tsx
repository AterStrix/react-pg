import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';

import { BrowserRouter } from 'react-router-dom';
import { ContextTest } from './app/context';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ContextTest>
        <App />
      </ContextTest>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);