import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:5000",
});

export async function login(userData) {
  try {
    const response = await url.post("/login", userData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function register(userData) {
  try {
    const response = await url.post("/register", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function generatePass(data) {
  try {
    const response = await url.post("/genetratePass", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getPassword(id) {
  try {
    const response = await url.get(`/getPasswords/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePassword(id, user) {
  try {
    const response = await url.delete(`/deletePassword/${id}/${user}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
