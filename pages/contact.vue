<template>
    <div>
        <Breadcrumb title="Contact"></Breadcrumb>

        <!--====== Contact Section Start ======-->
        <section class="contact-section-two">
            <div class="chancer-container">
                <div class="row no-gutters justify-content-center">
                    <div class="col-lg-5 col-md-8 order-lg-2">
                        <div class="contact-img-two">
                            <img src="~/assets/img/contact-img-2.jpg" alt="Image">
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-10 order-lg-1">
                        <div class="contact-form-two">
                            <form @submit.prevent="submit">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group mb-30">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" v-model.trim="form.name"
                                                   placeholder="Your Fullname">
                                            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group mb-30">
                                            <label for="email">Email Address</label>
                                            <input type="email" id="email" v-model.trim="form.email"
                                                   placeholder="Your Email Address">
                                            <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="input-group mb-30">
                                    <label for="subject">Subject</label>
                                    <input type="text" id="subject" v-model.trim="form.subject"
                                           placeholder="Write Subject">
                                    <span class="text-danger" v-if="errors.subject">{{errors.subject[0]}}</span>
                                </div>

                                <div class="input-group mb-30">
                                    <label for="message">Message</label>
                                    <textarea id="message" v-model.trim="form.message"
                                              placeholder="Start message here"></textarea>
                                    <span class="text-danger" v-if="errors.message">{{errors.message[0]}}</span>
                                </div>
                                <div class="input-group text-right">
                                    <button type="submit" class="main-btn ml-auto">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--====== Contact Section Start ======-->

    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import Vue from 'vue'

    export default {
        components: {Breadcrumb},
        head() {
            return {
                title: 'heeraexchange.in  | Contact',
            }
        },
        data() {
            return {
                form: {
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                }
            }
        },
        methods: {

            async submit() {

                var _this = this;
                await this.$axios.$post('contact', this.form)
                    .then(res => {

                        console.log(res)
                        if (res.message) {
                            Vue.$toast.open({
                                message: '' + res.message,
                                type: 'success',
                                position: 'top-right'
                            });
                        }
                        _this.form.name = "";
                        _this.form.email = "";
                        _this.form.subject = "";
                        _this.form.message = "";

                    })
                    .catch(err => {
                    })


            }
        }
    }
</script>
