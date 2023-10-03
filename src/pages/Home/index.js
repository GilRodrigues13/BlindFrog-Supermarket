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

const Home = () => {
  const { signout } = useAuth();
  const [error, setError] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Kombu Alga Marinha Desidratada 150g ",
      price: 39.99,
      thumbnail:
        "http://http2.mlstatic.com/D_978643-MLB48664838187_122021-I.jpg",
    },
    {
      id: 2,
      title: "Feijão Carioca Tipo 1 Camil Pacote 1kg",
      price: 13.65,
      thumbnail:
        "http://http2.mlstatic.com/D_856458-MLU47586915559_092021-I.jpg",
    },
    {
      id: 3,
      title:
        "Biscoito Amanteigado Com Gotas De Chocolate Santa Edwiges Pacote 90g",
      price: 5.99,
      thumbnail:
        "http://http2.mlstatic.com/D_992697-MLU50137475081_052022-I.jpg",
    },
    {
      id: 4,
      title: "Sabão Em Pó Lavagem Perfeita Ativo Concentrado 2,2kg Omo",
      price: 24.89,
      thumbnail:
        "http://http2.mlstatic.com/D_989655-MLU69496907615_052023-I.jpg",
    },
    {
      id: 5,
      title: "Água Sanitária Super Candida 5 L",
      price: 20.79,
      thumbnail:
        "http://http2.mlstatic.com/D_735190-MLA44333406596_122020-I.jpg",
    },
    {
      id: 6,
      title: "Panetone De Frutas Cristalizadas E Uva Passas Bauducco 908g",
      price: 41.99,
      thumbnail:
        "http://http2.mlstatic.com/D_663958-MLB51571295879_092022-I.jpg",
    },
    {
      id: 7,
      title: "Azeite Chileno Extra Virgem O-live 500ml",
      price: 29.39,
      thumbnail:
        "http://http2.mlstatic.com/D_771258-MLU48211023701_112021-I.jpg",
    },
  ]);
  const [cart, setCart] = useState([]);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const handleCreateProduct = (newProduct) => {
    const img = new Image();
    img.src = newProduct.thumbnail;
    img.onload = function () {
      if (img.width <= 100 && img.height <= 100) {
        newProduct.thumbnail = img.src;
        setProducts([...products, newProduct]);
        setShowCreateProduct(false); // Feche o formulário após a criação
      } else {
        alert("A imagem é muito grande. Máximo permitido: 100x100 pixels");
      }
    };
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
        <LogoutButton onClick={() => signout()}>Sair</LogoutButton>

        <h1>Produtos</h1>
        <button onClick={() => setShowCreateProduct(!showCreateProduct)}>
          {showCreateProduct ? "Ocultar Formulário" : "Criar Produto"}
        </button>

          {/* Renderizar o formulário de criação de produtos condicionalmente */}
      {showCreateProduct && (
        <div>
          <h2>Criar Novo Produto</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newProduct = {
                id: Date.now(), // Gere um ID único
                title: e.target.title.value.slice(0,50),
                price: parseFloat(e.target.price.value),
                thumbnail: e.target.thumbnail.value,
              };
             
              handleCreateProduct(newProduct);
              }
            }
          >
            <div>
              <label htmlFor="title">Título (até 50 caracteres):</label>
              <input type="text" id="title" name="title" maxLength="50" required/>
            </div>
            <div>
              <label htmlFor="price">Preço:</label>
              <input type="number" id="price" name="price" maxLength="5"  required />
            </div>
            <div>
              <label htmlFor="thumbnail">URL da Imagem ( 100px x 100px ):</label>
              <input type="url" id="thumbnail" name="thumbnail" required />
            </div>
            <button type="submit">Criar Produto</button>
          </form>
        </div>
      )}

      <ProductsArea>
        {products.map((product) => (
          <div key={product.id} className="product">
            <h4>{product.title}</h4>
            <img src={product.thumbnail} alt={product.title} />
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