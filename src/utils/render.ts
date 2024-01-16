const app =<HTMLDivElement> document.getElementById('app')
import anime from 'animejs/lib/anime.es.js';
export const render = (component : Node) => {
    anime({
        targets : '#app',
        translateX: ['100%' , '0%'],
    })

    app.innerHTML = ''
    app.appendChild(component)
}