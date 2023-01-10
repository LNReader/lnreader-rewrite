import { getAppSettings } from '@hooks';
import { SourceStorageMap, SOURCE_STORAGE } from '@hooks/useSourceStorage';
import { MMKVStorage } from '@utils/mmkv/mmkv';
import { defaultUserAgentString } from '@utils/Settings.utils';

interface FetchParams {
  url: string;
  init?: RequestInit;
  sourceId?: number;
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
    const rawSourceSettings: SourceStorageMap = JSON.parse(
      MMKVStorage.getString(SOURCE_STORAGE) || '{}',
    );

    const { cookies = '' } = rawSourceSettings[sourceId] || {};

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
  const { DEFAULT_USER_AGENT_STRING = defaultUserAgentString } =
    getAppSettings();

  const headers = new Headers({
    ...init?.headers,
    'User-Agent': DEFAULT_USER_AGENT_STRING,
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
