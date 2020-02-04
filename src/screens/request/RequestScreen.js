import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Colors from '../../constants/Colors';
import TabBarLabel from '../../navigation/TabBarLabel';
import ApiService from '../../services/ApiService';
import LoadingScreen from '../LoadingScreen';
import ListRequestScreen from './ListRequestScreen';
import ReviewRequestScreen from './ReviewRequestScreen';
import SendRequestScreen from './SendRequestScreen';

export default class RequestNavigator extends React.Component {
  state = {
    role: 'user',
  }
  async componentDidMount() {
    const userInfo = await ApiService.userInfo();
    console.log(userInfo);

    this.setState({ role: userInfo.role });
  }
  render() {
    const { role } = this.state;
    const order = [
      'SendRequest',
      'ListRequest',
    ];
    if (role === 'admin') order.push('ReviewRequest');
    const Component = createAppContainer(
      createMaterialTopTabNavigator(
        {
          SendRequest: {
            screen: SendRequestScreen,
            navigationOptions: {
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Yêu cầu nghỉ' />,
            }
          },
          ListRequest: {
            screen: ListRequestScreen,
            navigationOptions: {
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Danh sách yêu cầu nghỉ' />,
            }
          },
          ReviewRequest: {
            screen: ReviewRequestScreen,
            navigationOptions: {
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Phê duyệt yêu cầu nghỉ' />,
            }
          }
        },
        {
          lazy: true,
          lazyPlaceholderComponent: LoadingScreen,
          swipeEnabled: false,
          order,
          tabBarOptions: {
            style: {
              backgroundColor: Colors.primaryBackground,
            },
            indicatorStyle: { backgroundColor: Colors.primaryColor, opacity: 1 },
          }
        }
      )
    );
    return <Component />
  }
}


