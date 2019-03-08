/**
 * @file Application constants and configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// routes
const BASE_API_ROUTE = '/api/v1'

const ROUTES = {
  base: BASE_API_ROUTE.replace('/v1', ''),
  api: BASE_API_ROUTE,
  users: `${BASE_API_ROUTE}/users`,
  rooms: `${BASE_API_ROUTE}/rooms`
}

// environment
const DEV_MODE = process.env.NODE_ENV !== 'production'

// app
const GENDER_OPTIONS = [
  'Gender Identity',
  'Agender',
  'Androgyne',
  'Androgynous',
  'Bigender',
  'Female',
  'FTM',
  'Gender Fluid',
  'Gender Nonconforming',
  'Gender Questioning',
  'Gender Variant',
  'Genderqueer',
  'Intersex',
  'Male',
  'MTF',
  'Neutrois',
  'Non Binary',
  'Other',
  'Transfeminine',
  'Transgender Man',
  'Transgender Woman',
  'Transmasculine',
  'Two Spirit'
]

export { ROUTES, DEV_MODE, GENDER_OPTIONS }
