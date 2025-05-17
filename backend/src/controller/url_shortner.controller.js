import { createShortURlWithoutUser } from "../services/url_shortner.service.js";
import urlSchema from "../model/urlShortner.model.js";
import { getShortUrl } from "../dao/short_url.js";

export const createShortURL = async (req, res) => {
  const { url } = req.body;
  const shortendURl = await createShortURlWithoutUser(url);

  res.send(process.env.APP_URL + shortendURl.short_url);
};

export const redirectUserFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  if (url) {
    res.redirect(url.full_url);
  } else {
    res.send("Sorry, this URL isn't shorten");
  }
};
