<template>
  <div :class="$style.phoneNumber">
    <div :class="$style.phoneNumberInner">
      <div :class="$style.ellipseParent">
        <div :class="$style.frameChild" />
        <img :class="$style.frameItem" alt="" src="../assets/img/orangCircl-127.png" />
        <img :class="$style.frameInner" alt="" src="../assets/img/orangCircl-128.png" />
        <div :class="$style.arrowBackIosWrapper" @click="onGroupContainer1Click()">
          <span style="color: #fff" class="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        </div>
      </div>
    </div>
    <div :class="$style.registrationParent">
      <div :class="$style.registration">Registration</div>
      <div :class="$style.enterYourPhone">
        Enter your phone number to verify your account
      </div>
      <div :class="$style.frameParent">
        <div :class="$style.wrapper">
          <div :class="$style.div">(+972)</div>
          <input v-model="phoneNumber" type="number" @input="handlePhoneNumberInput()" :class="$style.inputNumber"
            placeholder="###-###-####" @keydown="handleKeyDown" />
        </div>
        <div :class="$style.groupWrapper">
          <div :class="$style.groupContainer">
            <div :class="$style.rectangleParent" @click="onGroupContainer2Click()">
              <div :class="$style.groupChild" />
              <div :class="$style.send">Send</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";


export default defineComponent({
  name: "PhoneNumber",
  data() {
    return {
      phoneNumber: "",
      response: "",
      isValidPhoneNumber: true,
    };
  },
  methods: {
    handleKeyDown(event) {
      if (event.keyCode === 13) {
        this.onGroupContainer2Click();
      }
    },
    handlePhoneNumberInput() {
      this.isValidPhoneNumber = this.validatePhoneNumber(this.phoneNumber);
    },
    validatePhoneNumber(phoneNumber) {
      const phoneNumberRegex = /[^0-9]{10}$/;
      if (("" + this.phoneNumber)[1] == "0") {
        if (("" + this.phoneNumber).length > 9) {
          this.phoneNumber = "0" + ("" + this.phoneNumber).slice(0, 9);
        }
      } else {
        if (("" + this.phoneNumber).length > 10) {
          this.phoneNumber = "" + ("" + this.phoneNumber).slice(0, 10);
        }
      }

      return phoneNumberRegex.test(phoneNumber);
    },
    fetchAxiosData() {
      var phoneNum;
      if (("" + this.phoneNumber)[1] == "0") {
        phoneNum = "0" + this.phoneNumber;
      } else {
        phoneNum = this.phoneNumber;
      }
      const requestData = {
        phoneNumber: phoneNum,
      };
      sessionStorage.setItem("phoneNumber", phoneNum);
      axios.post("http://192.168.1.107:443/user/enterOrCreateAccount", requestData)
        .then((responses) => {
          if (responses.status === 200 || responses.status === 201) {
            this.response = responses.data;
            return true;
          }
          else {
            this.responses = responses.data;
            alert("error");
          }
        })
        .catch((error) => {
          this.response = error;
        })
        return false;
    },
    onGroupContainer1Click() {
      this.$router.push("/");
    },
    onGroupContainer2Click() {
      if (("" + this.phoneNumber)[1] == "0") {
        if (!this.isValidPhoneNumber && ("" + this.phoneNumber).length == 9) {
          if (this.fetchAxiosData()){
            return;
          }
          this.$router.push("/EnterCode");
        } else {
          alert("this is a uncorrect numer \nplase enter correct number");
        }
      } else {
        if (
          !this.isValidPhoneNumber &&
          ("" + this.phoneNumber).length == 10
        ) {
          if (this.fetchAxiosData()){
            return;
          }
          this.$router.push("/EnterCode");
        } else {
          alert("this is a uncorrect numer \nplase enter correct number");
        }
      }
    }
  },
});
</script>
<style module>
.frameChild {
  position: absolute;
  top: -28px;
  left: -48px;
  border-radius: 50%;
  border: 36px solid var(--color-tomato);
  box-sizing: border-box;
  width: 96px;
  height: 96px;
}

.inputNumber {
  border: none;
  border-bottom: 2px solid #4c5558;
  outline: none;
  width: 80%;
  font-size: 15px;
}

.frameItem {
  position: absolute;
  top: -97px;
  left: 0px;
  width: 165px;
  height: 165px;
  object-fit: cover;
}

.frameInner {
  position: absolute;
  top: -69px;
  left: 319px;
  width: 181px;
  height: 181px;
  object-fit: cover;
}

.arrowBackIosIcon {
  position: absolute;
  margin: 0 !important;
  top: 7px;
  left: 7px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  object-fit: cover;
  z-index: 0;
}

.arrowBackIosWrapper {
  position: absolute;
  height: 30px;
  width: 30px;
  top: 84px;
  left: 49px;
  border-radius: var(--br-3xs);
  background-color: var(--color-black);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.ellipseParent {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 430px;
  height: 199px;
}

.phoneNumberInner {
  align-self: stretch;
  position: relative;
  height: 199px;
}

.registration {
  position: relative;
  font-size: var(--font-size-17xl-4);
  line-height: 120%;
}

.enterYourPhone {
  position: relative;
  line-height: 137.7%;
  color: var(--sub-color);
  display: inline-block;
  width: 251px;
}

.div {
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
}

.wrapper {
  align-self: stretch;
  border-radius: var(--br-7xs);
  border: 1px solid var(--color-tomato);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-3xl) var(--padding-xl);
}

.groupChild {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: var(--br-9xl-5);
  background-color: var(--primary-color);
  box-shadow: var(--darkmode-shadow);
  width: 248px;
  height: 60px;
}

.send {
  position: absolute;
  height: 18.33%;
  width: 64.11%;
  top: 41.67%;
  left: 17.74%;
  letter-spacing: 0.08em;
  display: inline-block;
}

.rectangleParent {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 248px;
  height: 60px;
}

.groupContainer {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 248px;
  height: 60px;
  cursor: pointer;
}

.groupWrapper {
  position: relative;
  filter: drop-shadow(0px 10px 40px rgba(122, 129, 190, 0.16));
  width: 248px;
  height: 60px;
  text-align: center;
  font-size: var(--font-size-mini);
  color: var(--basic-white);
}

.frameParent {
  align-self: stretch;
  flex: 1;
  background-color: var(--basic-white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-81xl) 0px;
  gap: var(--gap-31xl);
  color: #111719;
}

.registrationParent {
  align-self: stretch;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-6xl) var(--padding-31xl);
  gap: var(--gap-3xs);
}

.phoneNumber {
  position: relative;
  background-color: var(--basic-white);
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  max-height: 1000px;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--font-size-mid);
  color: var(--color-black);
  font-family: var(--font-inter);
}
</style>
  