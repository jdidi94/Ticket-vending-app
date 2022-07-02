import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";
const Config = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />;
      <Component {...pageProps} />;
    </div>
  );
};
Config.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx)
    .get("/api/users/currentuser")
    .catch((err) => {
      console.log(err.message);
    });
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};
export default Config;
