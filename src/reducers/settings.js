'use strict'

const { SETTINGS, ITEM, ESPER } = require('../constants')
const { darwin } = require('../common/os')

const defaults = {
  debug: ARGS.debug,
  dup: 'prompt',
  layout: ITEM.LAYOUT.STACKED,
  locale: ARGS.locale,
  localtime: true,
  template: ITEM.TEMPLATE,
  theme: ARGS.theme,
  overlayToolbars: ARGS.frameless,
  invertScroll: true,
  invertZoom: darwin,
  zoomMode: ESPER.MODE.FIT
}

module.exports = {
  settings(state = defaults, { type, payload }) {
    switch (type) {
      case SETTINGS.RESTORE:
        return {
          ...defaults,
          ...payload,
          theme: ARGS.theme,
          locale: ARGS.locale
        }
      case SETTINGS.UPDATE:
        return { ...state, ...payload }
      default:
        return state
    }
  }
}
