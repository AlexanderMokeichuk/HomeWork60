export interface ResponseFromServer {
  _id: string;
  author: string;
  datetime: string;
  message: string;
}

export interface PostToServer {
  author: string;
  message: string;
}