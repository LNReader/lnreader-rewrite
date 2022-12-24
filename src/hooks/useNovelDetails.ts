import {useEffect, useState} from 'react';

import {
  getNovel,
  getNovelById,
  insertNovel,
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
  defaultNovel: SourceNovelDetails;
}

export const useNovelDetails = ({
  defaultNovel,
  novelId,
}: UseNovelDetailsProps) => {
  const {sourceId, url} = defaultNovel;

  const source = SourceFactory.getSource(sourceId);

  const [loading, setLoading] = useState(true);
  const [novel, setNovel] = useState<DatabaseNovel>(
    defaultNovel as DatabaseNovel,
  );
  const [chapters, setChapters] = useState<DatabaseChapter[]>([]);
  const [error, setError] = useState('');

  const getNovelDetails = async () => {
    try {
      let dbNovel = await getNovel(sourceId, url);
      let dbNovelId = novelId;

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

      console.log(dbNovel);
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

  useEffect(() => {
    getNovelDetails();
  }, []);

  return {
    novel,
    loading,
    error,
    chapters,
  };
};
