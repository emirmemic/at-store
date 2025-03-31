import { IconAtStoreLogo } from '../icons';

export default function MonoAppleBlock() {
  return (
    <div className="flex flex-col items-center justify-between gap-14 rounded-2xl bg-blue-steel px-6 py-14 md:flex-row md:px-9 md:py-10 lg:gap-20 lg:p-14">
      <IconAtStoreLogo
        className="text-white"
        height={64}
        width={274}
      ></IconAtStoreLogo>
      <div className="w-full text-center text-white heading-4">
        Mono Apple Authorized Reseller
      </div>
    </div>
  );
}
