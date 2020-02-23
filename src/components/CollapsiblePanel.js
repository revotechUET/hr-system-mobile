import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import TouchableItem from 'react-native-tab-view/src/TouchableItem';
import Icon from './Icon';


export default function CollapsiblePanel({ isCollapsed = true, collapsibleStyle, toggleStyle, children }) {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  return (
    <>
      <Collapsible collapsed={collapsed} style={collapsibleStyle}>
        {children}
      </Collapsible>
      <TouchableItem
        onPress={() => setCollapsed(!collapsed)}
        style={[{ paddingVertical: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }, toggleStyle]}
      >
        <Icon size={12} name={collapsed ? 'chevron-down' : 'chevron-up'} />
      </TouchableItem>
    </>
  )
}
