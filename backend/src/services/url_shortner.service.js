import { generateNanoId } from "../utils/helper.js";
import { saveURL } from "../dao/short_url.js";

export const createShortURlWithoutUser = async (url) => {
  const id = generateNanoId(7);
  if(!id) throw new Error("Short URL not generated")
  const newURL = await saveURL(url, "Qw5W9PO");
  return newURL;
};

export const createShortURlWithUser = async (url, userId) => {
  const id = generateNanoId(7);
  const newURL = await saveURL(url, id, userId);
  return newURL;
};
