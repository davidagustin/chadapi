/**
 * @file Jest configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = {
  verbose: true,
  testRegex: '(/(__tests__|tests)/.*|(\\.|/)(test|spec))\\.jsx?$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/tests/__mocks__/*'
  ],
  testURL: 'http://localhost:8080',
  moduleFileExtensions: [
    'js'
  ],
  moduleDirectories: [
    'node_modules'
  ]
}
