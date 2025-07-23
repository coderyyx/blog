import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import FlexibleWrapper from './components/FlexibleWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FlexibleWrapper>
        <App />
      </FlexibleWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
