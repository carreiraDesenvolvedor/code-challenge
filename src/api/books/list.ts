import { ApiEndpoints } from '../endpoints';
import {
  IApiRequest,
  IApiRequestReponse,
  apiRequest,
} from '../sendApiRequest';

export interface IApiBooksListResponse {
  title: string;
}
[];

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
