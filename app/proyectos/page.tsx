import type { Metadata } from "next";
import { AllProjects } from "@/components/AllProjects";

export const metadata: Metadata = {
  title: "Proyectos · Diego A Caro",
  description:
    "Todos los proyectos de Diego Alejandro Caro: software, IA y sistemas mecatrónicos.",
};

export default function ProyectosPage() {
  return <AllProjects />;
}
