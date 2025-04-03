'use client';
import { useState } from 'react';

import {
  ErrorPopup,
  ProductDetailsPopup,
  StoreSelectPopup,
  StoreSelectInfo,
} from '@/components/popup';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { dummyProducts } from '@/data/dummy-data';
import { STORE_NAMES } from '@/lib/constants';

export default function PopupExamples() {
  const [selectedStore, setSelectedStore] = useState<string>(STORE_NAMES[0]);
  const selectStore = (store: string) => {
    setSelectedStore(store);
  };
  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="display">Popup</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={'md'} typography={'button1'} variant={'filled'}>
            Trigger Error Popup
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogDescription className="sr-only">
            This is an error popup.
          </DialogDescription>
          <DialogTitle className="sr-only">Error Occurred</DialogTitle>
          <ErrorPopup />
        </DialogContent>
      </Dialog>

      <ProductDetailsPopup product={dummyProducts[1]} />
      <p>Selected Store: {selectedStore}</p>
      <StoreSelectPopup
        selectedStore={selectedStore}
        onContinue={() => {}}
        onSelectStore={selectStore}
      >
        <Button size={'md'} typography={'button1'} variant={'filled'}>
          Store Select Popup
        </Button>
      </StoreSelectPopup>

      {/* Assuming success message will be coming from backend, this text is not added to bs.json */}
      <StoreSelectInfo
        message="Vaša narudžba je rezervisana u poslovnici u SCC-u."
        onContinue={() => {}}
      >
        <Button size={'md'} typography={'button1'} variant={'filled'}>
          Store Select Popup Info
        </Button>
      </StoreSelectInfo>
    </>
  );
}
