import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "../src/providers/SessionProvider";
import { Toaster } from "../src/components/ui/sonner";

export const metadata: Metadata = {
  title: "Quick Chat App",
  description: "TO Chatting quick as possible without any login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className="min-h-screen bg-background font-sans antialiased">
          {children}
          <Toaster richColors duration={5000} />
        </body>
      </SessionProvider>
    </html>
  );
}
