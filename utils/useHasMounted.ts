// Example:
// const hasMounted = useHasMounted();
// if (!hasMounted) {
//   return null;
// }

function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export default useHasMounted
