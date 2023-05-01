import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import * as ReactDOMClient from 'react-dom/client';
import UserTokenProvider from './context/UserToken';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <UserTokenProvider>
    <App />
  </UserTokenProvider>
);

reportWebVitals();
