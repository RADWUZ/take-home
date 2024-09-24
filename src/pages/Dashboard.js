import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "../lib/magic";

const Dashboard = ({ logout, user, setUser }) => {
  const navigate = useNavigate();


  const finishSocialLogin = useCallback(async () => {
    try {
      const data = await magic.oauth2.getRedirectResult();
      console.log("OAuth result", data);
  
      // Check if user metadata is available
      if (data?.magic?.userMetadata) {
        setUser(data.magic.userMetadata);
        console.log("User data set in Dashboard:", data.magic.userMetadata);
      } else {
        console.error("No user metadata available from OAuth result");
      }
    } catch (err) {
      console.error("Error in OAuth:", err);
      navigate("/");  // If error, redirect back to login
    }
  }, [setUser, navigate]);
  
const printMetadata = useCallback(async ()=> {
  try {
    const metadata = await magic.user.getInfo();
    if (metadata) {
      setUser(metadata);
    }
  } catch (err) {
    console.error("Error fetching metadata:", err);
  }
  
},[setUser]);

  useEffect(() => {
    if (localStorage.getItem("isOauthRedirect")) {
      finishSocialLogin();
      localStorage.removeItem("isOauthRedirect");
    } else {
      printMetadata();
    }
  }, [finishSocialLogin, printMetadata]);
  

  return (
    <div className="container">
      {!user ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div>
            <h1>Data returned:</h1>
            <pre className="user-info">{JSON.stringify(user, null, 3)}</pre>
          </div>
          <br />
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
  
};

export default Dashboard;

