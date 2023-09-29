import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "./img/bf.png";
import axios from "axios"; // Importe o Axios se você não o tiver feito ainda

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      // Faça uma solicitação POST para o endpoint de registro no seu backend
      const response = await axios.post("URL_DO_SEU_BACKEND/registro", {
        name,
        email,
        senha,
      });

      // Verifique se o registro foi bem-sucedido no seu backend
      if (response.status === 200) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      } else {
        setError("Ocorreu um erro durante o registro. Tente novamente.");
      }
    } catch (error) {
      setError("Ocorreu um erro durante o registro. Tente novamente.");
    }
  };

  return (
    <C.Container>
      <img src={Logo} alt="" title="Logo" />
      <C.Content>
        <Input
          type="text" 
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />

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
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
