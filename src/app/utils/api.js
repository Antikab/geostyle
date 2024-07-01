export async function fetchStyleData(id) {
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

    const res = await fetch(`/api/updateGeoStyle/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    console.log('Данные успешно обновлены:', data);
    return data;
  } catch (error) {
    console.error('Ошибка обновления данных стиля:', error);
    throw error;
  }
}
