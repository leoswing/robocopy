module.exports = {
  parser: '@typescript-eslint/parser', // 指定ESLint要使用的解析器
  parserOptions: {
    ecmaVersion: 2020, // 允许解析较新的ES特性   
    sourceType: 'module'
  },
  extends: [
    'plugin:@typescript-eslint/recommended' // 使用@typescript-eslint/eslint-plugin的推荐规则 
  ],
  rules: {
    // 防止自定义的ESLint规则，可以覆盖extends中的规则配置。    // e.g. "@typescript-eslint/explicit-function-return-type": "off",  
  }
};