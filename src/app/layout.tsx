import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter, Anton } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
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
    <html lang="en" className={`${bricolage.variable} ${inter.variable} ${anton.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
