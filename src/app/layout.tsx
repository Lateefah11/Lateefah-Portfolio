import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "next-themes"
import { Sidebar } from "@/components/ui/sidebar-nav"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const headingFont = localFont({
  src: "../fonts/GeneralSans-Medium.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Lateefah Abdulrahman — Product Designer",
  description:
    "Product designer who untangles complex problems and turns them into thoughtful, scalable digital experiences.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} ${headingFont.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#202020] text-white overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Sidebar />
          <div className="md:pl-[264px]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
