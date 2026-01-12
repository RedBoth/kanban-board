import { ColumnContainer } from './ColumnContainer';
import { useKanbanStore } from '../../store/useKanbanStore';

export const Board = () => {
  const columns = useKanbanStore((state) => state.columns);

  return (
    <div className="flex h-full gap-6 overflow-x-auto pb-4 items-start">
      {columns.map((col) => (
        <ColumnContainer key={col.id} column={col} />
      ))}
    </div>
  );
};