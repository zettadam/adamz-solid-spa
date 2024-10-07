import postcssPresetEnv from 'postcss-preset-env'
import postcssGlobalData from '@csstools/postcss-global-data'

const config = {
  plugins: [
    postcssGlobalData({
      files: ['./src/props.css'],
    }),
    postcssPresetEnv({
      stage: 3,
      features: {
        // 'nesting-rules': true,
        'custom-media-queries': true,
        'custom-selectors': ['auto', { preserve: true }],
      },
    }),
  ],
}

export default config
