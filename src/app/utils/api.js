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

export async function fetchUpdateStyleData(id, values, imageFile) {
  try {
    const formData = new FormData();

    // Добавляем все поля формы в formData
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    if (imageFile) {
      const uniqueId = self.crypto.randomUUID(); // Создаем уникальный идентификатор
      const originalFileName = imageFile.name; // Извлекаем расширение исходного файла
      const extension = originalFileName.substring(
        originalFileName.lastIndexOf('.')
      );
      const uniqueFileName = `${uniqueId}${extension}`; // Создаем уникальное имя файла
      formData.append('file', imageFile, uniqueFileName);
    }

    const res = await fetch(`/api/updateStyle/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка обновления данных стиля:', error);
    throw error;
  }
}

export async function fetchDeleteStyle(id) {
  try {
    const res = await fetch(`/api/deleteStyle/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error('Ошибка при удалении стиля:', error);
    throw error;
  }
}

export async function fetchStyles(currentPage, pageSize) {
  try {
    const res = await fetch(
      `/api/getStyles?currentPage=${currentPage}&pageSize=${pageSize}`
    );
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

export async function fetchSearchStyles(page = 1, size = 10, query = '') {
  const queryString = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    query: query,
  });
  try {
    const response = await fetch(`/api/searchStyles?${queryString.toString()}`);
    if (!response.ok) {
      throw new Error('Ошибка получения данных');
    }
    return response.json();
  } catch (error) {
    console.error('Ошибка при запросе поиска стилей:', error);
    throw error;
  }
}
