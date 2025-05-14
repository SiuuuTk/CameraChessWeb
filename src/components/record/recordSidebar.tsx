import {
  CornersButton,
  Sidebar,
  RecordButton,
  StopButton,
  FenButton,
  DeviceButton,
} from "../common";
import { SetBoolean, SetStringArray } from "../../types";

const RecordSidebar = ({
  piecesModelRef,
  xcornersModelRef,
  videoRef,
  canvasRef,
  sidebarRef,
  playing,
  setPlaying,
  text,
  setText,
  cornersRef,
}: {
  piecesModelRef: any;
  xcornersModelRef: any;
  videoRef: any;
  canvasRef: any;
  sidebarRef: any;
  playing: boolean;
  setPlaying: SetBoolean;
  text: string[];
  setText: SetStringArray;
  cornersRef: any;
}) => {
  const inputStyle = {
    display: playing ? "none" : "inline-block",
  };

  return (
    <Sidebar
      sidebarRef={sidebarRef}
      playing={playing}
      text={text}
      setText={setText}
      helpText={
        <div
          style={{
            fontSize: "0.75rem",
            color: "#ccc",
            lineHeight: "1.4",
            maxWidth: "220px",
            wordWrap: "break-word",
            whiteSpace: "normal",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              marginBottom: "0.5rem",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            How to Use?
          </div>
          <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
            <li>Select your device (camera or phone).</li>
            <li>
              Click the <strong>Find corners</strong> button and wait a few
              seconds for the software to automatically detect the chessboard.
            </li>
            <li>
              Choose who starts: let the system detect it, or manually select{" "}
              <strong>black</strong> or <strong>white</strong>.
            </li>
            <li>
              Click the <strong>Play</strong> button to start recording.
            </li>
            <li>
              Once the game is finished, click the{" "}
              <strong>square button</strong> to stop the recording.
            </li>
            <li>
              Click <strong>Copy PGN</strong> to save your game.
            </li>
            <li>
              Click the <strong>Home</strong> button (house icon), then the{" "}
              <strong>Checkmate Tracker</strong> logo at the top to access the{" "}
              <strong>Analysis</strong> page.
            </li>
          </ol>
        </div>
      }
    >
      <li className="my-1" style={inputStyle}>
        <DeviceButton videoRef={videoRef} />
      </li>
      <li className="my-1" style={inputStyle}>
        <CornersButton
          piecesModelRef={piecesModelRef}
          xcornersModelRef={xcornersModelRef}
          videoRef={videoRef}
          canvasRef={canvasRef}
          setText={setText}
        />
      </li>
      <li className="my-1" style={inputStyle}>
        <FenButton
          piecesModelRef={piecesModelRef}
          videoRef={videoRef}
          canvasRef={canvasRef}
          setText={setText}
          cornersRef={cornersRef}
        />
      </li>
      <li className="my-1">
        <div className="btn-group w-100" role="group">
          <RecordButton playing={playing} setPlaying={setPlaying} />
          <StopButton setPlaying={setPlaying} setText={setText} />
        </div>
      </li>
    </Sidebar>
  );
};

export default RecordSidebar;
