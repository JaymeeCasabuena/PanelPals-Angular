export interface Review {
  ReviewId?: number;
  ComicId: number;
  UserId: number;
  Username?: string;
  Avatar?: string;
  ReviewText: string;
  Rating: number;
}
