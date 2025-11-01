// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

// Create context
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ Ensure token is always attached to axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    } else {
      delete axios.defaults.headers.common["token"];
    }
  }, [token]);

  // ✅ Check authentication
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Login or Signup
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);

        // Save token
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["token"] = data.token;
        toast.success(data.message);
      
      } 
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    if (socket) socket.disconnect();
    toast.success("Logged out successfully");
  };

  // ✅ Update profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Connect socket
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  // ✅ Run checkAuth on mount
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token]);

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
