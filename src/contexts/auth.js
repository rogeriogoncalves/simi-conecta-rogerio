import React, { useContext, useEffect, useCallback } from 'react';
import useAsync from '../hooks/useAsync';
import * as auth from '../auth-provider';
import FullPageSpinner from '../components/FullPageSpinner';

async function bootstrapAppData() {
  let user = null;

  const token = await auth.getToken();
  if (token) {
    user = auth.getLoggedUser(token);
  }

  return user;
}

const AuthContext = React.createContext();
function AuthProvider({ children }) {
  const {
    data: user,
    isSuccess,
    isError,
    isLoading,
    isIdle,
    status,
    error,
    run,
    setData,
  } = useAsync();

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const preRegister = useCallback(
    form => auth.preRegister(form).then(user => setData(user)),
    [setData],
  );

  const register = useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  );

  const update = useCallback(
    form => auth.update(form).then(user => setData(user)),
    [setData],
  );

  const updatePrefs = useCallback(
    form => auth.updatePrefs(form).then(user => setData(user)),
    [setData],
  );

  const changePassword = useCallback(
    form => auth.changePassword(form).then(user => setData(user)),
    [setData],
  );

  const login = useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  );

  const logout = useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  const isLoggedIn = () => user !== null;

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      preRegister,
      register,
      update,
      updatePrefs,
      changePassword,
      isLoggedIn,
    }),
    [
      login,
      logout,
      preRegister,
      register,
      update,
      updatePrefs,
      changePassword,
      user,
    ],
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isSuccess) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
