// test modules
import {
  FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE
} from '../config/firebase.config'

/**
 * @file Firebase configuration tests
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/*
 * Tests that Firebase application was properly initialized
 */
test('firebase application should be non null', () => {
  expect(FIREBASE_APP).not.toBe(null)
})

/*
 * Tests that Firebase Authentication was properly initialized
 */
test('firebase authentication should be non null', () => {
  expect(FIREBASE_AUTH).not.toBe(null)
})

/*
 * Tests that the Realtime Database was properly initialized
 */
test('firebase database should be non null', () => {
  expect(FIREBASE_DATABASE).not.toBe(null)
})

/*
 * Tests that Firebase Storage was properly initialized
 */
test('firebase storage should be non null', () => {
  expect(FIREBASE_STORAGE).not.toBe(null)
})
