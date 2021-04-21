export default function ({ $auth }) {
    if (!$auth.loggedIn) {
        return
    }
    $auth.onError((error, name, endpoint) => {
        console.error(name, error)
    });
    const username = $auth.user.name
}