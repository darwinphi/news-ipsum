import { useEffect, useState } from "react";

const useFetch = ({ uri, refreshAPI }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setLoading("Loading...");
    const fetchData = async () => {
      try {
        let response = await fetch(uri);
        let result = await response.json();
        setData(result);

        const date = new Date(result.last_updated);
        const time = date.toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        });
        const place = Intl.DateTimeFormat().resolvedOptions().timeZone;

        setTime(`${time}, ${place}`);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    uri && fetchData();
  }, [uri, refreshAPI]);

  return {
    data,
    time,
    loading,
  };
};

export default useFetch;
