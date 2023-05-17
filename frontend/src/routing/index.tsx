import { Routes, Route } from "react-router-dom";
import { SiteMapType } from "./index.types";
import { ToastContainer } from "react-toastify";

export const AppRoutes = ({ SiteMap }: { SiteMap: SiteMapType }) => {
  return (
    <Routes>
      
      {Object.keys(SiteMap).map((key) => {
        const { path, Component } = SiteMap[key];
        return (
          <Route
            path={path}
            element={<Component />}
            key={"site-map-router-render-" + path}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
