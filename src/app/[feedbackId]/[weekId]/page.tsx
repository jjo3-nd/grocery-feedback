'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import NutritionFeedback from '@/components/NutritionFeedback';

export default function WeeklyFeedbackPage() {
  const params = useParams();
  const feedbackId = params.feedbackId as string;
  const weekId = params.weekId as string;

  return (
    <div className="relative">
      {weekId !== 'week1-2' && (
        <div className="absolute right-4 top-4 z-10">
          <Link
            href={`/${feedbackId}/week1-2`}
            className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500 transition-colors shadow-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Week 1-2 Report
          </Link>
        </div>
      )}
      <NutritionFeedback feedbackId={feedbackId} weekId={weekId} />
    </div>
  );
}