import ProductCardLg from './components/ProductCardLg.jsx';

const App = () => {
  return (
    <div>
      <h1 class="font-bold text-6xl text-theme-orange text-center py-20 border-amber-50 border flex justify-center border-y-stone-500">Welcome to SOlid with Tailwind CSS!</h1>
      <ProductCardLg title="ZX9 Speaker" description="Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound." showButton={true} showIcon={false} />
    </div>
  );
};

export default App;
