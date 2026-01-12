import { MainLayout } from './components/Layout/MainLayout';

function App() {
  return (
    <MainLayout>
      <div className="border-2 border-dashed border-border-color h-full rounded-xl flex items-center justify-center text-text-secondary">
        Aquí irá el componente &lt;Board /&gt;
      </div>
    </MainLayout>
  );
}

export default App;