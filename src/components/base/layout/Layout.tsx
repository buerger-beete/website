import { ReactNode } from "react"
import Footer from "../../ui/molecule/footer/Footer"

import Navigation, { NavigationType } from "@/components/ui/molecule/navigation/Navigation"


interface LayoutProps {
	children: ReactNode,
	type?: NavigationType
}


const Layout = ({
	children,
	type,
}: LayoutProps) => {
	return (
		<>
			<Navigation type={ type } />

			{ children }

			<Footer />
		</>
	)
}

export default Layout
