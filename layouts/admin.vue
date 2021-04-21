<template>
    <div>

        <no-ssr>
            <section v-if="user.isAdmin == 1" class="admin-area ">

                <Sidebar></Sidebar>
                <div class="admin-main-content">
                    <div class="admin-header">
                        <div class="header-navigation">
                            <a href="javascript:void(0)" class="menu-hamburger">
                                <i class="far fa-bars"></i>
                            </a>
                            <div class="user-info">
                                <img src="~/assets/img/admin-avatar.jpg" alt="admin">
                                <span>{{user.username}}</span>
                            </div>
                        </div>

                    </div>

                    <div class="admin-content">
                        <div class="container-fluid">
                            <Nuxt/>
                        </div>
                    </div>

                </div>
            </section>
        </no-ssr>
    </div>
</template>


<script>
    import Sidebar from '@/components/Admin/Sidebar'
    import "@/assets/css/admin.css";
    export default {
        components: {Sidebar},
        middleware: 'auth',
        head() {
            return {
                script: [
                    {src: 'js/admin.js',callback: () => (this.externalLoaded = true) }
                ],
            }
        },
        data() {
            return {
                externalLoaded: false
            }
        },
        async beforeCreate(){
            if(this.$auth.user.isAdmin != 1){
                this.$router.push('/');
            }
        }
    }
</script>