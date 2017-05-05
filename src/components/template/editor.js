'use strict'

const React = require('react')
const { PureComponent } = React
const { TemplateSelect } = require('./select')
const { TemplateField } = require('./field')
const { ButtonGroup, IconButton } = require('../button')
const { FormattedMessage } = require('react-intl')
const { FormField, FormGroup, Label } = require('../form')
const { arrayOf, func, shape, string } = require('prop-types')

const {
  IconNew,
  IconCopy,
  IconTrash,
  IconImport,
  IconExport,
} = require('../icons')


function TemplateControl(props) {
  return (
    <FormGroup className="select-template">
      <Label id="prefs.template.select"/>
      <div className="col-9 flex-row center">
        <TemplateSelect
          templates={props.templates}
          selected={props.selected}
          isRequired={false}
          placeholder="prefs.template.new"
          onChange={props.onChange}/>
        <ButtonGroup>
          <IconButton icon={<IconNew/>}/>
          <IconButton icon={<IconCopy/>}/>
          <IconButton icon={<IconTrash/>}/>
          <IconButton icon={<IconImport/>}/>
          <IconButton icon={<IconExport/>}/>
        </ButtonGroup>
      </div>
    </FormGroup>
  )
}

TemplateControl.propTypes = {
  templates: arrayOf(shape({
    uri: string.isRequired,
    name: string
  })).isRequired,
  selected: string,
  onChange: func.isRequired
}




class TemplateEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '', uri: ''
    }
  }

  handleTemplateChange = (template) => {
    this.setState({ name: '', uri: '', ...template })
  }

  handleTemplateUpdate = (template) => {
    this.setState(template)
  }

  handlePropertyChange = () => {
  }

  render() {
    return (
      <div className="template editor form-horizontal">
        <header className="template-header">
          <TemplateControl
            selected={this.state.uri}
            templates={this.props.templates}
            onChange={this.handleTemplateChange}/>
          <FormField
            id="template.name"
            name="name"
            value={this.state.name}
            isCompact
            onChange={this.handleTemplateUpdate}/>
          <FormField
            id="template.uri"
            name="uri"
            value={this.state.uri}
            isCompact
            onChange={this.handleTemplateUpdate}/>
          <FormGroup>
            <div className="col-12 text-right">
              <button className="btn btn-primary min-width">
                <FormattedMessage id="prefs.template.save"/>
              </button>
            </div>
          </FormGroup>
        </header>

        <ul className="template-field-list">
          <TemplateField
            field={{}}
            properties={this.props.properties}/>
        </ul>
      </div>
    )
  }

  static propTypes = {
    properties: arrayOf(shape({
      uri: string.isRequired
    })).isRequired,
    templates: arrayOf(shape({
      uri: string.isRequired,
      name: string
    })).isRequired,
    onCreate: func.isRequired,
    onSave: func.isRequired
  }
}

module.exports = {
  TemplateEditor
}
