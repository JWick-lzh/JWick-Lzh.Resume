/* 知识检索：中文二元组 + 英文词 的关键词打分，纯逻辑（Node 可测） */
(function () {
  function tokenize(q) {
    const terms = new Set();
    (q.toLowerCase().match(/[a-z0-9_]+/g) || []).forEach((w) => terms.add(w));
    const zh = q.replace(/[^一-鿿]/g, "");
    for (let i = 0; i < zh.length - 1; i++) terms.add(zh.slice(i, i + 2));
    return [...terms];
  }

  function search(query, topN = 6, knowledge) {
    const K = knowledge || (typeof window !== "undefined" && window.KNOWLEDGE);
    if (!K) return [];
    const terms = tokenize(query);
    if (!terms.length) return [];
    const hits = [];
    for (const doc of K.docs) {
      for (const sec of doc.sections) {
        const hay = (doc.title + " " + sec.heading + " " + sec.content).toLowerCase();
        const titleHay = (doc.title + sec.heading).toLowerCase();
        let score = 0;
        for (const t of terms) {
          let idx = -1;
          let n = 0;
          while ((idx = hay.indexOf(t, idx + 1)) !== -1 && n < 20) n++;
          score += n * (t.length >= 2 ? 2 : 1);
          if (titleHay.includes(t)) score += 6;
        }
        if (score > 0) {
          hits.push({
            docId: doc.id, docTitle: doc.title, path: doc.path,
            heading: sec.heading, content: sec.content, score,
          });
        }
      }
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, topN);
  }

  function buildContext(hits, maxChars = 6000) {
    let out = "";
    let i = 1;
    for (const h of hits) {
      const block = `【资料${i} · ${h.docTitle} › ${h.heading}】\n${h.content}\n\n`;
      if (out.length + block.length > maxChars) break;
      out += block;
      i++;
    }
    return out;
  }

  const Retrieval = { tokenize, search, buildContext };
  if (typeof window !== "undefined") window.Retrieval = Retrieval;
  if (typeof module !== "undefined") module.exports = Retrieval;
})();
