import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import useFormValidation from "../hooks/useFormValidation";
import validate from "../utils/validate";

const PropertyForm = ({
  properties,
  setProperties,
  editingProperty,
  setEditingProperty,
}) => {
  const { user } = useAuth();

  const { formData, setFormData, handleChange, errors } = useFormValidation(
    {
      title: "",
      description: "",
      image: "",
    },
    validate
  );

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        title: editingProperty?.title,
        description: editingProperty?.description,
        image: editingProperty?.image,
      });
    } else {
      setFormData({ title: "", description: "", image: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingProperty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        const response = await axiosInstance.put(
          `/api/property/${editingProperty._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setProperties(
          properties.map((property) =>
            property._id === response.data._id ? response.data : property
          )
        );
      } else {
        const response = await axiosInstance.post("/api/property", formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProperties([...properties, response.data]);
      }
      setEditingProperty(null);
      setFormData({ title: "", description: "", image: "" });
    } catch (error) {
      console.log("error", error);

      alert("Failed to save property.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mb-6"
    >
      <h1 className="text-2xl font-bold mb-4">
        {editingProperty ? "Edit Property Post" : "Create Property Post"}
      </h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      {errors.title && <p className="text-red-600 mb-4">{errors.title}</p>}

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      {errors.description && (
        <p className="text-red-600 mb-4">{errors.description}</p>
      )}

      <input
        type="text"
        name="image"
        placeholder="Image"
        value={formData.image}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      {errors.image && <p className="text-red-600 mb-4">{errors.image}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {editingProperty ? "Update Button" : "Create Button"}
      </button>
    </form>
  );
};

export default PropertyForm;
