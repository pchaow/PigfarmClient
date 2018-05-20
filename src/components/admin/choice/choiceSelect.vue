<template>
    <div v-if="options">
        <v-select
                :items="options"
                :value="selectValue"
                label="Select"
                single-line
                @change="change"
                item-text="display_name">
        </v-select>
    </div>
</template>

<script>


    export default {
        name: "choice-select",
        props: {
            label: {
                type: String,
                default: "ตัวเลือก"
            },
            type: {
                type: [Object],
                default: () => []
            },
            value: {
                type: [Object],
                default: () => null,
            }
        },
        data() {
            return {
                choice: null,
                options: null,
                selectValue: null,
            }
        },
        methods: {
            change : function(event){
                this.selectValue = event
                this.$emit('change',this.selectValue);
            },
            sync: function () {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].id === this.value.id) {
                        this.select = this.options[i];
                        this.$emit('change', this.selectValue);
                    }
                }
            },
            load: async function () {

                let result = await this.$store.dispatch('choices/getByName', this.type.to);
                if (result) {
                    this.choice = result;
                    this.options = result.children;

                    if (this.value) {
                        this.sync();
                    }
                }
            }
        },
        created() {
        },
        mounted() {
            this.load();
        },
    }
</script>

<style scoped>

</style>