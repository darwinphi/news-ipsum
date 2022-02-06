const Paragraphs = ({ paragraphs }) => {
  return (
    <>
      {!paragraphs && <p>No paragraphs</p>}
      {paragraphs &&
        paragraphs.map((paragraph, key) => (
          <p role="paragraph" key={key}>
            {paragraph}
          </p>
        ))}
    </>
  );
};

export default Paragraphs;
