import * as React from "react"
const Underline = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
    <path
      fill="none"
      stroke='url("#a")'
      strokeLinecap="round"
      strokeWidth={25}
      d="M14.35 165.92c120.329 1.195 605.38-7.176 721.973 7.174 116.592 14.35-18.685 65.77-22.422 78.924"
      transform="matrix(1 0 0 1 1.024 -8.291)"
    />
    <defs>
      <linearGradient id="a" gradientTransform="rotate(214 .5 .5)">
        <stop offset={0} stopColor="hsl(217, 91%, 60%)" />
        <stop offset={1} stopColor="hsl(45, 93%, 47%)" />
      </linearGradient>
    </defs>
  </svg>
)
export default Underline;