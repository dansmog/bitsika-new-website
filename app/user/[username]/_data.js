import axios from "axios";
import { cache } from "react";

export const getUserByUsername = cache(async (username) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_SOCIAL_URL;
  try {
    const response = await axios.get(
      `${BASE_URL}/get-user?username=${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-service-name": "social-api",
        },
      }
    );
    return { user: response.data.data, err: null };
  } catch (error) {
    return {
      user: null,
      err: JSON.parse(JSON.stringify(error)) ?? null,
    };
  }
});
