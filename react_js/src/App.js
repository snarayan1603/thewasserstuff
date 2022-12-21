import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

//importng screens
const HomeScreen = lazy(() => import("./screens/HomeScreen"))
const Header = lazy(() => import("./templates/Header"))
const UserScreen = lazy(() => import("./screens/UserScreen"))

function App() {

  return (

    //Defining BrowserRoutes that uses HTML history apis for syncing b/w UI and url
    <BrowserRouter>

      {/* Suspense shows loading untill required data is not loaded */}
      <Suspense fallback={<div>Loading...</div>}>

        <Header />

        {/* //defining routes */}
        <Routes>

          {/* Making condition for screens  */}
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/user/:_id" element={<UserScreen />} />

        </Routes>

      </Suspense>

    </BrowserRouter>

  );
}

export default App;
