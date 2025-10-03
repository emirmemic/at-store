'use client';

import { CardContainer } from '../../components';

import { AddressManager } from './components/address-manager';

export default function Page() {
  return (
    <CardContainer className="border-grey-silver bg-white p-6">
      <AddressManager />
    </CardContainer>
  );
}
