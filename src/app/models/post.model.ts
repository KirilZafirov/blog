export interface PostResponse {
  post: Post,
  status: string;
}
export interface Post {
  title: string;
  body: string;
}

export interface PostFormModel {
  postId: number;
}

