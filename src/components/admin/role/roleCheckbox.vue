<template>
    <div>
        <div class="checkbox" v-for="role in roles">
            <v-checkbox :label="role.name"
                        v-bind:value="role"
                        v-on:change="$emit('change', role)"
                        :input-value="value"
            >
            </v-checkbox>
        </div>
    </div>
</template>

<script>

    export default {
        name: "role-checkbox",
        props: {
            value: {
                type: [Array],
                default: () => []
            }
        },
        data() {
            return {
                roles: [],
                selected: [],
            }
        },
        methods: {
            sync: function () {
                let roles_length = this.roles.length;
                let sel_length = this.value.length;

                let roles = this.roles;
                let sel = this.value;

                for (let i = 0; i < roles_length; i++) {
                    for (let j = 0; j < sel_length; j++) {
                        if (roles[i].id == sel[j].id) {
                            roles[i] = sel[j]
                        }
                    }
                }
            },
            load: async function () {
                this.roles = await this.$store.dispatch('roles/getRoles')
                this.sync();
            }
        },
        created: function () {
            this.load();
        },
        mounted: function () {
            console.log('role-checkbox mounted')
        }

    }
</script>

<style scoped>

</style>