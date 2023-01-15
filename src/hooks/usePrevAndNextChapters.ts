import { useCallback, useEffect, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import {
  getNextChapter,
  getPrevChapter,
} from '@database/queries/ChapterQueries';
import { DatabaseChapter } from '@database/types';
import { ToastAndroid } from '@lnreader/core';

type Props = {
  novelId: number;
  chapterId: number;
  novelName: string;
  sourceId: number;
};

const usePrevAndNextChapters = ({
  novelId,
  chapterId,
  novelName,
  sourceId,
}: Props) => {
  const { dispatch } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const [nextChapter, setNextChapter] = useState<DatabaseChapter>();
  const [previousChapter, setPreviousChapter] = useState<DatabaseChapter>();

  const getNextAndPrevChapter = useCallback(async () => {
    try {
      const nextChap = await getNextChapter(novelId, chapterId);
      const prevChap = await getPrevChapter(novelId, chapterId);

      setNextChapter(nextChap);
      setPreviousChapter(prevChap);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [novelId, chapterId]);

  useEffect(() => {
    getNextAndPrevChapter();
  }, [getNextAndPrevChapter]);

  const navigateToPrevChapter = () =>
    previousChapter
      ? dispatch(
          StackActions.replace(
            'ReaderScreen' as never,
            {
              sourceId,
              novelName,
              chapter: previousChapter,
            } as never,
          ),
        )
      : ToastAndroid.show("There's no previous chapter");

  const navigateToNextChapter = () =>
    nextChapter
      ? dispatch(
          StackActions.replace(
            'ReaderScreen' as never,
            {
              sourceId,
              novelName,
              chapter: nextChapter,
            } as never,
          ),
        )
      : ToastAndroid.show("There's no next chapter");

  return {
    loading,
    error,
    previousChapter,
    nextChapter,
    navigateToPrevChapter,
    navigateToNextChapter,
  };
};

export default usePrevAndNextChapters;
