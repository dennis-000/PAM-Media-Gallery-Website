import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'PAM Media | Fine Art Photography & Cinematic Media — Ghana',
  description: 'Premiere creative media company based in Ghana. Specializing in luxury weddings, corporate executive branding, editorial portraiture, and high-profile events.',
  keywords: ['Ghana Photographer', 'Accra Wedding Photography', 'Luxury Wedding Ghana', 'Corporate Photographer Accra', 'PAM Media', 'Ghana Videography'],
  openGraph: {
    title: 'PAM Media | Luxury Photography & Media — Ghana',
    description: 'Photography is storytelling. Craftsmanship, elegance, and emotional storytelling for weddings, corporate, and fine art portraits.',
    url: 'https://pammedia.com',
    siteName: 'PAM Media',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian text-parchment antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
