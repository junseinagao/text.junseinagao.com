/** ダミーの ImageResponse 実装 */
export function ImageResponse() {
  const placeholder = async () => {
    const imageUrl = "https://placehold.co/1200x630/png";
    const res = await fetch(imageUrl);
    if (!res.ok) {
      return new Response("Image not found", { status: 404 });
    }
    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: { "Content-Type": "image/png" },
    });
  };
  return placeholder();
}
