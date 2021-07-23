import { Router, Switch, Route } from "react-router-dom";
import { history } from "../redux/history";
import Auth from "./page/Auth";
import Header from "../layout/components/Header/Header";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth">
          <Header />
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
