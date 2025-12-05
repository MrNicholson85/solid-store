import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import LastCall from './components/LastCall.jsx';
import LastCallImage from './assets/img/image-best-gear.jpg';

const App = (props) => {
  return (
    <>
      <Header />

      <main class="main-content">
        {props.children}
      </main>
      
      <LastCall title={<>Bringing you the <span class="text-theme-orange">best</span> audio gear</>} copy="Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment." image={LastCallImage} />

      <Footer />
    </>
  );
};

export default App;
