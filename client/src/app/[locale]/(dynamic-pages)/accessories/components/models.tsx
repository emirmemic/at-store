'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { ModelResponse } from '@/lib/types';
import { fetchModels } from '../actions/actions';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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

  return subCategoryLink === undefined ? (
    <>
      {/* TODO: dodati kategorije */}
      {(() => {
        const fixedModels = [
          {
            name: 'iphone-dodaci',
            displayName: 'iPhone dodaci',
            icon: '/assets/images/accessories/iphone-dodaci.webp',
          },
          {
            name: 'mac-dodaci',
            displayName: 'Mac dodaci',
            icon: '/assets/images/accessories/mac-dodaci.svg',
          },
          {
            name: 'ipad-dodaci',
            displayName: 'iPad dodaci',
            icon: '/assets/images/accessories/ipad-dodaci.svg',
          },
          {
            name: 'apple-watch-dodaci',
            displayName: 'Apple Watch dodaci',
            icon: '/assets/images/accessories/apple-watch.webp',
          },
          {
            name: 'music-dodaci',
            displayName: 'Music dodaci',
            icon: '/assets/images/accessories/music-dodaci.png',
          },
          {
            name: 'airtag',
            displayName: 'AirTag',
            icon: '/assets/images/accessories/airtag.svg',
          },
          {
            name: 'airtag-dodaci',
            displayName: 'AirTag dodaci',
            icon: '/assets/images/accessories/airtag-dodaci.webp',
          },
          {
            name: 'apple-tv',
            displayName: 'Apple TV',
            icon: '/assets/images/accessories/apple-tv.svg',
          },
          {
            name: 'apple-tv-dodaci',
            displayName: 'Apple TV Dodaci',
            icon: '/assets/images/accessories/apple-tv-dodaci.png',
          },
        ];
        return (
          <div className="no-scrollbar flex w-full space-x-6 overflow-x-auto px-4 py-4 md:justify-center md:space-x-12">
            {fixedModels.map((model) => (
              <button
                key={model.name}
                onClick={() => router.push(`/dodaci/${model.name}`)}
                className="w-30 flex flex-shrink-0 flex-col items-center justify-center text-gray-800 transition-all duration-300 ease-in-out hover:text-blue-500"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 shadow-sm hover:bg-gray-200`}
                >
                  <Image
                    src={model.icon}
                    alt={model.displayName}
                    width={50}
                    height={50}
                  />
                </div>
                <span className="mt-2 text-center text-sm font-medium">
                  {model.displayName}
                </span>
              </button>
            ))}
          </div>
        );
      })()}
    </>
  ) : (
    <div className="no-scrollbar flex space-x-6 overflow-x-auto px-4 py-4">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onSelectModel(model)}
          className={`flex w-20 flex-shrink-0 flex-col items-center justify-center transition-all duration-300 ease-in-out ${
            selectedModel?.id === model.id ? 'text-blue-600' : 'text-gray-800'
          } hover:text-blue-500`}
        >
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ${
              selectedModel?.id === model.id
                ? 'bg-blue-100'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Image
              src={`/assets/images/accessories/${model.name}.png`}
              alt={model.name}
              width={50}
              height={50}
            />
          </div>
          <span className="mt-2 text-center text-sm font-medium">
            {model.displayName || model.name}
          </span>
        </button>
      ))}
    </div>
  );
}
