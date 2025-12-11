// src/components/QuickActions.jsx
function QuickActions({ onMarkAllCompleted, onResetAllStatuses, technologies, onDeleteAll }) {
  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    console.log('Данные для экспорта:', JSON.stringify(data, null, 2));
    alert('Данные подготовлены для экспорта (см. консоль)');
  };
   const handleDeleteAll = () => {
    if (window.confirm('Вы уверены, что хотите удалить ВСЕ технологии? Это действие нельзя отменить!')) {
      onDeleteAll();
    }
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn-success">
          Отметить все как выполненные
        </button>
        <button onClick={onResetAllStatuses} className="btn-warning">
          Сбросить все статусы
        </button>
        <button onClick={handleExport} className="btn-info">
          Экспорт данных
        </button>
        <button onClick={handleDeleteAll} className="btn-danger">
          Удалить все
        </button>
      </div>
    </div>
  );
}

 

export default QuickActions;
