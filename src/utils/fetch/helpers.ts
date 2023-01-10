getHeaders = (sourceId?: string): Headers => {
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

  return headers;
};
