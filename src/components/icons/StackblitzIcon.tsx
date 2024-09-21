const StackblitzIcon = (props: { size?: number }) => {
  const size = props.size ?? 22

  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      height={size}
      width={size}
      stroke="currentColor">
      <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z" />
    </svg>
  )
}

export default StackblitzIcon
