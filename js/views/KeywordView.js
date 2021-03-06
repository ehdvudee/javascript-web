import View from './View.js'

const tag = '[KeywordView]'

const KeywordView = Object.create( View )

KeywordView.messgaes = {
    NO_KEYWORD: '추천 검색어가 없습니다.'
}

KeywordView.setup = function( el ) {
    this.init( el )

    return this
}

KeywordView.bindEvents = function() {
    Array.from( this.el.querySelectorAll( 'li' )).forEach(li => {
        li.addEventListener( 'click', e => this.onClickKeyword( e ) )
    })
}

KeywordView.render = function( data =[] ) {
    this.el.innerHTML = data.length ? this.getKeywordHtml( data ) : this.messgaes.NO_KEYWORD
    this.bindEvents()
    this.show()
}

KeywordView.getKeywordHtml = function ( data ) {
    return data.reduce(( html, item, index ) => {
        html = html + `<li data-keyword="${item.keyword}">
        <span class="number">${index + 1}</span> 
            ${item.keyword}
        </li>`
        return html
    }, '<ul class="list">') + '</ul>'
}

KeywordView.onClickKeyword = function ( e ) {
    const {keyword} = e.currentTarget.dataset
    this.emit( '@click', {keyword} )
}

export default KeywordView