export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string | null;
  services: string | null;
  size: string | null;
  challenge: string | null;
  result: string | null;
  image_url: string | null;
  seo_title: string | null;
  seo_desc: string | null;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  author: string | null;
  read_time: string | null;
  image_url: string | null;
  seo_title: string | null;
  seo_desc: string | null;
  created_at: string;
}
