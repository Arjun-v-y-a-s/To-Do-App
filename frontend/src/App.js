import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;

