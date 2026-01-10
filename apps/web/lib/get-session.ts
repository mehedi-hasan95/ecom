import axios from "axios";

export async function getMe() {
  const { data } = await axios.get(
    `http://localhost:6001/api/v1/auth/session`,
    {
      withCredentials: true,
    }
  );
  return data;
}

export const getSession = async () => {
  try {
    const response = await axios.get(
      "http://localhost:6001/api/v1/auth/session",
      {
        withCredentials: true, // Required to send session cookies
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log("User is unauthorized");
        return null;
      }
    }
    console.error("Fetch error:", error);
    throw error;
  }
};
