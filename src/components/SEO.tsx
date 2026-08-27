import { Helmet } from 'react-helmet-async';

export function SEO() {
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "SoftwareApplication",
    "name": "MediaFlux",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "description": "All-in-One Media Downloader Toolkit for YouTube, Instagram, and more.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqJSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is MediaFlux free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our basic downloader tools are completely free to use for personal downloads. We also offer a Pro tier for batch processing."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download 4K videos from YouTube?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our Universal Video Downloader supports extracting videos in 720p, 1080p, and up to 4K resolution when available."
        }
      },
      {
        "@type": "Question",
        "name": "Does MediaFlux support Instagram Reels?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Switch the toggle to Instagram mode and paste your Reel URL to download high-quality videos instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Are there limits on how many MP3s I can convert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free users can extract up to 10 MP3s per day at 320kbps. Pro users have unlimited conversion limits."
        }
      }
    ]
  };

  return (
    <Helmet>
      <title>MediaFlux | All-in-One Media Downloader Toolkit</title>
      <meta name="description" content="Download high-quality videos, shorts, reels, and MP3s from YouTube and Instagram instantly with MediaFlux. Your ultimate media toolkit." />
      <meta name="keywords" content="video downloader, youtube downloader, instagram reels downloader, mp3 extractor, media tools" />
      
      {/* Open Graph */}
      <meta property="og:title" content="MediaFlux | All-in-One Media Downloader Toolkit" />
      <meta property="og:description" content="Download high-quality videos, shorts, reels, and MP3s from YouTube and Instagram instantly with MediaFlux." />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MediaFlux" />
      
      {/* Schema.org */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
      <script type="application/ld+json">{JSON.stringify(faqJSONLD)}</script>
    </Helmet>
  );
}
