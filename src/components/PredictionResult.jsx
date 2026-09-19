import ModelResults from "./ModelResults";

function PredictionResult({ result }) {
  if (!result) return null;

  const isUnknown = result.fruit === "Unknown Fruit";
  const storage = result.storage;

  const fruitConfidence = Math.min(
    Math.max(Number(result.fruit_confidence) || 0, 0),
    100
  );

  const qualityConfidence = Math.min(
    Math.max(Number(result.quality_confidence) || 0, 0),
    100
  );

  const agreementText = result.model_disagreement
    ? "Models have different predictions"
    : "All models agree on the fruit";

  return (
    <section className="result-section">

      {/* ================================
          RESULT HEADER
      ================================= */}

      <div className="result-header">
        <div>
          <p className="section-label">02 ANALYSIS RESULT</p>
          <h2>Prediction Complete</h2>
        </div>

        <div className="result-status">
          {isUnknown
            ? "Unable to identify fruit"
            : result.model_disagreement
            ? "Model disagreement"
            : "Models agree"}
        </div>
      </div>


      {/* ================================
          MAIN RESULT
      ================================= */}

      <div className="main-result-card">

        <div className="result-main-info">
          <span className="result-label">
            DETECTED FRUIT
          </span>

          <h1>{result.fruit}</h1>

          <p>
            {isUnknown
              ? "The image could not be confidently identified as one of the supported fruits."
              : "The ensemble identified this fruit from the uploaded image."}
          </p>
        </div>


        {/* Fruit confidence is still useful for Unknown Fruit */}
        <div className="confidence-block">

          <span>Confidence</span>

          <strong>
            {fruitConfidence.toFixed(2)}%
          </strong>

          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{
                width: `${fruitConfidence}%`,
              }}
            />
          </div>

        </div>

      </div>


      {/* =====================================
          UNKNOWN FRUIT MESSAGE
      ====================================== */}

      {isUnknown && (
        <div className="unknown-result">

          

          <div>
            <strong>
              No supported fruit identified!!
            </strong>

            <p>
              Please upload a clear image of one of the
              supported fruits:
              <strong>
                {" "}
                Apple, Banana, Grape, Guava, Lime, Mango,
                Orange or Pomegranate.
              </strong>
            </p>

          </div>

        </div>
      )}


      {/* =====================================
          QUALITY RESULT
          ONLY FOR VALID FRUIT
      ====================================== */}

      {!isUnknown && (
        <div className="quality-result">

          <div>

            <span className="result-label">
              QUALITY GRADE
            </span>

            <h3>
              {result.quality
                ? result.quality.charAt(0).toUpperCase() +
                  result.quality.slice(1)
                : "—"}
            </h3>

            <p>
              The predicted quality category based on
              the visual characteristics of the uploaded fruit.
            </p>

          </div>


          <div>

            <span className="result-label">
              CONFIDENCE
            </span>

            <strong>
              {qualityConfidence.toFixed(2)}%
            </strong>

            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{
                  width: `${qualityConfidence}%`,
                }}
              />
            </div>

          </div>

        </div>
      )}


      {/* =====================================
          STORAGE GUIDE
          ONLY FOR VALID FRUIT
      ====================================== */}

      {!isUnknown && storage?.available === true && (
        <section className="storage-section">

          <div className="storage-header">

            <div>

              <p className="section-label">
                03 STORAGE GUIDE
              </p>

              <h3>
                How to store your {result.fruit}
              </h3>

              <p>
                Estimated freshness guidance based on
                the predicted fruit.
              </p>

            </div>

          </div>


          <div className="storage-grid">

            {/* ROOM TEMPERATURE */}

            <div className="storage-card">

              <div className="storage-card-icon">
                🌡️
              </div>

              <div>

                <span className="storage-label">
                  ROOM TEMPERATURE
                </span>

                <h4>
                  {storage.room_temperature}
                </h4>

              </div>

            </div>


            {/* REFRIGERATED */}

            <div className="storage-card">

              <div className="storage-card-icon">
                ❄️
              </div>

              <div>

                <span className="storage-label">
                  REFRIGERATED
                </span>

                <h4>
                  {storage.refrigerated}
                </h4>

              </div>

            </div>


            {/* BEST STORAGE */}

            <div className="storage-card">

              <div className="storage-card-icon">
                ✓
              </div>

              <div>

                <span className="storage-label">
                  BEST STORAGE
                </span>

                <h4>
                  {storage.best_storage}
                </h4>

              </div>

            </div>

          </div>


          {/* RECOMMENDATION */}

          {storage.recommendation && (
            <div className="storage-recommendation">

              <div className="storage-recommendation-icon">
                i
              </div>

              <div>

                <span className="storage-label">
                  RECOMMENDATION
                </span>

                <p>
                  {storage.recommendation}
                </p>

              </div>

            </div>
          )}


          {/* DISCLAIMER */}

          <p className="storage-disclaimer">
            Storage times are approximate freshness guidance
            and may vary depending on fruit ripeness,
            temperature and handling. Always inspect fruit
            before consumption.
          </p>

        </section>
      )}


      {/* =====================================
          EXPLANATION
      ====================================== */}

      {!isUnknown && (
        <div className="result-explanation">

          <p className="section-label">
            HOW IT WORKS
          </p>

          <p>
            The prediction is generated by combining the
            outputs of EfficientNet, ConvNeXt and Swin
            Transformer models. Their predictions are
            combined to produce the final result.
          </p>

        </div>
      )}


      {/* =====================================
          MODEL AGREEMENT
          ONLY FOR VALID FRUIT
      ====================================== */}

      {!isUnknown && (
        <div className="model-agreement">

          <div className="agreement-icon">
            ✓
          </div>

          <div>

            <strong>
              Model agreement
            </strong>

            <p>
              {agreementText}
            </p>

          </div>

        </div>
      )}


      {/* =====================================
          MODEL BREAKDOWN
          ONLY FOR VALID FRUIT
      ====================================== */}

      {!isUnknown && (
        <ModelResults
          predictions={result.individual_predictions}
        />
      )}


      {/* =====================================
          ADVANCED ANALYSIS
          ONLY FOR VALID FRUIT
      ====================================== */}

      {!isUnknown && (
        <div className="advanced-analysis">

          <p className="section-label">
            ADVANCED ANALYSIS
          </p>

          <div className="advanced-grid">

            <div>
              <span>Best Model</span>
              <strong>
                {result.best_model || "—"}
              </strong>
            </div>

            <div>
              <span>Entropy</span>
              <strong>
                {result.entropy ?? "—"}
              </strong>
            </div>

            <div>
              <span>Model Agreement</span>
              <strong>
                {result.model_disagreement
                  ? "Disagreement"
                  : "Agreement"}
              </strong>
            </div>

            <div>
              <span>Processing Time</span>
              <strong>
                {result.time_taken_seconds
                  ? `${result.time_taken_seconds}s`
                  : "—"}
              </strong>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default PredictionResult;