import "./App.css";
import { useState, useEffect, useCallback } from "react";
import useFetch from "./useFetch";

function App() {
  const API_URI =
    "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=";
  const API_KEY = "YKRi1r2uqATpwHGkRSKcRqLR31SUt2kl";
  const API = `${API_URI}${API_KEY}`;
  const SIZE = {
    SHORT: 5,
    MEDIUM: 4,
    LONG: 3,
  };
  const COPY_TEXT = {
    COPY: "📝 Copy",
    COPIED: "✨ Copied!",
  };

  const [refreshAPI, setRefreshAPI] = useState(false);
  let { data } = useFetch({ uri: API, refreshAPI: refreshAPI });
  const [numOfParagraph, setNumOfParagraph] = useState(1);
  const [news, setNews] = useState(null);
  const [copy, setCopy] = useState(COPY_TEXT.COPY);
  const [sizeOfParagraph, setSizeOfParagraph] = useState(SIZE.SHORT);

  const combineNews = (data) => {
    return data.map((item) => ` ${item.abstract}`);
  };

  const removeEmptyNews = (data) => {
    return data.filter((element) => element !== " ");
  };

  const getSizeOfNews = useCallback(
    (news) => {
      const size = Math.ceil(news.length / sizeOfParagraph);
      return news.slice(1, size);
    },
    [sizeOfParagraph]
  );

  const shuffleNews = (news) => {
    return news.slice().sort(() => Math.random() - 0.5);
  };

  const combineParagraph = (arr) => {
    return arr && arr.flat();
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

  const divideParagraph = useCallback(
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

  const formatNews = useCallback(
    (data) => {
      let combinedNews = combineNews(data);
      let removedEmptyNews = removeEmptyNews(combinedNews);
      let sizeOfNews = getSizeOfNews(removedEmptyNews);
      return divideParagraph(sizeOfNews);
    },
    [divideParagraph, getSizeOfNews]
  );

  useEffect(() => {
    if (data) {
      formatNews(data);
    }
  }, [data, formatNews]);
  return (
    <main>
      <h1>📰 News Ipsum</h1>

      <select
        onChange={(e) => {
          setNumOfParagraph(e.target.value);
          setCopy(COPY_TEXT.COPY);
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <select
        onChange={(e) => {
          setSizeOfParagraph(e.target.value);
          setCopy(COPY_TEXT.COPY);
        }}
      >
        <option value={SIZE.SHORT}>Short</option>
        <option value={SIZE.MEDIUM}>Medium</option>
        <option value={SIZE.LONG}>Long</option>
      </select>
      <label>Paragraph(s)</label>

      <button
        className="button-latest-news"
        onClick={() => {
          setRefreshAPI(!refreshAPI);
          setCopy(COPY_TEXT.COPY);
        }}
      >
        🌎 Show Latest News
      </button>
      <button
        className="button-copy"
        onClick={() => {
          copyText(news);
          setCopy(COPY_TEXT.COPIED);
        }}
      >
        {copy}
      </button>

      <section>
        {news && news.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </section>
    </main>
  );
}

export default App;
