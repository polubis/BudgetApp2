import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CalendarPage from 'pages/calendar/CalendarPage';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import Sidebar from 'components/sidebar/sidebar';

import { PAGES } from 'models/routing';

const AppPages = (): ReactElement<BrowserRouter> => (
  <BrowserRouter>
    <Sidebar />
    <main>
      <Switch>
        <Route exact path={PAGES.REGISTER} component={RegisterPage} />
        <Route exact path={PAGES.LOGIN} component={LoginPage} />
        <Route exact path={PAGES.CALENDAR} component={CalendarPage} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default AppPages;
