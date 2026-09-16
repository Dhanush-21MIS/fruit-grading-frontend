import ModelResults from "./ModelResults";

function PredictionResult({ result }) {
  if (!result) return null;

  const isUnknown = result.fruit === "Unknown Fruit";

  const agreementText = result.model_disagreement
    ? "Models have different predictions"
    : "All models agree on the fruit";

  return (
    <section className="result-section">

      {/* ================= RESULT HEADER ================= */}

      <div className="result-header">

        <div>
          <p className="section-label">
            02 · ANALYSIS COMPLETE
          </p>

          <h2>
            Your Fruit Analysis
          </h2>
        </div>

        <div className="completed-badge">
          Analysis Complete
        </div>

      </div>


      {/* ================= MAIN RESULT ================= */}

      <div className="main-result">

        {/* FRUIT */}

        <div className="result-card">

          <div className="result-card-top">
            <span className="result-label">
              DETECTED FRUIT
            </span>
          </div>

          <h1 className={isUnknown ? "unknown-result" : ""}>
            {result.fruit}
          </h1>

          <p className="result-description">
            {isUnknown
              ? "The system could not confidently identify this fruit."
              : "The ensemble identified this fruit from the uploaded image."
            }
          </p>

          <div className="confidence-row">

            <div>
              <span>
                Confidence
              </span>
            </div>

            <strong>
              {result.fruit_confidence}%
            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-value"
              style={{
                width: `${Math.min(
                  result.fruit_confidence,
                  100
                )}%`,
              }}
            />

          </div>

        </div>


        {/* QUALITY */}

        <div className="result-card quality-result">

          <span className="result-label">
            QUALITY GRADE
          </span>

          <h1>
            {result.quality}
          </h1>

          <p className="result-description">
            The predicted quality category based on the
            visual characteristics of the uploaded fruit.
          </p>

          <div className="confidence-row">

            <span>
              Confidence
            </span>

            <strong>
              {result.quality_confidence}%
            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-value"
              style={{
                width: `${Math.min(
                  result.quality_confidence,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </div>


      {/* ================= EXPLANATION ================= */}

      <div className="explanation-box">

        <div className="explanation-icon">
          i
        </div>

        <div>

          <h3>
            What does this result mean?
          </h3>

          <p>
            The system analyzed the image using three
            deep learning models and combined their
            predictions to produce the final result.
            {result.model_disagreement
              ? " The models produced different fruit predictions, so the result should be interpreted with caution."
              : " All three models predicted the same fruit."
            }
          </p>

        </div>

      </div>


      {/* ================= MODEL AGREEMENT ================= */}

      <div
        className={`agreement-box ${
          result.model_disagreement
            ? "agreement-warning"
            : ""
        }`}
      >

        <div className="agreement-icon">
          {result.model_disagreement ? "!" : "✓"}
        </div>

        <div>

          <strong>
            {result.model_disagreement
              ? "Model disagreement"
              : "Model agreement"
            }
          </strong>

          <p>
            {agreementText}
          </p>

        </div>

      </div>


      {/* ================= MODEL RESULTS ================= */}

      <ModelResults
        predictions={result.individual_predictions}
      />


      {/* ================= ADVANCED DETAILS ================= */}

      <details className="advanced-details">

        <summary>
          Advanced Analysis
        </summary>

        <div className="advanced-grid">

          <div>
            <span>
              Prediction Entropy
            </span>

            <strong>
              {result.entropy}
            </strong>
          </div>

          <div>
            <span>
              Highest-Confidence Model
            </span>

            <strong>
              {result.best_model}
            </strong>
          </div>

          <div>
            <span>
              Processing Time
            </span>

            <strong>
              {result.time_taken_seconds}s
            </strong>
          </div>

          <div>
            <span>
              Processing Device
            </span>

            <strong>
              {result.device}
            </strong>
          </div>

        </div>

      </details>

    </section>
  );
}

export default PredictionResult;