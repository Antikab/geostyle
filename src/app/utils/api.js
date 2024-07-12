import { createUniqueFileName } from './fileUtils';

// Получение данных стиля по ID
export async function fetchStyleId(id) {
  try {
    const res = await fetch(`/api/getStyleId/${id}`);
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка получения данных стиля:', error);
    throw error;
  }
}

// Обновление данных стиля
export async function fetchUpdateStyleData(id, values, imageFile) {
  const formData = new FormData();

  // Добавляем все поля формы в formData
  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value);
  }

  // Если есть файл изображения, добавляем его в formData с уникальным именем файла
  if (imageFile) {
    const uniqueFileName = createUniqueFileName(imageFile);
    formData.append('file', imageFile, uniqueFileName);
  }

  try {
    const res = await fetch(`/api/updateStyle/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка обновления данных стиля:', error);
    throw error;
  }
}

// Создание нового стиля
export async function fetchCreateStyle(values, imageFile) {
  const formData = new FormData();

  // Добавляем все поля формы в formData
  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value);
  }

  const uniqueFileName = createUniqueFileName(imageFile);
  formData.append('file', imageFile, uniqueFileName);

  try {
    const res = await fetch('/api/createStyle', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка при создании стиля:', error);
    throw error;
  }
}

// Удаление стиля по ID
export async function fetchDeleteStyle(id) {
  try {
    const res = await fetch(`/api/deleteStyle/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка при удалении стиля:', error);
    throw error;
  }
}

// Получение списка стилей с учетом параметров пагинации и поискового запроса
export async function fetchStyles(currentPage = 1, pageSize = 10, query = '') {
  const queryString = new URLSearchParams({
    currentPage: currentPage.toString(),
    pageSize: pageSize.toString(),
    query: query,
  });

  try {
    const res = await fetch(`/api/getStyles?${queryString.toString()}`);
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка получения стилей:', error);
    throw error;
  }
}
