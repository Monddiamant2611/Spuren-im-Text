import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Das Literatur-Archiv",
  description: "Grundlagen der Arbeit mit Literatur",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
