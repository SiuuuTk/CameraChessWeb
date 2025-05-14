import { useNavigate } from "react-router-dom";
import { userSelect } from "../../slices/userSlice";
import { FaUpload, FaVideo } from "react-icons/fa"; // Icônes font awesome

const NavButton = ({
  text,
  tokenRequired,
}: {
  text: string;
  tokenRequired: boolean;
}) => {
  const navigate = useNavigate();
  const token = userSelect().token;

  const noNavigate = token === "" && tokenRequired;

  const handleClick = () => {
    if (noNavigate) {
      return;
    }
    navigate(`/${text.toLowerCase()}`);
  };

  const Icon = text.toLowerCase() === "upload" ? FaUpload : FaVideo;

  return (
    <button
      className="btn btn-dark btn-lg btn-outline-light custom-nav-btn d-flex align-items-center justify-content-center gap-2"
      onClick={handleClick}
    >
      <Icon />
      {noNavigate ? `${text} (must Login)` : `${text}`}
    </button>
  );
};

export default NavButton;
