'use client';

import { useRef, useState } from 'react';

import { STRAPI_BASE_URL } from '@/lib/constants';

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  jobTitle: string;
  jobDepartment: string;
  jobLocation: string;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  cv: File | null;
};

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
  cv: null,
};

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export default function JobApplicationForm({
  jobTitle,
  jobDepartment,
  jobLocation,
}: Props) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = event.target as HTMLInputElement;

    if (files && files.length > 0) {
      setFormState((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadCv = async (cv: File): Promise<number> => {
    if (!STRAPI_BASE_URL) {
      throw new Error('Strapi URL nije konfigurisan.');
    }

    if (cv.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      throw new Error(`CV mora biti manji od ${MAX_FILE_SIZE_MB}MB.`);
    }

    if (!ACCEPTED_FILE_TYPES.includes(cv.type)) {
      throw new Error('Dozvoljeni formati su: PDF, DOC ili DOCX.');
    }

    const formData = new FormData();
    formData.append('files', cv);

    const response = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Slanje CV dokumenta nije uspjelo.');
    }

    const uploadResult = await response.json();
    const fileEntry = Array.isArray(uploadResult)
      ? uploadResult[0]
      : Array.isArray(uploadResult?.data)
        ? uploadResult.data[0]
        : null;

    if (!fileEntry?.id) {
      throw new Error('Upload odgovorio bez ID vrijednosti.');
    }

    return fileEntry.id;
  };

  const resetForm = () => {
    setFormState(initialFormState);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') {
      return;
    }

    if (!STRAPI_BASE_URL) {
      setErrorMessage('Strapi URL nije konfigurisan.');
      setStatus('error');
      return;
    }

    if (!formState.fullName.trim() || !formState.email.trim()) {
      setErrorMessage('Molimo unesite ime, prezime i ispravan email.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage('');

      let cvId: number | null = null;
      if (formState.cv) {
        cvId = await uploadCv(formState.cv);
      }

      const payload = {
        data: {
          fullName: formState.fullName.trim(),
          email: formState.email.trim(),
          phone: formState.phone.trim() || undefined,
          message: formState.message.trim() || undefined,
          jobTitle,
          jobDepartment,
          jobLocation,
          applyPage:
            typeof window !== 'undefined' ? window.location.href : undefined,
          ...(cvId ? { cv: cvId } : {}),
        },
      };

      const response = await fetch(`${STRAPI_BASE_URL}/api/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        const detailsMessage =
          result?.error?.details?.errors?.[0]?.message ||
          result?.error?.message;
        throw new Error(detailsMessage || 'Slanje prijave nije uspjelo.');
      }

      resetForm();
      setStatus('success');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Došlo je do neočekivane greške.';
      setErrorMessage(message);
      setStatus('error');
    }
  };

  const isSubmitting = status === 'loading';

  return (
    <section className="mb-16">
      <h2 className="mb-4 text-2xl font-medium text-gray-800">
        Prijavi se sada
      </h2>

      {status === 'success' && (
        <div className="mb-6 rounded-md bg-green-50 p-4 text-green-800">
          <p className="font-medium">✅ Prijava je uspješno poslana!</p>
          <p className="text-sm">
            Kontaktiraćemo vas u najkraćem mogućem roku. Potvrda je poslata na
            vaš email.
          </p>
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700">
          <p className="font-medium">⚠️ Prijava nije poslana.</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ime i Prezime *
          </label>
          <input
            type="text"
            name="fullName"
            value={formState.fullName}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Broj telefona
          </label>
          <input
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dodaj CV
          </label>
          <input
            ref={fileInputRef}
            type="file"
            name="cv"
            onChange={handleInputChange}
            disabled={isSubmitting}
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="mt-1 text-xs text-gray-500">
            Podržani formati: PDF, DOC, DOCX (maksimalno {MAX_FILE_SIZE_MB}MB)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Poruka
          </label>
          <textarea
            name="message"
            value={formState.message}
            onChange={handleInputChange}
            rows={4}
            disabled={isSubmitting}
            placeholder="Napišite zašto ste zainteresovani za ovu poziciju..."
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-black px-8 py-3 font-medium text-white shadow-md hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Šalje se...' : 'Pošalji prijavu'}
          </button>
        </div>
      </form>
    </section>
  );
}
