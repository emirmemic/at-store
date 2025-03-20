'use client';
import { CardBlock, IconsBlock, InfoBlock, MonoAppleBlock } from '@/components';
import { IconDelivery, IconEducation } from '@/components/icons';

export default function BlocksExamples() {
  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h1 className="display">Blocks</h1>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="heading-2">Info blocks</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <div className="flex flex-col gap-10">
        <InfoBlock
          description="Pogledajte omiljene i dodajte nešto u korpu."
          isFavorites={true}
          title="Omiljeni"
          onClick={() => {}}
        />
        <InfoBlock
          description="Pogledajte omiljene i dodajte nešto u korpu."
          title="Omiljeni"
          onClick={() => {}}
        />
        <InfoBlock
          description="Pogledajte omiljene i dodajte nešto u korpu."
          title="Omiljeni"
        />
      </div>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="heading-2">Mono apple block</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <MonoAppleBlock />
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="heading-2">Icons block </h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <IconsBlock />
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="heading-2">Card block </h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <CardBlock Icon={IconDelivery} title="Napravi backup" />
      <CardBlock
        Icon={IconEducation}
        bgColor="bg-blue"
        className="w-[310px]"
        title="Education hello xd nice hello"
        onClick={() => {}}
      />
    </>
  );
}
