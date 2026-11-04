function About() {
    return (
        <section className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">About This Project</h1>
                <p className="text-lg text-base-content/70">
                    A simple, fast, and practical tool for shortening links and generating QR codes.
                </p>
            </div>

            {/* Story */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">💡 The Story</h2>
                    <p>
                        This project started with a simple need: “How can I shorten a long URL and
                        turn it into a QR code?” Instead of relying on third-party services, I
                        decided to build my own solution. It became both a great full-stack
                        development exercise and a tool that works exactly the way I want.
                    </p>
                </div>
            </div>

            {/* Features */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">✨ Features</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Shorten long links with a single click</li>
                        <li>Track how many times each link has been clicked</li>
                        <li>Generate QR codes for both URLs and plain text</li>
                        <li>Download QR codes as images</li>
                        <li>Manage links (single or bulk delete)</li>
                        <li>View content after scanning a QR code</li>
                        <li>Responsive interface with light/dark theme support</li>
                    </ul>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">🛠 Tech Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-lg">Frontend</h3>
                            <ul className="list-disc list-inside text-base-content/80">
                                <li>React (Vite)</li>
                                <li>React Router</li>
                                <li>Tailwind CSS</li>
                                <li>DaisyUI</li>
                                <li>Axios</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Backend</h3>
                            <ul className="list-disc list-inside text-base-content/80">
                                <li>Node.js</li>
                                <li>Express</li>
                                <li>Prisma ORM</li>
                                <li>SQLite</li>
                                <li>QRCode Generator</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Use */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">🚀 How to Use</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Go to the “Shortener” page to shorten a link.</li>
                        <li>Enter your long URL and click the generate button.</li>
                        <li>Go to the “QR Code” page to create a QR code.</li>
                        <li>Choose the content type (link or text) and enter your content.</li>
                        <li>You can download or scan the generated QR code.</li>
                    </ol>
                </div>
            </div>

            {/* Footer / Links */}
            <div className="text-center text-base-content/70">
                <p>This project is open source. You can find the source code on GitHub.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <a
                        href="https://github.com/your-username"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-sm"
                    >
                        GitHub
                    </a>
                    <a href="mailto:your-email@example.com" className="btn btn-outline btn-sm">
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    );
}

export default About;
