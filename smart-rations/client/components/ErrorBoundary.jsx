import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI

        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
    }
    render() {
        let error = null
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute mt-20 left-[50%] translate-x-[-50%] z-10 flex" role="alert">
                    <strong className="font-bold">{error?.title ?? "Bir hata oluştu"}</strong>
                    <span className="block sm:inline mx-1">{error?.message ?? 'Hata?'}</span>
                    <span className="">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Kapat</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
            )
        }

    }
}

export default ErrorBoundary

/*
export default function ErrorDialog({ error }) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute right-5 bottom-5 z-10 flex" role="alert">
            <strong className="font-bold">{error.title ?? "Bir hata oluştu"}</strong>
            <span className="block sm:inline mx-1">{error.message ?? 'Hata?'}</span>
            <span className="">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Kapat</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
    )
}
*/
