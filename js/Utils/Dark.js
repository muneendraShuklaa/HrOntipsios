

import React, { Component } from 'react'
import { useColorScheme,  } from 'react-native'
import { color,darkColor } from './color';

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const colorScheme = useColorScheme();
    const isDark=colorScheme=='dark'
    
    return <Component {...props} themeColor={isDark?darkColor:color } colorScheme={colorScheme} isDark={isDark} />;
  }
}

export { withMyHook }
