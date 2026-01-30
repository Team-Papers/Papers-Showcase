import { Globe, Twitter } from 'lucide-react';
import type { AuthorProfile } from '../../types/models';

interface ShowcaseLayoutProps {
  author: AuthorProfile;
  children: React.ReactNode;
}

export default function ShowcaseLayout({ author, children }: ShowcaseLayoutProps) {
  const displayName = author.penName || `${author.user?.firstName ?? ''} ${author.user?.lastName ?? ''}`.trim();
  const avatarUrl = author.photoUrl || author.user?.avatarUrl;

  return (
    <div className="min-h-screen bg-surface-dim">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-on-primary">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-6">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-24 w-24 rounded-full border-4 border-white/20 object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-3xl font-bold shadow-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="mt-4 sm:mt-0">
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Exposition</p>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">{displayName}</h1>
              {author.bio && (
                <p className="mt-2 max-w-xl text-sm text-white/80 leading-relaxed line-clamp-2">{author.bio}</p>
              )}
              <div className="mt-3 flex items-center justify-center gap-4 sm:justify-start">
                {author.website && (
                  <a href={author.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
                    <Globe size={14} /> Site web
                  </a>
                )}
                {author.twitter && (
                  <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
                    <Twitter size={14} /> @{author.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-outline bg-surface py-6 text-center text-sm text-on-surface-variant">
        Propulse par <span className="font-semibold text-primary">Paper's</span>
      </footer>
    </div>
  );
}
