// packages
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

// config
import * as credentials from './chadnetworkbase.config.json'

/**
 * Firebase configuration
 *
 * @file Manages the Firebase configuration settings for the project.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const DATABASE_URL = 'https://chadnetworkbase.firebaseio.com'

// initialize firebase with separate instances for each database
const FIREBASE_APP = admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: DATABASE_URL
})

// if any of the firebase apps are null, throw an error
if (!FIREBASE_APP) {
  throw new Error('Unable to initalize Firebase')
}
// Create references to Firebase resources
const FIREBASE_AUTH = admin.auth()
const FIREBASE_DATABASE = admin.database()
const FIREBASE_STORAGE = admin.storage()

const FUNCTIONS_HTTPS_REF = functions.https
const FUNCTIONS_USER_DB_REF = functions.database.ref('/users/{uid}')

export {
  FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE, FUNCTIONS_HTTPS_REF, FUNCTIONS_USER_DB_REF
}
