import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Product from "./Components/Pages/Product";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Profile from "./Components/Pages/Profile";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <h1>Welcome to Shopping</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
