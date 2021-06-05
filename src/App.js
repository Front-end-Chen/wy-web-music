import React, { memo } from "react";
import { HashRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import store from "./store";
import routes from "./router";

import WYAppHeader from "@/components/app-header";
import WYAppFooter from "@/components/app-footer";
import AppPlayerBar from "@/pages/player/app-player-bar";

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <WYAppHeader />
        <Switch>{renderRoutes(routes)}</Switch>
        <WYAppFooter />
        <AppPlayerBar />
      </HashRouter>
    </Provider>
  );
});
