import {
  VideoButton,
  PlayButton,
  RestartButton,
  PlaybackButtons,
  StopButton,
} from "./buttons";
import { CornersButton, Sidebar, FenButton } from "../common";
import { SetBoolean, SetStringArray } from "../../types";

const UploadSidebar = ({
  videoRef,
  xcornersModelRef,
  piecesModelRef,
  canvasRef,
  sidebarRef,
  text,
  setText,
  playing,
  setPlaying,
  cornersRef,
}: {
  videoRef: any;
  xcornersModelRef: any;
  piecesModelRef: any;
  canvasRef: any;
  sidebarRef: any;
  text: string[];
  setText: SetStringArray;
  playing: boolean;
  setPlaying: SetBoolean;
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
            <li>
              Click on the <strong>file icon</strong> and select your file.
            </li>
            <li>
              Click <strong>Find corners</strong> and wait.
            </li>
            <li>Choose who starts: robot or manual (black/white).</li>
            <li>
              Select <strong>speed</strong>: x1, x2 or x4.
            </li>
            <li>
              Click <strong>Play</strong> to start the video.
            </li>
            <li>
              When done, click <strong>Pause</strong>, then{" "}
              <strong>Copy PGN</strong>.
            </li>
            <li>
              Click the <strong>Home</strong> button, then the{" "}
              <strong>Checkmate Tracker </strong>logo to go to{" "}
              <strong>Analysis</strong>.
            </li>
          </ol>
        </div>
      }
    >
      <li className="my-1" style={inputStyle}>
        <VideoButton
          videoRef={videoRef}
          canvasRef={canvasRef}
          setPlaying={setPlaying}
        />
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
      <li className="my-1" style={inputStyle}>
        <PlaybackButtons videoRef={videoRef} />
      </li>
      <li className="my-1">
        <div className="btn-group w-100" role="group">
          <PlayButton
            videoRef={videoRef}
            playing={playing}
            setPlaying={setPlaying}
          />
          <StopButton
            videoRef={videoRef}
            setPlaying={setPlaying}
            setText={setText}
          />
          <RestartButton videoRef={videoRef} setText={setText} />
        </div>
      </li>
    </Sidebar>
  );
};

export default UploadSidebar;
