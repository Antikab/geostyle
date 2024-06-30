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

export async function fetchUpdateStyleData(id, updatedData) {
  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(updatedData)) {
      formData.append(key, value);
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
