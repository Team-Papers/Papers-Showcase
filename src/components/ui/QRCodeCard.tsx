import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Download } from 'lucide-react';

interface QRCodeCardProps {
  bookId: string;
}

export default function QRCodeCard({ bookId }: QRCodeCardProps) {
  const appUrl = `https://papers.seed-innov.com/book/${bookId}`;

  return (
    <div className="qr-card group">
      {/* Header */}
      <div className="flex items-center justify-center gap-2.5 text-sm font-semibold text-on-surface mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-container">
          <Smartphone size={16} className="text-primary" />
        </div>
        <span className="font-display">Acheter sur l'app</span>
      </div>

      {/* QR Code with glow border */}
      <div className="relative mx-auto w-fit">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 opacity-15 blur-sm group-hover:opacity-30 transition-opacity duration-300" />
        <div className="relative rounded-xl bg-white p-4 shadow-sm">
          <QRCodeSVG
            value={appUrl}
            size={140}
            level="M"
            fgColor="#004D5A"
            bgColor="transparent"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 space-y-2">
        <p className="text-xs text-on-surface-muted">
          Scannez pour ouvrir dans Papers Mobile
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors">
          <Download size={12} />
          <span>Telecharger l'app</span>
        </div>
      </div>
    </div>
  );
}
