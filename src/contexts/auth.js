import { createContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      setUser(JSON.parse(usersStorage));
    }
  }, []);

  const signin = async (email, password) => {
    const response = await api
      .post("/login", { email, password })
      .catch((err) => {
        console.log(err);
      });

    if (!response) {
      toast.error("Usuário ou senha incorretos, tente novamente!");
      return;
    }

    const { access_token } = response.data;

    localStorage.setItem("user_token", JSON.stringify({ access_token }));
    localStorage.setItem("users_bd", JSON.stringify({ email }));

    toast.success("Logado com sucesso!");
  };

  const signup = async (email, password) => {
    try {
      // Faça uma solicitação POST para o endpoint de registro no seu backend
      const response = await axios.post("URL_DO_SEU_BACKEND/registro", {
        email,
        password,
      });

      if (response.status === 200) {
        return null; // Retorne nulo se o registro for bem-sucedido
      } else {
        return "Ocorreu um erro durante o registro. Tente novamente.";
      }
    } catch (error) {
      return "Ocorreu um erro durante o registro. Tente novamente.";
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
