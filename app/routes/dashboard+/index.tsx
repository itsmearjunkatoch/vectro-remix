import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RemixAnchor from '#app/components/ui/remix-anchor.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ params, request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const user = prisma.user.findUniqueOrThrow({
		select: {
			id: true,
			name: true,
			username: true,
			image: { select: { id: true } },
			roles: {
				select: {
					name: true,
					permissions: {
						select: { entity: true, action: true, access: true },
					},
				},
			},
		},
		where: { id: userId },
	})
	return user
}

export default function DashboardIndex() {
	const user = useLoaderData<typeof loader>()
	console.log('data = ', user)
	return (
		<>
			<div className="flex">
				<div className="mx-auto">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Dashboards
					</h1>
					<ul className="list-disc">
						<li className="">
							<RemixAnchor to="positioning-insights">
								Positioning Insights
							</RemixAnchor>
						</li>
						<li className="">
							<RemixAnchor to="sales-coaching">
								Sales Coaching Dashboard
							</RemixAnchor>
						</li>
						<li className="">
							<RemixAnchor to="team">Team Dashboard</RemixAnchor>
						</li>
						<li className="">
							<RemixAnchor to="deal-insights">Deal Insights</RemixAnchor>
						</li>
						<li className="">
							<RemixAnchor to="objections">Objections</RemixAnchor>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}
