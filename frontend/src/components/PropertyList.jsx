import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const PropertyList = ({ properties, setProperties, setEditingProperty }) => {
  const { user } = useAuth();

  const handleDelete = async (propertyId) => {
    try {
      await axiosInstance.delete(`/api/property/${propertyId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProperties(
        properties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      alert("Failed to delete property.");
    }
  };

  return (
    <div>
      {Array.isArray(properties) ? (
        properties.map((property) => (
          <div
            key={property._id}
            className="bg-gray-100 p-4 mb-4 rounded shadow"
          >
            <h2 className="font-bold" name="title">
              {property.title}
            </h2>
            <p name="description">{property.description}</p>
            <p name="image" className="text-sm text-gray-500">
              {property.image}
            </p>
            <div className="mt-2">
              <button
                onClick={() => setEditingProperty(property)}
                className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No property exists</p>
      )}
    </div>
  );
};

export default PropertyList;
