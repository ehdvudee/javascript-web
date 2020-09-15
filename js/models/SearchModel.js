const data = [
    {
        id: 1,
        name: '[키친르쎌] 홈메이드 칠리소스 포크립 650g',
        image: 'https://placeimg.com/300/300/any'
    },
    {
        id: 2,
        name: '[키친르쎌] 이탈리아 파티 세트 3~4인분',
        image: 'https://placeimg.com/300/300/any'
    }
]

export default {
    list(query) {
        return new Promise(res => {
            setTimeout(() => {
                res(data)
            }, 200);
        })
    }
}