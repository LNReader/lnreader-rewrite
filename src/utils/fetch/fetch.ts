import { getAppSettings } from '@hooks';
import { getSourceStorage } from '@hooks/useSourceStorage';
import { defaultUserAgentString } from '@utils/SettingsUtils';

interface FetchParams {
  url: string;
  init?: RequestInit;
  sourceId: number;
}

export const fetchApi = async ({
  url,
  init,
  sourceId,
}: FetchParams): Promise<Response> => {
  const { DEFAULT_USER_AGENT_STRING = defaultUserAgentString } =
    getAppSettings();

  const headers = new Headers({
    ...init?.headers,
    'User-Agent': DEFAULT_USER_AGENT_STRING,
  });

  if (sourceId) {
    const { cookies = '' } = getSourceStorage(sourceId);

    if (cookies) {
      headers.append('cookie', cookies);
    }
  }

  return fetch(url, { ...init, headers });
};

export const fetchHtml = async ({
  url,
  init,
  sourceId,
}: FetchParams): Promise<string> => {
  const res = await fetchApi({ url, init, sourceId });
  const html = await res.text();

  if (html.includes('Checking if the site connection is secure')) {
    throw Error(
      "The app couldn't bypass the source's Cloudflare protection.\n\nOpen the source in WebView to bypass the Cloudflare protection and reopen the source.",
    );
  }

  if (!html) {
    throw Error(
      "Chapter not available.\n\nReport on GitHub if it's available in webview.",
    );
  }

  return html;
};
