import Navigation from "./Navigation";
import AppHeader from "./AppHeader";
import PopularDes from "./PopularDes";
import TablesBtn from "./TablesBtn";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppFooter from "./Footer";
import Register from "./components/Register";
import Signin from "./components/Signin";

const App = () => {
  return (
    <div>
      <Navigation>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.element />}
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
