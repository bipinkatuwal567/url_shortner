import urlSchema from "../model/urlShortner.model.js";
import { ConflictError } from "../utils/appError.js";

export const saveURL = async (longUrl, shortUrl, userId) => {
  try {
    const newURL = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });

    if (userId) {
      newURL.user_id = userId;
    }
    await newURL.save();
    return newURL;
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(error);
  }
};

export const getShortUrl = async (id) => {
  return await urlSchema.findOneAndUpdate(
    {
      short_url: id,
    },
    {
      $inc: {
        clicks: 1,
      },
    }
  );
};
