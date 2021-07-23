import { Router, Switch, Route } from "react-router-dom";
import { history } from "../redux/history";
import { Layout } from "antd";
import HeaderPage from "../layout/components/Header/Header";
import ProductScreen from "./page/Products/Products";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/products">
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
