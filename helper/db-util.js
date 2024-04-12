import { MongoClient } from "mongodb";
export async function DbConnect() {
  const client = await MongoClient.connect(process.env.DB_L);
  return client;
}

export async function insertDocument(client, document, collectionn) {
  const database = client.db(process.env.DB_NAME);
  const collection = await database.collection(collectionn);
  const res = await collection.insertOne(document);
  return res;
}
export async function getAllDocuments(client, collectionn) {
  const database = client.db(process.env.DB_NAME);
  const collection = await database.collection(collectionn);

  let res = await collection.find().toArray();
  console.log(res);
  res = res.map((res) => {
    return {
      ...res,
      _id: res._id.toString(),
    };
  });
  return res;
}
export async function getDocument(client, collectionn, document) {
  const database = client.db(process.env.DB_NAME);
  const collection = await database.collection(collectionn);
  const res = await collection.findOne(document);
  return res;
}
