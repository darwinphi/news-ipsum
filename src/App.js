import "./App.css";
import { useState, useEffect, useCallback } from "react";
import useFetch from "./useFetch";
import Header from "./components/Header";
import Select from "./components/Select";
import Button from "./components/Button";
import Paragraphs from "./components/Paragraphs";

function App({ API }) {
  const SIZE = {
    SHORT: 4,
    MEDIUM: 8,
    LONG: 12,
  };
  const COPY_TEXT = {
    COPY: "📝 Copy",
    COPIED: "✨ Copied!",
  };
  const numOfParagraphOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  const sizeOfParagraphOptions = [
    { value: SIZE.SHORT, label: "Short" },
    { value: SIZE.MEDIUM, label: "Medium" },
    { value: SIZE.LONG, label: "Long" },
  ];

  const [refreshAPI, setRefreshAPI] = useState(false);
  const { data, time, loading } = useFetch({
    uri: API,
    refreshAPI: refreshAPI,
  });
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
      return news.slice(0, sizeOfParagraph * numOfParagraph);
    },
    [sizeOfParagraph, numOfParagraph]
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

    navigator.clipboard.writeText(n.join("\n\n"));
  };

  const divideParagraph = useCallback(
    (news) => {
      if (news) {
        const shuffledNews = shuffleNews(news);
        const combinedParagraph = combineParagraph(shuffledNews);
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

  const getResults = (data) => {
    return data.results;
  };

  const formatNews = useCallback(
    (data) => {
      let results = getResults(data);
      let combinedNews = combineNews(results);
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
      <Header title="📰 News Ipsum"></Header>
      <Select
        opts={numOfParagraphOptions}
        handleChange={setNumOfParagraph}
        parentCallback={() => setCopy(COPY_TEXT.COPY)}
        dataTestId="numOfParagraph"
      />
      <Select
        opts={sizeOfParagraphOptions}
        handleChange={setSizeOfParagraph}
        parentCallback={() => setCopy(COPY_TEXT.COPY)}
      />
      <label>Paragraph(s)</label>
      <Button
        title="🌎 Show Latest News"
        className="button-latest-news"
        handleClick={() => {
          setRefreshAPI(!refreshAPI);
          setCopy(COPY_TEXT.COPY);
        }}
      />
      <Button
        title={copy}
        className="button-copy"
        handleClick={() => {
          copyText(news);
          setCopy(COPY_TEXT.COPIED);
        }}
      />
      <section>
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {!loading && news && <Paragraphs paragraphs={news} time={time} />}
      </section>
      <div className="layer waves"></div>
    </main>
  );
}

export default App;
