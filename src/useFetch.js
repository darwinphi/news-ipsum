import { useEffect, useState } from "react";

const useFetch = ({ uri, refreshAPI }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(uri);
        let result = await response.json();
        setData(result.results);
      } catch (error) {
        console.log(error);
      }
    };
    uri && fetchData();
  }, [uri, refreshAPI]);

  return {
    data,
  };
};

export default useFetch;
