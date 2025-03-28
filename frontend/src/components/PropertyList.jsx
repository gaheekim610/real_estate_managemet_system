import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import PropertyCard from "./PropertyCard";

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
          <div className="m-3">
            <PropertyCard
              key={property._id}
              property={property}
              setEditingProperty={setEditingProperty}
              onDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <p>No property exists</p>
      )}
    </div>
  );
};

export default PropertyList;
