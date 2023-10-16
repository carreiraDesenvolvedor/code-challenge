import { ApiEndpoints } from '../endpoints';
import {
  IApiRequestReponse,
  apiRequest,
} from '../sendApiRequest';

export interface IApiBookItem {
  id: number;
  title: string;
  formats: {
    'image/jpeg': string;
  };
  authors: {
    name: string;
  }[];
}
export interface IApiBooksListResponse {
  count: number;
  results: IApiBookItem[];
}

interface IApiBooksListRequest
  extends IApiRequestReponse<IApiBooksListResponse> {
  page: number;
}

export const apiBooksListRequest = ({
  onSuccess,
  onError,
  page,
}: IApiBooksListRequest) => {
  return apiRequest({
    endpoint: `${ApiEndpoints.books.list}${page}`,
    onSuccess,
    onError,
  });
};
