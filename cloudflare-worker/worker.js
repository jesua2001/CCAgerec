// Proxy opcional entre el frontend y el backend.
// Se mantiene para despliegues antiguos que todavía usen Worker.

const TARGET_ORIGIN = 'http://agerecapp.finode.com/backendagerec';
const ALLOWED_ORIGIN = 'http://agerecapp.finode.com';

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
    Object.entries(corsHeaders()).forEach(([key, value]) => headers.set(key, value));

    return new Response(response.body, { status: response.status, headers });
  },
};
