/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, -- removed because of the "bug" in react-beautiful-dnd
  // but added React.StrictMode inside the DragDropContext
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // TODO: @graphql-codegen/client-preset-swc-plugin
  // experimental: {
  //   swcPlugins: [
  //     ['@graphql-codegen/client-preset-swc-plugin', { artifactDirectory: './generated', gqlTagName: 'graphql' }]
  //   ]
  // }
}

module.exports = nextConfig
