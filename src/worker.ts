import restrHandler from "./index"; // 元のエントリポイントを import

export default {
  async fetch(request: Request): Promise<Response> {
    const userAgent = request.headers.get("User-Agent") || "";
    const allowed = userAgent === "lumilumi";

    console.log(
      `Access attempt - User-Agent: ${userAgent}, Allowed: ${allowed}`,
    );

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowed ? "*" : "",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
      });
    }

    if (!allowed) {
      console.warn(`Forbidden access from User-Agent: ${userAgent}`);
      return new Response("Forbidden", { status: 403 });
    }

    return restrHandler.fetch(request);
  },
};
