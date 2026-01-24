import { useState } from "react";
import cameraIcon from "../assets/camera.png"; // adjust path

export function ImageInput({
  name,
  label,
  register,
  error,
  required = false,
  multiple = false,
}) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handlePreview = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (!selectedFiles.length) return;

    const urls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles(selectedFiles);
    setPreviews(urls);
  };

  // ❌ Remove image
  const removeImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    // Free memory
    URL.revokeObjectURL(newPreviews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div className="flex flex-col space-y-2">

      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-600"
        >
          {label}
        </label>
      )}

      {/* Upload Box */}
      <label
        htmlFor={name}
        className="
          w-40 h-40
          border-2 border-dashed border-gray-300
          rounded-xl
          flex flex-col items-center justify-center
          cursor-pointer
          hover:border-forest-green
          transition
          bg-gray-50
          p-4
        "
      >
        {/* Hidden Input */}
        <input
          id={name}
          type="file"
          accept="image/*"
          multiple={multiple}
          {...register(name, { required })}
          onChange={handlePreview}
          className="hidden"
        />

        <img
          src={cameraIcon}
          alt="Upload"
          className="w-10 h-10 opacity-70 mb-2"
        />

        <p className="text-xs text-gray-500 text-center">
          Click to upload
        </p>
      </label>

      {/* Preview With Delete */}
      {previews.length > 0 && (
        <div className="flex gap-3 flex-wrap mt-2">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative w-24 h-24"
            >
              {/* Image */}
              <img
                src={src}
                alt="Preview"
                className="
                  w-full h-full
                  object-cover
                  rounded-lg
                  border
                "
              />

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="
                  absolute -top-2 -right-2
                  bg-red-500 text-white
                  w-5 h-5 rounded-full
                  flex items-center justify-center
                  text-xs
                  hover:bg-red-600
                "
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs">
          {error.message || "Image is required"}
        </p>
      )}
    </div>
  );
}
