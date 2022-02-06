const Paragraphs = ({ paragraphs }) => {
  return paragraphs.map((paragraph, key) => <p key={key}>{paragraph}</p>);
};

export default Paragraphs;
