import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import useChapter from 'hooks/useChapter';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DatabaseChapter} from 'database/types';
import {ErrorScreen, LoadingScreen} from 'components/index';
import {useTheme} from 'hooks/useTheme';
import {insertChapterInHistory} from 'database/queries/HistoryQueries';
import ReaderAppbar from 'components/ReaderAppbar/ReaderAppbar';
import WebViewReader from 'components/WebViewReader/WebViewReader';
import ReaderFooter from 'components/ReaderFooter/ReaderFooter';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    chapter: DatabaseChapter;
    sourceId: number;
    novelName: string;
  };
}>;

const ReaderScreen = () => {
  const {theme} = useTheme();
  const {params: readerParams} = useRoute<ReaderScreenRouteProps>();
  const {chapter, error, loading} = useChapter(readerParams);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    insertChapterInHistory(
      readerParams.chapter.novelId,
      readerParams.chapter.id,
    );
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorScreen error={error} />
  ) : (
    <>
      <WebViewReader
        html={chapter?.text}
        onPress={() => setMenuVisible(prevVal => !prevVal)}
      />
      <ReaderAppbar
        visible={menuVisible}
        chapter={chapter}
        novelName={readerParams.novelName}
      />
      <ReaderFooter
        visible={menuVisible}
        chapter={chapter}
        novelName={readerParams.novelName}
      />
    </>
  );
};

export default ReaderScreen;

const styles = StyleSheet.create({});
