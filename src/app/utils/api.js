import createUniqueFileName from './fileUtils';

const handleError = error => {
  console.error('Ошибка:', error);
  throw error;
};

const createFormData = (values, imageFile) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value);
  }

  if (imageFile) {
    const uniqueFileName = createUniqueFileName(imageFile);
    formData.append('image', imageFile, uniqueFileName);
  }

  return formData;
};

// Получение данных стиля по ID
export async function fetchStyleId(id) {
  try {
    const res = await fetch(`/api/getStyleId/${id}`);
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    handleError(error);
  }
}

// Обновление данных стиля
export async function fetchUpdateStyleId(id, values, imageFile) {
  const formData = createFormData(values, imageFile);

  try {
    const res = await fetch(`/api/updateStyle/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    handleError(error);
  }
}

// Создание нового стиля
export async function fetchCreateStyle(values, imageFile) {
  const formData = createFormData(values, imageFile);

  try {
    const res = await fetch('/api/createStyle', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    handleError(error);
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

    return await res.json();
  } catch (error) {
    handleError(error);
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

    return await res.json();
  } catch (error) {
    handleError(error);
  }
}
