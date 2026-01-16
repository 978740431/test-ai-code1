import "./globals.css";

// Fix: Removed explicit 'Metadata' type annotation to resolve import error.
// Next.js automatically detects the 'metadata' export in the App Router.
export const metadata = {
  title: "Invoice Mate - Management Dashboard",
  description: "High-performance enterprise invoice management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-hidden h-screen">{children}</body>
    </html>
  );
}
