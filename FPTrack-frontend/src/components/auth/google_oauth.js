import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleSignin() {
    return (
        <GoogleOAuthProvider
            clientId="903319987132-adhipbr8f0lfuq7odt2qojd0v17g6bj4.apps.googleusercontent.com">
            <LoginOneTapCrux />
        </GoogleOAuthProvider>
    )
}

export function LoginOneTapCrux() {

    const onSuccess = async (googleData) => {
        console.log("Login Tap Success");
        // fetch user from server
        fetch(
            "http://localhost:3000/api/auth",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: googleData.credential
                })
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log("Error" + error);
            });
    };

    const onFailure = async (response) => {
        console.log("Failed: ");
        console.log(response.error);
        console.log(response.details);
    }

    return (
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            useOneTap
        />
    );

}

