import React from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter, Switch, BrowserRouter, Route } from "react-router-dom";
import { Top } from "./style";

function Home(props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">小风音乐</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      {/* <BrowserRouter>
        <Switch>{renderRoutes(route.routes)}</Switch>
      </BrowserRouter> */}
      {renderRoutes(route.routes)}
    </div>
  );
}

export default React.memo(Home);
