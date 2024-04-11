import Navigation from "./Navigation";
import AppHeader from "./AppHeader";
import PopularDes from "./PopularDes";
import TablesBtn from "./TablesBtn";
import { allRoutes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppFooter from "./Footer";
import Register from "./components/Register";
import Signin from "./components/Signin";

const App = () => {
  return (
    <div>
      <Navigation>
        <Routes>
          {allRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component || (() => route.element)}
              exact
            />
          ))}
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Navigation>
      <AppHeader />
      <PopularDes />
      <TablesBtn />
      <AppFooter />
    </div>
  );
};

export default App;
