import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import PropertyForm from "../components/PropertyForm";
import PropertyList from "../components/PropertyList";
import { useAuth } from "../context/AuthContext";

const Property = () => {
  const { user } = useAuth();
  const [property, setProperty] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get("/api/property", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProperty(response.data);
      } catch (error) {
        alert("Failed to fetch property.");
      }
    };

    fetchProperty();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <PropertyForm
        property={property}
        setProperty={setProperty}
        editingProperty={editingProperty}
        setEditingProperty={setEditingProperty}
      />
      <PropertyList
        property={property}
        setProperty={setProperty}
        setEditingProperty={setEditingProperty}
      />
    </div>
  );
};

export default Property;
