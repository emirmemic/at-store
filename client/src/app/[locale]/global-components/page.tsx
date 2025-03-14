import {
  ButtonsExamples,
  NavigationExamples,
  TypographyExamples,
  InputExamples,
} from '@/app/[locale]/global-components/components';

export default async function Page() {
  return (
    <div className="flex flex-col items-center gap-4 p-9">
      <TypographyExamples />
      <ButtonsExamples />
      <NavigationExamples />
      <InputExamples />
    </div>
  );
}
