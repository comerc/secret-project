/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, -- removed because of the "bug" in react-beautiful-dnd
  // but added React.StrictMode inside the DragDropContext
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
