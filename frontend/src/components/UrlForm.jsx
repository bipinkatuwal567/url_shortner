import React, { useState } from "react";
import axios from "axios";

const UrlForm = () => {
    const [url, setUrl] = useState("https://google.com");
    const [shortUrl, setShortUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/create", { url })

            console.log(response);


            if (response.statusText !== "OK") {
                throw new Error("Failed to create short URL");
            }
            setShortUrl(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your URL"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 placeholder-gray-400 text-gray-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none transition-colors duration-200 disabled:opacity-70 font-normal"
                >
                    {isLoading ?
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing
                        </span>
                        : "Create Short URL"}
                </button>
            </form>

            {error && (
                <div className="mt-5 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                </div>
            )}

            {shortUrl && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-2">Your shortened URL</p>
                    <div className="flex items-center justify-between">
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 break-all text-sm"
                        >
                            {shortUrl}
                        </a>
                        <button
                            onClick={handleCopy}
                            className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="Copy to clipboard"
                        >
                            {copied ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                            }
                        </button>
                    </div>
                    {copied && (
                        <p className="text-xs text-center bg-green-300 text-white rounded-md py-3 mt-2">Copied</p>
                    )}
                </div>
            )}
        </>
    )
}

export default UrlForm