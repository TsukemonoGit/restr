import restrHandler from "./index"; // 元のエントリポイントを import

export default {
  async fetch(request: Request): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const allowed =
      origin === "https://lumilumi.app" ||
      /^https:\/\/.*\.lumilumi\.app$/.test(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowed ? origin : "",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
      });
    }

    if (!allowed) {
      return new Response("Forbidden", { status: 403 });
    }

    // 元の restr の処理を呼ぶ
    return restrHandler.fetch(request);
  },
};
