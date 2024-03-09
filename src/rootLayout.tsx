export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          {/* Layout UI */}
          <main className="bg-red-400">{children}</main>
        </body>
      </html>
    )
  }