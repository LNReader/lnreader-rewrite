import {useEffect, useState} from 'react';

import {
  getNovel,
  getNovelById,
  insertNovel,
  setNovelFavorite,
} from 'database/queries/NovelQueries';
import {DatabaseChapter, DatabaseNovel} from 'database/types';

import SourceFactory from 'sources/SourceFactory';
import {SourceNovelDetails} from 'sources/types';
import {isUndefined} from 'lodash';
import {
  getChaptersByNovelId,
  insertChapters,
} from 'database/queries/ChapterQueries';

interface UseNovelDetailsProps {
  novelId?: number;
  novelParams: SourceNovelDetails;
}

export const useNovelDetails = ({
  novelParams,
  novelId,
}: UseNovelDetailsProps) => {
  const {sourceId, url} = novelParams;

  const source = SourceFactory.getSource(sourceId);

  const [loading, setLoading] = useState(true);
  const [novel, setNovel] = useState<DatabaseNovel>(
    novelParams as DatabaseNovel,
  );
  const [chapters, setChapters] = useState<DatabaseChapter[]>([]);
  const [error, setError] = useState('');

  const getNovelDetails = async () => {
    try {
      let dbNovelId = novelId;
      let dbNovel;

      if (dbNovelId) {
        dbNovel = await getNovelById(dbNovelId);
      } else {
        dbNovel = await getNovel(sourceId, url);
      }

      let dbChapters: DatabaseChapter[] = [];

      if (!dbNovelId && isUndefined(dbNovel)) {
        const sourceNovel = await source?.getNovelDetails({url});

        dbNovelId = await insertNovel(sourceNovel as SourceNovelDetails);

        if (sourceNovel?.chapters?.length) {
          await insertChapters(dbNovelId, sourceNovel.chapters);
        }

        dbNovel = await getNovelById(dbNovelId);
      }

      dbChapters = await getChaptersByNovelId(dbNovel.id);

      setNovel(dbNovel);
      setChapters(dbChapters);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetNovelFavorite = (val: boolean) => {
    setNovel(prevVal => ({...prevVal, favorite: +val}));
    setNovelFavorite(novel.id, val);
  };

  useEffect(() => {
    getNovelDetails();
  }, []);

  return {
    novel,
    loading,
    error,
    chapters,
    handleSetNovelFavorite,
  };
};
