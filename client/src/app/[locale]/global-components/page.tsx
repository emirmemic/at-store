import ButtonsExamples from '@/components/buttons-examples';
import InputExamples from '@/components/input-examples';
import NavigationExamples from '@/components/navigation-examples';
import TypographyExamples from '@/components/typography-examples';

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
