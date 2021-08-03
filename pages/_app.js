// 唯一のグローバルCSS読み込みファイル
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
