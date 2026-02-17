import { Button } from "@/components/ui/button";
import type { Route } from "../../+types/root";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Planora App" },
    {
      name: "description",
      content: "Welcome to Planora, your project management solution.",
    },
  ];
}

export default function HomePage() {
  return (
    <header className="">
      <Button asChild>
        <Link to="/sign-in">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/sign-up">Sign up</Link>
      </Button>
    </header>
  );
}
