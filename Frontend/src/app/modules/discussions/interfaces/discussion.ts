export interface Discussion {
  discussionId?: number;
  comments?: any[];
  discussion: Discussion;
  userId: number;
  title: string;
  content: string;
}
