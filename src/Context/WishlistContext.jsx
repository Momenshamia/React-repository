import { createContext, useEffect, useState } from "react";
import Products from './../Components/Products/Products';
import axios from "axios";



export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    let headers = { token: localStorage.getItem("userToken"), };
    const [ wishlistId, setwishlistId] = useState(0)
    const [numberOfItems, setnumberOfItems] = useState(0)

    function addProductToWishlist(productId) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,  { productId: productId }, {headers, })

            .then((res) => res)
            .catch((err) => err);

    }

    function getLoggedUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((res) => {
                console.log(res.data.data);  
                setnumberOfItems(res.data.data)
                setwishlistId(res.data.data.id)
                return res

            })
            .catch((err) => err);

    }


    function updateWishlistProductQuantity(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { count: newCount }, { headers })
            .then((res) => res)
            .catch((res) => err);

    }

    function deleteWishlistItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then((res) => res)
            .catch((res) => err);
    }



    // function checkout(cardId, url, formData) {
    //     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`, { shippingAddress: formData }, { headers })
    //         .then((res) => res)
    //         .catch((res) => err);
    // }

    useEffect(() => {
        getLoggedUserWishlist()
    }, [])

    return <WishlistContext.Provider value={{
        // checkout,
        deleteWishlistItem,
        addProductToWishlist,
        getLoggedUserWishlist,
        updateWishlistProductQuantity,
        wishlistId,
        numberOfItems,
        setnumberOfItems, 


    }}>
        {props.children}
    </WishlistContext.Provider>

}