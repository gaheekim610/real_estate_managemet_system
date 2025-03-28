import { useAuth } from "../context/AuthContext";

const PropertyCard = ({ property, setEditingProperty, onDelete }) => {
  const { user } = useAuth();
  const { image, title, description } = property;

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full max-w-5xl mx-auto mb-6">
      {!image ? (
        <div className="flex items-center justify-center w-full h-64 bg-gray-100 text-gray-400 text-xl italic rounded-t-lg">
          No Image Available
        </div>
      ) : (
        <img
          className="object-cover w-full max-h-[600px] rounded-t-lg"
          src={image}
          alt={title || "Property image"}
        />
      )}

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title || "No title"}
          </h5>
          <p className="mb-6 font-normal text-gray-700 dark:text-gray-400 whitespace-pre-line leading-relaxed text-base">
            {description || "No description"}
          </p>
        </div>

        {user?.role === "agent" && (
          <div className="flex space-x-4 mt-auto">
            <button
              onClick={() => onDelete(property._id)}
              className="w-1/2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => setEditingProperty(property)}
              className="w-1/2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
