import { useParams } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Project Details</h1>
      <p className="text-gray-600">
        Showing details for project ID: <span className="font-bold">{id}</span>
      </p>
    </div>
  );
}

export default ProjectDetails;