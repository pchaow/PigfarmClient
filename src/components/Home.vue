<template>
    <div class="hello">

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted() {
            if(localStorage.user){
                let user = JSON.parse(localStorage.user);
                console.log(user)

                if (user != null) {
                    let roles = user.roles;
                    if(roles != null){
                        this.$router.push('/admin')
                    }else {
                        this.$router.push("/home")
                    }
                }else {
                    this.$router.push("/login")
                }
            }else {
                this.$router.push('/login')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
