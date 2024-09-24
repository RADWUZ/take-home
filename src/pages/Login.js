
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { magic } from "../lib/magic";

const Login = () => {
  const navigate = useNavigate();

  // Handles email OTP login
  const handleEmailOtpLogin = useCallback(async () => {
    try {
      const email = prompt("Please use your email:");
      if (email) {
        await magic.auth.loginWithMagicLink({ email });
        const isLoggedIn = await magic.user.isLoggedIn();

        if (isLoggedIn) {
          console.log("Success! User logged in via email");
          navigate("/dashboard");
        } else {
          console.log("Login Failed via email");
        }
      }
      // Error handling for email login
    } catch (err) {
      console.error("Error during email login:", err); 
    }
  }, [navigate]);

  const handleSocialLogin = useCallback(async () => {
  try {
    // Mark for OAuth Redirect
    localStorage.setItem("isOauthRedirect", true);  
    console.log("init google auth");
    
    // Google OAuth login with correct scopes and redirect URI
    await magic.oauth2.loginWithRedirect({
      provider: 'google',
      //This should point to the current domain.
      redirectURI: "https://auth.magic.link/v1/oauth2/wOxhmYizUGCglqt6rm80A_xTWmYPdWlFeQ5oj4yi9VU=/callback",  //This should point to the current domain.
      scope: ['openid', 'email', 'profile'],
    });
    

    console.log("OAuth redirect triggered");
  } catch (err) {
    console.error("Google OAuth error:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
  }
}, []);

  return (
    <div className="container">
      <h1>Welcome to Magic</h1>
      
      {/* Button for email OTP login */}
      <button onClick={handleEmailOtpLogin}>
        Login with Email OTP
      </button>

      <br />

      {/* Button for Google OAuth login */}
      <button onClick={handleSocialLogin}>
        <FaGoogle size={"2.5rem"} />
        Log in with Google
      </button>
    </div>
  );
};

export default Login;


