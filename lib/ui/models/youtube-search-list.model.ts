import { IYoutubePageInfo, IYoutubeThumbnailDetail } from './youtube-common.model';

export interface IYoutubeSearchResult {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: IYoutubePageInfo;
  items?: IYoutubeSearchItem[];
}

export interface IYoutubeSearchItem {
  kind?: string | null;
  etag?: string | null;
  id?: IYoutubeSearchId;
  snippet: IYoutubeSearchSnippet;
}

export interface IYoutubeSearchId {
  kind?: string;
  videoId: string;
}

export interface IYoutubeSearchSnippet {
  publishedAt: any;
  channelId?: string;
  title: string;
  description: string;
  thumbnails: IYoutubeSearchThumbnail;
  channelTitle?: string;
  liveBroadcastContent?: string | null;
  publishTime?: any;
}

export interface IYoutubeSearchThumbnail {
  default: IYoutubeThumbnailDetail;
  medium: IYoutubeThumbnailDetail;
  high: IYoutubeThumbnailDetail;
}