import React, {useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import { AiFillMinusCircle, AiFillPlusCircle} from 'react-icons/ai';
import { getItem , setItem } from "../../contexts/LocalStorageFuncs";
import { ProductsArea } from "./styles";


    



const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState( getItem('carrinhoBf') || []);
  

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://api.mercadolibre.com/sites/MLB/search?q=mercado';
      const response = await fetch(url);
      const objJson = await response.json()
      setData(objJson.results)
    }
    fetchApi();
  },[])

  const handleOnclick = (obj) => {
    const element = cart.find((e) => e.id == obj.id)
    if(element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id)
      setCart(arrFilter)
      setItem('carrinhoBf', arrFilter)
    } else {
      setCart([...cart,obj])
      setItem('carrinhoBf', [...cart,obj])
    }
  }
  


  return (
    
    <C.Container>
     <ProductsArea>
        
      {
              
        data.map((e) =>(
          
          <div key={e.id}>
          <h4>{e.title}</h4>
          <img src={e.thumbnail}></img>
          <h4>${e.price}</h4>
          <button onClick={() => handleOnclick(e)}>
            {
              cart.some((itemCart) => itemCart.id == e.id) ? (
                <AiFillMinusCircle/>
              ) : (
                <AiFillPlusCircle/>
              )
            }
          </button>

          </div>
          
        ))
      }
     </ProductsArea>
    </C.Container>
    
    
  );
};

export default Home;
