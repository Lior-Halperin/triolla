import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Home = React.lazy(() => import("../Views/Home/HomeView"));

function Routing(): JSX.Element {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
