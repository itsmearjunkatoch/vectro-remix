import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ScoringTable from '#app/components/widgets/call-score.tsx'
import MomentOfGreatness from '#app/components/widgets/moments-of-greatness-table.tsx'
import ReviewMoments from '#app/components/widgets/review-moments-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getMeetingData } from '#app/utils/meetings/meetings.tsx'

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
	const meetings = getMeetingData()
	return {
		user: user,
		meetings: meetings,
	}
}

export default function SalesOpDashboard() {
	const { user, meetings } = useLoaderData<typeof loader>()
	console.log('data = ', user)
	return (
		<>
			<div className="flex">
				<div className="mx-auto">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Sales Coaching Dashboard
					</h1>
					<div className="mt-10 flex flex-col space-y-10">
						<MomentOfGreatness
							m={meetings}
							customer_name=""
							salesRepId=""
							fetchAll={true}
						/>
						<ReviewMoments
							m={meetings}
							customer_name=""
							salesRepId=""
							fetchAll={true}
						/>
						<ScoringTable meetings={meetings} />
					</div>
				</div>
			</div>
		</>
	)
}
