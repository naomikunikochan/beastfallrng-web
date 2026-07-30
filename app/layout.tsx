import "./globals.css";
import PublicChrome from "@/components/PublicChrome";
import Script from "next/script";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N5SZ6NQL');`}
        </Script>
      </head>
      <body className="bg-black text-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N5SZ6NQL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PublicChrome />
        {children}
      </body>
    </html>
  );
}
