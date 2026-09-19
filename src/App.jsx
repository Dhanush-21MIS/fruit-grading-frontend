import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import PredictionResult from "./components/PredictionResult";
import "./App.css";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNewAnalysis = () => {
    setPrediction(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {/* ================= HEADER ================= */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">FG</div>

          <div>
            <h1>FruitGrade</h1>
            <p>Deep Learning Fruit Analysis</p>
          </div>
        </div>

        <div className="api-status">
          <span className="status-dot"></span>
          <span>System Online</span>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container">

        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="hero-badge">
            DEEP LEARNING -POWERED FRUIT GRADING
          </div>

          <h2>
            Know Your Fruit.
            <br />
            <span>Understand Its Quality.</span>
          </h2>

          <p>
            Upload a fruit image and let our deep learning ensemble
            identify the fruit and evaluate its quality.
          </p>
        </section>

        {/* ================= UPLOAD SECTION ================= */}
        <section className="workspace">

          <div className="section-heading">
            <div>
              <span className="step-number">01</span>

              <div>
                <p className="section-label">IMAGE INPUT</p>
                <h3>Upload a Fruit Image</h3>
              </div>
            </div>

            <span className="supported-format">
              JPG · JPEG · PNG
            </span>
          </div>

          <ImageUpload
            onPrediction={setPrediction}
            onLoading={setLoading}
          />

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="analysis-loading">
              <div className="loader"></div>

              <div className="loading-content">
                <strong>Analyzing your fruit...</strong>

                <p>
                  Running three deep learning models and combining
                  their predictions.
                </p>

                <div className="model-progress">
                  <span>EfficientNet</span>
                  <span>ConvNeXt</span>
                  <span>Swin Transformer</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ================= RESULTS ================= */}
        {prediction && !loading && (
          <>
            <PredictionResult result={prediction} />

            <div className="new-analysis-wrapper">
              <button
                className="new-analysis-button"
                onClick={handleNewAnalysis}
              >
                Analyze Another Image
              </button>
            </div>
          </>
        )}

        {/* ================= HOW IT WORKS ================= */}
        {!prediction && !loading && (
          <section className="how-it-works">

            <div className="how-heading">
              <p className="section-label">HOW IT WORKS</p>

              <h3>
                From image to intelligent grading
              </h3>
            </div>

            <div className="steps">

              <div className="step-card">
                <div className="step-icon">01</div>

                <h4>Upload</h4>

                <p>
                  Select a clear image of the fruit from your
                  device.
                </p>
              </div>

              <div className="step-card">
                <div className="step-icon">02</div>

                <h4>Analyze</h4>

                <p>
                  EfficientNet, ConvNeXt and Swin Transformer
                  analyze the image independently.
                </p>
              </div>

              <div className="step-card">
                <div className="step-icon">03</div>

                <h4>Grade</h4>

                <p>
                  The ensemble combines the predictions and
                  provides the final fruit and quality result.
                </p>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div>
          <strong>FruitGrade</strong>
          <p>
            Deep Learning Based Fruit Classification & Quality Grading
          </p>
        </div>

        <div className="footer-models">
          EfficientNet · ConvNeXt · Swin Transformer
        </div>
      </footer>
    </div>
  );
}

export default App;