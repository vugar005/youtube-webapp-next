import { useState, useCallback, useDebugValue } from 'react';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/app.constants';
import { IYoutubeSearchItem } from '../models/youtube-search-list.model';
import { IYoutubeSearchParams } from '../models/youtube-video-list-params';

export const useSearchList = () => {
  const [data, setData] = useState<IYoutubeSearchItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useDebugValue(data);

  const fetchSeachItems = useCallback(async (params: IYoutubeSearchParams): Promise<IYoutubeSearchItem[] | undefined> => {
    const { query } = params
    if(!query) { return;}
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/searchlist?q=${query}`);
      setData(response.data.items);
      return response.data.items;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error);
      } else {
        throw (error);
      }
    } finally {
      setIsLoading(false);
    }

  }, []);

  return { fetchSeachItems, searchItems: data, isSearchItemsLoading: isLoading, searchItemsError: error };
};
