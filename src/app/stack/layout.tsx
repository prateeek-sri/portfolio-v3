import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack | Prateek",
  description: "A list of tools I use and have experience with.",
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
