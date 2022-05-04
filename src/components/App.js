import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../page/Home/Home";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact element={<Home />} />
      </Switch>
    </Router>
  );
};

export default App;
