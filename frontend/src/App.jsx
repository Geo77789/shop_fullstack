import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>My Fullstack Shop</h1>
        <Routes>
          <Route
            path="/"
            element={<div>Aici vor fi produsele (HomeScreen)</div>}
          />
          <Route
            path="/cart"
            element={<div>Aici va fi coșul (CartScreen)</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
