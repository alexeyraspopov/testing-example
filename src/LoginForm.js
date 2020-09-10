import * as React from 'react';
import { useState } from 'react';
import { login } from './AccountActions';
import useAsyncCallback from './useAsyncCallback';

export default function LoginForm({ onSuccess }) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [response, performSubmit] = useAsyncCallback(
    async event => {
      event.preventDefault();
      await login(username, password);
      onSuccess();
    },
    [password, username],
  );
  return (
    <form onSubmit={performSubmit}>
      <input
        type="text"
        data-testid="username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        type="password"
        data-testid="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      {response.type === 'Failure' ? (
        <p className="error" data-testid="error">
          {response.error.message}
        </p>
      ) : null}
      <button
        type="submit"
        data-testid="submit"
        disabled={response.type === 'Pending'}
      >
        Log in
      </button>
    </form>
  );
}
