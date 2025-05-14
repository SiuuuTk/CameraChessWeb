import { Chessboard } from "kokopu-react";
import { HomeButton, PgnButton } from "./index.tsx";
import { Game } from "../../types.tsx";
import { gameSelect } from "../../slices/gameSlice.tsx";
import { SetStringArray } from "../../types";

interface SidebarProps {
  sidebarRef: React.RefObject<HTMLDivElement>;
  playing: boolean;
  text: string[];
  setText: SetStringArray;
  children?: React.ReactNode;
  helpText?: React.ReactNode;
}

const Sidebar = ({
  sidebarRef,
  playing,
  text,
  setText,
  children,
  helpText,
}: SidebarProps) => {
  const game: Game = gameSelect();

  const boardDisplay = () => (
    <Chessboard
      turnVisible={false}
      squareSize={20}
      position={game.fen}
      coordinateVisible={false}
    />
  );

  const textDisplay = () => (
    <div className="text-white">
      {text.map((t, i) => (
        <div key={i}>{t}</div>
      ))}
    </div>
  );

  const buttons = () => (
    <div className="btn-group w-100" role="group">
      <PgnButton setText={setText} playing={playing} />
      <HomeButton />
    </div>
  );

  return (
    <div
      ref={sidebarRef}
      className="d-flex flex-column text-center mx-1"
      style={{ minWidth: "200px" }}
    >
      <ul className="nav nav-pills flex-column">
        <li
          className="my-1"
          style={{ display: playing ? "inline-block" : "none" }}
        >
          {boardDisplay()}
        </li>
        {children}
        <li className="border-top"></li>
        <li className="my-1">{textDisplay()}</li>
        <li className="border-top"></li>
        <li className="my-1">{buttons()}</li>

        {/* Help Text (only if provided) */}
        {helpText && <li className="mt-4 px-2">{helpText}</li>}
      </ul>
    </div>
  );
};

export default Sidebar;
