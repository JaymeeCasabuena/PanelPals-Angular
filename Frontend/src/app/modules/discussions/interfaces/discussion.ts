export interface Discussion {
  userId: number;
  title: string;
  content: string;
}

export interface DiscussionDetails {
  comments: any[];
  discussion: any;
  userId: number;
  title: string;
  content: string;
}
