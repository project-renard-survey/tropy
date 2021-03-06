'use strict'

const React = require('react')
const { PureComponent } = React
const { array, arrayOf, bool, func, shape, string } = require('prop-types')
const { TemplateSelect } = require('../template/select')
const { ipcRenderer: ipc } = require('electron')
const { ESPER, ITEM } = require('../../constants')
const { darwin } = require('../../common/os')

const {
  FormElement,
  FormSelect,
  FormToggle,
  FormToggleGroup,
  Toggle
} = require('../form')


class AppPrefs extends PureComponent {
  handleDebugChange() {
    ipc.send('cmd', 'app:toggle-debug-flag')
  }

  handleThemeChange = ({ theme }) => {
    ipc.send('cmd', 'app:switch-theme', theme)
  }

  handleLocaleChange = ({ locale }) => {
    ipc.send('cmd', 'app:switch-locale', locale)
  }

  handleLocalTimeChange = ({ localtime }) => {
    this.props.onSettingsUpdate({ localtime })
  }

  handleTemplateChange = (template) => {
    this.props.onSettingsUpdate({ template: template.id })
  }

  render() {
    return (
      <div className="scroll-container">
        <div className="form-horizontal">
          <FormElement id="prefs.app.template">
            <TemplateSelect
              isRequired
              options={this.props.templates}
              value={this.props.settings.template}
              tabIndex={0}
              onChange={this.handleTemplateChange}/>
          </FormElement>
          <hr/>
          <FormToggleGroup
            id="prefs.app.dup"
            name="dup"
            isCompact
            value={this.props.settings.dup}
            options={this.props.dupOptions}
            onChange={this.props.onSettingsUpdate}/>
          <FormToggle
            id="prefs.app.localtime"
            name="localtime"
            value={this.props.settings.localtime}
            onChange={this.handleLocalTimeChange}/>
          <hr/>
          <FormSelect
            id="prefs.app.style.theme"
            name="theme"
            isRequired
            isSelectionHidden
            value={this.props.settings.theme}
            options={this.props.themes}
            onChange={this.handleThemeChange}/>
          <hr/>
          <FormSelect
            id="prefs.app.locale.locale"
            name="locale"
            isRequired
            isSelectionHidden
            value={this.props.settings.locale}
            options={this.props.locales}
            tabIndex={0}
            onChange={this.handleLocaleChange}/>
          <hr/>
          <FormElement
            id="prefs.app.ui.label"
            isCompact>
            <Toggle
              id="prefs.app.ui.option.invertScroll"
              name="invertScroll"
              value={this.props.settings.invertScroll}
              onChange={this.props.onSettingsUpdate}/>
            <Toggle
              id="prefs.app.ui.option.invertZoom"
              name="invertZoom"
              value={this.props.settings.invertZoom}
              onChange={this.props.onSettingsUpdate}/>
            <Toggle
              id="prefs.app.ui.option.overlayToolbars"
              name="overlayToolbars"
              value={this.props.settings.overlayToolbars}
              onChange={this.props.onSettingsUpdate}/>
          </FormElement>
          <FormToggleGroup
            id="prefs.app.zoomMode"
            name="zoomMode"
            isCompact
            value={this.props.settings.zoomMode}
            options={this.props.zoomModes}
            onChange={this.props.onSettingsUpdate}/>
          <FormToggleGroup
            id="prefs.app.layout"
            name="layout"
            value={this.props.settings.layout}
            options={this.props.layouts}
            onChange={this.props.onSettingsUpdate}/>
          <hr/>
          <FormToggle
            id="prefs.app.debug"
            name="debug"
            isDisabled={ARGS.dev}
            value={this.props.settings.debug || ARGS.dev}
            onChange={this.handleDebugChange}/>
        </div>
      </div>
    )
  }

  static propTypes = {
    templates: array.isRequired,
    settings: shape({
      debug: bool.isRequired,
      layout: string.isRequired,
      locale: string.isRequired,
      theme: string.isRequired,
    }).isRequired,
    layouts: arrayOf(string).isRequired,
    locales: arrayOf(string).isRequired,
    themes: arrayOf(string).isRequired,
    dupOptions: arrayOf(string).isRequired,
    zoomModes: arrayOf(string).isRequired,
    onSettingsUpdate: func.isRequired
  }

  static defaultProps = {
    themes: ['light', 'dark'],
    layouts: [ITEM.LAYOUT.STACKED, ITEM.LAYOUT.SIDE_BY_SIDE],
    locales: ['de', 'en', 'fr', 'ja'],
    dupOptions: ['skip', 'import', 'prompt'],
    zoomModes: [ESPER.MODE.FIT, ESPER.MODE.FILL]
  }
}

if (darwin) {
  AppPrefs.defaultProps.themes.push('system')
}


module.exports = {
  AppPrefs
}
