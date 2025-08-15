"use client"
import { useParams } from "next/navigation";
import Dashboard from "../../dashboard/page";



export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.projectId;

  if (!projectId) {
    return (
      <div className="flex h-[calc(100vh-var(--header-height))] items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  return (
   <Dashboard />
  );
}