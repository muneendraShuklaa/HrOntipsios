// module.exports = {
//     assets:['./assets/fonts']
// }
module.exports = {
  dependencies: {
    'react-native-html-to-pdf': {
      platforms: {
        ios: null, // disables iOS autolinking for this package
      },
    },
  },
  assets: ['./assets/fonts'], // Optional: if you're linking custom fonts too
};