import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { isUndefined } from 'lodash';
import { Portal } from 'react-native-paper';

import { Modal, TextInput, ToastAndroid } from '@lnreader/core';
import {
  createCategory,
  isCategoryDuplicate,
  updateCategory,
} from '@database/queries/CategoryQueries';
import { useAppSettings } from '@hooks';
import { Setting } from 'types/Settings';
import { defaultUserAgentString } from '@utils/SettingsUtils';

interface DefaultUserAgentStringModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const DefaultUserAgentStringModal: React.FC<
  DefaultUserAgentStringModalProps
> = props => {
  const { DEFAULT_USER_AGENT_STRING = defaultUserAgentString, setAppSetting } =
    useAppSettings();
  const [text, setText] = useState(DEFAULT_USER_AGENT_STRING);

  return (
    <Portal>
      <Modal
        title="Default user agent string"
        visible={props.visible}
        onDismiss={props.onDismiss}
        onSubmit={() => {
          setAppSetting(Setting.DEFAULT_USER_AGENT_STRING, text);
        }}
      >
        <TextInput
          autoFocus
          defaultValue={DEFAULT_USER_AGENT_STRING}
          onChangeText={setText}
          style={styles.contentCtn}
        />
      </Modal>
    </Portal>
  );
};

export default DefaultUserAgentStringModal;

const styles = StyleSheet.create({
  contentCtn: {
    marginHorizontal: 24,
  },
});
