import { useState, useRef } from "react";
import { Sidebar, StudyButton } from "../common";
import ExportButton from "./exportButton";
import { Study } from "../../types";

const UploadSidebar = ({ pgn }: { pgn: string }) => {
  const [study, setStudy] = useState<Study | null>(null);
  const [text, setText] = useState<string[]>([
    "Select a study",
    "Export the game",
  ]);
  const sidebarRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>; // Utilisez une assertion de type

  return (
    <Sidebar
      playing={false}
      text={text}
      setText={setText}
      sidebarRef={sidebarRef}
    >
      {" "}
      {/* Ajoutez sidebarRef ici */}
      <li className="border-top"></li>
      <li className="my-2">
        <StudyButton study={study} setStudy={setStudy} onlyBroadcasts={false} />
      </li>
      <li className="my-2">
        <ExportButton study={study} setText={setText} pgn={pgn} />
      </li>
    </Sidebar>
  );
};

export default UploadSidebar;
