const CodepenIcon = (props: { size?: number }) => {
  const size = props.size ?? 22

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 15l9 6l9 -6l-9 -6l-9 6" />
      <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
      <path d="M3 9l0 6" />
      <path d="M21 9l0 6" />
      <path d="M12 3l0 6" />
      <path d="M12 15l0 6" />
    </svg>
  )
}

export default CodepenIcon
