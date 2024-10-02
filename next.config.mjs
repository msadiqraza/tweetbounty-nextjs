/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false, // Optional: disable strict mode if needed
	output: "standalone", // Required for Vercel to handle server-side logic correctly
	experimental: {
		appDir: true, // If you're using the new app directory structure in Next.js
	},
	webpack: (config, { isServer }) => {
		// This allows Playwright to be used in server-side API routes
		if (isServer) {
			config.externals.push("@playwright/test");
		}

		return config;
	},
};

export default nextConfig;
