"use client"

import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.projectId;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Project: {projectId}</h1>
      <p>This is the project canvas for project ID: {projectId}</p>
    </div>
  );
}