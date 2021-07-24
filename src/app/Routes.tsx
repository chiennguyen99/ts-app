import { Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { createBrowserHistory } from "history";
import HeaderPage from "../layout/Header/Header";
import ErrorProducts from "./page/ErrorProducts/ErrorProducts";

const Routes = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/">
          <Layout>
            <HeaderPage />
            <ErrorProducts />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
