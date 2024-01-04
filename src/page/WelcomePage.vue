<template>
    <div :class="$style.welcomePage" ref="main" >
      <img
        :class="$style.welcomePageChild"
        alt=""
        src="../assets/img/welcomeCar.png"
        style="{height: 413px;}"
      />
      <div :class="$style.giveNewLookToYourCarParent">
        <div :class="$style.giveNewLook">Give New Look To Your Car</div>
        <div :class="$style.experienceThePower">
          Experience the power of perfect foam with the most luxurious wash around
        </div>
        <img
          :class="$style.frameChild"
          alt=""
          src="../assets/img/nextWelcomePage.png"
          @click="onFrameImage1Click"
        />
      </div>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "WelcomePage",
    data() {
      return {
        dynamicHeight: 0
      };
    },
    mounted() {
      this.calculateDynamicHeight();
      window.addEventListener('resize', this.calculateDynamicHeight);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.calculateDynamicHeight);
    },
    methods: {
      calculateDynamicHeight() {
        const containerHeight = this.$refs.main.clientHeight;
        this.dynamicHeight = containerHeight * 0.1; // يمكنك تغيير النسبة حسب احتياجاتك
        console.log(this.dynamicHeight);
      },
      onFrameImage1Click() {
        this.$router.push("/PhoneNumber");
      },
    },
  });
  </script>
  <style module>
  .welcomePageChild {
    align-self: stretch;
    position: relative;
    border-radius: 0px 0px var(--br-xl) var(--br-xl);
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    height: 60%;
  }
  .giveNewLook {
    align-self: stretch;
    position: relative;
    font-weight: 900;
    font-size: 30px;
    color: rgb(255, 115, 0);
  }
  .experienceThePower {
    position: relative;
    font-size: var(--font-size-mini);
    color: var(--color-black);
    display: inline-block;
    width: 178px;
  }
  .frameChild {
    width: 84.9px;
    height: 84.9px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: contain;
    cursor: pointer;
  }
  .giveNewLookToYourCarParent {
    align-self: stretch;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: var(--padding-xl) var(--padding-31xl);
    gap: var(--gap-xl);
  }
  .welcomePage {
    position: relative;
    background-color: var(--basic-white);
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 1000px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    font-size: var(--font-size-21xl);
    color: var(--color-tomato);
    font-family: var(--font-inter);
  }
  </style>
  