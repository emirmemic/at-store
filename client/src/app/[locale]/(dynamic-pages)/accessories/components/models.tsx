'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ModelResponse } from '@/lib/types';

import { fetchModels } from '../actions/actions';

interface ModelsProps {
  categoryLink: string;
  subCategoryLink?: string;
  onSelectModel: (model: ModelResponse) => void;
  selectedModel?: ModelResponse | null;
}

export default function Models({
  categoryLink,
  subCategoryLink,
  onSelectModel,
  selectedModel,
}: ModelsProps) {
  const [models, setModels] = useState<ModelResponse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchModels({
        categoryLink,
        subCategoryLink,
      });

      setModels(response);
    };
    fetchData();
  }, [categoryLink, subCategoryLink]);

  if (!models || models.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-4">
      {models.map((model) => (
        <li key={model.id}>
          <Button
            isSelected={selectedModel?.id === model.id}
            size="md"
            variant="filled"
            onClick={() => {
              onSelectModel(model);
            }}
          >
            {model.displayName || model.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
