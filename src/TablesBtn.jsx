import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { routes } from "./routes";

const TablesBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function handleChangeBtn(path) {
    navigate(path);
  }
  return (
    <div className="card flex flex-wrap justify-content-center gap-3">
      <div className="buttons">
        {routes.map((route, index) => {
          return (
            <Button
              key={index}
              link={location.pathname !== route.path}
              onClick={() => handleChangeBtn(route.path)}
            >
              {route.name}
            </Button>
          );
        })}
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                exact
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
};

export default TablesBtn;
