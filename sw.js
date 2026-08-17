/* Service Worker do SGQ — Consórcio Solução DOR
   Guarda o app inteiro no celular. Depois da primeira visita ele abre sem
   internet nenhuma. Quando houver rede, busca a versão nova em segundo plano
   e avisa a tela — a nova versão passa a valer no próximo acesso. */

const CACHE = "sgq-solucao-dor";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())   // um arquivo faltando não pode travar a instalação
  );
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", evento => {
  const req = evento.request;
  if (req.method !== "GET") return;

  // a planilha (Apps Script) e as fotos do Drive vão sempre direto para a rede
  if (new URL(req.url).origin !== self.location.origin) return;

  evento.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const guardado = await cache.match(req, { ignoreSearch: true });

    const daRede = fetch(req).then(async resp => {
      if (resp && resp.ok && resp.type === "basic") {
        const tagNova   = marca(resp);
        const tagVelha  = guardado ? marca(guardado) : "";
        await cache.put(req, resp.clone());
        if (guardado && tagNova && tagVelha && tagNova !== tagVelha) avisarTelas();
      }
      return resp;
    }).catch(() => guardado);

    if (guardado) {
      evento.waitUntil(daRede);   // atualiza em segundo plano sem segurar a tela
      return guardado;
    }
    return daRede;
  })());
});

function marca(resp) {
  return resp.headers.get("etag") || resp.headers.get("last-modified") || "";
}

async function avisarTelas() {
  const telas = await self.clients.matchAll({ type: "window" });
  telas.forEach(t => t.postMessage({ tipo: "atualizacao" }));
}
