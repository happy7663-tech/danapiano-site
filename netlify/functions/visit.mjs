// 방문자 카운터 — Netlify Functions + Netlify Blobs (재배포해도 숫자가 유지됨)
// GET  /api/visit : 숫자만 읽기
// POST /api/visit : 1 증가 후 숫자 반환 (같은 브라우저는 하루 1번만 호출)
import { getStore } from "@netlify/blobs";

const todayKST = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);

export default async (req) => {
  const store = getStore({ name: "visit-counter", consistency: "strong" });
  const today = todayKST();

  let data = (await store.get("counter", { type: "json" })) || { total: 0, today: 0, day: today };
  if (data.day !== today) {
    data = { total: data.total, today: 0, day: today };
  }

  if (req.method === "POST") {
    data.total += 1;
    data.today += 1;
    await store.setJSON("counter", data);
  }

  return Response.json(
    { today: data.today, total: data.total },
    { headers: { "cache-control": "no-store" } }
  );
};

export const config = { path: "/api/visit" };
