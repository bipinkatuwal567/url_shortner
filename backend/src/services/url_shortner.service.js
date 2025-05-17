import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../model/urlShortner.model.js";
import { saveURL } from "../dao/short_url.js";

export const createShortURlWithoutUser = async (url) => {
  const id = generateNanoId(7);
  const newURL = await saveURL(url, id);
  return newURL;
};

export const createShortURlWithUser = async (url, userId) => {
  const id = generateNanoId(7);
  const newURL = await saveURL(url, id, userId);
  return newURL;
};
