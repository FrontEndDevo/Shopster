import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/redux.ts";
import { PersistGate } from "redux-persist/integration/react";
import MainLayout from "./layouts/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayout />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
