import restrHandler from "./index"; // 元のエントリポイントを import

export default {
  async fetch(request: Request): Promise<Response> {
    const userAgent = request.headers.get("User-Agent") || "";

    console.log(`Access attempt - User-Agent: ${userAgent}`);

    // 制限を全て削除
    return restrHandler.fetch(request);
  },
};
