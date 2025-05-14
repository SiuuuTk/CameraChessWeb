import * as tf from "@tensorflow/tfjs";
import { loadGraphModel, GraphModel } from "@tensorflow/tfjs-converter";
/*import { MODEL_HEIGHT, MODEL_WIDTH } from "../utils/constants";*/

const LoadModels = async (
  piecesModelRef: React.MutableRefObject<GraphModel | null>,
  xcornersModelRef: React.MutableRefObject<GraphModel | null>,
) => {
  if (piecesModelRef.current && xcornersModelRef.current) return;

  await tf.ready();

  // Charge les modèles
  piecesModelRef.current = await loadGraphModel(
    "/480M_pieces_float16/model.json",
  );
  xcornersModelRef.current = await loadGraphModel(
    "/480L_xcorners_float16/model.json",
  );

  console.log("Modèles chargés avec succès.");
};

export default LoadModels;
