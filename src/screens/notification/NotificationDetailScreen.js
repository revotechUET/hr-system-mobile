import React from 'react';
import { StyleSheet } from 'react-native';
import BodyText from '../../components/BodyText';
import ScreenContainer from '../../components/ScreenContainer';

const _NOTI =
{
  id: 1,
  date: new Date(),
  title: 'Tieu de thong bao',
  content: 'Noi dung thong bao',
  avatar_url: '',
}

export default function NotificationDetailScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <BodyText>{_NOTI.content}</BodyText>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
