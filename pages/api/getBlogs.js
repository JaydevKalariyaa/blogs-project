import { DbConnect, getAllDocuments } from "../../helper/db-util";

export async function getBlogs() {
  try {
    const client = await DbConnect();

    let blogs = await getAllDocuments(client, "blogs");

    client.close();

    return JSON.stringify(blogs);
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}
