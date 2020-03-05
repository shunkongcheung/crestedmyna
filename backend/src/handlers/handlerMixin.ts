import nodeFetch from "node-fetch";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

function handlerMixin(taskName: string, payload: object) {
  dotenv.config();
  const host = process.env.ACTION_HOST;
  const url = `${host}/tasks/${taskName}`;

  const fakeAdminUser = { username: "admin" };
  const token = jwt.sign(fakeAdminUser, process.env.JWT_SECRET);

  nodeFetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export default handlerMixin;
