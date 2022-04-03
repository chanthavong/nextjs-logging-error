import Head from "next/head";
import Image from "next/image";
function Home() {
  const sendError = (err) => {
    try {
      console.log(x);
    } catch (error) {
      fetch("/api/log", {
        method: "POST",
        body: JSON.stringify({
          message: error.message,
          page: window.location.href,
        }),
      });
    }
  };
  return (
    <div>
      <h1>Nextjs</h1>
      <button onClick={(e) => sendError(e)}>test</button>
    </div>
  );
}

export default Home;
