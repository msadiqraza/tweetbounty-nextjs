/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: false, // Optional: disable strict mode if needed
	output: "standalone", // Required for Vercel to handle server-side logic correctly
	webpack: (config, { isServer }) => {
		// This allows Playwright to be used in server-side API routes
		if (isServer) {
			config.externals.push("@playwright/test");
		}

		return config;
	},

};

export default nextConfig;
