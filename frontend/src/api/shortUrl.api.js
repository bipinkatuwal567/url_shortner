import axiosInstance from "../utils/axiosInstance";

const createShortUrl = async (url) => {
  const response = await axiosInstance.post("/api/create", {
    url,
  });
  return response.data.shortURL;
};

export default createShortUrl;
