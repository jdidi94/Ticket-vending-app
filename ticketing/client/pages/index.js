import buildClient from "../api/build-client";

const App = ({ currentUser }) => {
  console.log(currentUser);

  return currentUser ? <h1>you are sign in</h1> : <h1>You are not sign in</h1>;
};
App.getInitialProps = async (context) => {
  const { data } = await buildClient(context)
    .get("/api/users/currentuser")
    .catch((err) => {
      console.log(err.message);
    });
  console.log("dataIndex", data);
  return data;
};
export default App;
