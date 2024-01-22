import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const color = '#668800'
const thickness = '4px'
const options = {
  barSelector: '[role="progressbar"]',
  template: `<style>#nprogress .bar { height: ${thickness}; background: ${color}; }
    #nprogress .peg { box-shadow: 0 0 0 ${color}, 0 0 0 ${color}; }</style>
    <div class="bar" role="progressbar"><div class="peg"></div></div>`
}
NProgress.configure(options) //optional congfiguration
export default (router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start() //show progress bar
    next()
  })
  router.afterEach(() => {
    NProgress.done() //hide progress bar
  })
}
