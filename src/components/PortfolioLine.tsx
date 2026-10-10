import { PORTFOLIO_LABEL, PORTFOLIO_URL } from "@/lib/site";

// One plain line under a source list: "Part of RN Collins, selected work". Opens RN's portfolio in a new tab, like the site's other outside links.
export function PortfolioLine() {
  return <p className="portfolio-line">Part of <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">{PORTFOLIO_LABEL}<span className="sr-only"> (opens in a new tab)</span></a></p>;
}
