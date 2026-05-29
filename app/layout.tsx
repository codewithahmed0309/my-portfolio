import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CursorGlow from "@/components/CursorGlow";

export const metadata = {
  title: "My Portfolio",
  description: "Cinematic Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <CursorGlow />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}