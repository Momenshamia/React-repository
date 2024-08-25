import { createContext, useEffect, useState } from "react";
import Products from './../Components/Products/Products';
import axios from "axios";



export let CartContext = createContext();

export default function CartContextProvider(props) {
    let headers = { token: localStorage.getItem("userToken"), };
    const [cartId, setcartId] = useState(0)
    const [numberItems, setnumberItems] = useState(0)

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: productId, },
            {
                headers,
            }
        )

            .then((res) => res)
            .catch((err) => err);

    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => {
                // console.log(res.data.numOfCartItems);  
                setnumberItems(res.data.numOfCartItems)
                setcartId(res.data.data._id)
                return res

            })
            .catch((err) => err);

    }


    function updateCartProductQuantity(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newCount }, { headers })
            .then((res) => res)
            .catch((res) => err);

    }

    function deleteCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((res) => res)
            .catch((res) => err);
    }



    function checkout(cardId, url, formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`, { shippingAddress: formData }, { headers })
            .then((res) => res)
            .catch((res) => err);
    }

    useEffect(() => {
        getLoggedUserCart()
    }, [])

    return <CartContext.Provider value={{
        checkout,
        deleteCartItem,
        addProductToCart,
        getLoggedUserCart,
        updateCartProductQuantity,
        cartId,
        numberItems,
        setnumberItems, 


    }}>
        {props.children}
    </CartContext.Provider>

}