// test modules
import {
  FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE
} from '../src/config/firebase.config.js'

/**
 * @file Firebase unit tests
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

describe('firebase references', () => {
  // tests that Firebase application was properly initialized
  it('the firebase application reference should be non null', () => {
    expect(FIREBASE_APP).not.toBe(null)
  })

  // tests that Firebase Authentication was properly initialized
  it('firebase authentication reference should be non null', () => {
    expect(FIREBASE_AUTH).not.toBe(null)
  })

  // tests that Realtime Database was properly initialized
  it('firebase database reference should be non null', () => {
    expect(FIREBASE_DATABASE).not.toBe(null)
  })

  // tests that Firebase Storage was properly initialized
  it('firebase storage reference should be non null', () => {
    expect(FIREBASE_STORAGE).not.toBe(null)
  })
})
