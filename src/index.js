import * as React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';

function App() {
  return (
    <article>
      <LoginForm onSuccess={() => console.log('Log In Success')} />
    </article>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
