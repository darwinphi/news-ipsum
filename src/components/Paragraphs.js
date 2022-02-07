const Paragraphs = ({ paragraphs, time }) => {
  return (
    <>
      {!paragraphs && <p>No paragraphs</p>}
      {paragraphs &&
        paragraphs.map((paragraph, key) => (
          <p role="paragraph" key={key}>
            {paragraph}
          </p>
        ))}
      <p style={{ textAlign: "right" }} role="time">
        <i>As of {time}</i>
      </p>
    </>
  );
};

export default Paragraphs;
