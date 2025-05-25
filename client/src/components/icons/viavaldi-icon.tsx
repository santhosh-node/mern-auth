export function ViavaldiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={2500}
      height={2500}
      className="vivaldi-logo"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <defs>
        <rect id="a" width={882.119} height={882.119} x={76.444} y={76.444} rx={30} />
        <rect id="b" width={882.119} height={882.119} x={76.444} y={75.438} rx={30} />
        <rect id="c" width={882} height={882} x={77} y={77} rx={30} />
        <filter id="d" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox">
          <feOffset dy={-20} in="SourceAlpha" result="shadowOffsetInner1" />
          <feGaussianBlur in="shadowOffsetInner1" result="shadowBlurInner1" />
          <feComposite in="shadowBlurInner1" in2="SourceAlpha" k2={-1} k3={1} operator="arithmetic" result="shadowInnerInner1" />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.056 0"
          />
          <feOffset in="SourceAlpha" result="shadowOffsetInner2" />
          <feGaussianBlur in="shadowOffsetInner2" result="shadowBlurInner2" stdDeviation={15} />
          <feComposite in="shadowBlurInner2" in2="SourceAlpha" k2={-1} k3={1} operator="arithmetic" result="shadowInnerInner2" />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.042 0"
          />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter id="h" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox">
          <feOffset dx={-20} in="SourceAlpha" result="shadowOffsetInner1" />
          <feGaussianBlur in="shadowOffsetInner1" result="shadowBlurInner1" />
          <feComposite in="shadowBlurInner1" in2="SourceAlpha" k2={-1} k3={1} operator="arithmetic" result="shadowInnerInner1" />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 0.88627451 0 0 0 0 0.443137255 0 0 0 0 0.443137255 0 0 0 0.175 0"
          />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shadowMatrixInner1" />
          </feMerge>
        </filter>
        <radialGradient id="e" cy="23.635%" r="55.581%" fx="50%" fy="23.635%">
          <stop className="vivaldi-logo-circular-stop1" offset="0%" />
          <stop className="vivaldi-logo-circular-stop2" offset="100%" />
        </radialGradient>
        <linearGradient id="f" x1="46.665%" x2="23.862%" y1="50.924%" y2="38.705%">
          <stop offset="0%" stopOpacity={0} />
          <stop offset="100%" stopOpacity={0.2} />
        </linearGradient>
      </defs>
      <g transform="translate(-6 -6)">
        <use xlinkHref="#a" fill="#F03939" fillOpacity={0.3} fillRule="evenodd" transform="rotate(-11 517.503 517.503)" />
        <use xlinkHref="#b" fill="#F03939" fillOpacity={0.5} fillRule="evenodd" transform="rotate(-5 517.503 516.497)" />
        <use xlinkHref="#b" fill="none" />
        <mask id="g" fill="#fff">
          <use xlinkHref="#c" />
        </mask>
        <g filter="url(#d)">
          <use xlinkHref="#c" fill="url(#e)" fillRule="evenodd" />
          <use xlinkHref="#c" fill="#ef3939" stroke="#ef3939" strokeOpacity={0} strokeWidth={0} />
        </g>
        <path
          fill="url(#f)"
          d="M726.3 379.1 807.2 239l559.2 322.8-330.9 573.2-559.2-322.9 140.8-243.9c4.6.7 9.3 1.1 14.1 1.1 58.6 0 106.1-59 106.1-131.8 0-21-4-40.8-11-58.4z"
          className="vivaldi-logo-longshadow"
          mask="url(#g)"
        />
        <path
          fill="#fff"
          d="M688.7 343.1c-25.4-50.9 1.6-107.8 56.9-120 45-10 91.6 23 97.5 68.7 2.6 20-1.3 38.3-11.3 55.6-82 142.2-164.1 284.3-245.9 426.5-15.2 26.4-37.4 42.4-67.7 44.6-34 2.4-60.7-11.8-77.8-41.3-51.9-89.1-103.2-178.5-154.7-267.8-31.3-54.3-62.8-108.6-94-163-31.5-54.9 4-121.6 67.2-124.9 33.3-1.7 59.1 13.7 76 42.6 23.1 39.5 45.8 79.3 68.7 118.9 16.5 28.6 32.7 57.4 49.7 85.6 24.5 41.1 60.7 64.2 108.7 67.1 68.1 4 131.3-45.2 139.5-117.4.6-5.4 1-10.8 1.2-13.6-.3-23.4-4.7-43.1-14-61.6z"
          className="vivaldi-logo-v"
          filter="url(#h)"
        />
      </g>
    </svg>
  );
}
