import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Prateek",
  description: "A complete archive of projects and software tools I have crafted.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
