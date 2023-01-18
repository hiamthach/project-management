import PropTypes from 'prop-types';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Routes all
import { authProtectedRoutes as templateAuthRoutes, publicRoutes as themePublicRoutes } from './routes/templateRoute';
import { publicRoutes } from 'routes';

// layouts Format
import VerticalLayout from './theme/VerticalLayout/';
import Layout from 'components/layouts';
// Import scss
import './assets/scss/theme.scss';

import fakeBackend from './helpers/AuthType/fakeBackend';

// Activating fake backend
fakeBackend();

const App = () => {
  const renderRoutes = (routes) => {
    return routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />);
  };

  return (
    <React.Fragment>
      <Routes>
        {/* Router for template theme */}
        <Route path="/" element={<Layout />}>
          {renderRoutes(publicRoutes)}
        </Route>

        <Route path="/template" element={<VerticalLayout />}>
          {renderRoutes(themePublicRoutes)}
          {renderRoutes(templateAuthRoutes)}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
