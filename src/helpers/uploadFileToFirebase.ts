export const fileCheck = (file: {
  type: string;
  size: number;
}): Array<boolean | string> => {
  if (!file) return [false, "Необходимо выбрать файл!"];
  if (file.type !== "image/jpeg" && file.type !== "image/png")
    return [false, "Неправильный формат файла!"];
  if (file.size > 1000000)
    return [false, "Размер загружаемого файла должен быть не более 1Мб!"];
  return [true, ""];
};
