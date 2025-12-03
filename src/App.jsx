import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

const App = (props) => {
  return (
    <>
      <Header />

      <main class="main-content">
        {props.children}
      </main>

      <Footer />
    </>
  );
};

export default App;
