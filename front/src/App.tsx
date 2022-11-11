import Header from "components/Header/Header";
import Home from "pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header/>

        <Switch>
          <Route exact path="/">
            <div style={{ padding: "16px" }}>
              <Home />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
