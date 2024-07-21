import { v4 as uuidv4 } from 'uuid';

export default function createUniqueFileName(file) {
  const uniqueId = uuidv4(); // Создаем уникальный идентификатор
  const originalFileName = file.name; // Извлекаем имя исходного файла
  const extension = originalFileName.substring(
    originalFileName.lastIndexOf('.')
  );
  const uniqueFileName = `${uniqueId}${extension}`; // Создаем уникальное имя файла
  return uniqueFileName;
}
