import urlSchema from "../model/urlShortner.model.js";

export const saveURL = async (longUrl, shortUrl, userId) => {
  const newURL = new urlSchema({
    full_url: longUrl,
    short_url: shortUrl,
  });

  if (userId) {
    newURL.user_id = userId;
  }
  await newURL.save();
  return newURL;
};

export const getShortUrl = async (id) => {
  return await urlSchema.findOneAndUpdate({
    short_url: id,
  }, {
    $inc: {
      clicks: 1
    }
  });
};
