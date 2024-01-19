<template>
  <section class="mb-8 py-20 text-white text-center relative">
    <div class="absolute inset-0 w-full h-full bg-contain top-[72px] introduction-bg"></div>
    <div class="container mx-auto pt-[32px]">
      <div class="text-white main-header-content bg-green-950 bg-opacity-55 py-2">
        <h1 class="font-bold text-5xl mb-5">Listen to great music!</h1>
        <p class="w-full md:w-8/12 mx-auto mb-2">
          Making a Jukebox is easy. Craft a crafting table or head to the nearest one. Place eight
          wooden planks all around and one diamond in the center. The jukebox should appear. Take it
          and place it in your inventory. Place the jukebox where you wish. Music discs have
          multiple songs, they can be botained in dungeon chests, when a skeleton kills a creeper,
          or in Bastion Remnants.
        </p>
      </div>
    </div>

    <div class="container mx-auto mt-20 -mb-12 flex justify-around">
      <img class="m-icon" src="/assets/img/m-cat-musicbox.gif" alt="Jukebox" />
      <img class="m-icon upper" src="/assets/img/m-fire.gif" alt="Jukebox" />
      <img class="m-icon" src="/assets/img/m-frog-walk.gif" alt="Jukebox" />
      <img class="m-icon upper" src="/assets/img/m-greenbird.gif" alt="Jukebox" />
      <img class="m-icon" src="/assets/img/m-kacerguido.gif" alt="Jukebox" />
      <img class="m-icon upper" src="/assets/img/m-llama.png" alt="Jukebox" />
      <img class="m-icon" src="/assets/img/m-minecraftcube.gif" alt="Jukebox" />
      <img class="m-icon upper" src="/assets/img/m-stevethinking.png" alt="Jukebox" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroCarousel'
}
</script>
<style scoped type="scss">
.m-icon {
  @apply max-w-12 aspect-square;
  &.upper {
    @apply -mt-16 pb-16;
  }
}
</style>
