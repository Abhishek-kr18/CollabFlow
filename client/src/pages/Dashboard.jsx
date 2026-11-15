
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.user);
      } catch (err) {
        sessionStorage.removeItem("token");
        setError("Session expired. Please log in again.");
        navigate("/login", { replace: true });
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>CollabFlow Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>You are successfully logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading your profile...</p>
      )}
    </div>
  );
}

export default Dashboard;
