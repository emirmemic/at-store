import { HeartIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default async function HomeRoute() {
  return (
    <div className="flex flex-col items-center gap-4 p-9">
      <h1 className="display">Typography</h1>
      <div className="bg-grey h-[2px] w-full"></div>
      <div className="display">Display</div>
      <div className="heading-1">Heading 1</div>
      <div className="heading-2">Heading 2</div>
      <div className="heading-3">Heading 3</div>
      <div className="heading-4">Heading 4</div>
      <div className="heading-5">Heading 5</div>
      <div className="title">Title 1</div>
      <div className="paragraph-1">Paragraph 1</div>
      <div className="paragraph-2">Paragraph 2</div>
      <div className="paragraph-3">Paragraph 3</div>
      <div className="paragraph-4">Paragraph 4</div>
      <div className="paragraph-5">Paragraph 5</div>
      <div className="paragraph-6">Paragraph 6</div>
      <div className="navigation">Navigation Text</div>
      <div className="button-1">Button 1</div>
      <div className="button-2">Button 2</div>
      <div className="bg-grey h-[2px] w-full"></div>
      <h1 className="display">Buttons</h1>
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
            transparentVariant="white_BlueBg"
          >
            white_BlueBg
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
    </div>
  );
}
