/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  trailingComma: "es5",
  arrowParens: "always",
  htmlWhitespaceSensitivity: "strict",
  plugins: ['prettier-plugin-packagejson']
}
