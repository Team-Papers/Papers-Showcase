import { QRCodeSVG } from 'qrcode.react';
import { Smartphone } from 'lucide-react';

interface QRCodeCardProps {
  bookId: string;
}

export default function QRCodeCard({ bookId }: QRCodeCardProps) {
  const appUrl = `https://papers237.com/book/${bookId}`;

  return (
    <div className="rounded-xl border border-outline bg-surface p-6 text-center">
      <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-on-surface-variant">
        <Smartphone size={16} />
        <span>Scanner pour acheter sur l'app</span>
      </div>
      <div className="inline-block rounded-lg bg-white p-3">
        <QRCodeSVG value={appUrl} size={160} level="M" />
      </div>
      <p className="mt-3 text-xs text-on-surface-variant">
        Disponible sur Paper's Mobile
      </p>
    </div>
  );
}
