import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Institutions of One",
  description: "Sign in to return to saved Institutions of One assessment results.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
