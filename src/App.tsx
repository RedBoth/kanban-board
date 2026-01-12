import { MainLayout } from './components/Layout/MainLayout';
import { Board } from './components/Kanban/Board';

function App() {
  return (
    <MainLayout>
      <Board />
    </MainLayout>
  );
}

export default App;