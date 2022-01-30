import "./App.css";
import { useState, useEffect, useCallback } from "react";
import useFetch from "./useFetch";

function App() {
  const API_URI =
    "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=";
  const API_KEY = "YKRi1r2uqATpwHGkRSKcRqLR31SUt2kl";
  const API = `${API_URI}${API_KEY}`;

  const [refreshAPI, setRefreshAPI] = useState(false);
  let { data } = useFetch({ uri: API, refreshAPI: refreshAPI });
  const [numOfParagraph, setNumOfParagraph] = useState(1);
  const [news, setNews] = useState(null);

  const combineParagraph = (arr) => {
    return arr && arr.flat();
  };

  const removeEmptyNews = (data) => {
    return data.filter((element) => element !== " ");
  };

  const shuffleNews = (news) => {
    return news.slice().sort(() => Math.random() - 0.5);
  };

  const getHalfNews = (news) => {
    const half = Math.ceil(news.length / 2);
    const firstHalf = news.slice(0, half);
    return firstHalf;
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

  const combineNews = (data) => {
    return data.map((item) => ` ${item.abstract}`);
  };

  const divideParagraphInitial = useCallback(
    (news) => {
      if (news) {
        let shuffledNews = shuffleNews(news);
        let combinedParagraph = combineParagraph(shuffledNews);
        let result = [];
        for (let i = numOfParagraph; i > 0; i--) {
          result.push(
            combinedParagraph.splice(0, Math.ceil(combinedParagraph.length / i))
          );
        }
        setNews(result);
      }
    },
    [numOfParagraph]
  );

  useEffect(() => {
    if (data) {
      let combinedNews = combineNews(data);

      let removedEmptyNews = removeEmptyNews(combinedNews);

      let halvedNews = getHalfNews(removedEmptyNews);

      divideParagraphInitial(halvedNews);
    }
  }, [data, divideParagraphInitial]);
  return (
    <main>
      <h1>📰 News Ipsum</h1>

      <label>Paragraph</label>
      <select onChange={(e) => setNumOfParagraph(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <button onClick={() => setRefreshAPI(!refreshAPI)}>
        🌎 Show Latest News
      </button>
      <button onClick={() => copyText(news)}>📝 Copy </button>
      <section>
        {news && news.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </section>
    </main>
  );
}

export default App;
