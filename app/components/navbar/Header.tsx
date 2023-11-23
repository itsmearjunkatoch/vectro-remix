/* eslint-disable remix-react-routes/use-link-for-routes */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from '@remix-run/react'
// import { useState } from 'react'
import UserButton from '../ui/user-button.tsx'
import MenuItem from './MenuItem.tsx'
import { menus } from './menuItems.tsx'

function Header({ user }: { user: any }) {
	// const isResponsive = useState(false)

	return (
		<>
			<nav className="bg-gray-800">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							{/* <!-- Mobile menu button--> */}
							<button
								type="button"
								className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="absolute -inset-0.5"></span>
								<span className="sr-only">Open main menu</span>

								{/* 
									Icon when menu is closed. 
									Menu open: "hidden", Menu closed: "block" 
								*/}
								<svg
									className="block h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>

								{/* 
									Icon when menu is open. 
									Menu open: "block", Menu closed: "hidden" 
								*/}
								<svg
									className="hidden h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex flex-shrink-0 items-center">
								{/* Logo */}
								<Link to={'/dashboard/sales-coaching'}>
									<svg
										width="145"
										height="28"
										viewBox="0 0 145 28"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M27.371 13.7139L26.8149 13.3951L24.4107 17.5306H23.4467L26.4757 12.3215L25.9195 12.0026L22.7086 17.5306H21.7417L25.5798 10.9288L25.0242 10.61L21.0139 17.5303H20.0368L24.6842 9.53612L24.128 9.21726L19.2952 17.5306L18.3318 17.5308L23.7888 8.14396L21.205 3.67993L20.6489 3.99879L23.0531 8.13455L22.5713 8.96291L19.5427 3.75384L18.987 4.07269L22.2011 9.59958L21.7186 10.4295L17.8808 3.82774L17.3249 4.1466L21.3544 11.056L20.8661 11.8961L16.219 3.90164L15.6628 4.2205L20.4951 12.5338L20.0136 13.3624L14.5568 3.97555L9.37247 3.96615V4.6036H14.1805L14.6625 5.43248H8.6057V6.06968H15.0325L15.5145 6.89881H7.83919V7.53627H15.8795V7.52608L16.3673 8.36541H7.07269V9.00286H16.7378L17.2195 9.83148H6.30618L3.70532 14.2858L4.26147 14.6047L6.66537 10.4695H7.62936L4.60067 15.6785L5.15682 15.9974L8.37272 10.4692H9.33486L5.49655 17.071L6.05217 17.3898L10.0727 10.4749L10.063 10.4695H11.0396L6.39217 18.4636L6.94831 18.7825L11.7808 10.4692H12.7446L7.28778 19.8561L9.87155 24.3201L10.4272 24.0012L8.023 19.8663L8.50499 19.0374L11.5331 24.2459L12.0893 23.9271L8.87654 18.3981L9.35774 17.5705L13.195 24.172L13.7511 23.8532L9.73166 16.9383L10.2102 16.1042L14.8574 24.0981L15.4135 23.7793L10.581 15.4662L11.0627 14.6379L16.5195 24.024L16.5224 24.0224L16.5195 24.0336H21.7039V23.3962H16.8961L16.4143 22.5673H22.4704V21.9301H16.0438L15.5618 21.1007L23.2371 21.101V20.4635L15.1969 20.4632L14.7091 19.6341H24.0039V18.9966H14.3383L13.8566 18.1683L24.7702 18.168L27.371 13.7139ZM13.4861 17.5308L11.4335 14.0001L13.4861 10.4692H17.5905L19.6431 14.0001L17.5908 17.5308H13.4861Z"
											fill="white"
										/>
										<path
											d="M48.8206 4.93112H53.6815L46.4197 22.9462H41.9737L34.7119 4.93112H39.5432L44.1967 17.9126L48.8206 4.93112ZM55.5785 4.93112H69.0647V9.02277H60.0245V11.9075H67.2863V15.9992H60.0245V18.8545H69.0647V22.9462H55.5785V4.93112ZM85.8409 17.9126V22.4458C84.0032 22.9462 82.1656 23.1522 80.2686 23.1522C74.6963 23.1522 70.9616 19.3549 70.9616 13.9681C70.9616 8.43405 74.8445 4.78394 80.239 4.78394C82.1063 4.78394 84.0625 4.93112 85.8409 5.49041V10.0236C84.3886 9.31714 82.1063 9.05221 80.5057 9.05221C76.8896 9.05221 75.4076 10.524 75.4076 13.9386C75.4076 17.5593 77.1564 18.884 80.5354 18.884C82.047 18.884 84.5071 18.6485 85.8409 17.9126ZM87.3525 4.93112H102.469V9.02277H97.1338V22.9462H92.6878V9.02277H87.3525V4.93112ZM109.227 9.08165V13.3794H113.376C114.74 13.3794 115.54 12.5846 115.54 11.2305C115.54 9.87643 114.74 9.08165 113.376 9.08165H109.227ZM115.955 16.2936C116.785 17.4121 117.615 18.5307 118.475 19.6199C119.304 20.709 120.134 21.8276 120.964 22.9462H115.54C114.473 21.5332 113.436 20.1203 112.398 18.7073C111.361 17.3238 110.294 15.9109 109.227 14.4979V22.9462H104.781V4.93112H113.376C116.755 4.93112 119.631 7.49208 119.631 10.8773C119.631 13.2616 118.149 15.3516 115.955 16.2936ZM131.398 19.0017C134.628 19.0017 136.288 16.9412 136.288 13.9386C136.288 10.7595 134.51 8.87559 131.398 8.87559C128.137 8.87559 126.507 10.9361 126.507 13.9386C126.507 17.0589 128.315 19.0017 131.398 19.0017ZM131.398 23.0934C125.825 23.0934 122.061 19.3255 122.061 13.9386C122.061 8.37517 126.003 4.78394 131.398 4.78394C137 4.78394 140.734 8.52236 140.734 13.9386C140.734 19.5316 136.822 23.0934 131.398 23.0934Z"
											fill="white"
										/>
									</svg>
								</Link>
							</div>
						</div>

						{user && (
							<div className="hidden sm:block">
								<ul className="flex space-x-2 align-middle">
									{menus &&
										menus.map((menu: any, i: number) => (
											<MenuItem key={i} menu={menu} isResponsive />
										))}
									{user && (
										<li className="!ml-16 flex space-x-2 self-center align-middle text-gray-300">
											<UserButton />
										</li>
									)}
								</ul>
							</div>
						)}
					</div>
				</div>

				{/* <!-- Mobile menu, show/hide based on menu state. --> */}
				<div className="sm:hidden" id="mobile-menu">
					<ul className="space-y-1 px-2 pb-3 pt-2">
						{menus &&
							menus.map((menu: any, i: number) => (
								<MenuItem key={i} menu={menu} isResponsive={true} />
							))}
					</ul>
				</div>
			</nav>
		</>
	)
}

export default Header
