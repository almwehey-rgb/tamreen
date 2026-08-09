export default async function handler(req, res) {
  const q = (req.query.q || "").toString().trim();
  if (!q) {
    res.status(200).json({ products: [] });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const url = `https://search.openfoodfacts.org/search?q=${encodeURIComponent(q)}&page_size=8&fields=product_name,brands,nutriments`;
    const upstream = await fetch(url, { signal: controller.signal });
    if (!upstream.ok) {
      res.status(502).json({ error: "upstream_error", status: upstream.status });
      return;
    }
    const data = await upstream.json();
    const products = (data.hits || [])
      .filter(p => p.product_name && p.nutriments && p.nutriments["energy-kcal_100g"] != null)
      .map(p => ({ product_name: p.product_name, brands: Array.isArray(p.brands) ? p.brands.join(", ") : p.brands, nutriments: p.nutriments }));
    res.status(200).json({ products });
  } catch (e) {
    res.status(502).json({ error: "search_failed" });
  } finally {
    clearTimeout(timer);
  }
}
