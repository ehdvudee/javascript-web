import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create( View )

FormView.setup = function (el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    this.bindEvents()

    return this
}


FormView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'

}

FormView.bindEvents = function() {
    this.on('submit', e => e.preventDefault() )
    this.inputEl.addEventListener( "keyup", e => this.onKeyup( e ) )
    this.resetEl.addEventListener( "click", () => this.onClickReset())
}

FormView.onKeyup = function( e ) {
    const enter = 13
    let keyLen = this.inputEl.value.length

    this.showResetBtn( keyLen )
    if ( !keyLen )
        this.emit( '@reset' )

    if ( e.keyCode !== enter )
        return

    this.emit( '@submit', {input: this.inputEl.value })
}

FormView.onClickReset = function() {
    this.emit( '@reset' )
    this.showResetBtn( false )
}

FormView.showSearchKeyword = function( keyword ) {
    this.inputEl.value = keyword
    this.showResetBtn( true )
}

export default FormView