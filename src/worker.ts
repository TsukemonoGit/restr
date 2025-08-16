import restrHandler from "./index";

export default {
  async fetch(request: Request): Promise<Response> {
    const userAgent = request.headers.get("User-Agent") || "";
    console.log(`Access attempt - User-Agent: ${userAgent}`);

    // User-Agent チェック
    if (userAgent !== "lumilumi") {
      return new Response("Forbidden", { status: 403 });
    }

    // restrHandler.fetch を安全に呼び出す
    return restrHandler.fetch.call(restrHandler, request);
  },
};
