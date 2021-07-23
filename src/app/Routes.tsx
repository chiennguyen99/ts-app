import { Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { createBrowserHistory } from "history";
import HeaderPage from "../layout/Header/Header";
import ProductScreen from "./page/Products/Products";

const Routes = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/">
          <Layout>
            <HeaderPage />
            <ProductScreen />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
