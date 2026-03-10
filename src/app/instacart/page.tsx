import { Suspense } from "react";

import InstacartPageContent from "@/components/InstacartPageContent";

export default function InstacartPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-600">Loading Instacart...</div>}>
      <InstacartPageContent />
    </Suspense>
  );
}
