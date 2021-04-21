<template>
    <footer>
        <div class="chancer-container">
            <div class="footer-wrapper">
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-7 order-lg-2">
                        <div class="footer-nav">
                            <ul>
                                <li>
                                    <NuxtLink to="/" exact>Home</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/contact" exact>Contact Us</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-5 order-lg-1">
                        <p class="copyright-text">{{basic.site_title}} © {{basic.year}}. All Right Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<style scoped>
    .footer-nav ul  li a.nuxt-link-exact-active {
        padding: 0px 5px;
        border-radius: 5px;
    }
</style>
<script>
    export default {}
</script>