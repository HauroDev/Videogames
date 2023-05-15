const config = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    },
    react: { version: '18.2' },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
  },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
    'import/no-unresolved': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-undef': 'off'
  }
}

module.exports = config
