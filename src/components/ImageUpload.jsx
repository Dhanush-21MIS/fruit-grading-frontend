import { useRef, useState } from "react";
import axios from "axios";

function ImageUpload({ onPrediction, onLoading }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);

  const fileInputRef = useRef(null);

  // Production backend URL from Vite environment variable.
  // Falls back to localhost when running the frontend locally.
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8000";

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Maximum file size: 10 MB
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    // Release previous preview URL
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));

    onPrediction(null);
  };

  const handlePredict = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    if (isPredicting) return;

    setError("");
    setIsPredicting(true);
    onLoading(true);

    const formData = new FormData();

    // FastAPI expects the field name "file"
    formData.append("file", image);

    try {
      console.log("Sending image to backend...");
      console.log("Backend URL:", `${API_URL}/predict`);

      const response = await axios.post(
        `${API_URL}/predict`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },

          // Render may take some time because the three models
          // are loaded sequentially on CPU.
          timeout: 120000,
        }
      );

      console.log("Prediction response:", response.data);

      if (!response.data) {
        throw new Error(
          "Backend returned an empty response."
        );
      }

      onPrediction(response.data);

    } catch (err) {
      console.error("Prediction error:", err);

      if (err.response) {
        const detail =
          err.response.data?.detail;

        setError(
          detail ||
          `Prediction failed. Server returned ${err.response.status}.`
        );

      } else if (err.request) {
        setError(
          "No response received from the backend. Please check the backend and try again."
        );

      } else if (err.code === "ECONNABORTED") {
        setError(
          "Prediction is taking too long. Please try again."
        );

      } else {
        setError(
          `Request error: ${err.message}`
        );
      }

      onPrediction(null);

    } finally {
      setIsPredicting(false);
      onLoading(false);
    }
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
    setError("");

    onPrediction(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileSelector = () => {
    if (!isPredicting) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="upload-section">

      {/* ================================
          IMAGE UPLOAD BOX
      ================================= */}

      <div
        className={`upload-box ${
          preview ? "has-preview" : ""
        }`}
        onClick={openFileSelector}
      >

        {preview ? (
          <div className="image-preview-container">

            <img
              src={preview}
              alt="Selected fruit"
              className="image-preview"
            />

            <div className="preview-overlay">
              <span>
                Click to change image
              </span>
            </div>

          </div>
        ) : (
          <div className="upload-content">

            <div className="upload-icon">
              ↑
            </div>

            <h3>
              Drop your fruit image here
            </h3>

            <p>
              Or click to browse your device
            </p>

            <span>
              Supports JPG, JPEG and PNG · Maximum 10 MB
            </span>

          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          hidden
        />

      </div>

      {/* ================================
          ERROR MESSAGE
      ================================= */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* ================================
          ACTION BUTTONS
      ================================= */}

      {image && (
        <div className="upload-actions">

          <button
            type="button"
            className="predict-button"
            onClick={(event) => {
              event.stopPropagation();
              handlePredict();
            }}
            disabled={isPredicting}
          >
            {isPredicting
              ? "Analyzing..."
              : "Analyze Fruit"}
          </button>

          <button
            type="button"
            className="remove-button"
            onClick={(event) => {
              event.stopPropagation();
              handleRemove();
            }}
            disabled={isPredicting}
          >
            Remove
          </button>

        </div>
      )}

    </div>
  );
}

export default ImageUpload;