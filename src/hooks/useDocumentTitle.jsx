import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useDocumentTitle(title) {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
}

export default useDocumentTitle;
