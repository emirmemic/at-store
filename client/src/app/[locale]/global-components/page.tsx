import ButtonsExamples from '@/app/[locale]/global-components/components/buttons-examples';
import InputExamples from '@/app/[locale]/global-components/components/input-examples';
import NavigationExamples from '@/app/[locale]/global-components/components/navigation-examples';
import TypographyExamples from '@/app/[locale]/global-components/components/typography-examples';

export default async function HomeRoute() {
  return (
    <div className="flex flex-col items-center gap-4 p-9">
      <TypographyExamples />
      <ButtonsExamples />
      <NavigationExamples />
      <InputExamples />
    </div>
  );
}
