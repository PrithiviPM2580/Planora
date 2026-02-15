import type { Route } from "../../+types/root";

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
  return <header className="">Heello</header>;
}
