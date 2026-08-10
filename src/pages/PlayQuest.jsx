import { useParams } from "react-router-dom";

export default function PlayQuest() {
  const { id } = useParams();
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-heading">Playing Quest #{id}</h1>
      <p className="text-text/60 mt-4">
        This is where the interactive story will be.
      </p>
    </div>
  );
}
