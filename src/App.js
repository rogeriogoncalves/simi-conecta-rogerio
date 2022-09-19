import React, { lazy, Suspense } from 'react';
import FullPageSpinner from './components/FullPageSpinner';
import { useAuth } from './contexts/auth';

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'));

function App() {
  const { isLoggedIn, user } = useAuth();
  const orgIdx = 0;

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {isLoggedIn() ? (
        <AuthenticatedApp
          category={
            user.orgs[orgIdx].startupOuEBT !== 'Startup'
              ? 'organization'
              : 'startup'
          }
        />
      ) : (
        <UnauthenticatedApp />
      )}
    </Suspense>
  );
}

export default App;
