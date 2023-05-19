module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'jsx', 'json'],
    transform: {
      '^.+\\.jsx?$': [
        'babel-jest', 
        {
          presets: [
            '@babel/preset-env',
            'react-app',
          ],
          plugins: [
            'babel-plugin-styled-components',
            '@babel/plugin-transform-runtime'
          ],
          env: {
            test: {
              plugins: [
                'transform-es2015-modules-commonjs'
              ]
            }
          }
        }
      ],
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    testPathIgnorePatterns: ['/node_modules/', '/public/'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
  };
  