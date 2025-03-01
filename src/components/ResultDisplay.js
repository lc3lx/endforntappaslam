const ResultDisplay = ({ result }) => {
  return <div style={styles.container}>{result && <p>{result}</p>}</div>;
};

const styles = {
  container: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#333",
  },
};

export default ResultDisplay;
