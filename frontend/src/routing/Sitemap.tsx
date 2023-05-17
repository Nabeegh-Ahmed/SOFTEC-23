import loadable from "@loadable/component";
import LoadingScreen from "../pages/LoadingScreen";
import { SiteMapType } from "./index.types";


const SiteMap: SiteMapType = {
  Home: {
    path: "/",
    Component: loadable(() => import("../pages/Home"), {
      fallback: <LoadingScreen />,
    }),
  },
  HowWeWork: {
    path: "/how-we-work",
    Component: loadable(() => import("../pages/HowWeWork"), {
      fallback: <LoadingScreen />,
    }),
  },
  Login: {
    path: "/login",
    Component: loadable(() => import("../pages/Authentication/Login"), {
      fallback: <LoadingScreen />,
    }),
  },
  Register: {
    path: "/register",
    Component: loadable(() => import("../pages/Authentication/Register"), {
      fallback: <LoadingScreen />,
    }),
  },
  VerifyEmail: {
    path: "/verify-email",
    Component: loadable(() => import("../pages/Authentication/VerifyEmail"), {
      fallback: <LoadingScreen />,
    }),
  },
  Dashboard: {
    path: "/app/*",
    Component: loadable(() => import("../pages/Application"), {
      fallback: <LoadingScreen />,
    }),
    children: {
      Home: {
        path: "/",
        relativePath: "/app",
        Component: loadable(() => import("../pages/Application/pages/Home"), {
          fallback: <LoadingScreen />,
        }),
      },
      Product: {
        path: "/product/:type/:id",
        relativePath: "/app/product/:id",
        Component: loadable(() => import("../pages/Application/pages/InventoryPorductItem"), {
          fallback: <LoadingScreen />,
        }),
      },
      Cart: {
        path: "/cart",
        relativePath: "/app/cart",
        Component: loadable(() => import("../pages/Application/pages/Cart"), {
          fallback: <LoadingScreen />,
        }),
      },
      Order: {
        path: "/order",
        relativePath: "/app/order",
        Component: loadable(() => import("../pages/Application/pages/PlaceOrder"), {
          fallback: <LoadingScreen />,
        }),
      },

      Profile: {
        path: "/profile",
        relativePath: "/app/profile",
        Component: loadable(() => import("../pages/Application/pages/Profile"), {
          fallback: <LoadingScreen />,
        }),
      },
      Chats: {
        path: "/chats",
        relativePath: "/app/chats",
        Component: loadable(() => import("../pages/Application/pages/Chats"), {
          fallback: <LoadingScreen />,
        }),
      },
      Disputes: {
        path: "/disputes",
        relativePath: "/app/disputes",
        Component: loadable(() => import("../pages/Application/pages/Dispute"), {
          fallback: <LoadingScreen />,
        }),
      },
    },
  },
  Admin: {
    path: "/admin/*",
    Component: loadable(() => import("../pages/Admin"), {
      fallback: <LoadingScreen />,
    }),
    children: {
      Home: {
        path: "/",
        relativePath: "/admin",
        Component: loadable(() => import("../pages/Admin/pages/Inventory"), {
          fallback: <LoadingScreen />,
        }),
      },
      Users: {
        path: "/users",
        relativePath: "/admin/users",
        Component: loadable(() => import("../pages/Admin/pages/Users"), {
          fallback: <LoadingScreen />,
        }),
      },
      Disputes: {
        path: "/disputes",
        relativePath: "/admin/disputes",
        Component: loadable(() => import("../pages/Application/pages/Dispute"), {
          fallback: <LoadingScreen />,
        }),
      },
      Orders: {
        path: "/orders",
        relativePath: "/admin/orders",
        Component: loadable(() => import("../pages/Admin/pages/AllOrders"), {
          fallback: <LoadingScreen />,
        }),
      },
      Product: {
        path: "/product/:type/:id",
        relativePath: "/admin/product/:id",
        Component: loadable(() => import("../pages/Application/pages/InventoryPorductItem"), {
          fallback: <LoadingScreen />,
        }),
      },
    }
  }
};

export default SiteMap;
