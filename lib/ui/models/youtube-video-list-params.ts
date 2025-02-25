
export interface IYoutubeSearchParams {
  query: string;
  maxResults?: number;
  safeSearch?: 'none' | 'moderate' | 'strict';
}

export interface IYoutubeVideoListParams {
  query?: string;
  part?: string;
  id?: string;
}