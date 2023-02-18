declare module "*.svg" {
	const ReactComponent: string
	export default ReactComponent
}

declare module "*.module.scss";

declare module "reusable-components/dist/helper" {
	function cn(...classNames: Array<unknown>): string
}

declare module "react-awesome-slider/dist/autoplay";