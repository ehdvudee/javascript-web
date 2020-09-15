import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

const tag = '[MainController]'

export default {

    init() {
        FormView.setup(document.querySelector('form'))
            .on( '@submit', e => this.onSubmit( e.detail.input ) )
            .on( '@reset', e => this.onReset() )

        TabView.setup( document.querySelector('#tabs'))
            .on( '@tabClick', e => this.onClickTab( e.detail.tabName ) )

        KeywordView.setup( document.querySelector('#search-keyword') )
            .on( '@click', e => this.onClickKeyword( e.detail.keyword ) )

        HistoryView.setup( document.querySelector( '#search-history') )
            .on( '@click', e => this.onClickHistory( e.detail.keyword ) )
            .on( '@remove', e => this.onRemoveHistory( e.detail.keyword ) )

        ResultView.setup( document.querySelector( '#search-result' ) )


        this.selectedTab = '추천 검색어'
        this.renderView()
    },

    renderView() {
        console.log( tag, 'renderView()' )

        TabView.setActiveTab( this.selectedTab )
        TabView.show()

        if ( this.selectedTab === '추천 검색어' ) {
            this.fetchSearchKeyword()
            HistoryView.hide()
        } else {
            this.fetchHistoryKeyword()
            KeywordView.hide()
        }

        // ResultView.hide()
    },

    fetchSearchKeyword() {
        KeywordModel.list().then( data => {
            KeywordView.render( data )
        })
    },

    fetchHistoryKeyword() {
        HistoryModel.list().then( data => {
            HistoryView.render( data ).bindRemoveBtn()
        })
    },

    search( query ) {
        console.log( tag, 'search()', query )
        SearchModel.list( query ).then( data => {
            this.onSearchResult( data )
        })
    },

    onSubmit( input ) {
        console.log( tag, 'onSubmit', input )
        HistoryModel.add( input )
        this.search( input )
    },

    onReset() {
        console.log( tag, 'onReset' )
        ResultView.resetItem()
        this.renderView()
    },

    onSearchResult( data ) {
        TabView.hide()
        if ( this.selectedTab === '추천 검색어' ) {
            KeywordView.hide()
        } else {
            HistoryView.hide()
        }

        ResultView.render( data )
    },

    onClickTab( tabName ) {
        console.log( tag, 'onTabClick()')
        this.selectedTab = tabName
        this.renderView()
    },

    onClickKeyword( keyword ) {
        FormView.showSearchKeyword( keyword )
        this.search( keyword )
    },

    onClickHistory( keyword ) {
        FormView.showSearchKeyword( keyword )
        this.search( keyword )
    },

    onRemoveHistory( keyword ) {
        HistoryModel.remove( keyword )
        this.renderView()
    },
}