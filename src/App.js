import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const API_URI =
    "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=";
  const API_KEY = "YKRi1r2uqATpwHGkRSKcRqLR31SUt2kl";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numOfParagraph, setNumOfParagraph] = useState(1);
  const [news, setNews] = useState([]);

  const divideParagraph = (news) => {
    let combinedParagraph = combineParagraph(news);
    let result = [];
    for (let i = numOfParagraph; i > 0; i--) {
      result.push(
        combinedParagraph.splice(0, Math.ceil(combinedParagraph.length / i))
      );
    }
    setNews(result);
  };

  const combineNews = (results) => {
    let combinedNews = results.map((item) => {
      return ` ${item.abstract}`;
    });

    setNews(combinedNews);
    return combinedNews;
  };

  const combineParagraph = (arr) => {
    return arr.flat();
  };

  const removeEmptyNews = (news) => {
    return news.filter(function (e) {
      return e === 0 ? "0" : e;
    });
  };

  const shuffleNews = (news) => {
    return news.slice().sort(() => Math.random() - 0.5);
  };

  const getHalfNews = (news) => {
    const half = Math.ceil(news.length / 2);
    const firstHalf = news.slice(0, half);
    return firstHalf;
  };

  const formatNews = (news) => {
    let combinedNews = combineNews(news);
    let formattedNews = removeEmptyNews(combinedNews);
    let halfNews = getHalfNews(formattedNews);
    return shuffleNews(halfNews);
  };

  const fetchNews = async () => {
    try {
      let response = await fetch(`${API_URI}${API_KEY}`);
      let result = await response.json();
      const { results } = result;
      setIsLoaded(true);
      let formattedNews = formatNews(results);
      divideParagraph(formattedNews);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

  const copyText = (news) => {
    let n = [];
    for (let i = 0; i < numOfParagraph; i++) {
      n.push(news[i].join(""));
    }

    navigator.clipboard.writeText(n.join("\n\n")).then(
      function () {
        console.log("Copied");
      },
      function (err) {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    fetchNews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        <h1>📰 News Ipsum</h1>
        <label>Paragraph</label>
        <select onChange={(e) => setNumOfParagraph(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <button onClick={() => fetchNews()}>🌎 Show Latest News</button>
        <button onClick={() => copyText(news)}>📝 Copy </button>
        <section>
          {news.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      </main>
    );
  }
}

export default App;
