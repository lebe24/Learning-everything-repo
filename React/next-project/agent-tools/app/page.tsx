"use client";

import HeroSection from "./components/hero-section";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2">
      <h2>Agent Flow</h2>

      <Button
        className="m-4"
        size="lg"
        variant="default"
        onClick={() => router.push("/dashboard")}
      >
        Get Started
      </Button>
    </main>
  );
}
