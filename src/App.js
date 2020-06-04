import React, { useState, Fragment } from "react";
import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
import Details from "./Details";
import { ThemeContext } from "./ThemeContext";

function App() {
  const themeHook = useState("tomato");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <Fragment>
          <header>
            <ul>
              <li>
                <Link to="/">Adopt me!</Link>
              </li>
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
            </ul>
          </header>

          <Router>
            <SearchParams path="/" />
            <Details path="details/:id" />

            <Dashboard path="dashboard">
              <Invoice path="invoice" />
              <InvoiceItem path="invoice/:id" />
              <Total path="total" />
            </Dashboard>
          </Router>
        </Fragment>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
}

function Dashboard(props) {
  return (
    <div>
      <h1>Dashboard page</h1>
      <ul>
        <li>
          <Link to="invoice">Invoice |</Link>
        </li>
        <li>
          <Link to="invoice/1">InvoiceItem |</Link>
        </li>
        <li>
          <Link to="total"> Total</Link>
        </li>
      </ul>
      {props.children}
    </div>
  );
}
function Invoice() {
  return <h1>Invoice page</h1>;
}
function InvoiceItem({ id }) {
  return <h1>Invoice Details with hook {id}</h1>;
}
function Total() {
  return <h1>Total page</h1>;
}

export default App;

