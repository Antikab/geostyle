export function createUniqueFileName(file) {
  const uniqueId = self.crypto.randomUUID(); // Создаем уникальный идентификатор
  const originalFileName = file.name; // Извлекаем имя исходного файла
  const extension = originalFileName.substring(
    originalFileName.lastIndexOf('.')
  );
  const uniqueFileName = `${uniqueId}${extension}`; // Создаем уникальное имя файла
  return uniqueFileName;
}
