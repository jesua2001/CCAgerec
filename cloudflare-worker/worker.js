// Proxy entre el frontend (GitHub Pages) y el backend en InfinityFree.
// InfinityFree bloquea las llamadas AJAX cross-origin con un reto anti-bot;
// este Worker reenvía la petición de servidor a servidor (sin cabeceras de navegador)
// y añade él mismo las cabeceras CORS en la respuesta.

const TARGET_ORIGIN = 'https://agerecapp.infinityfree.me/backendagerec';
const ALLOWED_ORIGIN = 'https://jesua2001.github.io';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    const url = new URL(request.url);
    const targetUrl = TARGET_ORIGIN + url.pathname + url.search;

    // Cabeceras "limpias": sin Origin/Referer/Sec-Fetch-* que delatan que viene de un navegador cross-site.
    const forwardHeaders = new Headers();
    const contentType = request.headers.get('content-type');
    if (contentType) forwardHeaders.set('content-type', contentType);
    const auth = request.headers.get('authorization');
    if (auth) forwardHeaders.set('authorization', auth);

    const init = {
      method: request.method,
      headers: forwardHeaders,
    };
    if (!['GET', 'HEAD'].includes(request.method)) {
      init.body = await request.arrayBuffer();
    }

    const response = await fetch(targetUrl, init);
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders()).forEach(([k, v]) => headers.set(k, v));

    return new Response(response.body, { status: response.status, headers });
  },
};
