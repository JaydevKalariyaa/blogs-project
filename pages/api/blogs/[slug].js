import { DbConnect } from "../../../helper/db-util";

export default async function getBlog(slug) {
  try {
    const client = await DbConnect();
    const database = client.db("blogDb");
    const collection = database.collection("blogs");
    const blog = await collection.findOne({
      slug: slug,
    });
    await client.close();
    return JSON.stringify(blog);
  } catch (error) {
    return error.message;
  }
}
