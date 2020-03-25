import React from "react";
import { IconStyle } from "./assets/iconfont/iconfont";
import { GlobalStyle } from "./style";
import { renderRoutes } from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import routes from "./routes/index.js";
import { Provider } from "react-redux";
import store from "./store/index";
import { HashRouter, Switch, BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <Provider className="App" store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <BrowserRouter>
        <Switch>{renderRoutes(routes)}</Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
