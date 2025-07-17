// To send token to Authorization as header in every request
import axios from "axios";

const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem("token");

async function fetchCurrentUser() {
  try {
    const res = await axios.get(`${VITE_BACKEND_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    localStorage.removeItem("token");
    let null_user = {
      _id: null,
      name: "Annonimous User",
      email: null,
      createdAt: null,
    };
    return null_user;
  }
}

export { fetchCurrentUser };
