import inspiringImage from "../assets/inspiringImage.webp";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to ToDo List App!</h1>
      <img
        src={inspiringImage}
        alt="Inspiring ToDo Illustration"
        style={{
          maxWidth: "100%",
          height: "auto",
          maxHeight: "600px",
          borderRadius: "8px",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.7)",
        }}
      />
    </div>
  );
};

export default HomePage;
