import { Globe, Twitter } from 'lucide-react';
import type { AuthorProfile } from '../../types/models';
import ThemeToggle from '../ui/ThemeToggle';

interface ShowcaseLayoutProps {
  author: AuthorProfile;
  children: React.ReactNode;
}

export default function ShowcaseLayout({ author, children }: ShowcaseLayoutProps) {
  const displayName = author.penName || `${author.user?.firstName ?? ''} ${author.user?.lastName ?? ''}`.trim();
  const avatarUrl = author.photoUrl || author.user?.avatarUrl;

  return (
    <div className="min-h-screen bg-surface-dim transition-colors">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header - Dark Hero Gradient */}
      <header className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/15 rounded-full blur-[80px]" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-accent/15 rounded-full blur-[80px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-8">
            {/* Avatar with glow */}
            <div className="relative animate-fade-up">
              <div className="absolute -inset-1.5 rounded-full bg-primary/20 blur-lg" />
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="relative h-28 w-28 rounded-full border-4 border-white/10 object-cover shadow-xl ring-4 ring-primary/20"
                />
              ) : (
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/10 bg-white/10 text-4xl font-display font-bold shadow-xl backdrop-blur-sm ring-4 ring-primary/20">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Author info */}
            <div className="mt-5 sm:mt-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <p className="text-xs font-medium text-primary-300 uppercase tracking-widest">Vitrine de l'auteur</p>
              <h1 className="font-display text-3xl font-bold sm:text-4xl mt-1">{displayName}</h1>
              {author.bio && (
                <p className="mt-3 max-w-xl text-sm text-white/70 leading-relaxed line-clamp-2">{author.bio}</p>
              )}
              <div className="mt-4 flex items-center justify-center gap-4 sm:justify-start">
                {author.website && (
                  <a href={author.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-primary-300 transition-colors"
                  >
                    <Globe size={14} /> Site web
                  </a>
                )}
                {author.twitter && (
                  <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-primary-300 transition-colors"
                  >
                    <Twitter size={14} /> @{author.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer - Dark gradient */}
      <footer className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 pattern-african" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/50">
            Propulse par <span className="font-display font-semibold text-primary-400">Papers</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
