/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import axios from 'axios';

import { useUserImageStore } from '../stores/useImageStore';

import { initImageData, ImageData } from '../types/card';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = '2kIVyFKuQdmcjm4wkWYAS1jjR874aoAMGE64ci4Cevc';
const PER_PAGE = 30;


export default  function useImageDate() {
  const [imageDate, setImageDate] = useState<ImageData>(initImageData); 
  const page = useUserImageStore((state) => state.page); 
  const query = useUserImageStore((state) => state.query); 

  const getApiDate = async () => {
    try {
      const res = await axios(API_URL, {
        params: {
          client_id: API_KEY,
          query,
          page,
          per_page: PER_PAGE,
        },
      });

      if(res.status === 200){
        console.log(res.data);
        setImageDate(res.data);
      }
    
    } catch {
      console.log('Unsplash Date fetching error');
    }
  };

  useEffect(() => {
    getApiDate();
  }, [page, query]);

  return imageDate
}