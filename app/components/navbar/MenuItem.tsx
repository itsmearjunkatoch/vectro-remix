import { Link } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'

interface MenuItemProps {
	menu: any
	isResponsive: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ menu, isResponsive }) => {
	const [showDropdown, setShowDropdown] = useState(false)

	// create a React ref for the dropdown element
	const ref: any = useRef(null)

	useEffect(() => {
		const checkIfClickedOutside = (e: Event) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu

			// console.log(ref);
			if (
				showDropdown &&
				ref.current &&
				!ref.current?.contains(e.target as Node)
			) {
				setShowDropdown(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			// Cleanup the event listener
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [showDropdown])

	return (
		<>
			<li ref={ref} className="relative">
				{menu.submenu ? (
					<>
						<div className="flex overflow-hidden rounded-md align-middle hover:bg-gray-700">
							<Link
								to={menu.url}
								type="button"
								className="flex p-2 text-left align-middle text-sm font-medium text-gray-300"
								id="insights"
								aria-expanded="true"
								aria-haspopup="true"
							>
								{menu.name}
							</Link>
							<button
								className="p-2 pl-1 text-left align-middle text-sm font-medium text-gray-300  hover:bg-gray-600 hover:text-white"
								onClick={() => setShowDropdown((prev: any) => !prev)}
							>
								<svg
									className="-mr-1 h-5 w-5 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>

						<div
							className={`${
								showDropdown ? '' : 'hidden'
							} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabIndex={-1}
						>
							<div className="py-1" role="none">
								{menu.submenu &&
									menu.submenu.map((item: any, index: number) => (
										<Link
											to={`/${item.url}`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
											role="menuitem"
											tabIndex={-1}
											id="menu-item-0"
											key={index}
										>
											{item.name}
										</Link>
									))}
							</div>
						</div>
					</>
				) : (
					<Link
						to={`/${menu.url}`}
						type="button"
						className="flex  rounded-md p-2 text-left align-middle text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
						id="insights"
						aria-expanded="true"
						aria-haspopup="true"
					>
						{menu.name}
					</Link>
				)}
			</li>
		</>
	)
}

export default MenuItem
