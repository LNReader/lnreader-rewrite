interface FetchParams {
  url: string;
  init?: RequestInit;
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
}: FetchParams): Promise<string> => {
  const res = await fetch(url, init);
  const html = await res.text();

  return html;
};
