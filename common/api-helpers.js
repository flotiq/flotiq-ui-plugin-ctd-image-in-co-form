const cachedImages = {};

const getCtdFeaturedImage = (client, dataUrl) => {
  if (!dataUrl) return null;

  const id = dataUrl.split("/api/v1/content/_media/")?.pop();
  if (!id) return null;

  if (cachedImages[id]) return cachedImages[id];
  cachedImages[id] = client["_media"].get(id).then(({ body }) => body);

  return cachedImages[id];
};

export { getCtdFeaturedImage };
