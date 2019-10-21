import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CalendarPage from 'pages/calendar/CalendarPage';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';

import { ROUTES } from 'models/routing/Routes';

const AppRoutes = (): ReactElement<BrowserRouter> => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.REGISTER_ROUTE} component={RegisterPage} />
      <Route exact path={ROUTES.LOGIN_ROUTE} component={LoginPage} />
      <Route exact path={ROUTES.CALENDAR_ROUTE} component={CalendarPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;
