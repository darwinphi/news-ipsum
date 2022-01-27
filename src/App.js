import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState([]);

  const api_key = "YKRi1r2uqATpwHGkRSKcRqLR31SUt2kl";

  const divideParagraph = (news, numOfParagraph = 1) => {
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
      return `${item.abstract}`;
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

  const formatNews = (news) => {
    let combinedNews = combineNews(news);
    let formattedNews = removeEmptyNews(combinedNews);
    return shuffleNews(formattedNews);
  };

  const copy = (news) => {
    let paragraphs = news.map((paragraph) => {
      return paragraph;
    });
    navigator.clipboard.writeText(paragraphs);
  };

  const fetchNews = async () => {
    try {
      let response = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${api_key}`
      );
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

  console.log(news);

  useEffect(() => {
    fetchNews();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>News Ipsum</h1>
        <button onClick={() => divideParagraph(news, 1)}>1 Paragraph</button>
        <button onClick={() => divideParagraph(news, 2)}>2 Paragraph</button>
        <button onClick={() => divideParagraph(news, 3)}>3 Paragraph</button>
        <button onClick={() => fetchNews()}>Generate</button>

        <button onClick={() => copy(news)}>Copy</button>
        {news.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </>
    );
  }
}

export default App;
