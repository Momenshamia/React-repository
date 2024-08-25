import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query';


export default function useProducts() {
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let productInfo = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getProducts,
        staleTime: 7000,
        // gcTime: 4000,
        // retry: 6,
        // retryDelay: 6000,
        // refetchInterval:2000,
        // refetchIntervalInBackground: true,
        // refetchOnWindowFocus: true,
    });

    return productInfo
}
