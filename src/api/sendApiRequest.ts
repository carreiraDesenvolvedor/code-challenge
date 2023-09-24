import { ApiEndpoints } from './endpoints';

const makeRequest = (path: string, method: string) => {
  const URL = `${process.env.REACT_APP_API_URL}/${path}`;
  return fetch(URL, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export interface IResponseError {
  errorType: string;
  messages: {
    property: string;
    messages: string[];
  }[];
}

export interface IResponseError {
  errorType: string;
}

export interface IApiRequestReponse<Success> {
  onSuccess: (response: Success) => void;
  onError: (response: IResponseError) => void;
}

export interface IApiRequest<Success>
  extends IApiRequestReponse<Success> {
  endpoint: string;
}

export const apiRequest = async <Success>({
  endpoint,
  onSuccess,
  onError,
}: IApiRequest<Success>) => {
  return makeRequest(endpoint, 'GET')
    .then(async (response) => {
      const data = await response.json();
      if (response.status !== 200) {
        onError(data as IResponseError);
      } else {
        onSuccess(data);
      }
    })
    .catch((error) => {
      onError(error as IResponseError);
    });
};
