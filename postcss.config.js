const postcssJitProps = require('postcss-jit-props')
const postcssCustomMedia = require('postcss-custom-media')
const OpenProps = require('open-props')

module.exports = {
  // only vars used are in build output
  plugins: [postcssJitProps(OpenProps), postcssCustomMedia()],
}
