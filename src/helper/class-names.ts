// concat list of classnames and exclude falsey values
export default function classNames(...args: unknown[]) {
	  return args.filter(Boolean).join(" ");
}