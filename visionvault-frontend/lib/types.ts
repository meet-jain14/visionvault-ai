export type VaultImage = {
  id: string;
  url: string;
  caption: string;
  similarity?: number; // 0–1, present on search results
  width: number;
  height: number;
  createdAt: string;
};
