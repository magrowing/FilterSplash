/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import axios from 'axios';

import { useUserImageStore } from '../stores/useImageStore';

import { CardDTO } from '../types/card';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = '2kIVyFKuQdmcjm4wkWYAS1jjR874aoAMGE64ci4Cevc';
const PER_PAGE = 30;

export default function useImageDate() {
  const [imageDate, setImageDate] = useState<CardDTO[]>([]);
  const page = useUserImageStore((state) => state.page);
  const query = useUserImageStore((state) => state.query);
  const [hasMore, setHasMore] = useState(true);

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

      if (res.status === 200) {
        console.log(res.data);
        console.log(page);

        if (page === 1) {
          setImageDate([...res.data.results]);
        } else {
          setImageDate((prev) => [...prev, ...res.data.results]);
        }

        if (page === res.data.total_pages) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    } catch {
      console.log('Unsplash Date fetching error');
    }
  };

  useEffect(() => {
    getApiDate();
  }, [page, query]);

  return { imageDate, hasMore };
}
