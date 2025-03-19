import {
  ButtonsExamples,
  InputExamples,
  NavigationExamples,
  TypographyExamples,
  BlocksExamples,
} from '@/app/[locale]/global-components/components';

export default async function Page() {
  return (
    <div className="flex flex-col items-center gap-4 p-9">
      <TypographyExamples />
      <ButtonsExamples />
      <NavigationExamples />
      <InputExamples />
      <BlocksExamples />
    </div>
  );
}
