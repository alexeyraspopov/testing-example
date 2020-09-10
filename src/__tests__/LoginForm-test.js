jest.mock('../AccountActions');

import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { login } from '../AccountActions';
import LoginForm from '../LoginForm';

test('successful login', async () => {
  login.mockResolvedValue(true);

  let onSuccess = jest.fn();
  let { getByTestId, findByTestId } = render(
    <LoginForm onSuccess={onSuccess} />,
  );

  let usernameField = getByTestId('username');
  let passwordField = getByTestId('password');
  let submitButton = getByTestId('submit');
  fireEvent.change(usernameField, { target: { value: 'admin' } });
  fireEvent.change(passwordField, { target: { value: 'qwerty' } });

  await act(async () => {
    fireEvent.click(submitButton);
  });

  expect(login).toHaveBeenCalledWith('admin', 'qwerty');
  expect(onSuccess).toHaveBeenCalled();
});

test('login error message', async () => {
  login.mockRejectedValue(new Error('Forbidden'));

  let { getByTestId, findByTestId } = render(<LoginForm />);

  let submitButton = getByTestId('submit');
  fireEvent.click(submitButton);

  let errorMessage = await findByTestId('error');
  expect(errorMessage).toHaveTextContent(/forbidden/i);
});
