/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, -- removed because of the "bug" in react-beautiful-dnd
  // but added React.StrictMode inside the DragDropContext
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
