import { HeartIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function ButtonsExamples() {
  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="display">Buttons</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <Button size={'xlg'} variant={'filled'}>
        Filled
      </Button>

      <div className="flex items-center gap-2">
        <Button
          size={'md'}
          transparentVariant="blue_black"
          variant={'transparent'}
        >
          blue_black
        </Button>
        <Button size={'md'} transparentVariant="black" variant={'transparent'}>
          black
        </Button>
        <div className="flex flex-wrap gap-4 rounded-md bg-black p-2">
          <Button size={'md'} variant={'transparent'}>
            default
          </Button>
          <Button
            size={'md'}
            transparentVariant="blue_blue"
            variant={'transparent'}
          >
            blue_blue
          </Button>
          <Button
            size={'md'}
            transparentVariant="white"
            variant={'transparent'}
          >
            white
          </Button>
          <Button
            size={'md'}
            transparentVariant="white_blueBg"
            variant={'transparent'}
          >
            white_blueBg
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size={'textWithIcon'} variant={'addToFavorites'}>
          <HeartIcon size={30} />
          Dodaj u omiljeno
        </Button>
        <Button isSelected size={'textWithIcon'} variant={'addToFavorites'}>
          <HeartIcon color="red" fill="red" size={30} />
          Dodaj u omiljeno
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          isSelected
          size={'sm'}
          typography={'button2'}
          variant={'productVariant'}
        >
          256GB
        </Button>
        <Button size={'sm'} typography={'button2'} variant={'productVariant'}>
          256GB
        </Button>
      </div>
      <Button size={'md'} transparentVariant="black" variant={'transparent'}>
        Checkout
      </Button>
      <div className="flex gap-2">
        <Button className="bg-yellow-300" size={'color'} variant={'color'} />
        <Button
          isSelected
          className="bg-yellow-300"
          size={'color'}
          variant={'color'}
        />
      </div>
    </>
  );
}
