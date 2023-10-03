import React, { useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import {
  Container,
  ProductsArea,
  BodyStyle,
  ContainerHeader,
  LogoutButton,
} from "./HomeStyles";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import { toast } from "react-toastify";

const Home = () => {
  const { signout, createProduct } = useAuth();
  const [error, setError] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kombu Alga Marinha Desidratada 150g ",
      price: 39.99,
      thumbnail:
        "http://http2.mlstatic.com/D_978643-MLB48664838187_122021-I.jpg",
    },
    {
      id: 2,
      name: "Feijão Carioca Tipo 1 Camil Pacote 1kg",
      price: 13.65,
      thumbnail:
        "http://http2.mlstatic.com/D_856458-MLU47586915559_092021-I.jpg",
    },
    {
      id: 3,
      name: "Biscoito Amanteigado Com Gotas De Chocolate Santa Edwiges Pacote 90g",
      price: 5.99,
      thumbnail:
        "http://http2.mlstatic.com/D_992697-MLU50137475081_052022-I.jpg",
    },
    {
      id: 4,
      name: "Sabão Em Pó Lavagem Perfeita Ativo Concentrado 2,2kg Omo",
      price: 24.89,
      thumbnail:
        "http://http2.mlstatic.com/D_989655-MLU69496907615_052023-I.jpg",
    },
    {
      id: 5,
      name: "Água Sanitária Super Candida 5 L",
      price: 20.79,
      thumbnail:
        "http://http2.mlstatic.com/D_735190-MLA44333406596_122020-I.jpg",
    },
    {
      id: 6,
      name: "Panetone De Frutas Cristalizadas E Uva Passas Bauducco 908g",
      price: 41.99,
      thumbnail:
        "http://http2.mlstatic.com/D_663958-MLB51571295879_092022-I.jpg",
    },
    {
      id: 7,
      name: "Azeite Chileno Extra Virgem O-live 500ml",
      price: 29.39,
      thumbnail:
        "http://http2.mlstatic.com/D_771258-MLU48211023701_112021-I.jpg",
    },
  ]);
  const [cart, setCart] = useState([]);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const price = e.target.price.value;
    const thumbnail = e.target.thumbnail.value;

    if (!name || !price || !thumbnail) {
      console.log(name, price, thumbnail);
      setError("Preencha todos os campos corretamente.");
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    const result = await createProduct({
      name,
      price,
      thumbnail_url: thumbnail,
    });
    if (!result[0]) {
      toast.error(result[1]);
      return;
    }
    toast.success(result[1]);
  };

  const handleOnclick = (product) => {
    const element = cart.find((e) => e.id === product.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== product.id);
      setCart(arrFilter);
    } else {
      setCart([...cart, product]);
    }
  };

  return (
    <BodyStyle>
      <Container>
        <LogoutButton onClick={() => signout()}>Logout</LogoutButton>

        <h1>Produtos</h1>
        <button onClick={() => setShowCreateProduct(!showCreateProduct)}>
          {showCreateProduct ? "Ocultar Formulário" : "Criar Produto"}
        </button>

        {/* Renderizar o formulário de criação de produtos condicionalmente */}
        {showCreateProduct && (
          <div>
            <h2>Criar Novo Produto</h2>
            <form onSubmit={(e) => handleSubmitProduct(e)}>
              <div>
                <label htmlFor="name">Título (até 50 caracteres):</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  maxLength="50"
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Preço:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  maxLength="5"
                  required
                />
              </div>
              <div>
                <label htmlFor="thumbnail">
                  URL da Imagem ( 100px x 100px ):
                </label>
                <input type="url" id="thumbnail" name="thumbnail" required />
              </div>
              <button type="submit">Criar Produto</button>
            </form>
          </div>
        )}

        <ProductsArea>
          {products.map((product) => (
            <div key={product.id} className="product">
              <h4>{product.name}</h4>
              <img src={product.thumbnail} alt={product.name} />
              <p>R$ {product.price}</p>
              <button onClick={() => handleOnclick(product)}>
                {cart.some((itemCart) => itemCart.id === product.id) ? (
                  <AiFillMinusCircle />
                ) : (
                  <AiFillPlusCircle />
                )}
              </button>
            </div>
          ))}
        </ProductsArea>
      </Container>
    </BodyStyle>
  );
};

export default Home;
