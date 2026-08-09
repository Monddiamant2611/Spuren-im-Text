import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lernwerkstatt Games",
  description: "Modulare Lernspiele für Dramatik, Epik und Lyrik",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
