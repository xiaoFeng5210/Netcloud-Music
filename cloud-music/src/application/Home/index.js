import React from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter, Switch, BrowserRouter, Route } from "react-router-dom";

function Home(props) {
  const { route } = props;

  return (
    <div>
      <div>Home</div>
      {/* <BrowserRouter>
        <Switch>{renderRoutes(route.routes)}</Switch>
      </BrowserRouter> */}
      {renderRoutes(route.routes)}
    </div>
  );
}

export default React.memo(Home);
