import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Product from "./Components/Pages/Product";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Profile from "./Components/Pages/Profile";
import Navbar from "./Components/Pages/Navbar.jsx";
import ProtectedRoute from "./Components/ProtectedRoutes";
import { AuthProvider } from "./context/authContext.jsx";
import AdminScreen from "./Components/AdminDashboard/AdminScreen.jsx";
import OrderDetails from "./Components/Pages/OrderDetails.jsx";
// import { useAuth } from "./context/authContext.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  // const { user } = useAuth();
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

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
          <Route
            path="/admin"
            element={
              user && user.isAdmin ? <AdminScreen /> : <Navigate to="/" />
            }
          />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
