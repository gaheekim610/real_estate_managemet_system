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
  refresh,
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
      // fetch data for refreshing
      await refresh();
      setEditingProperty(null);
      setFormData({ title: "", description: "", image: "" });
    } catch (error) {
      alert("Failed to save property.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");

        const scale = Math.min(800 / img.width, 800 / img.height); // max 800x800
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const resized = canvas.toDataURL("image/jpeg", 0.8);
        setFormData((prev) => ({ ...prev, image: resized }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mb-6 max-w-5xl w-full mx-auto"
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

      <textarea
        name="description"
        placeholder="Description"
        row={10}
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded resize-none"
      />
      {errors.description && (
        <p className="text-red-600 mb-4">{errors.description}</p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-4 p-2 border rounded"
      />

      {formData.image && (
        <img
          src={formData.image}
          alt="Preview"
          className="w-full max-h-64 object-cover mb-4 rounded"
        />
      )}
      {errors.image && <p className="text-red-600 mb-4">{errors.image}</p>}

      <button
        type="submit"
        className="w-full bg-gray-600 text-white p-2 rounded"
      >
        {editingProperty ? "Update Button" : "Create Button"}
      </button>
    </form>
  );
};

export default PropertyForm;
