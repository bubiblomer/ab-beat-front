<template>
    <div>
        <Breadcrumb title="About"></Breadcrumb>

        <section class="about-section section-gap">
            <div class="chancer-container-right-fluid">
                <div class="row no-gutters align-items-center justify-content-center">
                    <div class="col-lg-6 col-md-10">
                        <div class="about-text">
                            <h2 class="title">
                                Know About Us for Increase Your Trust
                            </h2>
                            <p class="mb-30">
                                Aenean sed nibh a magna posuere tempor. Nunc faucibus pellentesque nunc in aliquet. Donec
                                congue, nunc vel tempor congue, enim sapien lobortis ipsum, in volutpat sem ex in ligula.
                                Nunc purus est, consequat condimentum faucibus sed, iaculis sit amet massa.
                            </p>
                            <p class="big-text">
                                Vivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non mauris. Aenean
                                scelerisque, sem eu dictum commodo, velit nisi blandit magna, quis scelerisque ipsum lectus
                                ut libero. Sed elit diam, dignissim ac congue quis, aliquam in purus.
                            </p>
                            <a href="#" class="main-btn mt-50">
                                Know More About Us <i class="far fa-long-arrow-alt-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-10">
                        <div class="about-img text-right">
                            <img src="~/assets/img/about.png" alt="About">
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section class="feedback-section section-gap-bottom">
            <div class="chancer-container">
                <div class="section-title mb-50">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <h2 class="title mb-15">Some Quote from User</h2>
                            <p>
                                Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus
                                id neque tempor, in efficitur justo imperdiet.
                            </p>
                        </div>
                        <div class="col-lg-6">
                            <div class="text-lg-right">
                                <a href="#" class="main-btn">
                                    View All Feedback <i class="far fa-long-arrow-alt-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="feedback-slider-wrap">
                    <VueSlickCarousel :arrows="true" :dots="true" class="feedback-author-slider">
                        <div class="single-feedback-author">
                            <div class="author-img">
                                <img src="~/assets/img/feedback-author/01.png" alt="Image">
                            </div>
                            <div class="author-content">
                                <h4 class="name">Chad Richards</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-author">
                            <div class="author-img">
                                <img src="~/assets/img/feedback-author/02.png" alt="Image">
                            </div>
                            <div class="author-content">
                                <h4 class="name">Richard Bailey</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-author">
                            <div class="author-img">
                                <img src="~/assets/img/feedback-author/03.png" alt="Image">
                            </div>
                            <div class="author-content">
                                <h4 class="name">Emma Hoffman</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-author">
                            <div class="author-img">
                                <img src="~/assets/img/feedback-author/01.png" alt="Image">
                            </div>
                            <div class="author-content">
                                <h4 class="name">Chad Richards</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-author">
                            <div class="author-img">
                                <img src="~/assets/img/feedback-author/02.png" alt="Image">
                            </div>
                            <div class="author-content">
                                <h4 class="name">Richard Bailey</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-author">
                            <div class="author-img">
                                <img src="~/assets/img/feedback-author/03.png" alt="Image">
                            </div>
                            <div class="author-content">
                                <h4 class="name">Emma Hoffman</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                    </VueSlickCarousel>

                    <VueSlickCarousel :arrows="true" :dots="true" class="feedback-content-slider">
                        <div class="single-feedback-content">
                            <ul class="rating">
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                            </ul>
                            <p>
                                Phasellus finibus enim nulla, quis ornare odio facilisis eu. Suspendisse ornare ante sit
                                amet arcu semper, vel eleifend tortor egestas. Aenean luctus.
                            </p>
                            <div class="feedback-author">
                                <h4 class="name">Chad Richards</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-content">
                            <ul class="rating">
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                            </ul>
                            <p>
                                Phasellus finibus enim nulla, quis ornare odio facilisis eu. Suspendisse ornare ante sit
                                amet arcu semper, vel eleifend tortor egestas. Aenean luctus.
                            </p>
                            <div class="feedback-author">
                                <h4 class="name">Richard Bailey</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-content">
                            <ul class="rating">
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                            </ul>
                            <p>
                                Phasellus finibus enim nulla, quis ornare odio facilisis eu. Suspendisse ornare ante sit
                                amet arcu semper, vel eleifend tortor egestas. Aenean luctus.
                            </p>
                            <div class="feedback-author">
                                <h4 class="name">Emma Hoffman</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-content">
                            <ul class="rating">
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                            </ul>
                            <p>
                                Phasellus finibus enim nulla, quis ornare odio facilisis eu. Suspendisse ornare ante sit
                                amet arcu semper, vel eleifend tortor egestas. Aenean luctus.
                            </p>
                            <div class="feedback-author">
                                <h4 class="name">Chad Richards</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-content">
                            <ul class="rating">
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                            </ul>
                            <p>
                                Phasellus finibus enim nulla, quis ornare odio facilisis eu. Suspendisse ornare ante sit
                                amet arcu semper, vel eleifend tortor egestas. Aenean luctus.
                            </p>
                            <div class="feedback-author">
                                <h4 class="name">Richard Bailey</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                        <div class="single-feedback-content">
                            <ul class="rating">
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                                <li><i class="fas fa-star"></i></li>
                            </ul>
                            <p>
                                Phasellus finibus enim nulla, quis ornare odio facilisis eu. Suspendisse ornare ante sit
                                amet arcu semper, vel eleifend tortor egestas. Aenean luctus.
                            </p>
                            <div class="feedback-author">
                                <h4 class="name">Emma Hoffman</h4>
                                <span class="designation">Project Manager</span>
                            </div>
                        </div>
                    </VueSlickCarousel>
                </div>
            </div>
        </section>


    </div>
</template>

<style scoped>
    button.slick-prev:before, button.slick-next:before {
        background-color: red !important;
    }
</style>
<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import VueSlickCarousel from 'vue-slick-carousel'

    export default {
        components: {Breadcrumb, VueSlickCarousel},
        head () {
            return {
                title: 'heeraexchange.in  | About',
            }
        },
        data(){
            return {

            }
        },
        mounted(){

        }
    }
</script>
