import { RefObject, useLayoutEffect, useState } from 'react';

export default function useResize(divRef: RefObject<HTMLDivElement>, initialWidth: number) {
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    function updateSize() {
      if (!!divRef && !!divRef.current) {
        setWidth(divRef.current.offsetWidth)
        setHeight(divRef.current.offsetHeight)
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return { width, height }
}
