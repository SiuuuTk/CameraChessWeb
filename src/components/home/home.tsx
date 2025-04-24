import NavButton from "./navButton";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column text-center text-white bg-dark">
      <div className="d-flex gap-4">
        <NavButton text="Upload" tokenRequired={false} />
        <NavButton text="Record" tokenRequired={false} />
      </div>
    </div>
  );
};

export default Home;
