import { VaultImage } from "./types";

// Mock dataset. Replace with /api/images and /api/search responses.
export const mockGallery: VaultImage[] = [
  { id: "1", url: "https://picsum.photos/seed/vv1/600/800", caption: "Cricket stadium at dusk, floodlights on", width: 600, height: 800, createdAt: "2026-05-02" },
  { id: "2", url: "https://picsum.photos/seed/vv2/800/600", caption: "Crowd cheering in stadium stands", width: 800, height: 600, createdAt: "2026-05-02" },
  { id: "3", url: "https://picsum.photos/seed/vv3/700/700", caption: "Empty mountain trail at sunrise", width: 700, height: 700, createdAt: "2026-05-03" },
  { id: "4", url: "https://picsum.photos/seed/vv4/600/900", caption: "City street at night, neon reflections", width: 600, height: 900, createdAt: "2026-05-04" },
  { id: "5", url: "https://picsum.photos/seed/vv5/900/600", caption: "Close-up of cricket ball on grass", width: 900, height: 600, createdAt: "2026-05-04" },
  { id: "6", url: "https://picsum.photos/seed/vv6/650/800", caption: "Coastal cliffs under heavy fog", width: 650, height: 800, createdAt: "2026-05-05" },
  { id: "7", url: "https://picsum.photos/seed/vv7/800/800", caption: "Studio portrait, soft window light", width: 800, height: 800, createdAt: "2026-05-06" },
  { id: "8", url: "https://picsum.photos/seed/vv8/700/950", caption: "Crowded market street, motion blur", width: 700, height: 950, createdAt: "2026-05-06" },
  { id: "9", url: "https://picsum.photos/seed/vv9/900/700", caption: "Stadium aerial view, full crowd", width: 900, height: 700, createdAt: "2026-05-07" },
  { id: "10", url: "https://picsum.photos/seed/vv10/600/750", caption: "Quiet library reading room", width: 600, height: 750, createdAt: "2026-05-07" },
  { id: "11", url: "https://picsum.photos/seed/vv11/750/600", caption: "Surfer paddling into open water", width: 750, height: 600, createdAt: "2026-05-08" },
  { id: "12", url: "https://picsum.photos/seed/vv12/600/820", caption: "Old film camera on wooden desk", width: 600, height: 820, createdAt: "2026-05-08" },
];

export const mockSearchResults: VaultImage[] = [
  { id: "1", url: "https://picsum.photos/seed/vv1/600/800", caption: "Cricket stadium at dusk, floodlights on", similarity: 0.94, width: 600, height: 800, createdAt: "2026-05-02" },
  { id: "9", url: "https://picsum.photos/seed/vv9/900/700", caption: "Stadium aerial view, full crowd", similarity: 0.89, width: 900, height: 700, createdAt: "2026-05-07" },
  { id: "2", url: "https://picsum.photos/seed/vv2/800/600", caption: "Crowd cheering in stadium stands", similarity: 0.86, width: 800, height: 600, createdAt: "2026-05-02" },
  { id: "5", url: "https://picsum.photos/seed/vv5/900/600", caption: "Close-up of cricket ball on grass", similarity: 0.71, width: 900, height: 600, createdAt: "2026-05-04" },
  { id: "8", url: "https://picsum.photos/seed/vv8/700/950", caption: "Crowded market street, motion blur", similarity: 0.42, width: 700, height: 950, createdAt: "2026-05-06" },
];
