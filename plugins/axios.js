export default function ({ $axios, store , redirect }) {
    /*
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    });
    */


    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }else if (code === 401){
            return redirect('/login')
        }
        // else if(code === 500) {
        //     redirect('/sorry')
        //}
        else if(code === 422) {
            store.dispatch("validation/setErrors",error.response.data.errors);
        }

    });



}