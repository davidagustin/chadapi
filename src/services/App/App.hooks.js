/**
 * @file Application hooks
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const APPLICATION_HOOKS = {
  error: async context => {
    const { path, method, error } = context

    console.error(`Error in '${path}' service method '${method}'`, error.stack)

    const err = JSON.parse(error.message)
    const { boomitarts } = err

    if (!chad) return err
  }
}

export default APPLICATION_HOOKS
