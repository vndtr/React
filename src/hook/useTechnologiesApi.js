// src/hooks/useTechnologiesApi.js
import { useState, useEffect, useCallback } from 'react';

// Кастомный хук для работы с API технологий
function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка технологий
  const fetchTechnologies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Имитация загрузки с API с задержкой
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Проверяем localStorage как fallback
      const saved = localStorage.getItem('technologies');
      if (saved) {
        setTechnologies(JSON.parse(saved));
      } else {
        // Если нет данных, используем mock данные
        const mockTechnologies = [
          {
            id: 1,
            title: 'React Components',
            description: 'Изучение функциональных и классовых компонентов',
            category: 'frontend',
            status: 'not-started',
            notes: '',
            resources: ['https://react.dev']
          },
          {
            id: 2,
            title: 'Node.js Basics',
            description: 'Основы серверного JavaScript и создание REST API',
            category: 'backend',
            status: 'not-started',
            notes: '',
            resources: ['https://nodejs.org']
          }
        ];
        setTechnologies(mockTechnologies);
        localStorage.setItem('technologies', JSON.stringify(mockTechnologies));
      }

    } catch (err) {
      setError('Не удалось загрузить технологии');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Добавление новой технологии
  const addTechnology = useCallback(async (techData) => {
    try {
      setError(null);
      
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTech = {
        id: Date.now(),
        ...techData,
        createdAt: new Date().toISOString()
      };

      const updatedTechnologies = [...technologies, newTech];
      setTechnologies(updatedTechnologies);
      localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
      
      return newTech;
    } catch (err) {
      setError('Не удалось добавить технологию');
      throw err;
    }
  }, [technologies]);

  // Обновление технологии
  const updateTechnology = useCallback(async (id, updates) => {
    try {
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));

      const updatedTechnologies = technologies.map(tech =>
        tech.id === id ? { ...tech, ...updates } : tech
      );
      
      setTechnologies(updatedTechnologies);
      localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
      
      return updatedTechnologies.find(tech => tech.id === id);
    } catch (err) {
      setError('Не удалось обновить технологию');
      throw err;
    }
  }, [technologies]);

  // Удаление технологии
  const deleteTechnology = useCallback(async (id) => {
    try {
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));

      const updatedTechnologies = technologies.filter(tech => tech.id !== id);
      setTechnologies(updatedTechnologies);
      localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    } catch (err) {
      setError('Не удалось удалить технологию');
      throw err;
    }
  }, [technologies]);

  // Загружаем технологии при монтировании
  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    updateTechnology,
    deleteTechnology
  };
}

export default useTechnologiesApi;