import { GoogleLogin } from '@react-oauth/google'

// Define the type for the onLogin prop
interface LoginProps {
    onLogin: (credentialResponse: any) => void;  // Replace `any` with a specific type if available
}

export default function Login({ onLogin }: LoginProps) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        onLogin(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    )
}
