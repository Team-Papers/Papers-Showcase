export function formatCurrency(amount: number): string {
  if (amount === 0) return 'Gratuit';
  return `${amount.toLocaleString('fr-FR')} FCFA`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
