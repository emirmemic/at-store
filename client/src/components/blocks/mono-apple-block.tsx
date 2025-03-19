import Image from 'next/image';

export default function MonoAppleBlock() {
  return (
    <div className="flex flex-col items-center justify-between gap-14 rounded-2xl bg-blue-steel px-6 py-14 md:flex-row md:px-9 md:py-10 lg:gap-20 lg:p-14">
      <Image
        alt="logo"
        height={64}
        src={'/assets/images/logo.png'}
        width={274}
      />
      <div className="w-full text-center text-white heading-4">
        Mono Apple Authorized Reseller
      </div>
    </div>
  );
}
