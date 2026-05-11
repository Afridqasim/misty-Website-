import ArticleContent from "./ArticleContent";

export function generateStaticParams() {
  // Return at least one param to satisfy the build, even if dummy
  // The actual fetching happens on the client side
  return [{ slug: 'index' }];
}

export default function Page() {
  return <ArticleContent />;
}
