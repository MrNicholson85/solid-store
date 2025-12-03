import Header from './components/Header.jsx';

const App = (props) => {
  return (
    <>
      <Header />

      <main class="main-content">
        {props.children}
      </main>
    </>
  );
};

export default App;
