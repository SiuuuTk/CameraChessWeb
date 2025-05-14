import NavButton from "./navButton";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons";

const Home = () => {
  return (
    <div className="container-flex d-flex flex-column justify-content-between align-items-center h-100 p-0 m-0 text-white bg-dark">
      {/* Logo cliquable + Live Mode */}
      <div className="mt-4 text-center">
        <a
          href="https://checkmatetracker.com"
          target="_self"
          style={{ textDecoration: "none" }}
        >
          <img
            src="/android-chrome-512x512.png"
            alt="Logo"
            className="responsive-logo"
            width="400"
            style={{
              transition: "transform 0.3s ease-in-out",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          />
        </a>
        <h2
          className="responsive-title"
          style={{ color: "rgb(63, 81, 181)", marginTop: "10px" }}
        >
          Live Mode
        </h2>
      </div>

      {/* Boutons centrés et remontés */}
      <div className="d-flex flex-column align-items-center mt-5 button-wrapper">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <NavButton text="Upload" tokenRequired={false} />
          <NavButton text="Record" tokenRequired={false} />
        </div>

        {/* Texte explicatif */}
        <p
          style={{
            maxWidth: "600px",
            textAlign: "center",
            color: "#ccc",
            fontSize: "0.95rem",
            marginTop: "32px",
          }}
        >
          The Live Mode lets you convert a real-life chess game video into a PGN
          file. This PGN can then be pasted into our analysis tool for a full
          evaluation.
          <br />
          <br />- If you already have a video of your game, click{" "}
          <strong>Upload</strong>.
          <br />- If you want to record your game now, click{" "}
          <strong>Record</strong> to use your device's camera.
          <br />
          <br />
          <em>
            *To return to the main analysis page, just click the Checkmate
            Tracker logo at the top.*
          </em>
        </p>
      </div>

      {/* Réseaux sociaux */}
      <div className="d-flex justify-content-center align-items-center mb-4 mt-auto social-wrapper">
        <SocialIcon
          url="https://x.com/CheckMTracker"
          className="mx-2"
          bgColor="rgb(33, 37, 41)"
          fgColor="#ffffff"
        />
        <SocialIcon
          url="https://www.facebook.com/profile.php?id=61575655197875"
          className="mx-2"
          bgColor="rgb(33, 37, 41)"
          fgColor="#ffffff"
        />
      </div>
    </div>
  );
};

export default Home;
