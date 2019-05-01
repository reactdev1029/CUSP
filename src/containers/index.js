import React, { Component, lazy, Suspense } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Switch } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from '../components/routes';
import defaultTheme from './themes/defaultTheme';

import '../styles/bootstrap.scss';
import '../styles/app.scss';
import 'video-react/dist/video-react.css';

const applyTheme = createMuiTheme(defaultTheme);

const SignInPage = lazy(() => import('./SignIn'));
const Page404 = lazy(() => import('../components/Error404'));
const Homepage = lazy(() => import('./Homepage'));
const Aggregated = lazy(() => import('./Aggregated'));
const ClipDetail = lazy(() => import('./ClipDetail'));
const SearchPage = lazy(() => import('./SearchPage'));
const Profile = lazy(() => import('./Profile'));

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={applyTheme}>
        <Suspense fallback={null}>
          <div className="app-main">
            <Switch>
              <PrivateRoute path="/" exact component={Homepage} />
              <PrivateRoute path="/search" component={SearchPage} />
              <PrivateRoute path="/aggregated" component={Aggregated} />
              <PrivateRoute path="/clipdetail/:id" component={ClipDetail} />
              <PrivateRoute path="/profile" component={Profile} />
              <PublicRoute path="/login" component={SignInPage} />
              <PublicRoute component={Page404} />
            </Switch>
          </div>
        </Suspense>
      </MuiThemeProvider>
    );
  }
}

export default App;
