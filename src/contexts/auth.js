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
        toast.error("Usuário ou senha incorretos, tente novamente!");
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

  const signup = async (name, email, password) => {
    const response = await api
      .post("/user", {
        name,
        email,
        password,
      })
      .catch((err) => {
        console.log(err);
      });

    if (!response) {
      return [
        false,
        "Ocorreu um problema no servidor, tente novamente mais tarde!",
      ];
    }

    return [true, "Usuário registrado com sucesso!"];
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("users_bd");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
