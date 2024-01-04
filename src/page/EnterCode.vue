<template>
    <div :class="$style.enterCode">
        <div :class="$style.enterCodeInner">
            <div :class="$style.ellipseParent">
                <div :class="$style.frameChild" />
                <img :class="$style.frameItem" alt="" src="../assets/img/orangCircl-127.png" />
                <div :class="$style.frameInner" />
                <div :class="$style.arrowBackIosWrapper" @click="onGroupContainer1Click">
                    <span style="color: #fff" class="material-symbols-outlined">
                        arrow_back_ios_new
                    </span>
                </div>
            </div>
        </div>
        <div :class="$style.vefificationCodeParent">
            <div :class="$style.vefificationCode">Vefification Code</div>
            <div :class="$style.pleaseTypeThe">
                Please type the verification code sent {{ number }}
            </div>
            <div :class="$style.groupParent">
                <div :class="$style.groupContainer">
                    <input :maxlength="1" :class="$style.inputCode" placeholder="#" ref="input1" v-model="input1"
                        @input="handleInput(1)" @focus="isBeforeFull()" @keydown="handleKeyDown" />
                    <input :maxlength="1" :class="$style.inputCode" placeholder="#" ref="input2" v-model="input2"
                        @input="handleInput(2)" @focus="isBeforeFull()" @keydown="handleKeyDown" />
                    <input :maxlength="1" :class="$style.inputCode" placeholder="#" ref="input3" v-model="input3"
                        @input="handleInput(3)" @focus="isBeforeFull()" @keydown="handleKeyDown" />
                    <input :maxlength="1" :class="$style.inputCode" placeholder="#" ref="input4" v-model="input4"
                        @input="handleInput(4)" @focus="isBeforeFull()" @keydown="handleKeyDown" />
                </div>
                <div :class="$style.groupWrapper" @click="onGroupContainer2Click()">
                    <div :class="$style.rectangleContainer">
                        <div :class="$style.groupChild1" />
                        <div :class="$style.send">Send</div>
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
    name: "EnterCode",
    data() {
        return {
            input1: "",
            input2: "",
            input3: "",
            input4: "",
            response: {},
            number: sessionStorage.getItem("phoneNumber"),
            statusm: "",
        };
    },
    methods: {
        handleInput(inputNumber) {
            const currentInput = `input${inputNumber}`;
            const nextInputNumber = inputNumber + 1;
            this.checkData(inputNumber);
            if (("" + this[currentInput]).length === 1) {
                if (nextInputNumber <= 4) {
                    const nextInput = `input${nextInputNumber}`;
                    this.$refs[nextInput].focus();
                }
            }
        },
        checkData(inputNumber) {
            const currentInput = `input${inputNumber}`;
            if (this[currentInput] < "0" || this[currentInput] > "9") {
                this[currentInput] = "";
            }
        },
        handleKeyDown(event) {
            if (event.keyCode === 8) {
                for (var i = 1; i <= 4; i++) {
                    const currentInput = `input${i}`;
                    if (this[currentInput] === "") {
                        if (!(i === 1)) {
                            const deleteInput = `input${i - 1}`;
                            this[deleteInput] = "";
                            this.$refs[`input${1}`].focus();
                        } else {
                            this[currentInput] = "";
                            this.$refs[`input${1}`].focus();
                        }
                    }
                }
            }
            else if (event.keyCode === 13) {
                this.onGroupContainer2Click();
            }
        },
        isBeforeFull() {
            for (var i = 1; i <= 4; i++) {
                const currentInput = `input${i}`;
                if (this[currentInput] === "") {
                    this.$refs[currentInput].focus();
                    return;
                }
            }
            const currentInput = `input${4}`;
            this.$refs[currentInput].focus();
        },
        fetchAxiosData() {
            var code = "" + this.input1 + this.input2 + this.input3 + this.input4;
            axios.get(`http://192.168.1.107:443/user/getRandomNumber/${this.number}/${code}`)
                .then((responses) => {
                    this.statusm = responses.status;
                    if (responses.status === 200 || responses.status === 201) {
                        this.response = responses.data;
                        localStorage.setItem("username", this.response.autoUsername);
                        localStorage.setItem("password", this.response.autoPassword);
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
            if (this.statusm == 200) {
                return true;
            }
            return false;
        },
        onGroupContainer2Click() {
            var flag = true;
            for (var i = 1; i <= 4; i++) {
                const currentInput = `input${i}`;
                if (this[currentInput] === "") {
                    flag = false;
                }
            }
            if (flag) {
                var fetch = this.fetchAxiosData();
                alert(fetch)
                if (fetch)
                    this.$router.push("/home-page");
                else {
                    alert("the code is wrong")
                }
            } else {
                alert("the code is incomplete.\nPlaese enter the full code");
            }
        },
        onGroupContainer1Click() {
            this.$router.push("/PhoneNumber");
        },
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
    border-radius: 50%;
    background-color: var(--primary-color);
    width: 181px;
    height: 181px;
}

.arrowBackIosIcon {
    position: absolute;
    margin: 0 !important;
    width: 24px;
    height: 24px;
    object-fit: cover;
    z-index: 0;
}

.arrowBackIosWrapper {
    position: absolute;
    top: 84px;
    left: 49px;
    width: 30px;
    height: 30px;
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

.enterCodeInner {
    align-self: stretch;
    position: relative;
    height: 199px;
}

.vefificationCode {
    position: relative;
    line-height: 120%;
}

.pleaseTypeThe {
    position: relative;
    font-size: 14px;
    line-height: 137.7%;
    color: var(--sub-color);
    display: inline-block;
    width: 251px;
}

.inputCode {
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: larger;
    border-radius: 20%;
    border: 2px solid var(--primary-color);
    outline: none;
}

.groupContainer {
    position: relative;
    display: flex;
    width: auto;
    height: auto;
}

.groupContainer>.inputCode {
    margin-right: 2.5%;
}

.groupChild1 {
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

.rectangleContainer {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 248px;
    height: 60px;
}

.groupWrapper {
    position: relative;
    width: 248px;
    height: 60px;
    cursor: pointer;
    text-align: center;
    font-size: var(--font-size-mini);
    color: var(--basic-white);
}

.groupParent {
    align-self: stretch;
    flex: 1;
    width: 100%;
    background-color: var(--basic-white);
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: var(--padding-81xl) 0px;
    gap: var(--gap-31xl);
    font-size: var(--font-size-8xl-2);
    color: var(--primary-color);
}

.vefificationCodeParent {
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

.enterCode {
    position: relative;
    background-color: var(--basic-white);
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 1000px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    font-size: var(--font-size-17xl-4);
    color: var(--color-black);
    font-family: var(--font-inter);
}
</style>
  