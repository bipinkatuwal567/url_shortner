import { createShortURlWithoutUser } from "../services/url_shortner.service.js";
import { getShortUrl } from "../dao/short_url.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createShortURL = catchAsync(async (req, res, next) => {
  const { url } = req.body;
  const shortendURl = await createShortURlWithoutUser(url);

  res.send(process.env.APP_URL + shortendURl.short_url);
});

export const redirectUserFromShortUrl = catchAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  if (url) {
    res.redirect(url.full_url);
  } else {
    res.send("Sorry, this URL isn't shorten");
  }
});
