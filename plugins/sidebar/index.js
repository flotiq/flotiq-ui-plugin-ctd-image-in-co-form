import pluginInfo from "../../plugin-manifest.json";
import {
  addElementToCache,
  getCachedElement,
} from "../../common/plugin-element-cache";
import { getCtdFeaturedImage } from "../../common/api-helpers";
import i18n from "../../i18n";

export function handleSidebarAdd({ contentType, contentObject }, client) {
  const featuredImage = contentType?.featuredImage?.[0];
  if (!featuredImage) return;

  const cacheKey = `${pluginInfo.id}-${contentType.name}-${contentObject?.id || "add"}`;
  let element = getCachedElement(cacheKey)?.element;

  if (!element) {
    element = document.createElement("div");
    element.classList.add("plugin-ctd-image-in-co-form");

    const title = document.createElement("div");
    title.classList.add("plugin-ctd-image-in-co-form__title");
    title.textContent = i18n.t("FeaturedImage");
    element.appendChild(title);

    const img = document.createElement("img");
    element.appendChild(img);

    getCtdFeaturedImage(client, featuredImage.dataUrl).then((media) => {
      const mediaSrc = client.getMediaUrl(media, 1000);
      img.src = mediaSrc;
    });

    element.addEventListener("flotiq.attached", () => {
      element.parentElement.style.order = 40;
    });
  }

  addElementToCache(element, cacheKey);

  return element;
}
