import { useEffect, useRef, useState } from 'react';

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
  setChaptersRead,
} from '@database/queries/ChapterQueries';
import useNovelStorage from './useNovelStorage';
import { insertUpdates } from '@database/queries/UpdateQueries';
import { useMMKVObject } from 'react-native-mmkv';
import { MMKVStorage } from '@utils/mmkv/mmkv';
import { DOWNLOAD_QUEUE } from './useDownloader';

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

  const [downloadQueue = []] = useMMKVObject<number[]>(
    DOWNLOAD_QUEUE,
    MMKVStorage,
  );

  const [loading, setLoading] = useState(true);
  const [novel, setNovel] = useState<DatabaseNovel>(
    novelParams as DatabaseNovel,
  );
  const [chapters, setChapters] = useState<DatabaseChapter[]>([]);
  const [error, setError] = useState<Error>();

  const { FILTERS, SORT_ORDER } = useNovelStorage(novelId || novel.id);

  const getNovelDetails = async () => {
    try {
      let dbNovelId = novelId;
      let dbNovel = novel;

      if (!dbNovelId) {
        dbNovel = await getNovel(sourceId, url);
      } else if (isEmpty(omit(dbNovel, ['id', 'sourceId']))) {
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
        setError(err);
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
        setError(err);
      }
    }
  };

  const handleSetNovelFavorite = (val: boolean) => {
    setNovel(prevVal => ({ ...prevVal, favorite: +val }));
    setNovelFavorite(novel.id, val);
  };

  const handleSetChaptersRead = (chapterIds: number[]) => {
    setChapters(prevVal =>
      prevVal.map(chapter =>
        chapterIds.includes(chapter.id) ? { ...chapter, read: 1 } : chapter,
      ),
    );
    setChaptersRead(chapterIds);
  };

  const handleSetChaptersUnread = (chapterIds: number[]) => {
    setChapters(prevVal =>
      prevVal.map(chapter =>
        chapterIds.includes(chapter.id) ? { ...chapter, read: 0 } : chapter,
      ),
    );
    setChaptersRead(chapterIds);
  };

  const updateNovel = async () => {
    try {
      setLoading(true);
      const sourceNovel = await source?.getNovelDetails({ url });

      if (sourceNovel?.chapters?.length) {
        await insertChapters(novel.id, sourceNovel.chapters);
      }

      const dbNovel = await getNovelById(novel.id);
      const dbChapters = await getChaptersByNovelId(novel.id);

      const newChapters = dbChapters?.filter(
        newChapter => !chapters.some(chapter => chapter.id === newChapter.id),
      );

      setNovel(dbNovel);
      setChapters(dbChapters);

      if (newChapters.length) {
        insertUpdates(newChapters);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNovelDetails();
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      getFilteredChapters();
    }
  }, [
    FILTERS,
    SORT_ORDER,
    isFirstRender.current,
    JSON.stringify(downloadQueue),
  ]);

  return {
    novel,
    loading,
    error,
    chapters,
    updateNovel,
    handleSetNovelFavorite,
    handleSetChaptersRead,
    handleSetChaptersUnread,
  };
};
