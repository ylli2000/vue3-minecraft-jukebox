/* 
This is a sample of a directive that can be used in a template like this:

example usage:
argument:
:full - is a single argument for binding.arg

modifiers:
.right.yellow.lg - are multiple values for binding.modifiers, (better than signle arg)

values:
="headphones-alt" - is value for binding.value
={icon: 'headphones-alt', right: true, yellow: true, lg: true} - also accepts an object as value

html:
<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
  v-icon:full="headphones-alt">
  <span class="card-title">Songs</span>
</div> 

script:
//globally in main.js:
  import Icon from '@/directives/Icon'
  vue.directive('icon', Icon)

//locally in vue component:,
  <script>
    export default {
        import Icon from '@/directives/Icon'
        export default {
          directives: { Icon }
      }
    }
  </script>
*/

export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl text-green-400`
    if (binding.modifiers.right) iconClass += ' float-right'

    if (binding.modifiers.yellow) iconClass = iconClass.replace('text-green-400', 'text-yellow-400')
    if (binding.modifiers.red) iconClass = iconClass.replace('text-green-400', 'text-red-400')
    if (binding.modifiers.md) iconClass = iconClass.replace('text-xl', 'text-md')
    if (binding.modifiers.lg) iconClass = iconClass.replace('text-xl', 'text-lg')
    if (binding.modifiers.xxl) iconClass = iconClass.replace('text-xl', 'text-2xl')
    //completely override the iconClass
    if (binding.arg === 'full') iconClass = binding.value
    const html = '<i class="' + iconClass + '"></i>'
    el.innerHTML += html
  }
}
