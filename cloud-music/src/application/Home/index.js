import React from "react";
import { renderRoutes } from "react-router-config";
import {
  HashRouter,
  Switch,
  BrowserRouter,
  Route,
  NavLink
} from "react-router-dom";
import { Top, Tab, TabItem } from "./style";

function Home(props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">小风音乐</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {/* <BrowserRouter>
        <Switch>{renderRoutes(route.routes)}</Switch>
      </BrowserRouter> */}
      {renderRoutes(route.routes)}
    </div>
  );
}

export default React.memo(Home);
