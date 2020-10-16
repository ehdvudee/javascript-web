import KeywordView from './KeywordView.js'

const tag = '[HistoryView]'

const HistoryView = Object.create( KeywordView )

HistoryView.messgaes = {
    NO_HISTORY: '검색 기록이 없습니다.'
}

HistoryView.setup = function( el ) {
    this.init( el )

    return this
}

HistoryView.bindEvents = function() {
    Array.from( this.el.querySelectorAll( 'li' )).forEach( li => {
        li.addEventListener( 'click', e => this.onClickHistory( e ) )
    })
}

HistoryView.bindRemoveBtn = function() {
    Array.from( this.el.querySelectorAll( 'button.btn-remove')).forEach( btn => {
        btn.addEventListener( 'click', e => {
            e.stopPropagation()
            this.onRemove( btn.parentElement.dataset.keyword )

        })
    })
}

HistoryView.render = function( data ) {
    this.el.innerHTML = data.length ? this.getKeywordHtml( data ) : this.messgaes.NO_HISTORY
    this.bindEvents()
    this.show()

    return this
}

HistoryView.getKeywordHtml = function ( data ) {
    return data.reduce(( html, item, index ) => {
        html = html + `<li data-keyword="${item.keyword}"> 
            ${item.keyword}
            <span class="date">${item.date}</span>
            <button class="btn-remove"></button>
        </li>`
        return html
    }, '<ul class="list">') + '</ul>'
}

HistoryView.onClickHistory = function ( e ) {
    const {keyword} = e.currentTarget.dataset
    this.emit( '@click', {keyword} )
}

HistoryView.onRemove = function ( keyword ) {
    this.emit( '@remove', {keyword} )
}

export default HistoryView