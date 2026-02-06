import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-on-surface-variant">
        <Tag className="h-4 w-4" />
        <span className="text-sm font-medium">Filtrer:</span>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par categorie">
        <button
          onClick={() => onSelect(null)}
          aria-pressed={selected === null}
          className={`category-pill focus-ring ${selected === null ? 'active' : ''}`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            aria-pressed={selected === cat}
            className={`category-pill focus-ring ${selected === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
