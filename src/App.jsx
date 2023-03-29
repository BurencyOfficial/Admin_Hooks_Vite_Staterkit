// Import scss
import "./assets/scss/theme.scss";

import { Route, Routes } from "react-router-dom";
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import PropTypes from "prop-types";
import React from "react";
// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import { connect } from "react-redux";
// import fakeBackend from "/src/helpers/AuthType/fakeBackend";
// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper"
import { useSelector } from "react-redux";

// Activating fake backend
// fakeBackend();

const firebaseConfig = {
  apiKey: "AIzaSyDjXKnxsOAaRqRbIHcvvmhB0L8c5a2kmTY",
  authDomain: "market-maker-test.firebaseapp.com",
  projectId: "market-maker-test",
  storageBucket: "market-maker-test.appspot.com",
  messagingSenderId: "387784142410",
  appId: "1:387784142410:web:ba16f88e06ec3fbd8d40b3",
  measurementId: "G-4KZVMDLCZ7"
};

// init firebase backend
initFirebaseBackend(firebaseConfig)

const App = (props) => {
  const { layoutType } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
  }));

  function getLayout(layoutType) {
    let layoutCls = VerticalLayout;
    switch (layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
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
