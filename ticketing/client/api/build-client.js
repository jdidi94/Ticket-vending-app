import axios from "axios";
const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://e-ticket.monster",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default buildClient;
