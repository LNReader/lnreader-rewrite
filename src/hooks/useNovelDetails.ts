import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  getNovel,
  getNovelById,
  insertNovel,
  setNovelFavorite,
} from '@database/queries/NovelQueries';
import { DatabaseChapter, DatabaseNovel } from '@database/types';

import SourceFactory from '@sources/SourceFactory';
import { SourceNovelDetails } from '@sources/types';
import { isEmpty, isUndefined, omit } from 'lodash';
import {
  getChaptersByNovelId,
  insertChapters,
} from '@database/queries/ChapterQueries';
import useNovelStorage from './useNovelStorage';

interface UseNovelDetailsProps {
  novelId?: number;
  novelParams: SourceNovelDetails;
}

export const useNovelDetails = ({
  novelParams,
  novelId,
}: UseNovelDetailsProps) => {
  const { sourceId, url } = novelParams;
  const isFirstRender = useRef(true);

  const source = SourceFactory.getSource(sourceId);

  const [loading, setLoading] = useState(true);
  const [novel, setNovel] = useState<DatabaseNovel>(
    novelParams as DatabaseNovel,
  );
  const [chapters, setChapters] = useState<DatabaseChapter[]>([]);
  const [error, setError] = useState('');

  const { FILTERS, SORT_ORDER } = useNovelStorage(novelId || novel.id);

  const getNovelDetails = async () => {
    try {
      let dbNovelId = novelId;
      let dbNovel = novel;

      if (!dbNovelId) {
        dbNovel = await getNovel(sourceId, url);
      } else if (isEmpty(omit(dbNovel, 'id'))) {
        dbNovel = await getNovelById(dbNovelId);
      }

      if (!dbNovelId && isUndefined(dbNovel)) {
        const sourceNovel = await source?.getNovelDetails({ url });

        dbNovelId = await insertNovel(sourceNovel as SourceNovelDetails);

        if (sourceNovel?.chapters?.length) {
          await insertChapters(dbNovelId, sourceNovel.chapters);
        }

        dbNovel = await getNovelById(dbNovelId);
      }

      const dbChapters = await getChaptersByNovelId(dbNovel.id);

      setNovel(dbNovel);
      setChapters(dbChapters);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      isFirstRender.current = false;
    }
  };

  const getFilteredChapters = async () => {
    try {
      const dbChapters = await getChaptersByNovelId(novel.id);
      setChapters(dbChapters);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleSetNovelFavorite = (val: boolean) => {
    setNovel(prevVal => ({ ...prevVal, favorite: +val }));
    setNovelFavorite(novel.id, val);
  };

  useEffect(() => {
    getNovelDetails();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!isFirstRender.current) {
        getFilteredChapters();
      }
    }, [FILTERS, SORT_ORDER]),
  );

  return {
    novel,
    loading,
    error,
    chapters,
    handleSetNovelFavorite,
  };
};
