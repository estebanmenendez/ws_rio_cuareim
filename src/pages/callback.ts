import type { APIRoute } from 'astro';

// Forzamos a Astro a que trate esta ruta como dinámica (Server-Side Rendering)
export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  // Si no hay código de autorización, devolvemos un error limpio
  if (!code) {
    return new Response(
      JSON.stringify({ error: 'Falta el código de autorización de GitHub' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // En Cloudflare + Astro, las variables de entorno se extraen del contexto de ejecución (locals.runtime.env)
  // Si no existen ahí, cae en el estándar global process.env
  const runtime = (locals as any).runtime;
  const CLIENT_ID = runtime?.env?.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = runtime?.env?.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new Response(
      JSON.stringify({ error: 'Faltan las variables GITHUB_CLIENT_ID o GITHUB_CLIENT_SECRET en Cloudflare' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Intercambiamos el código temporal por un Token de acceso real en GitHub
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }),
    });

    const data = await response.json() as { access_token?: string; error?: string };

    // Si GitHub nos devuelve un error, lo mostramos
    if (data.error || !data.access_token) {
      return new Response(
        JSON.stringify({ error: data.error || 'No se pudo obtener el token de acceso' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // El truco definitivo: Devolvemos un script HTML que se ejecuta en la ventana emergente.
    // Le envía el token a la ventana principal de Decap CMS y luego se cierra sola.
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Autenticando...</title>
      </head>
      <body>
        <p style="text-align: center; font-family: sans-serif; margin-top: 50px;">
          Conexión exitosa. Redirigiendo al panel de control...
        </p>
        <script>
          (function() {
            function recieveMessage(e) {
              // Enviamos el mensaje de éxito con el token a la ventana principal
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
                e.origin
              );
              window.removeEventListener("message", recieveMessage, false);
              // Cerramos la ventanita flotante de forma automática
              window.close();
            }
            window.addEventListener("message", recieveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
      </html>
    `;

    return new Response(htmlContent, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Error interno en el servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
