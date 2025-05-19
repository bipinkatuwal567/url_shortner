import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-100">
                <h1 className="text-2xl font-light text-center mb-8 text-gray-800">URL Shortener</h1>
                <UrlForm />
                <p className="text-xs text-center mt-8 text-gray-400">
                    Simple URL shortener
                </p>
            </div>
        </div>
    )
}

export default HomePage