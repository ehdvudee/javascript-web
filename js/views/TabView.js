import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create( View )

TabView.tabNames = {
    recommand: '추천 검색어',
    recent: '최근 검색어',
}

TabView.setup = function( el ) {
    this.init( el )
    this.tabEl = el.querySelectorAll( 'li' )
    this.bindEvents()

    return this
}

TabView.bindEvents = function() {
    this.tabEl.forEach( li => {
        li.addEventListener( "click", () => this.onTabClick( li.innerHTML ) )
    })
}

TabView.setActiveTab = function( tabName ) {
    this.tabEl.forEach( li => {
        li.className = li.innerHTML === tabName ? 'active' : ''
    })
}

TabView.onTabClick = function( tabName ) {
    this.setActiveTab( tabName );
    this.emit( '@tabClick', {tabName} )
}

export default TabView