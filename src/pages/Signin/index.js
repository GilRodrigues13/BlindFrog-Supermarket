import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "./img/bf.png";
import axios from "axios"; // Importe a biblioteca Axios

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!isValidEmail(email) || !senha) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      // Faça uma solicitação POST para o endpoint de login no seu backend
      const response = await axios.post("URL_DO_SEU_BACKEND/login", {
        email,
        senha,
      });

      // Verifique se o login foi bem-sucedido no seu backend
      if (response.status === 200) {
        // Faça a autenticação do usuário no front-end, por exemplo, usando a função `signin` do seu contexto de autenticação
        signin(email, senha);

        // Redirecione o usuário para a página de home após o login
        navigate("/home");
      } else {
        setError("Email ou senha incorretos.");
      }
    } catch (error) {
      setError("Ocorreu um erro durante o login. Tente novamente.");
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  return (
    <C.Container>
      <img src={Logo} alt="" title="Logo" />

      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
