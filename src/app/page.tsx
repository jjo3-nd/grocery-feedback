'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FolderStructure {
  folders: string[];
  error: string | null;
}

export default function Home() {
  const [folderStructure, setFolderStructure] = useState<FolderStructure>({
    folders: [],
    error: null
  });

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/getFolders');
        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }
        const data = await response.json();
        setFolderStructure({
          folders: data.folders,
          error: null
        });
      } catch (err) {
        setFolderStructure({
          folders: [],
          error: err instanceof Error ? err.message : 'Failed to fetch folders'
        });
      }
    };

    fetchFolders();
  }, []);

  if (folderStructure.error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading folders: {folderStructure.error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Grocery Feedback Reports</h1>
      {/* <div className="space-y-2">
        {folderStructure.folders.map((folder) => (
          <Link
            key={folder}
            href={`/${folder}`}
            className="block w-full p-4 text-left bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {folder}
          </Link>
        ))}
      </div> */}
    </div>
  );
}