import { redirect, type MetaFunction } from '@remix-run/node'
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipProvider,
// 	TooltipTrigger,
// } from '#app/components/ui/tooltip.tsx'
// import vectroLogo from './logos/vectro-logo-small.png'
import { type DataFunctionArgs } from '@sentry/remix/types/utils/vendor/types.js'
import { requireUserId } from '#app/utils/auth.server.ts'
// import { prisma } from '#app/utils/db.server.ts'
import { stars } from './logos/logos.ts'
import vectroTextLogo from './logos/vectro-logo-text.png'

export const meta: MetaFunction = () => [{ title: 'Vectro' }]

export async function loader({ request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	if (userId) {
		// const user = await prisma.user.findUnique({ where: { id: userId } })
		throw redirect(`/dashboard/sales-coaching`)
	}
}

export default function Index() {
	return (
		<main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
			<div className="relative sm:pb-16 sm:pt-8">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
						<div className="absolute inset-0">
							<img className="h-full w-full object-cover" src={stars} alt="" />
							<div className="absolute inset-0 bg-[color:rgba(30,23,38,0.5)] mix-blend-multiply" />
						</div>
						<div className="lg:pt-18 relative px-4 pb-8 pt-8 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8 lg:pb-20">
							<h1 className="text-center text-mega font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
								<div className="flex items-center justify-center">
									<img
										className="content-end"
										src={vectroTextLogo}
										alt=""
									></img>
								</div>
							</h1>
							{/* <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
								Check the{' '}
								<a
									className="underline"
									href="https://github.com/epicweb-dev/epic-stack/blob/main/docs/getting-started.md"
								>
									Getting Started
								</a>{' '}
								guide file for how to get your project off the ground!
							</p> */}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
