function ModelResults({ predictions }) {
  if (!predictions) return null;

  return (
    <div className="model-results">

      <div className="model-results-header">

        <div>
          <p className="section-label">
            MODEL BREAKDOWN
          </p>

          <h3>
            How the models predicted
          </h3>

          <p>
            Each model analyzes the same image independently.
          </p>
        </div>

      </div>


      <div className="models-grid">

        {Object.entries(predictions).map(
          ([modelName, prediction]) => (

            <div
              className="model-card"
              key={modelName}
            >

              <div className="model-card-header">

                <div className="model-number">
                  {modelName === "EfficientNet"
                    ? "01"
                    : modelName === "ConvNeXt"
                    ? "02"
                    : "03"}
                </div>

                <h4>
                  {modelName === "Swin"
                    ? "Swin Transformer"
                    : modelName}
                </h4>

              </div>


              <div className="model-info">

                <div className="model-result-main">

                  <span>
                    Fruit
                  </span>

                  <strong>
                    {prediction.fruit}
                  </strong>

                </div>


                <div className="model-row">

                  <span>
                    Fruit confidence
                  </span>

                  <strong>
                    {prediction.fruit_confidence}%
                  </strong>

                </div>


                <div className="model-row">

                  <span>
                    Quality
                  </span>

                  <strong className="quality-text">
                    {prediction.quality}
                  </strong>

                </div>


                <div className="model-row">

                  <span>
                    Quality confidence
                  </span>

                  <strong>
                    {prediction.quality_confidence}%
                  </strong>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default ModelResults;