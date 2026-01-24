import { useState } from "react";
import cameraIcon from "../assets/camera.png";

export function ImageInput({
  name,
  label,
  value,
  onChange,
  error,
  multiple = false,
}) {
  const [previews, setPreviews] = useState([]);

  const handlePreview = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (!selectedFiles.length) return;

    const urls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(urls);

    // ✅ Send files to RHF
    onChange(e.target.files);
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);

    setPreviews(newPreviews);

    // Rebuild FileList
    const dt = new DataTransfer();

    if (value) {
      Array.from(value).forEach((file, i) => {
        if (i !== index) dt.items.add(file);
      });
    }

    onChange(dt.files);
  };

  return (
    <div className="flex flex-col space-y-2">

      {label && (
        <label className="text-sm font-medium text-gray-600">
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
        <input
          id={name}
          type="file"
          accept="image/*"
          multiple={multiple}
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

      {/* Preview */}
      {previews.length > 0 && (
        <div className="flex gap-3 flex-wrap mt-2">
          {previews.map((src, i) => (
            <div key={i} className="relative w-24 h-24">

              <img
                src={src}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg border"
              />

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

      {error && (
        <p className="text-red-500 text-xs">
          {error.message || "Image is required"}
        </p>
      )}
    </div>
  );
}
