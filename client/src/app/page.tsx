import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="m-2 bg-red-300 text-blue-500">Hello World</h1>
      <Button variant={"default"} className="bg-yellow-400">
        Default
      </Button>
      <div className="flex gap-4">
        <Button variant={"default"} size={"sm"}>
          Small
        </Button>
        <Button variant={"default"}>Default</Button>
        <Button variant={"default"} size={"lg"}>
          Large
        </Button>
      </div>
    </div>
  );
}
