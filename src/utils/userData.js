export const users = [
    {
      id: 1,
      name: "User1",
      budget: 100,
      rentedMovies: []
    },
    {
      id: 2,
      name: "User2",
      budget: 100,
      rentedMovies: []
    },
    {
      id: 3,
      name: "User3",
      budget: 100,
      rentedMovies: []
    },
    {
      id: 4,
      name: "User4",
      budget: 100,
      rentedMovies: []
    },
    {
      id: 5,
      name: "User5",
      budget: 100,
      rentedMovies: []
    },
    {
      id: 6,
      name: "User6",
      budget: 100,
      rentedMovies: []
    }
  ];
  
  function generateColor(id) {
    const baseHue = 50;  // Начальный оттенок
    const hueStep = 35;  // Шаг изменения оттенка для разных пользователей
    const hue = (baseHue + id * hueStep) % 360;
    return `hsl(${hue}, 50%, 50%)`;  // Возвращаем цвет в формате HSL
  }
  
  // Добавляем цвета для каждого пользователя:
  users.forEach(user => {
    user.color = generateColor(user.id);
  });
  