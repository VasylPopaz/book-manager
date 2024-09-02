export const handleClickOnBackdrop = (
  toggle: () => void,
  e: React.MouseEvent<HTMLDivElement>
): void => {
  if (e.currentTarget === e.target) {
    toggle();
  }
};
