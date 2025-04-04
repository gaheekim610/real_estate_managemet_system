import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import PropertyForm from "../components/PropertyForm";
import PropertyList from "../components/PropertyList";
import { useAuth } from "../context/AuthContext";

const Property = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);

  const fetchProperty = async () => {
    try {
      const response = await axiosInstance.get("/api/property", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProperties(response.data);
    } catch (error) {
      alert("Failed to fetch property.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchProperty();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      {user?.role === "agent" && (
        <PropertyForm
          properties={properties}
          setProperties={setProperties}
          editingProperty={editingProperty}
          setEditingProperty={setEditingProperty}
          refresh={fetchProperty}
        />
      )}
      <PropertyList
        properties={properties}
        setProperties={setProperties}
        setEditingProperty={setEditingProperty}
      />
    </div>
  );
};

export default Property;
