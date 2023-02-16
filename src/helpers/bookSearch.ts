// корректировка данных, полученных от API
export const missingData = (data: { items: any[] }) => {
  const missData = data.items?.map((item) => bookAdapter(item));
  return missData;
};

export const bookAdapter = (item: any) => {
  if (item.volumeInfo.categories?.length > 0) {
    item.volumeInfo.categories = item.volumeInfo.categories[0].split(" ")[0];
  }
  if (item.volumeInfo.authors?.length > 1) {
    item.volumeInfo.authors = item.volumeInfo.authors.join(", ");
  }
  return item;
};
