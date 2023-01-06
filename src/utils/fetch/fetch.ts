import { useSourceStorage } from '@hooks';
import { SourceStorageMap, SOURCE_STORAGE } from '@hooks/useSourceStorage';
import { MMKVStorage } from '@utils/mmkv/mmkv';

interface FetchParams {
  url: string;
  init?: RequestInit;
  sourceId?: number;
}

export const fetchApi = async ({
  url,
  init,
}: FetchParams): Promise<Response> => {
  return fetch(url, init);
};

export const fetchHtml = async ({
  url,
  init,
  sourceId,
}: FetchParams): Promise<string> => {
  const headers = new Headers({
    ...init?.headers,
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  });

  if (sourceId) {
    const rawSourceSettings: SourceStorageMap = JSON.parse(
      MMKVStorage.getString(SOURCE_STORAGE) || '{}',
    );

    const { cookies = '' } = rawSourceSettings[sourceId] || {};

    if (cookies) {
      headers.append('cookie', cookies);
    }
  }

  const res = await fetch(url, { ...init, headers });

  const html = await res.text();

  if (html.includes('Checking if the site connection is secure')) {
    throw Error(
      "The app cannot bypass the source's Cloudflare protection. Either wait for them to lower the protection or migrate.",
    );
  }

  return html;
};
