export default {
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: "server",

    loading: '~/components/loading.vue',
    head: {
        title: `heeraexchange.in`,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {
                type: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
            }
        ],
        script: [
            {src: 'js/jquery-1.12.4.min.js'},
            {src: 'js/bootstrap.min.js'},
            {src: 'js/popper.min.js'},
        ]
    },
    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/assets/css/animate.min.css',
        "~/assets/css/bootstrap.min.css",
        "~/assets/css/font-awesome.min.css",

    ],
    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        './plugins/mixins/user.js',
        '~/plugins/mixins/validation.js',
        '~/plugins/toast',
        '~/plugins/axios'
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxtjs/pwa',
        '@nuxtjs/laravel-echo',

    ],
    echo: {
        plugins: [ '~/plugins/echo.js' ]
    },
    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxt/content'
    ],
    auth: {
        plugins: [{src: '~/plugins/axios', ssr: true}, '~/plugins/auth.js'],

        strategies: {
            local: {
                token: {
                    property: 'token'
                },
                user: {
                    property: 'user',
                },
                endpoints: {
                    login: {
                        url: 'login',
                        method: 'post',
                        // propertyName: "meta.token"
                    },
                    user: {
                        url: 'user',
                        method: 'get',
                        // propertyName: 'data'
                    },
                    logout: {
                        url: 'logout',
                        method: 'post'
                    }
                }
            }
        }
    },
    router: {
        middleware: [
            "clearValidation"
        ]
    },
    axios: {
        baseURL: "https://bugfinder.net/bet10/api"
    },
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: ['vuejs-datetimepicker'],

    },

    responseInterceptor: (response, {store, redirect}) => {
        if (response.status === 401) {
            this.$auth.logout(/* .... */)
        }
        return response
    },
}
