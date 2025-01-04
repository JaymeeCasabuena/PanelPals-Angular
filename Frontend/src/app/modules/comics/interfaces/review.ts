export interface Review {
  ComicId: number;
  UserId: number;
  Username?: string;
  Avatar?: string;
  ReviewText: string;
  Rating: number;
}
