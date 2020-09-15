import View from "./View.js"

const tag = '[ResultView]'

const ResultView = Object.create( View )

ResultView.messages = {
    NO_RESULT: '검색 결과가 없습니다.'
}

ResultView.setup = function( el ) {
    this.init( el )
}

ResultView.render = function( data = [] ) {
    console.log( tag, 'render()', data )
    this.el.innerHTML = data.length ? this.getSearchResultHtml( data ) : this.messages.NO_RESULT
}

ResultView.getSearchResultHtml = function( data ) {
    return data.reduce(( html, item) => {
        html = html + this.getSearchItemHtml( item )
        return html
    }, '<ul>' ) + '</ul>'
}

ResultView.getSearchItemHtml = function ( item ) {
    return `<li>
        <img src="${item.image}" />
        <p>${item.name}</p>
        </li>`
}

ResultView.resetItem = function() {
    this.el.innerHTML = ''
}

export default ResultView