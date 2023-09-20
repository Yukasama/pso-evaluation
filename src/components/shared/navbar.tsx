import { Card, CardTitle } from "../ui/card";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <Card className="sticky top-0 z-20 flex w-full items-center justify-between gap-4 p-2 px-4 rounded-none border-b">
      <CardTitle>PSO Evaluation</CardTitle>
      <ThemeToggle />
    </Card>
  );
}
