import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setError] = useState(null);

  const doRequest = async () => {
    try {
      setError(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (e) {
      setError(
        <div className="alert alert-danger">
          <h4>Ooops ....</h4>
          <ul className="my-0">
            {e.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
export default useRequest;
