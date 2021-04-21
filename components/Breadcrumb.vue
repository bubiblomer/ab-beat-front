<template>

    <section class="breadcrumb-area" :style="{ backgroundImage: `url(${backgroundImagePath})` }">
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="breadcrumb-text">
                        <h2 class="title">{{title}}</h2>
                        <ul class="breadcrumb-nav">
                            <li><NuxtLink to="/">Home</NuxtLink></li>
                            <li><i class="far fa-long-arrow-right"></i></li>
                            <li class="current">{{title}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>
<script>
    import backgroundImagePath from '~/assets/img/breadcrumb.jpg'
    export default {
        props: ['title'],
        data() {
            return { backgroundImagePath }
        }
    }
</script>