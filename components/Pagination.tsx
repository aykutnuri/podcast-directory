// components/Pagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getLabels } from '@/lib/i18n';
import { Language } from '@/lib/types';

export default function Pagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Extract current state
  const lang = (searchParams.get('lang') as Language) || 'en';
  const page = parseInt(searchParams.get('page') || '1');
  const labels = getLabels(lang);

  // Helper to change page
  const navigate = (direction: 'next' | 'prev') => {
    const params = new URLSearchParams(searchParams.toString());
    const newPage = direction === 'next' ? page + 1 : Math.max(1, page - 1);
    
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-center items-center space-x-4">
      <button
        onClick={() => navigate('prev')}
        disabled={page <= 1}
        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
          ${page <= 1 
            ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border-zinc-200 dark:bg-zinc-800 dark:text-zinc-600 dark:border-zinc-700' 
            : 'bg-white text-zinc-700 hover:bg-zinc-50 border-zinc-300 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800'
          }`}
      >
        &larr; {labels.previous}
      </button>
      
      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Page {page}
      </span>

      <button
        onClick={() => navigate('next')}
        className="px-4 py-2 border rounded-md text-sm font-medium bg-white text-zinc-700 hover:bg-zinc-50 border-zinc-300 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800 transition-colors"
      >
        {labels.next} &rarr;
      </button>
    </div>
  );
}
