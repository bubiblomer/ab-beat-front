<template>
        <div>

            <Navbar></Navbar>
            <Nuxt/>
            <Footer></Footer>
        </div>
</template>

<script>
    import Navbar from '@/components/Navbar'
    import Footer from '@/components/Footer'
    import "@/assets/css/nice-select.min.css";
    import "@/assets/css/slick.css";
    import "@/assets/css/style.css";

    export default {
        components: {Navbar,Footer},
        head () {
            return {
                script: [
                    {src: 'js/jquery.nice-select.min.js'},
                    {src: 'js/wow.min.js'},
                    {src: 'js/main.js'}
                ],
            }
        }
    }
</script>