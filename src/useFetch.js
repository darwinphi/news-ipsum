import { useEffect, useState } from "react";

const useFetch = ({ uri, refreshAPI }) => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading("Loading...");
    const fetchData = async () => {
      try {
        let response = await fetch(uri);
        let result = await response.json();
        setData(result.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    uri && fetchData();
  }, [uri, refreshAPI]);

  return {
    data,
    loading,
  };
};

export default useFetch;
