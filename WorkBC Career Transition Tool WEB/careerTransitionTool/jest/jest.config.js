module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/__mocks__/file-mock.js',
  },
  rootDir: '../',
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
  setupFiles: ['<rootDir>/jest/loadershim.js', '<rootDir>/.env.test'],
};
