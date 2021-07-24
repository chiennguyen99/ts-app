import { Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import { createBrowserHistory } from "history";
import ErrorProducts from "./page/ErrorProducts/ErrorProducts";

const Routes = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/">
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#000000' }} />
            <ErrorProducts />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
