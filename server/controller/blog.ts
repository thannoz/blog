import { ObjectId } from "npm:mongodb@5.6.0";

import { db } from "../db.ts";

const blog = db.collection("blog");

const addBlog = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();
    const result = await blog.insertOne(body);

    return new Response(JSON.stringify({ id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export { addBlog };
