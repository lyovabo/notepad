import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotesPage from "./notes/NotesPage";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route path={["/", "/notes"]} component={NotesPage} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
