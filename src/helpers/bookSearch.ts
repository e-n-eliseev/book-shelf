import sample from "../assets/sample.jpg";
// корректировка данных, полученных от API
export const missingData = (data: { items: any[] }) => {
  const missData = data.items.map((item) => bookAdapter(item));
  return missData;
};

export const bookAdapter = (item: any) => {
  if (item.volumeInfo.hasOwnProperty("imageLinks") === false) {
    item.volumeInfo["imageLinks"] = { thumbnail: sample };
  }
  if (item.volumeInfo.imageLinks.hasOwnProperty("thumbnail") === false) {
    item.volumeInfo.imageLinks["thumbnail"] = sample;
  }
  if (item.volumeInfo.hasOwnProperty("categories") === false) {
    item.volumeInfo["categories"] = "";
  }
  if (item.volumeInfo.categories.length > 0) {
    item.volumeInfo.categories = item.volumeInfo.categories[0].split(" ")[0];
  }
  if (item.volumeInfo.hasOwnProperty("title") === false) {
    item.volumeInfo["title"] = "";
  }
  if (item.volumeInfo.hasOwnProperty("authors") === false) {
    item.volumeInfo["authors"] = "";
  }
  if (item.volumeInfo.authors.length > 1) {
    item.volumeInfo.authors = item.volumeInfo.authors.join(", ");
  }
  return item;
};
