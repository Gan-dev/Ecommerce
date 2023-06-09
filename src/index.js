import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';
import { DateProvider } from './context/dateContext';
import { MessageProviderWrapper } from './context/message.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <DateProvider>
        <MessageProviderWrapper>
          <Router>
            <App />
          </Router>
        </MessageProviderWrapper>
      </DateProvider>
    </AuthProviderWrapper>
  </React.StrictMode>
);
