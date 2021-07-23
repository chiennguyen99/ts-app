import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductScreen from "./Products/Products";

const Auth: React.FC = () => {
  return (
    <Switch>
      <Route path="/auth/products" component={ProductScreen}/>
    </Switch>
  );
};

export default Auth;
