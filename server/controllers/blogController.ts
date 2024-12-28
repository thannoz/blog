import { Request, Response } from "npm:express@4.18.2";

import { blog } from "../db.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

async function addBlog(req: Request): Promise<Response> {
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
}

export { addBlog };
