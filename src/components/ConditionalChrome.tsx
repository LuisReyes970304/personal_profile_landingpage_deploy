"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

const HIDDEN_CHROME_PREFIXES = ["/contact_me"];

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_CHROME_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (hideChrome) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
