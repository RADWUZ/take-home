import { useCallback, useState} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { magic } from "./lib/magic";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const printMetadata = useCallback(async () => {
    try {
      const metadata = await magic.user.getInfo();
      console.log("printed metadata:", metadata); // Log printed metadata
    } catch (err) {
      console.error("Error printing metadata:", err); // Error handling
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await magic.user.logout(); // Logs out the user
      setUser(null); // Resets the user state to null
      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err); // Error handling for logout
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={<Login />} // Login component
        />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              user={user}
              logout={logout}
              setUser={setUser}
              printMetadata={printMetadata}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;

