import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { defaultTo } from 'lodash-es';

import { DatabaseChapter, DownloadedChapter } from '@database/types';
import { SourceChapter } from '@sources/types';
import SourceFactory from '@sources/SourceFactory';
import { getDownloadedChapter } from '@database/queries/DownloadQueries';
import { fetchHtml } from '@utils/fetch/fetch';

interface UseChapterParams {
  sourceId: number;
  chapter: DatabaseChapter;
}

const useChapter = ({ chapter: { url, id }, sourceId }: UseChapterParams) => {
  const source = SourceFactory.getSource(sourceId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [chapter, setChapter] = useState<SourceChapter | DownloadedChapter>();

  const getChapter = async () => {
    try {
      let tempChapter: SourceChapter | DownloadedChapter =
        await getDownloadedChapter(id);

      if (!tempChapter) {
        const sourceChapter = await source?.getChapter({
          url,
        });

        if (sourceChapter) {
          tempChapter = sourceChapter;
        }
      }

      setChapter({
        ...tempChapter,
        text: sanitizeHtml(defaultTo(tempChapter.text, '')),
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const getChapterFromCustomUrl = async (customUrl: string) => {
    if (customUrl !== 'about:blank') {
      setLoading(true);
      const chaptersHtml = await fetchHtml({ url: customUrl, sourceId });

      setChapter(
        prevVal =>
          ({
            ...prevVal,
            text: sanitizeHtml(chaptersHtml),
          } as typeof chapter),
      );

      setLoading(false);
    }
  };

  useEffect(() => {
    getChapter();
  }, []);

  return {
    loading,
    chapter,
    error,
    getChapterFromCustomUrl,
  };
};

export default useChapter;
