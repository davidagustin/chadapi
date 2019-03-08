// test modules
import {
  FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE
} from '../config/firebase.config'

/**
 * @file Firebase unit tests
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

describe('firebase references', () => {
  // tests that Firebase application was properly initialized
  describe('the firebase application reference', () => {
    it('should be non null', () => {
      expect(FIREBASE_APP).not.toBe(null)
    })
  })

  // tests that Firebase Authentication was properly initialized
  describe('the firebase authentication reference', () => {
    it('firebase authentication should be non null', () => {
      expect(FIREBASE_AUTH).not.toBe(null)
    })
  })

  // tests that Realtime Database was properly initialized
  describe('the firebase database reference', () => {
    it('firebase database should be non null', () => {
      expect(FIREBASE_DATABASE).not.toBe(null)
    })
  })

  // tests that Firebase Storage was properly initialized
  describe('the firebase storage reference', () => {
    it('firebase storage should be non null', () => {
      expect(FIREBASE_STORAGE).not.toBe(null)
    })
  })
})
