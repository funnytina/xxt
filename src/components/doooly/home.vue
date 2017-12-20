<template>
  <div>
    <ad-banner></ad-banner>
    <access-catagory></access-catagory>
    <list></list>
    <dyfooter></dyfooter>
  </div>
</template>

<script>
  import accessCatagory from '@/components/common/accessCatagory';
  import adBanner from '@/components/common/adBanner';
  import dyfooter from '@/components/common/dyfooter';
  import list from '@/components/common/list';
  export default {
    name: "home",
    components: {
      accessCatagory,
      adBanner,
      dyfooter,
      list
    }
  }
</script>

<style scoped>

</style>
