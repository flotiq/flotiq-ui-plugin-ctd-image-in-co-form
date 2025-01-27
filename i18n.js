import i18n from "i18next";

i18n.init({
  fallbackLng: "en",
  supportedLngs: ["en", "pl"],
  resources: {
    en: {
      translation: {
        FeaturedImage: "Content Type featured image",
      },
    },
    pl: {
      translation: {
        FeaturedImage: "Obrazek wyróżniający definicji typu",
      },
    },
  },
});

export default i18n;
