import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { defaultTo } from 'lodash';

import { DatabaseChapter, DownloadedChapter } from '@database/types';
import { SourceChapter } from '@sources/types';
import SourceFactory from '@sources/SourceFactory';

interface UseChapterParams {
  sourceId: number;
  chapter: DatabaseChapter;
}

const useChapter = ({ chapter: { url }, sourceId }: UseChapterParams) => {
  const source = SourceFactory.getSource(sourceId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [chapter, setChapter] = useState<SourceChapter | DownloadedChapter>();

  const getChapter = async () => {
    try {
      const sourceChapter = (await source?.getChapter({
        url,
      })) as SourceChapter;

      setChapter({
        ...sourceChapter,
        text: sanitizeHtml(defaultTo(sourceChapter.text, '')),
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
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
  };
};

export default useChapter;
