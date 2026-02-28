import axios from "axios";

const publicUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_NOTEHUB_API_URL ||
  "";


const baseURL = `${publicUrl.replace(/\/$/, "")}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
