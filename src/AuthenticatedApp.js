import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './pages/Home';
import OnboardingStartup from './pages/startup/OnboardingStartup';
import OnboardingOrganization from './pages/organization/OnboardingOrganization';
import OrgDetails from './pages/OrgDetails';
import ContactedOrgs from './pages/ContactedOrgs';
import Profile from './pages/Profile';
import Security from './pages/Security';
import ChangePassword from './pages/ChangePassword';
import About from './pages/About';

const AuthenticatedApp = ({ category }) => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register">
        <Redirect to={`/onboarding/${category}`} />
      </Route>
      <Route path="/onboarding/startup" component={OnboardingStartup} />
      <Route
        path="/onboarding/organization"
        component={OnboardingOrganization}
      />
      <Route path="/org-details" component={OrgDetails} />
      <Route path="/contacted-orgs" component={ContactedOrgs} />
      <Route path="/profile" component={Profile} />
      <Route path="/security" component={Security} />
      <Route path="/change-password" component={ChangePassword} />
      <Route path="/about" component={About} />
    </Switch>
  </Router>
);

export default AuthenticatedApp;
