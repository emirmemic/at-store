import { HeartIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function ButtonsExamples() {
  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="display">Buttons</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <Button variant={'filled'} size={'xlg'}>
        Filled
      </Button>

      <div className="flex items-center gap-2">
        <Button
          size={'md'}
          variant={'transparent'}
          transparentVariant="blue_black"
        >
          blue_black
        </Button>
        <Button size={'md'} variant={'transparent'} transparentVariant="black">
          black
        </Button>
        <div className="flex gap-4 rounded-md bg-black p-2">
          <Button variant={'transparent'} size={'md'}>
            default
          </Button>
          <Button
            size={'md'}
            variant={'transparent'}
            transparentVariant="blue_blue"
          >
            blue_blue
          </Button>
          <Button
            size={'md'}
            variant={'transparent'}
            transparentVariant="white"
          >
            white
          </Button>
          <Button
            size={'md'}
            variant={'transparent'}
            transparentVariant="white_blueBg"
          >
            white_blueBg
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant={'addToFavorites'} size={'textWithIcon'}>
          <HeartIcon size={30} />
          Dodaj u omiljeno
        </Button>
        <Button variant={'addToFavorites'} size={'textWithIcon'} isSelected>
          <HeartIcon size={30} color="red" fill="red" />
          Dodaj u omiljeno
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant={'productVariant'}
          size={'sm'}
          typography={'button2'}
          isSelected
        >
          256GB
        </Button>
        <Button variant={'productVariant'} size={'sm'} typography={'button2'}>
          256GB
        </Button>
      </div>
      <Button variant={'transparent'} transparentVariant="black" size={'md'}>
        Checkout
      </Button>
      <div className="flex gap-2">
        <Button size={'color'} className="bg-yellow-300" variant={'color'} />
        <Button
          size={'color'}
          className="bg-yellow-300"
          variant={'color'}
          isSelected
        />
      </div>
    </>
  );
}
