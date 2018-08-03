<template>
  <div v-if="options">
    <v-select
      :items="options"
      :value="selectValue"
      :label="label"
      @change="change"
      item-text="display_name"
      item-value="name"
      persistent-hint
      multi-line
      :return-object="returnObject"
    >
    </v-select>
  </div>
</template>

<script>


  export default {
    name: "choice-select",
    props: {
      nullable: false,
      returnObject: true,
      binding: {
        type: String,
        default: "object"
      },
      label: {
        type: String,
        default: "ตัวเลือก"
      },
      type: {
        type: [Object],
        default: () => []
      },
      value: {
        type: [Object, String],
        default: () => null,
      }
    },
    data() {
      return {
        choice: null,
        options: null,
        selectValue: null,
        isReady: false,
        defaultValue: {
          display_name: "กรุณาเลือก",
          name: null
        }

      }
    },
    methods: {
      change: function (event) {
        if (this.isReady) {
          this.selectValue = event;

          if (this.binding == "object") {
            this.$emit('change', this.selectValue);
          } else {
            this.$emit('change', this.selectValue[this.binding]);
          }


        }
      },
      sync: function () {
        for (let i = 0; i < this.options.length; i++) {
          if (this.binding == "object") {
            if (this.options[i].id === this.value.id) {
              this.selectValue = this.options[i];
              this.$emit('change', this.selectValue);
            }
          } else {
            if (this.options[this.binding] === this.value[binding]) {

            }
          }

        }
      },
      load: async function () {

        let result = await this.$store.dispatch('choices/getByName', this.type.to);
        if (result) {
          this.choice = result;

          this.options = result.children;
          if (this.nullable) {
            this.options = [this.defaultValue].concat(result.children)
          }
          if (this.value) {
            this.sync();
          }
          this.isReady = true;
        }
      }
    },
    created() {
      this.selectValue = this.value;
    },
    mounted() {
      this.load();
    },
  }
</script>

<style scoped>

</style>