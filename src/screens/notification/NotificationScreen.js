import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import BodyText from '../../components/BodyText';
import ScreenContainer from '../../components/ScreenContainer';
import Utils from '../../Utils';

const _DATA = [
  {
    id: 1,
    date: new Date(),
    title: 'Tieu de thong bao 1',
    content: 'Noi dung thong bao 1',
    avatar_url: '',
  },
  {
    id: 2,
    date: new Date(),
    title: 'Tieu de thong bao 2',
    content: 'Noi dung thong bao 2',
    avatar_url: '',
  },
  {
    id: 3,
    date: new Date(),
    title: 'Tieu de thong bao 3',
    content: 'Noi dung thong bao 3',
    avatar_url: '',
  }
]

export default function NotificationScreen({ navigation }) {
  return (
    <ScreenContainer style={styles.container}>
      {
        _DATA.length
          ?
          <FlatList
            data={_DATA}
            keyExtractor={(item, index) => '' + index}
            renderItem={({ item, index }) => (
              <ListItem
                key={index}
                title={item.title}
                subtitle={Utils.dateFormat(item.date, 'dd/MM/yyyy hh:mm')}
                leftAvatar={{ title: index + 1 + '' }}
                bottomDivider
                onPress={() => { navigation.navigate('NotificationDetail', { title: item.title }) }}
              />
            )}
          />
          :
          <View style={styles.emptyText}>
            <BodyText>Không có thông báo</BodyText>
          </View>
      }
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
