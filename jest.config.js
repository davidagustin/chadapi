/**
 * @file Jest configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = {
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime'],
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true
}
