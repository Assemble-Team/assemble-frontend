/**
 * [Frontend Type] 나의 게시글 (Post)
 */
export interface MyPost {
  id: number;
  groupId: number;
  groupName: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  commentCount: number;
  likeCount: number;
  createdAt: string;
}

/**
 * [Frontend Type] 나의 댓글 (Comment)
 */
export interface MyComment {
  id: number;
  groupId: number;
  groupName: string;
  postId: number;
  postTitle: string;
  content: string;
  likeCount: number;
  createdAt: string;
}
