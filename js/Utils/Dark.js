

import React, { Component, useMemo,useEffect,useState } from 'react'
import { useColorScheme,Appearance  } from 'react-native'
import { color,darkColor } from './color';

// function withMyHook(Component) {
//   return function WrappedComponent(props) {
//     const colorScheme = useColorScheme();
//     const isDark=colorScheme=='dark'
//     console.log(isDark,'isdark----');
//     return <Component {...props} themeColor={isDark?darkColor:color } colorScheme={colorScheme} isDark={isDark} />;
//   }
// }

function withMyHook(WrappedComponent){
  return function (props){
    const colorScheme=useColorScheme();
    const [themeKey, setThemeKey] = useState(0); // Force update key

    useEffect(() => {
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        console.log('[withMyHook] Theme changed to:', colorScheme);
        setThemeKey(prev => prev + 1); 
      });

      return () => listener.remove();
    }, []);


    const isDark = colorScheme === 'dark';
    const themeColor = isDark ? darkColor : color;

    return(
      <WrappedComponent
      key={themeKey}
       {...props}
       themeColor={themeColor}
       colorScheme={colorScheme}
       isDark={isDark}
      />
    );
  };
}

export { withMyHook }
